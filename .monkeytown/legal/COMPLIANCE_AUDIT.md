# Monkeytown License Compliance Audit

**Legal Domain | ScribbleSimian**

This document establishes license compliance procedures, audit requirements, and license compatibility guidelines for Monkeytown.

---

## License Compatibility Matrix

### Permitted Licenses

The following licenses are automatically permitted for third-party dependencies:

| License | Category | Conditions |
|---------|----------|------------|
| MIT | Permissive | None |
| BSD-2-Clause | Permissive | None |
| BSD-3-Clause | Permissive | None |
| Apache-2.0 | Permissive | Include NOTICE file if required |
| ISC | Permissive | None |
| Unlicense | Public Domain | None |
| CC0 | Public Domain | None |

### Restricted Licenses

The following licenses require prior written approval before inclusion:

| License | Category | Risk |
|---------|----------|------|
| GPL-2.0 | Copyleft | Viral, may contaminate codebase |
| GPL-3.0 | Copyleft | Viral, may contaminate codebase |
| AGPL-3.0 | Copyleft | Strong viral provisions |
| LGPL-2.1 | Weak Copyleft | May require linking provisions |
| LGPL-3.0 | Weak Copyleft | May require linking provisions |
| MPL-2.0 | Weak Copyleft | File-level copyleft |
| EPL-2.0 | Weak Copyleft | File-level copyleft |

### Prohibited Licenses

The following licenses and license types are not permitted:

| License | Reason |
|---------|--------|
| SSPL | Server-side use restrictions |
| Commercial Proprietary | Not open source |
| Any license with advertising restrictions | Incompatible with MIT main license |
| Unclear or ambiguous licenses | Legal uncertainty |

---

## Audit Procedures

### Pre-Merge Audit Checklist

Before any third-party code is merged into the repository, the following must be verified:

1. **License Identification**
   - [ ] License file present in dependency root
   - [ ] License type matches one of the permitted licenses OR has prior approval
   - [ ] License version clearly specified

2. **Attribution Requirements**
   - [ ] Copyright notices preserved
   - [ ] License text included in NOTICE file
   - [ ] Modification notices added if code was modified

3. **Compatibility Assessment**
   - [ ] No license conflicts with MIT main license
   - [ ] No patent retaliation clauses
   - [ ] No use restrictions that conflict with Monkeytown goals

4. **Security Review**
   - [ ] No known vulnerabilities in dependency (check CVE databases)
   - [ ] Dependency actively maintained
   - [ ] No malicious code patterns detected

### Ongoing Compliance Monitoring

Monthly compliance checks must verify:

1. Dependency license changes (licenses can change between versions)
2. New vulnerabilities in existing dependencies
3. Deprecated or abandoned dependencies
4. Changes to license compatibility matrix

---

## NOTICE File Requirements

When including third-party code, the NOTICE file must be updated with:

```markdown
## Third-Party Software

### [Dependency Name]
- Version: [version]
- License: [license name and link]
- Copyright: [copyright holder]
- Source: [URL]
- License Text: [full license or link to license]
```

---

## Documentation of License Conflicts

Any identified license conflicts must be documented in this file with:

```markdown
### [Date] - [Conflict Description]

**Conflict**: [Description of license incompatibility]
**Severity**: [High | Medium | Low]
**Resolution**: [Removed dependency | Obtained permission | Reimplemented]
**Approved By**: [Name and date]
```

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-01-17 | Initial legal framework |

---

*Monkeytown Legal Framework*
*Document Version: 1.0.0*
