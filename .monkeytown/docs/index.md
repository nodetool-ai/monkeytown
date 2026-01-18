# Documentation Domain Guide

**Documentation Domain | ScribbleSimian**

This document describes the documentation domain structure, standards, and procedures for Monkeytown documentation.

---

## Documentation Structure

### Root Documentation

Located in the repository root:

| File | Purpose | Owner |
|------|---------|-------|
| README.md | Protocol definition, Global Laws | ScribbleSimian |
| CONTRIBUTING.md | Human contribution guidelines | ScribbleSimian |
| CHANGELOG.md | Version history | ScribbleSimian |
| API.md | Technical API reference | ScribbleSimian |
| LICENSE | MIT License | ScribbleSimian |
| PRIVACY.md | Privacy policy | ScribbleSimian |
| TERMS.md | Terms of service | ScribbleSimian |
| SECURITY.md | Security policy | ScribbleSimian |
| CODE_OF_CONDUCT.md | Community standards | ScribbleSimian |

### Docs Directory

Located in `docs/`:

| File | Purpose |
|------|---------|
| index.md | Documentation navigation guide |
| getting-started.md | New observer onboarding |
| architecture.md | System architecture reference |
| agent-layer.md | React agent layer architecture |
| agent-guide.md | How agents use documentation |
| goal.md | Project vision and goals |

### Monkeytown Docs Directory

Located in `.monkeytown/docs/`:

| File | Purpose |
|------|---------|
| index.md | Domain documentation index |
| legal-framework.md | Legal domain documentation |
| compliance-checklist.md | Compliance procedures |

### Legal Directory

Located in `.monkeytown/legal/`:

| File | Purpose |
|------|---------|
| COMPLIANCE_AUDIT.md | License compliance procedures |
| DATA_PROTECTION.md | GDPR/CCPA compliance |
| INTELLECTUAL_PROPERTY.md | IP management |
| SECURITY_POLICY.md | Security practices |

---

## Documentation Standards

### Writing Principles

All documentation must follow these principles:

1. **Clarity First**
   - Write for the reader, not the author
   - Avoid jargon without explanation
   - Use active voice
   - Be specific, not vague

2. **Completeness**
   - No placeholders
   - No TODOs
   - Cover all edge cases
   - Include working examples

3. **Accuracy**
   - Verify against actual implementation
   - Update when code changes
   - Document current behavior, not intended behavior

4. **Accessibility**
   - Use clear headings
   - Include tables for structured data
   - Provide code examples
   - Link to related documentation

### File Naming Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `*.md` | `getting-started.md` | General documentation |
| `*-guide.md` | `agent-guide.md` | How-to guides |
| `*-reference.md` | `api-reference.md` | Technical reference |
| `*.md` in legal/ | `COMPLIANCE_AUDIT.md` | Legal documents |
| `*.md` in docs/ | `architecture.md` | User documentation |

### Cross-Referencing

Use relative paths for cross-references:

```markdown
See [Architecture](docs/architecture.md) for details.

Reference: [.monkeytown/vision/manifesto.md]()

Cross-reference: [GitHub Workflow Layer](#github-workflow-layer)
```

---

## Version Management

### Document Versioning

Documents should include version information:

```markdown
*Document Version: 1.0.0*
*Last Updated: 2026-01-17*
*Owner: ScribbleSimian*
```

### Changelog Integration

Major documentation changes should be reflected in CHANGELOG.md:

```markdown
## [Unreleased]

### Changed

- Updated [architecture.md](docs/architecture.md) with new component diagrams
- Revised [getting-started.md](docs/getting-started.md) for clarity
```

---

## Agent Documentation Procedures

### How Agents Request Documentation

Agents cannot ask questions directly. To request documentation changes:

1. Create or update a file in your domain
2. Include a documentation request section:

```markdown
## Documentation Update Required

**Topic**: [Brief description]

**Current State**: [What exists now]

**Needed Change**: [What needs to be documented]

**Why**: [Purpose and use case]

**Cross-Reference**: [Related files]
```

### How ScribbleSimian Responds

1. Reads agent domain files
2. Identifies documentation needs
3. Creates or updates documentation
4. Opens a pull request
5. Agents can then reference the new documentation

---

## Quality Checklist

Before committing documentation, verify:

- [ ] Clear title that describes the content
- [ ] Purpose statement at the beginning
- [ ] Logical structure with headings
- [ ] Working code examples (where applicable)
- [ ] Cross-references to related documentation
- [ ] No placeholders or TODOs
- [ ] Consistent formatting and style
- [ ] Version and update date
- [ ] No broken links

---

## Accessibility Requirements

### Writing Style

- Use descriptive link text (not "click here")
- Provide alt text for images (when added)
- Use tables for tabular data
- Include code examples in code blocks

### Structure

- Use hierarchical headings (H1 → H2 → H3)
- Provide a table of contents for long documents
- Use bullet points for lists
- Keep line length reasonable

---

## Review Process

### Human Review

Humans review documentation for:
1. Accuracy against the codebase
2. Completeness (no missing information)
3. Clarity (can be understood by target audience)
4. Consistency (matches other documentation)

### Automated Checks

Documentation is checked for:
- Broken links (via tools)
- Formatting consistency
- Syntax errors in code blocks
- Missing required sections

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-01-17 | Initial documentation domain guide |

---

*Documentation Domain*
*Document Version: 1.0.0*
