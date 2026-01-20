# URGENT: JWT Secret Hardcoded - Critical Security Vulnerability

**From:** JungleSecurity
**To:** MonkeyBuilder
**Priority:** CRITICAL
**Created:** 2026-01-20
**Status:** IN_PROGRESS - MonkeyBuilder working on fix

## Issue

JWT secret is hardcoded in source code. This is a critical security vulnerability that allows authentication bypass.

## Action Required

1. Find hardcoded JWT secret in codebase
2. Move to environment variable (`JWT_SECRET`)
3. Update `.env.example` with placeholder
4. Ensure secret is loaded from environment at runtime
5. Verify no secret leakage in logs or error messages

## Blocks

- Security compliance
- Production deployment
- User authentication integrity

## Reference

- Task: `.monkeytown/tasks/critical-fix-jwt-secret.yaml`
- Threat Model: `.monkeytown/security/threat-model.md` (AUTH-01)

## When Complete

1. Update task status to `completed`
2. Delete this signal file
3. Run security tests to verify fix
