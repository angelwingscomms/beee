# Agent Instructions

## Critical: Keep docs/about.md in sync

**`docs/about.md` is the authoritative reference** for everything about the BEEE Spectacular Chess Championship Abuja 2026 — the event, its programmes, participants, registration, partners, design, and technical implementation.

**Whenever any substantial, architectural, or structural detail, aspect, fact, attribute, or feature is updated anywhere in this site/repo** (be it a new data model, pricing, dates, contact info, programme structure, routes, partner/registration logic, or any other meaningful change to what the championship *is* or *does*), **you MUST also update `docs/about.md`** to reflect that change.

**Do NOT update `docs/about.md` for minor/cosmetic changes** — e.g. spacing, padding, margins, colors, animations, small copy tweaks, layout polish, or other routine styling/UI adjustments that don't change any underlying fact about the championship. Only genuinely substantial or structural changes belong there.

This ensures that any agent reading `docs/about.md` can speak about the championship with complete, current authority — without the doc being churned by every small tweak.

## Never use italics

Do not use italic text (`font-style: italic`, `<em>`, `<i>`, markdown `*asterisks*`) anywhere in this codebase's UI or copy.
