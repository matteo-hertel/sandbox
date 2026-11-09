# Plan — tip-calc

Part of [[index]]. Status: **planned by forge-plan, 2026-11-09, headless; not yet hardened.** Every choice marked *assumed* is the recommended option taken under forge-principles rule 10; each is a two-way door.

**Base branch:** `master`
**Discipline:** each phase runs on `phase/tip-calc-<n>-<name>`; squash-merges back as ONE
commit after its verifiable gate is green; one [[projects/tip-calc/build-log]] entry per phase.

Shape: a static page, `tip-calc/index.html` and `tip-calc/calc.js`, at the repo root ([[projects/tip-calc/decisions/0001-static-page-two-code-files]]). Screen: readout first, pinned answer, chosen by the owner ([[projects/tip-calc/design/adr-calculator-screen]]). Look: [[projects/tip-calc/DESIGN]]. Parts and boundaries: [[projects/tip-calc/architecture]].

Two phases, cut along the risk seam: phase 1 is the whole answer path (rules, page, readout) and retires both material bets in a real browser; phase 2 adds the presets row, the tightest fit on the page, with its own pressure valve from the brief. The brief called the smallest useful version one phase; the presets and the keypad were "small unlocks" that ride with it, so phase 2 is small on purpose.

## Assumptions

- *Assumed:* the rounding note sits under the Total row, not inside the pinned block, so the pinned block stays 96px as [[projects/tip-calc/DESIGN]] says; the board let it grow to about 150px, which moves the fields as you type.
- *Assumed:* a blank tip is not 0%, so the answer waits for all three fields ([[projects/tip-calc/decisions/0002-input-rules]]).
- *Assumed:* "keypad up on the smallest phone" is a 320 × 208 viewport: 568 minus about 100px of browser bars minus the 260px keypad, the figures the variants board used. If a real phone leaves less, the Risk below triggers.
- *Assumed:* getting the page onto the owner's phone for the human-evidence gate is the owner's route (the factory's host, or a copy of the folder). The brief has no hosting, so none is planned; see the release line at the end.
- Out of the plan, parked in [[projects/tip-calc/improvements]]: the exact odd-cent split, a remembered last tip, JS type checking, hosting.

## Risk contracts

### Risk — Rounded-up shares are what the table will pay
**Hypothesis:** with integer cents, the tip rounded to the nearest cent and each share rounded up, every table is covered and overpays by less than one cent per person, and people accept that number.
**Falsification gate:** `calc.test.mjs` sweeps bills 0.00 to 300.00 in 0.01 steps × tips 0, 15, 18, 20, 100 × people 1 to 20 and fails on any case where each × people is below the total, or exceeds it by `people` cents or more, or the tip is more than half a cent from bill × percent. The human-evidence gate asks the owner whether the per-person number matched what they would have paid.
**Fallback:** show the exact split ("2 pay 33.34, 1 pays 33.33"), parked in [[projects/tip-calc/improvements]].
**Trigger:** the sweep fails (fix the rule), or the owner answers "no, it did not match" or asks who covers the extra cent at the human-evidence gate.
**Last cheap decision phase:** Phase 1 — `calc()`'s result shape (`eachCents` as one number) is what the readout, the note and every test consume; after phase 2 it also feeds the preset tests.

### Risk — Pinned readout stays usable with the keypad up on a 320 × 568 phone
**Hypothesis:** the 96px pinned readout and the focused field are both fully visible above the keypad on the smallest phone, and a focused field is never scrolled under the readout.
**Falsification gate:** `page.test.mjs` opens the page at 320 × 208 over `file://`, focuses Bill, Tip and People in turn with 100 / 18 / 3 filled, and fails if the readout box is not inside the viewport, if the focused field's box is not fully inside it, or if the two boxes overlap.
**Fallback:** unpin the readout and order the page as variant 1 (answer last), amending [[projects/tip-calc/DESIGN]] and the screen ADR.
**Trigger:** any of the three focus cases fails the geometry check at 320 × 208, or the owner reports at the human-evidence gate that they close the keypad before reading the number.
**Last cheap decision phase:** Phase 1 — the page skeleton and its pinned block are what phase 2's row is laid into; unpinning after that rewrites the layout twice.

## Phase 1 — Readout answers
**Branch:** `phase/tip-calc-1-readout`
**Goal:** a static page at `tip-calc/index.html` where typing a bill, a tip percent and a head count shows the tip, the total and what each person pays in the pinned readout, rounded as the brief says, with blank and bad input handled in words (never `0.00`, `NaN`, `Infinity` or a negative share), working offline from the file at 320px and with the keypad up.
**Risks retired:** Rounded-up shares are what the table will pay; Pinned readout stays usable with the keypad up on a 320 × 568 phone
**Verifiable gate:** `cd tip-calc && npm ci && npm test` exits 0 with every test passing and none skipped, asserting the cases below.
- `calc.test.mjs` (Node, no browser): `calc({bill:"100.00",tip:"18",people:"3"})` returns `tipCents` 1800, `totalCents` 11800, `eachCents` 3934, `collectedCents` 11802, `invalid` empty; 84.00 at 20% for 4 returns `eachCents` 2520 with `collectedCents` equal to `totalCents`; 1248.60 at 22% for 14 returns `eachCents` 10881, `collectedCents` 152334; `"64,50"` gives the same result as `"64.50"`; 999999.99 at 100% for 1 returns `eachCents` 199999998.
- Blank: all three blank → every cents field `null`, `invalid` empty; bill only → tip, total, each all `null`; bill and tip, no people → tip and total set, each `null`; bill and people, no tip → all `null`.
- Hostile: bill `-5`, `1e308`, `NaN`, `Infinity`, `1.234`, `1,248.60`, `1000000`; tip `101`, `-1`, `1.5`; people `0`, `-1`, `2.5`, `1e308`, `abc` → the field is named in `invalid` and nothing that needs it is a number; no returned value anywhere is `NaN`, `Infinity` or negative.
- The rounding sweep from the first Risk.
- `page.test.mjs` (Chromium 320 × 568 over `file://`, non-`file:` requests blocked): no request fails and none leaves the file system; the empty page shows "Type the bill. Each share shows here." and no `0.00`, `NaN` or `Infinity`; 100 / 18 / 3 shows readout `39.34`, Tip `18.00`, Total `118.00` and the note "Rounded up to the cent." with "3 × 39.34 = 118.02" below the Total row; 52.80 / 15 / 2.5 marks People `aria-invalid="true"`, shows "People: enter a whole number, 1 or more." and no figure in the readout; the Bill field's top edge is the same pixel in the empty, part-filled, rounded and invalid states; 999999.99 / 100 / 1 prints `1999999.98` without the readout overflowing; bill has `inputmode="decimal"`, tip and People `inputmode="numeric"`; the page does not scroll sideways.
- The geometry check from the second Risk at 320 × 208.
**Human evidence gate:** the ticket owner, at the next real check with two or more people, opens the page on their phone, enters the bill, the tip percent and the head count, and reports: the numbers typed, the figure shown, what each person then paid, whether the figure matched ("yes" or "no"), whether the keypad had a decimal point on the bill, whether the paper glared under the restaurant light, and whether they read the figure while the keypad was up. The reply is filed in [[projects/tip-calc/build-log]]; the decision is go (nothing changes), change (the exact split, `type="number"` on the bill, or a dark scheme, each already named as a fallback) or stop. It blocks any later hosting, scale or polish phase; phase 2 does not wait for it.
**Design:** locked via [[projects/tip-calc/design/adr-calculator-screen]]
**Owns:** `tip-calc/index.html` (new), `tip-calc/calc.js` (new), `tip-calc/fonts/ibm-plex-mono-latin-500-normal.woff2` (new), `tip-calc/fonts/ibm-plex-mono-latin-600-normal.woff2` (new), `tip-calc/fonts/ibm-plex-sans-latin-400-normal.woff2` (new), `tip-calc/fonts/LICENSE-IBM-Plex-OFL.txt` (new), `tip-calc/package.json` (new), `tip-calc/package-lock.json` (new), `tip-calc/calc.test.mjs` (new), `tip-calc/page.test.mjs` (new)
**Reads:** `wiki/projects/tip-calc/DESIGN.md` tokens, `wiki/projects/tip-calc/design/fonts/` (the three woff2 and the licence), `playwright-core@1.56.1` (outside), `Chromium via PLAYWRIGHT_BROWSERS_PATH` (outside)
**Writes:** `calc()` result `{tipCents, totalCents, eachCents, collectedCents, invalid}`
**QA:** browser
**Work:**
- Copy the three woff2 files and the OFL licence from `wiki/projects/tip-calc/design/fonts/` into `tip-calc/fonts/`; declare them with `@font-face`, `font-display: swap`, relative URLs, no CDN. [DESIGN.md Typography: "Self-host the three woff2 files … no CDN"; brief: "works offline from a static file".]
- `calc.js`: a classic script declaring one global, `calc({ bill, tip, people })`, taking the three fields as typed and returning `{ tipCents, totalCents, eachCents, collectedCents, invalid }`; each cents value is an integer or `null`, `invalid` lists the field names that hold bad input. No `import`, `export` or `module.exports`; `calc.test.mjs` loads it with `node:vm`. [Brief: "a pure function that a test can call without a browser"; ADR 0001 for the classic script.]
- Money in integer cents: tip = bill × percent / 100 rounded to the nearest cent (half up); each = total / people rounded up; collected = each × people. [Brief, "The hard/interesting part": "round the tip to the nearest cent, round each share up … show the total beside it".]
- The field rules, caps, the comma as decimal point and "blank is unanswered, not zero". [ADR 0002; brief: "blank, negative, zero people, 2.5 people, 1e308 must never print NaN, Infinity or a negative share".]
- `index.html` with the locked screen top to bottom: the pinned readout (label "Each pays", the figure in the hero style, one note line, 96px tall in every state), the Bill row, the Tip % row as a plain free field (phase 2 replaces it), the People row, a dashed rule, the Tip and Total ledger rows, then the rounding note. Tokens only, none of the anti-patterns in DESIGN.md. [Screen ADR; DESIGN.md Layout and Anti-patterns.]
- The pinned readout is `position: sticky` at the top of the scroller, with `scroll-padding-top` equal to its height so a focused field is never scrolled beneath it. [Screen ADR; the second Risk.]
- One `input` listener per field feeds one render: blank rows show a label and a leader and no figure; an invalid field gets `aria-invalid="true"` and its message under it; the readout note says what to fix. Messages and the empty sentence are the DESIGN.md Voice strings. [DESIGN.md Layout and Voice; brief: "no `0.00` shown while a field is still blank".]
- `inputmode="decimal"` on the bill, `inputmode="numeric"` on tip and People. [Brief, "Numeric keypad on tap". The `type="number"` fallback is the brief's pressure valve and is built only if the human-evidence gate asks.]
- `package.json` with one devDependency, `playwright-core` at `1.56.1`, and `"test": "node --test"`; commit `package-lock.json`. [ADR 0003.]
- `calc.test.mjs` and `page.test.mjs` as the gate lists them; no other tests.
**Decisions:** [[projects/tip-calc/decisions/0001-static-page-two-code-files]], [[projects/tip-calc/decisions/0002-input-rules]], [[projects/tip-calc/decisions/0003-real-browser-tests]], [[projects/tip-calc/design/adr-calculator-screen]]

## Phase 2 — Tip presets
**Branch:** `phase/tip-calc-2-presets`
**Goal:** one tap on 15%, 18% or 20% sets the tip and the readout follows; the preset row, with the free field beside it, fits a 320px screen without scrolling sideways.
**Risks retired:** none
**Verifiable gate:** `cd tip-calc && npm test` exits 0 with every test passing and none skipped; the new cases in `page.test.mjs` (Chromium 320 × 568 over `file://`) assert that, with bill 100 and People 3, clicking `18%` leaves the tip field at `18`, sets `aria-pressed="true"` on `18%` only and shows readout `39.34`; clicking `20%` shows `40.00` and un-presses `18%`; typing `22` in the tip field presses nothing and shows `40.67`; the row has four cells, each at least 48px wide, and `document.documentElement.scrollWidth` is 320.
**Design:** locked via [[projects/tip-calc/design/adr-calculator-screen]]
**Owns:** `tip-calc/index.html`, `tip-calc/page.test.mjs`
**Reads:** `calc()` result `{tipCents, totalCents, eachCents, collectedCents, invalid}`
**Writes:** `tip` field value
**QA:** browser
**Work:**
- Replace the Tip % row with one 4-up row: buttons `15%`, `18%`, `20%` and the free percent field as the fourth cell. [Brief: "Tip presets (15 / 18 / 20) beside the free percent field"; screen ADR.]
- A preset click writes its number into the tip field and runs the same render as typing. The field is the single source of truth, so it shows the number too; the board's mock hid it behind "other" when a preset was lit, which would need a second piece of state. [Brief: "a test that a preset sets the percent and the results follow".]
- The preset whose number equals the field's valid value shows `aria-pressed="true"` and the accent fill; any other value presses none. [DESIGN.md Color: accent marks "the preset you chose".]
- Pressure valve: if the four cells cannot each stay at least 48px wide without sideways scroll at 320px, ship the free field alone and record why in the build log. [Brief, "Tip presets": "drop the presets and keep the field".]
- Add the cases above to `page.test.mjs`; no other tests.
**Decisions:** [[projects/tip-calc/design/adr-calculator-screen]]

Release closure: n/a — local, single-user, no release path
