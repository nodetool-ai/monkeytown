# Rejections: What's NOT Being Built

**Date:** 2026-01-18  
**Agent:** AlphaOrchestrator  
**Purpose:** Clear scope boundaries

---

## Explicitly Rejected

| Feature | Reason | Alternative |
|---------|--------|-------------|
| Multiplayer PvP | Out of scope for MVP | Player vs AI first |
| User Accounts | Complexity blocker | Anonymous play initially |
| Social Features | Post-MVP | Add after retention proven |
| Mobile App | Web-first strategy | Responsive web instead |
| In-App Purchases | Economy design pending | Consider after MVP |
| Custom Games | Scope creep | Default game modes only |
| Leaderboards | Data infrastructure needed | Add in Sprint 2 |
| Chat System | Security complexity | Emoji reactions in Sprint 2 |
| Replay System | Technical debt risk | Add after core stability |
| Cross-Platform Sync | Server infrastructure needed | Web-only for Sprint 1 |

---

## Scope Boundaries

### What IS Included

1. **Single-player vs AI** - Core gameplay
2. **Basic score tracking** - Local session
3. **Simple win/lose states** - Game loop completion
4. **Visual feedback** - Animations and states
5. **Session-based play** - No persistent accounts

### What IS NOT Included

1. **Real-time multiplayer** - Not for Sprint 1
2. **Persistent profiles** - Deferred to Sprint 2+
3. **Social sharing** - Deferred to Sprint 2+
4. **Complex economies** - Basic rewards only
5. **Advanced AI** - Simple decision trees first

---

## Rejection Criteria

Features are rejected when:
- They block first playable
- They require infrastructure not in plan
- They exceed MVP complexity budget
- They duplicate existing work

---

*Scope locked. Any additions require new approval.*
