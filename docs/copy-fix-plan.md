# BEEE Copy Fix Plan

Generated 2026-07-18 from a full-copy audit of every route, component, data file, and email template. Anchors are `file:line` in the current tree; where lines may drift, the quoted string is grep-able.

---

## 0. Canon — decide once, apply everywhere

Every fix below assumes these decisions. Change a decision here and the sweep changes with it, but make each one **once**.

| # | Item | Current variants | Canon |
|---|------|------------------|-------|
| 1 | BEEE expansion | "Be Everything Excellent Every Day" (footer, /about, ChampHow) **vs** "Building Exceptional Experiences Through Education" (`src/routes/+layout.svelte:22,25,32`, `ChampNav.svelte:28`, `email.ts:44`) | **Be Everything Excellent Every Day.** The other one acronymises to BEETE and contradicts the brand's own tagline. Replace all 5 occurrences. |
| 2 | Event name | "BEEE Spectacular Chess Championship Abuja 2026" / "BEEE Chess Championship Abuja 2026" / "BEEE Spectacular Chess Championship" / "the Championship" | Full name once per page (and in legal docs), then "the Championship". Page `<title>`s may use the short "BEEE Chess Championship Abuja 2026" for length. |
| 3 | e4 mark | E4™ / E4 / e4™ / "E4™ CHESS COACH" | **e4™** lowercase — it's the chess move; that's the entire pun. Lockup: "e4™ — AI Chess Coach". ™ on first mention per page only. |
| 4 | TEAMUP mark | T.E.A.M.U.P. / T.E.A.M.U.P.™ / TEAMUP™ / BEEE T.E.A.M.U.P. | **TEAMUP™**, no dots. First mention per page: "TEAMUP™ (Technology, Enterprise, Art, Mentorship, Upskill)". The dotted form is unreadable and never punctuated the same way twice. |
| 5 | Taskify mark | TASKIFY™ / Taskify™ | **Taskify™**. All-caps reads like shouting next to body copy. |
| 6 | Who owns the Passport | "T.E.A.M.U.P. Development Passport" (`src/lib/data/faq.ts` Passport category) **vs** "Taskify™ Digital Passport" (/taskify, ChampHow) | **Taskify™ Development Passport.** Taskify's whole product IS the passport. Fix all FAQ passport answers and the FAQ six-stages answer (`faq.ts:47` already says Taskify — the Passport category contradicts it). |
| 7 | Partner naming | "Partner Program" (partner `<title>`), "partner program" (dashboard), "Partner Programme", "Become a Tournament Partner →" (footer) | **Partner Programme** (British English, matching "programme" sitewide). Footer link: "Become a Partner →". |
| 8 | English variant | programme (mostly) vs program (partner/dashboard) | **British English**: programme, organise, enrol. Sweep "program". |
| 9 | ® vs ™ | "BEEE®" on /about only; bare "BEEE" everywhere else | Verify the NG trademark registration actually exists. If yes, ® on first mention per page or nowhere; if no, drop ® entirely (using ® unregistered is a legal risk). Either way: one policy. |
| 10 | Phone number | Site: +234 802 092 0872 (consistent). Docs: about.md has +234 902 682 4439, beeeletter.md has +234 803 651 3400 | Confirm the real number. Three different numbers across site + printed letters means someone's calls are going nowhere. |
| 11 | Tagline jobs | "Make Your Move." (H2 *and* H1 on homepage), "Chess is not the destination. It's/It is the platform." (2 variants), "Chess is where they learn. Life is where they lead.", "More Than a Chess Championship", "Empowering Minds. Building Champions." | Assign one job each: **positioning** = "More than a chess championship." · **manifesto** = "Chess is not the destination. It is the platform." (kill the "It's" variant) · **hero** = "Chess is where they learn. Life is where they lead." · **closing CTA** = "Make Your Move." · **delete** "Empowering Minds. Building Champions." (stock sloganese). Never two in one viewport. |

---

## Tier 0 — Stop-ship facts (today)

1. **THE LIVE PRICE IS ₦90.** `src/lib/constants.ts:4` — `REG_AMOUNT = 90; // TEMP: prod fee set to ₦90 (dev-equivalent) — revert to 15000 after testing`. Meanwhile `faq.ts` promises "The registration fee is ₦15,000. Participants with a partner or sponsor code pay ₦13,500." Every parent who registers today pays ₦90 for a ₦15,000 product, and every partner commission is computed off ₦90. Revert the constant or stop advertising ₦15,000 — but resolve it *now*.
2. **Dead deadline, still selling.** "Registration closes on June 18, 2026" — `RegistrationForm.svelte:237`, `/register` aside list, and pinned in `registration.test.ts:72`. Today is July 18. The site has been selling registration a month past its own printed close. Set the real deadline (single-source it, Tier 3.1) and update the test.
3. **Contradictory event chronology.** `RegistrationForm.svelte:190-204` timeline says **June 2026 Preliminary Rounds → July/Aug TEAMUP → October 10 Finale**. FAQ (`faq.ts:13,47`) and ChampHow say **coaching July 28 → preliminaries September → Finale October**. Fix the RegistrationForm timeline to: `July 28 — Online coaching begins · Aug–Sep — TEAMUP™ development · September — Live preliminaries · October 10, 2026 — Grand Finale`. And if October 10 is real, use it **everywhere** — it's the only specific date on the site and specificity sells. If it isn't confirmed, delete it here too.
4. **Fabricated fact in the privacy policy.** `src/routes/privacy/+page.svelte:39`: "Paystack (a Flutterwave-adjacent Nigerian payment processor)". Paystack is Stripe-owned; Flutterwave is its competitor. This reads like an unreviewed AI hallucination shipped in a legal document. Replace with: "Paystack, a Nigerian payment processor."
5. **Typos in shipped copy.** `ChampHow.svelte:60` "elimination **tournamens**" → tournaments. `ChampHow.svelte:39` "A championship **exp** beyond the chessboard" → experience. ChampHow stage 5: "compete for **finalists positions**" → finalist positions; "trained for higher competence in the **finalists competition**" → rewrite (Tier 2.13). `register/+page.svelte:303` "July 28 2026" → "July 28, 2026".
6. **Refund policy contradicts itself.** `faq.ts`: "What is the refund policy? — **No refunds.**" vs Terms §4: "generally non-refundable… may be considered… event cancellation by BEEE." Align the FAQ to the Terms: "Fees are non-refundable, except if BEEE cancels the event. See our Terms for details." A two-word "No refunds." next to a ₦15,000 ask is a trust killer *and* it misstates your own terms.
7. **FAQ undermines the funnel.** `faq.ts`: "Can parents register their children directly? — Yes, where direct registration has been provided by the organisers." The entire site IS direct parent registration. Replace: "Yes. Register directly at beeeproject.com/register — you don't need to go through a school."
8. **Birth-year range is off.** `register/+page.svelte:318` "between 10 and 14 years old (born 2011–2015)". Ages 10–14 during 2026 ⇒ born 2012–2016 (a 2011-born turns 15 this year; a mid-2016-born is already 10). Decide the cutoff date and derive the years: "aged 10–14 as of 1 October 2026 (born {range})."
9. **Circular date answers.** `faq.ts:13-14` — two near-duplicate questions both open with "dates are displayed on the homepage," and the homepage displays no dates. Merge into one question; delete the circular sentence (the rest of the answer already states the dates); put the dates strip on the homepage (Tier 2.1).
10. **Verify the test-mode strings can't render in prod.** `partner/+page.svelte:75,92` — "In test mode you receive a ₦{payout} payout… players pay the ₦{fee} test fee." Gated by `{#if dev}`; confirm `dev` is false in the production build, because with `REG_AMOUNT = 90` (see #1) it's not obvious which mode production thinks it's in.
11. **The promised email doesn't exist.** Payment callback: "A confirmation email will be sent to you shortly." `email.ts` contains only the partner-commission email. Ship the registration-confirmation email (draft in Tier 2.8) or delete the promise. Promising an email that never arrives, to a parent who just paid, is how "is this a scam?" WhatsApp messages start.

---

## Tier 1 — Mechanical consistency sweep (this week)

1. Apply the Canon table: BEEE expansion (5 files), TEAMUP dots, Taskify casing, passport owner, Partner Programme, program→programme, tagline jobs.
2. **CTA system.** Primary everywhere: "Register your child →" (nav button stays "Register"). Kill: "Get Started" (/e4, /about — start *what*?), "Learn More →" (homepage TEAMUP card → "Explore TEAMUP™ →"), "Enrol Now" (/teamup hero — enrolment in TEAMUP is automatic per the same page's own copy; → "Register Now →"). Unify "Register now"/"Register Now →" capitalisation.
3. **Form-label casing.** Sentence case everywhere: "First name", "Last name", "Email address", "Parent's email". Fixes: "Parent's Email" (/register), "First Name/Last Name/Email Address" (RegistrationForm).
4. **One password rule.** /register and /partner say "Min 8 characters"; RegistrationForm validates 6. Align copy *and* validation to 8.
5. **Punctuation sweep.** Comma in dates ("July 28, 2026"); hyphens-as-dashes in ChampHow ("Rounds - Participants" → period or em dash); check the stray footnote "¹" from about.md ("Strategic communication¹") never reached the site.
6. Nav says "FAQs", page and footer say "FAQ" → "FAQ" everywhere. Footer link "Registration" vs nav "Register" → "Register".

---

## Tier 2 — Rewrites (money path first)

### 2.1 Homepage hero
Current: H1 "Make Your Move." + two manifesto H2s + zero facts. A cold parent learns neither what this is, when, where, for whom, nor for how much — the *meta description* out-sells the hero.

Recommended replacement:

> **H1:** Chess is where they learn. Life is where they lead.
> **Sub:** The BEEE Spectacular Chess Championship — a summer of AI-coached chess, mentorship, and life skills for Abuja students aged 10–14. Online coaching starts July 28. Grand Finale at the National Stadium in October.
> **CTA:** Register your child — ₦15,000 &nbsp;·&nbsp; secondary: See how it works
> **Facts strip:** Ages 10–14 · Abuja · Coaching from July 28 · Finale: National Stadium, October 2026 · ₦15,000

Alternatives: (B) H1 "More than a chess championship." with the same facts sub. (C) Question form "What will your child build this summer?" — riskier, test only.
The venue (National Stadium Abuja) is currently buried in FAQ answer #6. It is the strongest trust signal the site owns. Put it in the hero.
"Make Your Move." keeps exactly one job: the closing CTA section (it currently appears as both an H2 and the H1 on the same page).

### 2.2 Homepage "framework" section — the descriptors are wrong
Current: "T.E.A.M.U.P. — Community & Partnerships · TASKIFY — Organization & Operations · E4 — Intelligence & Innovation". Those describe someone's org chart, not the products, and they contradict the products' own pages. Replace:

> e4™ — Your child's AI chess coach: live analysis, training, and practice.
> TEAMUP™ — The development programme: Technology, Enterprise, Art, Mentorship, Upskill.
> Taskify™ — The digital passport recording every badge, milestone, and certificate.

And "It is an integrated development ecosystem built on three proprietary platforms of learning." → "One championship, three tools that work together."

### 2.3 Homepage "Everything Your Child Needs"
"Enrich their summer holiday with a structured blend of online learning." is a truncated sentence — a blend of one thing. Restore the triad: "…a structured blend of online learning, mentorship, and competitive chess."
Replace the seven-abstract-noun "Why Participate?" list with four concrete outcomes, e.g.:

> - Trains with an AI coach that reviews every game they play
> - Learns leadership and public speaking in weekly TEAMUP™ workshops
> - Competes live in September's preliminaries — and maybe October's Grand Finale
> - Finishes the summer with a Taskify™ passport of badges, certificates, and skills

### 2.4 /register page
- H1 is the fragment "Abuja 2026" (the event name is a P above it). Make the H1 "Register for Abuja 2026" or fold the full name into the H1.
- "Proprietor's phone number" (`register/+page.svelte:247`) — a parent doesn't know why you want their school owner's phone. Cut the field if possible; if it must stay: "School proprietor's phone — used to verify your school's participation."
- "Sign up early to give your child a richer, more rewarding championship experience." (also `ChampHero.svelte:63`) → "Slots are limited — and coaching starts the day you register, so early players get the longest run." (Both true per existing copy; "richer, more rewarding" is empty.)
- The age requirement appears three times on this one page. Once, in the aside, is enough.
- Timeline fix per Tier 0.3; deadline per Tier 0.2.

### 2.5 RegistrationForm welcome line
"Welcome to a unique championship experience that redefines engagement among young minds." → "Register your player for the 2026 Championship. Coaching starts July 28 — your child gets access the day you register."

### 2.6 ConfirmationModal
Under the pay button add: "Payments processed securely by Paystack." Button: "Confirm and Pay" → "Confirm & Pay ₦{amount}".

### 2.7 Payment-failed state
Add a recovery path: "No money left your account? Try again, or email info@beeeproject.com and we'll sort it out."

### 2.8 Registration-confirmation email (currently missing)
> **Subject:** You're in — {player_name} is registered for BEEE Abuja 2026
> Hi {parent_name},
> {player_name}'s place in the BEEE Spectacular Chess Championship Abuja 2026 is confirmed.
> **What happens next**
> 1. **Now** — {player_name}'s Taskify™ passport code: **{code}**. Use it to access e4™ and the TEAMUP™ materials at beeeproject.com/dashboard.
> 2. **July 28** — online coaching begins.
> 3. **September** — live preliminary rounds in Abuja. Fixtures come by email and WhatsApp.
> **Receipt:** ₦{amount} · Ref {reference}
> Questions? Reply to this email or call +234 802 092 0872.
> Aspire to BEEE — Be Everything Excellent Every Day

### 2.9 /e4 page
- "E4 can predict every move, analyse mistakes, answer questions and improve players' level through voice prompts and text." — "predict every move" is false and parents of chess kids know it. → "e4™ analyses every move as your child plays — flagging mistakes, suggesting better plans, and answering questions by voice or text."
- "Grandmaster Technologies — Access the technologies grandmasters use to gain a competitive edge." → "Train like the pros — the same engine-backed analysis top players prepare with."
- "Advanced Concepts Mentoring" → "Step-by-step strategy coaching".
- "Give your child the edge of AI-powered chess coaching." → "Give your child an edge with AI-powered chess coaching."
- CTA "Get Started" → "Register your child →".
- Keep: "Custom Puzzles — Train with puzzles auto-generated from real game mistakes." (best line on the page).

### 2.10 /about page — sentence surgery
The definition sentence is 62 words; the mission sentence is 58 with a nine-noun pile-up. Replace, e.g.:

> BEEE (Be Everything Excellent Every Day) is a learning and development platform for young people. We combine structured programmes, digital tools, and mentorship so students grow in education, leadership, and life.
>
> We believe every young person has extraordinary potential. Our job is to give it structure: purposeful learning, real mentors, and real challenges.

Fix the circular benefit blurbs — "Structured Learning: Participation in structured learning and development programmes…" defines the term with itself. Say what actually happens: "A 10-week guided programme with weekly goals, not a drop-in activity."

### 2.11 /taskify page
Split the 48-word sentence: "Participants will not simply attend sessions—they will embark on this measurable development journey, building their own record… and all notable achievements." →

> Your child doesn't just attend — every badge, milestone, project, and certificate is recorded in their own Taskify™ passport. By the Grand Finale, they'll have a documented record of what they built, won, and learned.

### 2.12 FAQ repairs
- Deadline answer ("deadlines will be published on the official championship website" — *this is that website*) → state the actual deadline.
- Merge the duplicate date questions (Tier 0.9).
- Direct-registration answer (Tier 0.7); refund answer (Tier 0.6).
- "Registered players are issued a **Passport code**…" — a term used nowhere else; align with "Taskify™ passport code" and explain it's sent in the confirmation email.
- Add the missing question every parent and kid asks: "What can my child win?" — the awards list (Championship Trophy, medals, certificates, scholarships, TEAMUP™ Excellence Awards…) exists in about.md and never made it onto the site.

### 2.13 Voice pass (teamup, taskify, championship, FAQ)
Kill the hedges and the grant-proposal register: "may include", "may be assessed", "may contain", "where direct registration has been provided", "in accordance with the championship registration guidelines", "whole child development". Rule: marketing pages address the parent as "you/your child"; the dashboard addresses the user. Rewrite ChampHow stage 5 ("Elite qualifiers are trained for higher competence in the finalists competition. They compete for finalists positions.") → "The top qualifiers get advanced training, then face off for the finalist spots."

---

## Tier 3 — Structural (next sprint)

1. **Single source of truth for facts.** Extend `src/lib/constants.ts` with FEE, DISCOUNT_PCT, DEADLINE, COACHING_START, PRELIMS_WINDOW, FINALE_DATE, AGE_RANGE, BIRTH_YEARS, VENUE, PHONE, EMAIL — interpolate into faq.ts, /register, RegistrationForm, ChampHero, ChampHow, metas, and the emails. Today `faq.ts` hardcodes ₦15,000 while `constants.ts` charges ₦90; this class of bug then becomes impossible.
2. **Merge /about and /why-beee.** Two pages, one message, different words ("every individual possesses extraordinary potential" vs "Every child holds extraordinary potential") — split-brain. Keep one, redirect the other.
3. **Two registration flows** (`routes/register` vs `components/RegistrationForm`) carry divergent copy, dates, and password rules. Kill one or make both read from the constants.
4. **Trust for a year-1 event asking Nigerian parents for ₦15,000:** name the Championship Director (a face, not "the Championship Coordination Team"); name the legal entity in Terms/Privacy (currently just "BEEE" — add the CAC-registered name); venue photo + "National Stadium Abuja" on the homepage; partner-school logos as they sign; after September's prelims: player counts, photos, parent quotes. Also "Payments secured by Paystack" microcopy at every pay button.
5. **Commission clarity.** "You earn 10% of every registration fee" — 10% of ₦15,000 or of the discounted ₦13,500? State naira: "You earn ₦1,350 per registration" (confirm the base). Percentages of an ambiguous base generate support tickets and distrust.

---

## Keep these — they're good

- "This square is empty." (404) — best line on the site.
- "Nothing. All equipment is provided." (FAQ)
- "Chess is not the destination. It is the platform."
- "Chess is where they learn. Life is where they lead." (promote to hero)
- "Custom Puzzles — Train with puzzles auto-generated from real game mistakes."
- The privacy and terms pages' plain language (minus the Flutterwave line).
- Homepage `<title>` and meta description.
