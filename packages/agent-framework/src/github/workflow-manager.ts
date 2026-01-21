import { Octokit } from '@octokit/rest';

/**
 * WorkflowManager handles GitHub Actions workflow operations
 */
export class WorkflowManager {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor(octokit: Octokit, owner: string, repo: string) {
    this.octokit = octokit;
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * Trigger a workflow by filename
   */
  async trigger(workflowFile: string, ref: string = 'main', inputs?: Record<string, string>): Promise<void> {
    await this.octokit.actions.createWorkflowDispatch({
      owner: this.owner,
      repo: this.repo,
      workflow_id: workflowFile,
      ref,
      inputs
    });
  }

  /**
   * List all workflows in the repository
   */
  async list(): Promise<{ id: number; name: string; path: string; state: string }[]> {
    const { data } = await this.octokit.actions.listRepoWorkflows({
      owner: this.owner,
      repo: this.repo
    });

    return data.workflows.map(w => ({
      id: w.id,
      name: w.name,
      path: w.path,
      state: w.state
    }));
  }

  /**
   * Get recent workflow runs
   */
  async getRecentRuns(workflowFile?: string, limit: number = 10): Promise<{
    id: number;
    name: string;
    status: string;
    conclusion: string | null;
    headBranch: string;
    createdAt: string;
    updatedAt: string;
    url: string;
  }[]> {
    const params: {
      owner: string;
      repo: string;
      per_page: number;
      workflow_id?: string;
    } = {
      owner: this.owner,
      repo: this.repo,
      per_page: limit
    };

    if (workflowFile) {
      params.workflow_id = workflowFile;
    }

    const { data } = workflowFile
      ? await this.octokit.actions.listWorkflowRuns({
          owner: this.owner,
          repo: this.repo,
          workflow_id: workflowFile,
          per_page: limit
        })
      : await this.octokit.actions.listWorkflowRunsForRepo({
          owner: this.owner,
          repo: this.repo,
          per_page: limit
        });

    return data.workflow_runs.map(run => ({
      id: run.id,
      name: run.name ?? 'Unknown',
      status: run.status ?? 'unknown',
      conclusion: run.conclusion,
      headBranch: run.head_branch ?? 'unknown',
      createdAt: run.created_at,
      updatedAt: run.updated_at,
      url: run.html_url
    }));
  }

  /**
   * Cancel a workflow run
   */
  async cancel(runId: number): Promise<void> {
    await this.octokit.actions.cancelWorkflowRun({
      owner: this.owner,
      repo: this.repo,
      run_id: runId
    });
  }

  /**
   * Get workflow run status
   */
  async getRunStatus(runId: number): Promise<{
    status: string;
    conclusion: string | null;
    jobs: { name: string; status: string; conclusion: string | null }[];
  }> {
    const { data: run } = await this.octokit.actions.getWorkflowRun({
      owner: this.owner,
      repo: this.repo,
      run_id: runId
    });

    const { data: jobs } = await this.octokit.actions.listJobsForWorkflowRun({
      owner: this.owner,
      repo: this.repo,
      run_id: runId
    });

    return {
      status: run.status ?? 'unknown',
      conclusion: run.conclusion,
      jobs: jobs.jobs.map(job => ({
        name: job.name,
        status: job.status,
        conclusion: job.conclusion
      }))
    };
  }

  /**
   * Check if any agent workflow is currently running
   */
  async isAnyAgentRunning(): Promise<boolean> {
    const runs = await this.getRecentRuns(undefined, 50);
    return runs.some(run => 
      run.status === 'in_progress' || run.status === 'queued'
    );
  }

  /**
   * Get failed workflow runs
   */
  async getFailedRuns(limit: number = 10): Promise<{
    id: number;
    name: string;
    headBranch: string;
    createdAt: string;
    url: string;
  }[]> {
    const runs = await this.getRecentRuns(undefined, limit * 2);
    return runs
      .filter(run => run.conclusion === 'failure')
      .slice(0, limit)
      .map(run => ({
        id: run.id,
        name: run.name,
        headBranch: run.headBranch,
        createdAt: run.createdAt,
        url: run.url
      }));
  }
}
