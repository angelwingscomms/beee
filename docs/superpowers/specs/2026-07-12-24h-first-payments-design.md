# 24-Hour First-Payments Launch — Design

**Date:** 2026-07-12
**Goal:** 5–10 paid registrations (₦67,500–₦150,000 gross) on beeeproject.com within 24 hours of launch messages going out.
**Product:** BEEE Spectacular Chess Championship Abuja 2026 — ₦15,000 per participant, ages 10–14, online programme starts 2026-07-20.

## Decisions

| Question | Decision |
|---|---|
| First target audience | Chess-network parents (after-school programme + FCT Chess Association circles), not NAPPS proprietors |
| Payment path status | Only test-mode payments have ever run; live path is unverified |
| Success target | 5–10 paid registrations in 24h |
| The after-school chess lady | Recruit as flagship partner on day one |
| Approach | Partner blitz (A), not direct broadcast (B) or cheap beachhead event (C) |

## Verified current state

- Site live at beeeproject.com (Cloudflare Workers, SvelteKit). `/register` responds.
- Checkout: parent registers one child, pays ₦15,000 via Paystack inline popup, fallback redirect to `authorization_url` after 15s.
- Affiliate system fully built: self-serve signup (`/affiliate`, email sufficient), code gives payer 10% off (₦13,500), affiliate earns 10% commission (₦1,350) auto-paid to their bank via Paystack transfer. Bank details can be added later at `/affiliate/settings`; payouts for earlier registrations are stored and retryable (`store_failed_payout`).
- Referral links work end-to-end: any page visited with `?c=CODE` stores the code in localStorage (`+layout.svelte`); `/register` auto-fills and validates it. Pasted links containing `?c=` are parsed in the affiliate input.
- Dual payment confirmation: Paystack webhook (`/api/webhooks/paystack`) plus client callback verification (`/payment/callback` → `/api/verify-payment`).
- Key selection (`src/lib/paystack.ts` `get_secret_key`): keys are baked at build time from `.env` via `$env/static/private`. `PAYSTACK_TEST === '.'` → test keys; `PAYSTACK_TEST` undefined → follows SvelteKit `dev`. **Quirk:** empty string (or any non-`.` value) → live keys, including in local dev.
- Confirmation email sent via Cloudflare `send_email` binding — delivery to arbitrary (parent) addresses is unverified in production.
- OG tags present site-wide → WhatsApp link previews work.
- Paid registrations visible in `/dashboard` and the Paystack dashboard.

## Section 1 — The money path (hours 0–2)

Goal: a stranger's card can pay ₦15,000 on production, observed once end-to-end.

1. **Flip production to live keys.** Mechanism: `PAYSTACK_TEST` flag in `.env` at build time, then `pnpm build` + `wrangler deploy`. The implementation plan must pin the exact flag handling given the empty-string quirk above, and keep local dev on test keys.
2. **Configure the Paystack live dashboard** (test and live settings are separate): webhook URL `https://beeeproject.com/api/webhooks/paystack`; confirm enabled payment channels include card, bank transfer, and USSD.
3. **One real end-to-end payment:** register a real child with a real card and real ₦15,000, using an email address not owned by the organizer. Confirm all four: money in live Paystack balance; registration marked paid in `/dashboard` (webhook fired); confirmation email delivered; Paystack's own receipt received. Refund via Paystack dashboard afterwards if desired (refund latency does not block launch).
4. **Same transaction doubles as the affiliate test:** create one dummy affiliate code first, pay through it, confirm the 10% discount applies and the commission/payout record is created (pending bank details is an acceptable state).
5. **Known risk deliberately probed by step 3:** the `send_email` binding may only deliver to pre-verified destination addresses. If parent email delivery fails it is not a launch blocker — Paystack's receipt reaches the payer and the organizer confirms by WhatsApp during the 24h window — but it must be known, not guessed.

No new features in this section; verification and configuration only.

## Section 2 — Partners and the forward pack (hours 2–8)

**Recruitment — five voice calls, in order:**

1. **After-school chess lady — flagship partner, first call.** Framing: *founding training partner*, not "affiliate." Her students' parents get 10% off through her code; she earns ₦1,350 per child to her bank; her programme gets named recognition in the championship. Densest pool of age-eligible, chess-paying parents.
2. **FCT association chairman.** The ask is legitimacy: one endorsement message from him in the association group converts fence-sitters. Offer a code; a government-linked figure may prefer public endorsement over personal commission — the script offers, never pushes.
3. **The other active association head** — same treatment as the chairman.
4. **1–2 FIDE-connected members** — credibility plus their coaching circles.

Each call: ~30-second pitch (what it is, the ask — share with your parents today, what's in it for them), ends with the affiliate account created on the spot (email only), and closes with "your personal link and ready-to-forward message will be on your WhatsApp within the hour."

**Forward pack — written artifacts produced by this project** (single markdown doc under `docs/launch/`, copy-paste friendly from a phone; nothing on the public site):

- One parent-facing WhatsApp message per partner (~100 words): ages 10–14 chess hook; what the child gets (championship + AI training programme, online start July 20); price framed as "₦13,500 with [partner]'s code — normally ₦15,000"; urgency (slots first-completed-first-allocated); their `beeeproject.com/register?c=CODE` link.
- The organizer's own broadcast version for the FCT association group and personal contacts.
- Partner FAQ crib sheet — the five questions parents ask (Is this real / who is behind it? What exactly does my child get? How do online sessions work? What if my child is a beginner? What if we can't continue?), each answered in 1–2 lines, plus "if card fails, choose Bank Transfer."
- The 30-second call script.
- Images: reuse the existing flyer/OG image; WhatsApp previews already render from OG tags. No new design work.

## Section 3 — 24-hour rhythm, contingencies, scope

**Rhythm (hours 8–24):**

- Track paid registrations hourly via `/dashboard` and the Paystack dashboard.
- Hour milestones: h4 — live payment verified, ≥3 partners committed; h8 — all packs delivered, first real payment in; h16 — ≥4 payments, nudges sent; h24 — 5–10 payments.
- **Thank-you ritual (the engine):** the moment a partner's code produces a payment, the organizer messages that partner personally ("Mrs. X just registered through your link — your ₦1,350 is on its way"). This produces the partner's second and third forward. Early wins are shared with the other partners as social proof.
- Hour-8 nudge for partners who have not forwarded: one follow-up with a fresh angle (early-slot scarcity), not a repeat.
- The organizer's day is calls and messages; the site does all collecting.

**Contingencies (mapped to what exists):**

- Card declines (common in Nigeria): checkout offers bank transfer / USSD; FAQ instructs parents accordingly; channels confirmed in Section 1.
- Webhook miss: `/payment/callback` verification path already covers it.
- Confirmation email failure: Paystack receipt + organizer's WhatsApp confirmation; fix email after the window.
- Payout friction (transfers not enabled / OTP on live transfers): payments unaffected; payouts queue as retryable; organizer pays first commissions manually same-day if needed — partner trust outranks automation.
- Scarcity honesty: "slots limited" must be true — organizer sets a real early-slot cap she will enforce.

**Scope:**

- In: live-mode flip (+ pinning the `PAYSTACK_TEST` flag semantics if a small code guard is needed), Paystack live-dashboard configuration, one verified real payment, `docs/launch/` doc with all scripts/FAQ/runbook.
- Out (explicitly rejected for this window): school bulk payments, new landing pages, price changes, new event products, NAPPS proprietor campaign (second wave, after this one proves the funnel).

## Deliverables

1. Production on live Paystack keys, deployed; local dev still on test keys.
2. Paystack live dashboard configured (webhook, channels).
3. One real ₦15,000 payment verified end-to-end (with dummy affiliate code exercising discount + commission recording), then refunded if desired.
4. `docs/launch/whatsapp-pack.md` — call script, per-partner parent messages, broadcast message, partner FAQ, hour-milestone runbook.
