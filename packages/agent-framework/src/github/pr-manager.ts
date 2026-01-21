import { Octokit } from '@octokit/rest';
import type { 
  PullRequest, 
  CreatePRInput, 
  PRFilter, 
  CICheck, 
  MergeResult,
  AutoMergeConfig,
  CIStatus,
  PRStatus
} from '../types/pullrequest.js';

/**
 * PRManager handles GitHub Pull Request operations including auto-merge
 */
export class PRManager {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private config: AutoMergeConfig;

  constructor(
    octokit: Octokit, 
    owner: string, 
    repo: string,
    config: Partial<AutoMergeConfig> = {}
  ) {
    this.octokit = octokit;
    this.owner = owner;
    this.repo = repo;
    this.config = {
      enabled: config.enabled ?? true,
      requiredChecks: config.requiredChecks ?? [],
      deleteBranchAfterMerge: config.deleteBranchAfterMerge ?? true,
      mergeMethod: config.mergeMethod ?? 'squash',
      blockedLabels: config.blockedLabels ?? ['do-not-merge', 'wip'],
      autoMergeLabels: config.autoMergeLabels ?? ['auto-merge']
    };
  }

  /**
   * Map GitHub PR data to our PullRequest type
   */
  private mapPullRequest(pr: {
    number: number;
    title: string;
    body?: string | null;
    head: { ref: string };
    base: { ref: string };
    state: string;
    created_at: string;
    updated_at: string;
    labels: { name: string }[];
    mergeable?: boolean | null;
    mergeable_state?: string;
  }, ciStatus: CIStatus = 'pending'): PullRequest {
    return {
      number: pr.number,
      title: pr.title,
      body: pr.body ?? '',
      headBranch: pr.head.ref,
      baseBranch: pr.base.ref,
      status: pr.state === 'closed' ? 'closed' : 'open' as PRStatus,
      ciStatus,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      labels: pr.labels.map(l => l.name),
      autoMergeEnabled: pr.labels.some(l => 
        this.config.autoMergeLabels.includes(l.name)
      ),
      mergeable: pr.mergeable ?? false
    };
  }

  /**
   * Get CI status for a PR
   */
  async getCIStatus(prNumber: number): Promise<{ status: CIStatus; checks: CICheck[] }> {
    const { data: pr } = await this.octokit.pulls.get({
      owner: this.owner,
      repo: this.repo,
      pull_number: prNumber
    });

    const { data: checkRuns } = await this.octokit.checks.listForRef({
      owner: this.owner,
      repo: this.repo,
      ref: pr.head.sha
    });

    const checks: CICheck[] = checkRuns.check_runs.map(check => ({
      name: check.name,
      status: this.mapCheckStatus(check.status, check.conclusion),
      conclusion: check.conclusion as CICheck['conclusion'],
      url: check.html_url ?? undefined,
      startedAt: check.started_at ?? undefined,
      completedAt: check.completed_at ?? undefined
    }));

    // Determine overall status
    let overallStatus: CIStatus = 'success';
    
    if (checks.some(c => c.status === 'failure')) {
      overallStatus = 'failure';
    } else if (checks.some(c => c.status === 'running')) {
      overallStatus = 'running';
    } else if (checks.some(c => c.status === 'pending')) {
      overallStatus = 'pending';
    }

    return { status: overallStatus, checks };
  }

  /**
   * Map GitHub check status to our CIStatus
   */
  private mapCheckStatus(
    status: string, 
    conclusion: string | null
  ): CIStatus {
    if (status === 'queued') return 'pending';
    if (status === 'in_progress') return 'running';
    if (status === 'completed') {
      if (conclusion === 'success') return 'success';
      if (conclusion === 'failure') return 'failure';
      if (conclusion === 'cancelled') return 'cancelled';
      return 'success'; // neutral, skipped, etc. count as success
    }
    return 'pending';
  }

  /**
   * List all open PRs
   */
  async listOpen(): Promise<PullRequest[]> {
    const { data: prs } = await this.octokit.pulls.list({
      owner: this.owner,
      repo: this.repo,
      state: 'open'
    });

    const results: PullRequest[] = [];
    for (const pr of prs) {
      const { status } = await this.getCIStatus(pr.number);
      results.push(this.mapPullRequest(pr, status));
    }

    return results;
  }

  /**
   * Get a specific PR
   */
  async get(prNumber: number): Promise<PullRequest | null> {
    try {
      const { data: pr } = await this.octokit.pulls.get({
        owner: this.owner,
        repo: this.repo,
        pull_number: prNumber
      });

      const { status } = await this.getCIStatus(prNumber);
      return this.mapPullRequest(pr, status);
    } catch {
      return null;
    }
  }

  /**
   * Create a new PR
   */
  async create(input: CreatePRInput): Promise<PullRequest> {
    const { data: pr } = await this.octokit.pulls.create({
      owner: this.owner,
      repo: this.repo,
      title: input.title,
      body: input.body,
      head: input.headBranch,
      base: input.baseBranch ?? 'main'
    });

    // Add labels if specified
    if (input.labels && input.labels.length > 0) {
      await this.octokit.issues.addLabels({
        owner: this.owner,
        repo: this.repo,
        issue_number: pr.number,
        labels: input.labels
      });
    }

    // Enable auto-merge if requested
    if (input.autoMerge) {
      await this.enableAutoMerge(pr.number);
    }

    return this.mapPullRequest(pr, 'pending');
  }

  /**
   * Enable auto-merge for a PR (via label)
   */
  async enableAutoMerge(prNumber: number): Promise<void> {
    await this.octokit.issues.addLabels({
      owner: this.owner,
      repo: this.repo,
      issue_number: prNumber,
      labels: this.config.autoMergeLabels
    });
  }

  /**
   * Filter PRs based on criteria
   */
  async filter(filter: PRFilter): Promise<PullRequest[]> {
    let prs = await this.listOpen();

    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      prs = prs.filter(pr => statuses.includes(pr.status));
    }

    if (filter.ciStatus) {
      const ciStatuses = Array.isArray(filter.ciStatus) ? filter.ciStatus : [filter.ciStatus];
      prs = prs.filter(pr => ciStatuses.includes(pr.ciStatus));
    }

    if (filter.autoMergeEnabled !== undefined) {
      prs = prs.filter(pr => pr.autoMergeEnabled === filter.autoMergeEnabled);
    }

    if (filter.mergeable !== undefined) {
      prs = prs.filter(pr => pr.mergeable === filter.mergeable);
    }

    return prs;
  }

  /**
   * Check if a PR is ready to merge
   */
  async isReadyToMerge(prNumber: number): Promise<{ ready: boolean; reason?: string }> {
    const pr = await this.get(prNumber);
    if (!pr) {
      return { ready: false, reason: 'PR not found' };
    }

    // Check for blocking labels
    const hasBlockingLabel = pr.labels.some(label => 
      this.config.blockedLabels.includes(label)
    );
    if (hasBlockingLabel) {
      return { ready: false, reason: 'PR has blocking label' };
    }

    // Check CI status
    if (pr.ciStatus !== 'success') {
      return { ready: false, reason: `CI status is ${pr.ciStatus}` };
    }

    // Check if required checks passed
    if (this.config.requiredChecks.length > 0) {
      const { checks } = await this.getCIStatus(prNumber);
      for (const requiredCheck of this.config.requiredChecks) {
        const check = checks.find(c => c.name === requiredCheck);
        if (!check || check.status !== 'success') {
          return { ready: false, reason: `Required check '${requiredCheck}' not passed` };
        }
      }
    }

    // Check if mergeable
    if (!pr.mergeable) {
      return { ready: false, reason: 'PR has merge conflicts' };
    }

    return { ready: true };
  }

  /**
   * Merge a PR
   */
  async merge(prNumber: number): Promise<MergeResult> {
    const pr = await this.get(prNumber);
    if (!pr) {
      return {
        success: false,
        error: 'PR not found',
        pullRequest: pr!
      };
    }

    const readyCheck = await this.isReadyToMerge(prNumber);
    if (!readyCheck.ready) {
      return {
        success: false,
        error: readyCheck.reason,
        pullRequest: pr
      };
    }

    try {
      const { data: mergeResult } = await this.octokit.pulls.merge({
        owner: this.owner,
        repo: this.repo,
        pull_number: prNumber,
        merge_method: this.config.mergeMethod
      });

      // Delete branch if configured
      if (this.config.deleteBranchAfterMerge) {
        try {
          await this.octokit.git.deleteRef({
            owner: this.owner,
            repo: this.repo,
            ref: `heads/${pr.headBranch}`
          });
        } catch {
          // Branch deletion failed, but merge succeeded
        }
      }

      return {
        success: true,
        sha: mergeResult.sha,
        pullRequest: { ...pr, status: 'merged' }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Merge failed',
        pullRequest: pr
      };
    }
  }

  /**
   * Get PRs ready to merge
   */
  async getReadyToMerge(): Promise<PullRequest[]> {
    const prs = await this.filter({
      ciStatus: 'success',
      autoMergeEnabled: true
    });

    const ready: PullRequest[] = [];
    for (const pr of prs) {
      const { ready: isReady } = await this.isReadyToMerge(pr.number);
      if (isReady) {
        ready.push(pr);
      }
    }

    return ready;
  }

  /**
   * Auto-merge all ready PRs
   */
  async autoMergeReady(): Promise<MergeResult[]> {
    if (!this.config.enabled) {
      return [];
    }

    const readyPRs = await this.getReadyToMerge();
    const results: MergeResult[] = [];

    for (const pr of readyPRs) {
      const result = await this.merge(pr.number);
      results.push(result);
    }

    return results;
  }

  /**
   * Get PR statistics
   */
  async getStats(): Promise<{
    total: number;
    open: number;
    pendingCI: number;
    readyToMerge: number;
    failing: number;
  }> {
    const prs = await this.listOpen();
    
    const pendingCI = prs.filter(pr => 
      pr.ciStatus === 'pending' || pr.ciStatus === 'running'
    ).length;
    
    const failing = prs.filter(pr => pr.ciStatus === 'failure').length;
    
    const readyToMerge = (await this.getReadyToMerge()).length;

    return {
      total: prs.length,
      open: prs.length,
      pendingCI,
      readyToMerge,
      failing
    };
  }
}
