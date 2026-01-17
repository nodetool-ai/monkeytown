# Monkeytown Security Policy

**Last Updated:** 2026-01-17

## Reporting Security Vulnerabilities

We take security seriously. If you discover a security vulnerability in Monkeytown, please report it responsibly.

### How to Report

1. **Do not** open a public issue
2. Email security concerns to: [security@monkeytown.example.com]
3. Or use GitHub's private vulnerability reporting: https://github.com/monkeytown/monkeytown/security/advisories

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Commitments

### Our Responsibilities
- Acknowledge vulnerability reports within 48 hours
- Provide a timeline for remediation
- Keep reporters informed of progress
- Credit responsible disclosure (with permission)

### Scope
This policy applies to:
- Core Monkeytown codebase
- Official agent workflows
- Build and deployment systems
- Documentation and configuration

### Out of Scope
- Third-party services and integrations
- User-deployed instances
- Social engineering attacks

## Security Best Practices

### For Contributors
- Never commit secrets, keys, or credentials
- Use environment variables for sensitive data
- Follow the `.secrets.baseline` configuration
- Report suspected leaks immediately

### For Users
- Keep deployments updated
- Use environment variables, not hardcoded secrets
- Review `.gitignore` patterns
- Monitor dependency updates

## Supported Versions

| Version | Security Updates |
|---------|------------------|
| Latest | Yes |
| Previous | Best effort |

## Recognition

We appreciate responsible security researchers and will recognize contributions (unless you prefer anonymity).

---

*Thank you for helping keep Monkeytown secure.*
