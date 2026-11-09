# Plan — tip-calc

Part of [[index]]. Status: **planned by forge-plan, 2026-11-09, headless; hardened by forge-harden --auto, 2026-11-09; lock pending (see Review).** Every choice marked *assumed* is the recommended option taken under forge-principles rule 10; each is a two-way door.

**Base branch:** `master`
**Discipline:** each phase runs on `phase/tip-calc-<n>-<name>`; squash-merges back as ONE
commit after its verifiable gate is green; one [[projects/tip-calc/build-log]] entry per phase.

Shape: a static page, `tip-calc/index.html` and `tip-calc/calc.js`, at the repo root ([[projects/tip-calc/decisions/0001-static-page-two-code-files]]). Screen: readout first, pinned answer, chosen by the owner ([[projects/tip-calc/design/adr-calculator-screen]]). Look: [[projects/tip-calc/DESIGN]]. Parts and boundaries: [[projects/tip-calc/architecture]].

Two phases, cut along the risk seam: phase 1 is the whole answer path (rules, page, readout) and retires both material bets in a real browser; phase 2 adds the presets row, the tightest fit on the page, with its own pressure valve from the brief. The brief called the smallest useful version one phase; the presets and the keypad were "small unlocks" that ride with it, so phase 2 is small on purpose.

## Assumptions

- *Assumed:* the rounding note sits under the Total row, not inside the pinned block, so the pinned block stays 96px as [[projects/tip-calc/DESIGN]] says; the board let it grow to about 150px, which moves the fields as you type.
- *Assumed:* a blank tip is not 0%, so the answer waits for all three fields ([[projects/tip-calc/decisions/0002-input-rules]]).
- *Assumed:* "keypad up on the smallest phone" is a 320 × 208 viewport: 568 minus about 100px of browser bars minus the 260px keypad, the figures the variants board used. If a real phone leaves less, the Risk below triggers. A 320 × 568 phone is the iPhone SE (1st generation) class, where Safari never shrinks the layout viewport for the keypad; the second Risk says what the automated gate can and cannot prove there.
- *Assumed:* getting the page onto the owner's phone for the human-evidence gate is the owner's route (the factory's host, or a copy of the folder). The brief has no hosting, so none is planned; see the release line at the end.
- Out of the plan, parked in [[projects/tip-calc/improvements]]: the exact odd-cent split, a remembered last tip, JS type checking, hosting.

## Risk contracts

### Risk — Rounded-up shares are what the table will pay
**Hypothesis:** with integer cents, the tip rounded to the nearest cent and each share rounded up, every table is covered and overpays by less than one cent per person, and people accept that number.
**Falsification gate:** `calc.test.mjs` sweeps bills 0.00 to 300.00 in 0.01 steps (each bill string built from its integer cent count, not from a float) × tips 0, 15, 18, 20, 100 × people 1 to 20, and fails on any case where `totalCents` is not the loop's bill cents plus `tipCents` (a float parse such as `Math.floor(parseFloat("4.35") * 100)` gives 434), 100 × `tipCents` − bill cents × percent falls outside (−50, 50] (nearest cent, an exact half rounds up: 65.10 at 15% is 977, never 976), each × people is below the total or exceeds it by `people` cents or more, or `collectedCents` is not each × people. All of it is integer arithmetic in the test, so the oracle cannot share a float error with `calc`. The human-evidence gate asks the owner whether the per-person number matched what they would have paid.
**Fallback:** show the exact split ("2 pay 33.34, 1 pays 33.33"), parked in [[projects/tip-calc/improvements]].
**Trigger:** the sweep fails (fix the rule), or the owner answers "no, it did not match" or asks who covers the extra cent at the human-evidence gate.
**Last cheap decision phase:** Phase 1 — `calc()`'s result shape (`eachCents` as one number) is what the readout, the note and every test consume; after phase 2 it also feeds the preset tests.

### Risk — Pinned readout stays usable with the keypad up on a 320 × 568 phone
**Hypothesis:** the 96px pinned readout and the focused field are both fully visible above the keypad on the smallest phone, and a focused field is never scrolled under the readout.
**Falsification gate:** `page.test.mjs` opens the page at 320 × 208 over `file://`, focuses Bill, Tip and People in turn with 100 / 18 / 3 filled, and fails if the readout box is not inside the viewport, if the focused field's box is not fully inside it, or if the two boxes overlap. What it proves: a layout viewport that shrinks with the keypad, which is what Chrome for Android does when the viewport meta says `interactive-widget=resizes-content` (from Chrome 108 the default resizes only the visual viewport). iOS Safari ignores that key and pins `position: sticky` to a layout viewport it never shrinks, and no WebKit is installed here, so on an iPhone only the human-evidence gate can falsify this Risk.
**Fallback:** unpin the readout and order the page as variant 1 (answer last), amending [[projects/tip-calc/DESIGN]] and the screen ADR.
**Trigger:** any of the three focus cases fails the geometry check at 320 × 208, or the owner reports at the human-evidence gate that the readout was hidden with the keypad up or that they closed the keypad before reading the number.
**Last cheap decision phase:** Phase 1 — the page skeleton and its pinned block are what phase 2's row is laid into; unpinning after that rewrites the layout twice.

## Design — the one screen

Ground: [[projects/tip-calc/DESIGN]] (tokens and Voice), [[projects/tip-calc/design/adr-calculator-screen]] (the owner's shape) and variant 2 on the board. Both phases build to this section and their gates assert it. Where the board's or the specimen's mock text differs, the Words table wins. The Words and the 390px cap are this pass's defaults, two-way doors.

**Hierarchy at 320 × 568.** If the screen could show only three things: the each-pays figure, the field under your thumb, and the one note that says what to type or fix next.

```
 EACH PAYS                          pinned, min-height 96, opaque --color-surface
                        39.34       1 · --text-hero, Plex Mono 600, --color-accent, right edge
 - - - - - - - - - - - - - - - -    pinned edge, as on the board
 BILL ··········   [   100.00 ]     2 · the focused field: --text-data, 2px accent ring
 TIP % ·········   [       18 ]     phase 2: "TIP %" over [15%] [18%] [20%] [ 18 ]
 PEOPLE ········   [        3 ]
 - - - - - - - - - - - - - - - -    the dashed rule
 TIP ······················ 18.00   3 · the working: --text-data, ink
 TOTAL ····················118.00
         Rounded up to the cent.    only when the shares overpay: --text-body, muted
              3 × 39.34 = 118.02    --text-data, muted, right edge = Total's
```

With no figure (empty, part-filled, invalid) the readout holds the label and a note of at most two lines in the 256px column, and is still 96px tall. Most notes wrap at 320 ("Type the bill. Each share shows here." is 266px of Plex Sans at 16px, "Type the head count. …" 324px, measured from the repo's woff2 without kerning), so the block must hold 18 + 48px of text: the board's 24 / 12 padding makes it 102px, 12 / 12 keeps it at 90.

**States.**

| Surface | Loading | Empty | Error | Success | Partial |
|---|---|---|---|---|---|
| Readout (pinned) | n/a: nothing is fetched; the first render runs as the page parses | "Each pays", no figure, the Words note | no figure; the Words note for the first bad field | the figure in accent, no note; it changes at once, never animates | no figure; the Words note for the first blank field |
| Bill, Tip %, People | n/a: fonts swap in from local files and every row has a fixed height, so nothing moves | label, leader, empty bordered field; no placeholder, no `0.00` | `--color-danger` border, `aria-invalid="true"`, its message under it named by `aria-describedby` | value right-aligned in Plex Mono 500; the focused field has the 2px accent ring | n/a, argued: a field is blank, valid or invalid; `64.` and `.5` are valid, so typing `64.50` never flashes an error |
| Tip, Total, rounding note | n/a: as above | labels and leaders, no figures | a row that needs the bad field shows no figure; the others keep theirs | figures; the two-line note only when `collectedCents` is not `totalCents` | Tip and Total show once bill and tip are valid; each pays waits for People |
| Tip row (phase 2) | n/a: as above | three outlined presets, none pressed; the free cell empty | the Tip message under the row, nothing pressed; a preset tap replaces the value and clears it | the preset equal to the field's value: accent fill, surface text, `aria-pressed="true"` | a typed value no preset matches (`22`): nothing pressed, the field shows it |

**Words** (the strings live in DESIGN.md Voice; this table is the page test's fixture). The note names the first field, top to bottom, that is blank or invalid.

| Bill / Tip / People | Readout note | Message under a field |
|---|---|---|
| blank / blank / blank | Type the bill. Each share shows here. | none |
| `64.50` / blank / blank | Type the tip. Each share shows here. | none |
| `64.50` / `18` / blank | Type the head count. Each share shows here. | none (Tip `11.61`, Total `76.11`) |
| blank / `18` / `0` | Type the bill. Each share shows here. | People: enter a whole number, 1 to 999. |
| `1.234` / `18` / `3` | Fix the bill to see each share. | Bill: enter an amount like 64.50, up to 999999.99. |
| `64.50` / `101` / `3` | Fix the tip to see each share. | Tip: enter a whole percent, 0 to 100. |
| `52.80` / `15` / `2.5` | Fix the head count to see each share. | People: enter a whole number, 1 to 999. |
| `1.234` / `101` / `0` | Fix the bill to see each share. | all three, each under its field |

**Journey.**

| Step | User does | User feels | Plan specifies |
|---|---|---|---|
| 1 · first run | opens the page at the table | nothing to learn | the empty sentence in the readout, no `0.00`, Bill the first field |
| 2 | taps Bill | the right keypad | `inputmode="decimal"`; 20px text, so iOS does not zoom; `autocomplete="off"`, so no past bills are offered |
| 3 | types `64.50` digit by digit | it keeps up, nothing nags | the note asks for the next blank field; no message at `64.`; the gate types key by key |
| 4 | sets the tip and the head count | the answer lands where they look | the figure appears in the pinned readout above the keypad; nothing below it moves |
| 5 | changes 18 to 20 (phase 2: one tap) | instant | the figure changes at once, no animation; the pressed preset follows the field |
| 6 | reads `39.34` for 118.00 across 3 | the overage is honest | "Rounded up to the cent." and `3 × 39.34 = 118.02` under Total, `118.02` point under point beneath `118.00` |
| 7 · recovery | types `2.5` people | told what to fix, not scolded | red border and words; the readout says "Fix the head count…"; Tip and Total stay; fixing it clears both |
| 8 · return | comes back by Back or a reload | no stale answer | a render on every `pageshow` reads the fields as they are |
| 9 | everyone pays, closes the tab | done, nothing kept | no storage; the gate reads all three stores empty |

**Viewports.**
- 320 × 568, keypad down: one column, the slip 288 wide, label column 88; the page may scroll a little in the rounded state and the readout stays pinned.
- 320 × 208, keypad up (Chrome for Android): the second Risk: the readout and the focused field both whole and apart; a row scrolled beneath never shows through the readout.
- 390 × 844: the same column; the hero reaches its 48px cap; phase 2's cells are about 75px.
- Wider than 390 (tablet, laptop): the column stops at 390 (the slip at 358), left-aligned as DESIGN.md Layout says, and the paper fills the rest, so no ledger row stretches across a laptop screen. forge-polish's desktop pass checks it at review; the brief names no screen past a phone, so the gate does not.
- Landscape phone, keypad up (about 568 × 110): not designed for, since the brief's use is one hand in portrait; the readout stays pinned and the focused field may sit under it.
- iPhone, keypad up: only the human-evidence gate (the second Risk).

**Open decisions.**

The ambushes this section closed (the readout words, each message's whole rule, Back and reload, the largest values, the 390 cap) are Work bullets now, each but the cap with a gate case; what is still open, defaulted or left to forge-polish:

| Decision left open | If deferred, what ships | Now |
|---|---|---|
| Larger-text settings | a fixed 96px readout clips | fixed: `min-height`; forge-polish checks it, headless Chromium has no text-scale setting |
| Typing into the tip field after a preset | native typing: `18`, then `22` typed, reads `1822` and shows the Tip message | default: native typing, no select-on-focus (auto-decided in Review) |
| A placeholder in the free tip cell | none: an empty bordered cell under "Tip %" | default; the board's "other" went with its hidden-number mock |
| Bill focused on open | no `autofocus`: the first tap opens the keypad and a screen reader starts at the readout | default |

## Phase 1 — Readout answers
**Branch:** `phase/tip-calc-1-readout`
**Goal:** a static page at `tip-calc/index.html` where typing a bill, a tip percent and a head count shows the tip, the total and what each person pays in the pinned readout, rounded as the brief says, with blank and bad input handled in words (never `0.00`, `NaN`, `Infinity` or a negative share), working offline from the file at 320px and with the keypad up.
**Risks retired:** Rounded-up shares are what the table will pay; Pinned readout stays usable with the keypad up on a 320 × 568 phone
**Verifiable gate:** `cd tip-calc && npm ci && npm test` exits 0 and the run's summary reports `fail 0`, `cancelled 0`, `skipped 0` and `todo 0` (`node --test` exits 0 when a test is skipped, so the exit code alone does not prove "none skipped"), asserting the cases below.
- `calc.test.mjs` (Node, no browser): `calc({bill:"100.00",tip:"18",people:"3"})` returns `tipCents` 1800, `totalCents` 11800, `eachCents` 3934, `collectedCents` 11802, `invalid` empty; 84.00 at 20% for 4 returns `eachCents` 2520 with `collectedCents` equal to `totalCents`; 1248.60 at 22% for 14 returns `eachCents` 10881, `collectedCents` 152334; `"64,50"` gives the same result as `"64.50"`; `"64."` and `".5"` at 0% for 1 return `totalCents` 6400 and 50 (ADR 0002 keeps both valid so typing `64.50` never flashes an error); 999999.99 at 100% for 1 returns `eachCents` 199999998.
- Blank: all three blank → every cents field `null`, `invalid` empty; bill only → tip, total, each all `null`; bill and tip, no people → tip and total set, each `null`; bill and people, no tip → all `null`; tip and people, no bill → all `null` (a blank bill read as zero would print `0.00`); a field of spaces only is blank, not zero (`Number("  ")` is 0).
- Hostile: bill `-5`, `1e308`, `NaN`, `Infinity`, `1.234`, `1,248.60`, `1000000`, `.`, `0x10`; tip `101`, `-1`, `1.5`, `1e2`; people `0`, `-1`, `2.5`, `1000`, `1e308`, `0x10`, `abc` → the field is named in `invalid` and nothing that needs it is a number; no returned value anywhere is `NaN`, `Infinity` or negative.
- The rounding sweep from the first Risk.
- `page.test.mjs` (Chromium headless shell, a 320 × 568 context with `isMobile: true` and `hasTouch: true` so the viewport meta is honoured as on a phone, over `file://`, non-`file:` requests and every WebSocket blocked): no request fails, none leaves the file system and no WebSocket opens; no `pageerror` and no console error during the run; the empty page shows no `0.00`, `NaN` or `Infinity` (its words are the Words table's first row); 100 / 18 / 3 shows readout `39.34`, Tip `18.00`, Total `118.00` and the note "Rounded up to the cent." with "3 × 39.34 = 118.02" below the Total row, and after `document.fonts.ready` the three faces report `loaded`; pressing Enter in People keeps `39.34` (nothing reloads). Then, on the same load: 52.80 / 15 / 2.5 marks People `aria-invalid="true"`, shows no figure in the readout, Tip `7.92`, Total `60.72` and no rounding note; People `2` removes `aria-invalid` and the message and shows `30.36` with no rounding note; clearing the Bill leaves no figure in the readout, Tip or Total and no `0.00`. The Bill field's top edge is the same pixel in the empty, part-filled, rounded and invalid states; 999999.99 / 100 / 1 prints `1999999.98` with the figure's `scrollWidth` no wider than its `clientWidth` and its box inside the readout, and the same holds for the Bill field holding `999999.99` (an `<input>`'s `scrollWidth` passes its `clientWidth` exactly when its text overflows the content box, checked in Chromium 141); bill has `inputmode="decimal"`, tip and People `inputmode="numeric"`; the viewport meta is exactly `width=device-width, initial-scale=1, interactive-widget=resizes-content`, so nothing turns off pinch zoom; `document.documentElement.scrollWidth` is 320 (a page without `width=device-width` lays out at 980 in this context). Every box is measured after `document.fonts.ready`. At the end of the run `localStorage.length`, `sessionStorage.length` and `(await indexedDB.databases()).length` are all 0 (all three are writable from a `file:` page in this Chromium; cookies are not).
- The geometry check from the second Risk at 320 × 208, in the same mobile context.
- `page.test.mjs`, the Words table: each row, typed into the page, shows exactly its readout note and messages and no figure, and in every row the readout box is 96px tall with the note's box inside it. With tip 18 and People 3, typing `64.50` into Bill key by key shows `2.36`, `25.18`, `25.18`, `25.37`, `25.37` after the five keys and never a Bill message or `aria-invalid`. After 100 / 18 / 3, setting all three values to empty with no `input` event and dispatching `pageshow` leaves the empty sentence and no figure.
- `page.test.mjs`, access and fit: `document.documentElement.lang` is `en` and the title is `Tip calculator`; `getByRole('textbox', { name })` finds Bill, Tip % and People, and a click on each label focuses its field; each field has `autocomplete="off"` and a box at least 48px tall; Tab from Bill goes to Tip, then People; a focused field's computed outline is 2px solid `rgb(20, 70, 143)`; People at `2.5` has `aria-describedby` naming the element that holds its message; `getByRole('status')` has `aria-atomic="true"` and reads "Each pays" and `39.34` at 100 / 18 / 3; with `reducedMotion: 'reduce'` every field's `transition-duration` is `0s`; the readout's computed background is `rgb(250, 247, 238)`, and at 320 × 208 with People focused the element at the figure's centre is inside the readout; at 100 / 18 / 3 the right edges of `118.02` and Total's `118.00` are within 1px.
**Human evidence gate:** the ticket owner, at the next real check with two or more people, opens the page on their phone, enters the bill, the tip percent and the head count, and reports: the phone model and browser, the numbers typed, the figure shown, what each person then paid, whether the figure matched ("yes" or "no"), whether the keypad had a decimal point on the bill, whether the paper glared under the restaurant light, and whether they read the figure while the keypad was up. The reply is filed in [[projects/tip-calc/build-log]]; the decision is go (nothing changes), change (the exact split, `type="number"` on the bill, or a dark scheme, each already named as a fallback) or stop. It blocks any later hosting, scale or polish phase; phase 2 does not wait for it.
**Design:** locked via [[projects/tip-calc/design/adr-calculator-screen]]
**Owns:** `tip-calc/index.html` (new), `tip-calc/calc.js` (new), `tip-calc/fonts/ibm-plex-mono-latin-500-normal.woff2` (new), `tip-calc/fonts/ibm-plex-mono-latin-600-normal.woff2` (new), `tip-calc/fonts/ibm-plex-sans-latin-400-normal.woff2` (new), `tip-calc/fonts/LICENSE-IBM-Plex-OFL.txt` (new), `tip-calc/package.json` (new), `tip-calc/package-lock.json` (new), `tip-calc/calc.test.mjs` (new), `tip-calc/page.test.mjs` (new)
**Reads:** `wiki/projects/tip-calc/DESIGN.md` (outside, written by forge-design-system) tokens, `wiki/projects/tip-calc/design/fonts/` (outside, written by forge-design-system: the three woff2 and the licence), `playwright-core@1.56.1` (outside), `chromium_headless_shell-1194 via PLAYWRIGHT_BROWSERS_PATH=/opt/ms-playwright` (outside)
**Writes:** `calc()` result `{tipCents, totalCents, eachCents, collectedCents, invalid}`
**QA:** browser
**Work:**
- Copy the three woff2 files and the OFL licence from `wiki/projects/tip-calc/design/fonts/` into `tip-calc/fonts/`; declare them with `@font-face`, `font-display: swap`, relative URLs, no CDN. [DESIGN.md Typography: "Self-host the three woff2 files … no CDN"; brief: "works offline from a static file".]
- `calc.js`: a classic script declaring one global, `calc({ bill, tip, people })`, taking the three fields as typed and returning `{ tipCents, totalCents, eachCents, collectedCents, invalid }`; each cents value is an integer or `null`, `invalid` lists the field names that hold bad input. No `import`, `export` or `module.exports`. `calc` is a top-level `function` declaration and `calc.test.mjs` loads the file with `vm.runInThisContext`: a separate `vm` context hands back objects from another realm, which `assert.deepStrictEqual` rejects, and a top-level `const` never reaches the context object (both checked on Node 22.23.4). [Brief: "a pure function that a test can call without a browser"; ADR 0001 for the classic script.]
- Money in integer cents: tip = bill × percent / 100 rounded to the nearest cent (half up); each = total / people rounded up; collected = each × people. [Brief, "The hard/interesting part": "round the tip to the nearest cent, round each share up … show the total beside it".]
- The field rules, caps, the comma as decimal point and "blank is unanswered, not zero". [ADR 0002; brief: "blank, negative, zero people, 2.5 people, 1e308 must never print NaN, Infinity or a negative share".]
- `index.html` with the locked screen top to bottom: the pinned readout (label "Each pays", then the figure in the hero style or a note of at most two lines, 96px tall in every state), the Bill row, the Tip % row as a plain free field (phase 2 replaces it), the People row, a dashed rule, the Tip and Total ledger rows, then the rounding note. The viewport meta is `width=device-width, initial-scale=1, interactive-widget=resizes-content`. No `<form>`, so the keypad's Enter or Go key cannot submit and reload the file, which would wipe the fields. Nothing is written to `localStorage`, `sessionStorage` or IndexedDB: the variants board and the specimen persist their feedback to `localStorage`, and none of that code comes across. Tokens only, none of the anti-patterns in DESIGN.md. [Screen ADR; DESIGN.md Layout and Anti-patterns; the second Risk for `interactive-widget`; brief Constraints, fixed: "no storage".]
- The pinned readout is `position: sticky` at the top of the scroller, with `scroll-padding-top` equal to its height so a focused field is never scrolled beneath it. Its figure column declares `container-type: inline-size`, so `--text-hero`'s `16cqw` resolves against the 256px column (40.96px); with no container `cqw` falls back to the viewport, the hero stays at 48px and ten Plex Mono digits (288px) overflow (checked in Chromium 141). Its background is an opaque `--color-surface`, so a row scrolled beneath never shows through, and its 96px is a `min-height`, so larger text pushes the rows down instead of clipping. [Screen ADR; DESIGN.md Typography; the second Risk.]
- One `input` listener per field feeds one render, and every render rewrites every output from the one result, so clearing or breaking a field never leaves an old figure on screen: blank rows show a label and a leader and no figure; an invalid field gets `aria-invalid="true"` and its message under it; the readout note and the messages are the Words table's (the strings are held in DESIGN.md Voice). The first render runs as the page parses and again on every `pageshow`, reading the fields as they are, so a page brought back by Back or a reload never shows a figure its fields do not hold. [DESIGN.md Layout and Voice; brief: "no `0.00` shown while a field is still blank".]
- Access: `<html lang="en">` and `<title>Tip calculator</title>`. Each field's visible label is its `<label for>`, so a tap on the label also focuses the field; each field has `autocomplete="off"`, as in the specimen, so the browser neither offers nor keeps past bills. An invalid field's `aria-describedby` names its message. The readout (label, figure, note) is one live region, `role="status"` with `aria-atomic="true"`, present from load with no live region inside it, so a screen reader hears "Each pays 39.34" without leaving the field. The focus ring is a 2px `--color-accent` outline; `prefers-reduced-motion: reduce` sets every duration to 0ms. [DESIGN.md Color, Motion and Typography; Design, above.]
- Fit: the column is 320 to 390px wide and left-aligned, and a wider screen shows it on paper (Design, Viewports). Bill shows `999999.99` whole at 320: every Plex Mono glyph is 600 of 1000 units wide (read from the repo's woff2), so that is 108px at 20px, and the board's 128px field with `--space-3` sides leaves 102. The rounding note's second line is `--text-data` in `--color-muted`, right-aligned to the number edge, so `118.02` sits point under point beneath Total's `118.00`. [DESIGN.md Layout: "the decimal points line up from the fields down to the answer"; brief: "show the total beside it so the overage is visible".]
- `inputmode="decimal"` on the bill, `inputmode="numeric"` on tip and People. [Brief, "Numeric keypad on tap". The `type="number"` fallback is the brief's pressure valve and is built only if the human-evidence gate asks.]
- `package.json` with one devDependency, `playwright-core` at `1.56.1`, and `"test": "node --test calc.test.mjs page.test.mjs"`; commit `package-lock.json`. Naming the files makes a missing one fail the run (`Could not find …`, exit 1); a bare `node --test` passes without it. [ADR 0003.]
- `calc.test.mjs` and `page.test.mjs` as the gate lists them; no other tests, and no `skip` or `todo`. `page.test.mjs` launches Chromium with the defaults (headless, no `channel`) in a `before` hook and closes it in `after`: a missing browser then fails the suite instead of skipping it, and a failing test never leaves Chromium holding the run open. Only the headless shell is installed, so `headless: false` or `channel: 'chromium'` fails. Its route sees `file:` requests too: it continues them, and aborts and counts every other. A route never sees a WebSocket (a `wss:` socket from a `file:` page connected out while the route aborted everything else), so a `context.routeWebSocket` handler closes and counts every socket as well. [ADR 0003, Checked facts; brief Constraints, fixed: "no network calls".]
**Decisions:** [[projects/tip-calc/decisions/0001-static-page-two-code-files]], [[projects/tip-calc/decisions/0002-input-rules]], [[projects/tip-calc/decisions/0003-real-browser-tests]], [[projects/tip-calc/design/adr-calculator-screen]]

## Phase 2 — Tip presets
**Branch:** `phase/tip-calc-2-presets`
**Goal:** one tap on 15%, 18% or 20% sets the tip and the readout follows; the preset row, with the free field beside it, fits a 320px screen without scrolling sideways.
**Risks retired:** none
**Verifiable gate:** `cd tip-calc && npm ci && npm test` exits 0 and the run's summary reports `fail 0`, `cancelled 0`, `skipped 0` and `todo 0`, with every phase 1 case still in it; the new cases in `page.test.mjs` (phase 1's 320 × 568 mobile context over `file://`) assert that, with bill 100, People 3 and the tip field blank (so a click that does nothing shows no figure), clicking `18%` sets the tip field to `18`, sets `aria-pressed="true"` on `18%` only and shows readout `39.34`; clicking `20%` shows `40.00` and un-presses `18%`; clearing the tip field and typing `22` key by key presses nothing and shows `40.67`; typing `101` instead shows the Words table's Tip message with nothing pressed, and clicking `15%` then removes the message and `aria-invalid` and shows `38.34`; the pressed preset's computed background is `rgb(20, 70, 143)` and the others' `rgb(250, 247, 238)`; `getByRole('group', { name: 'Tip %' })` holds the three buttons and the field. On a fresh load with bill 100 and People 3, Tab from Bill reaches `15%`, `18%`, `20%`, the tip field and People in that order (this replaces phase 1's Tab case), a focused preset shows the 2px accent outline, and Space on `18%` shows `39.34`. The row has four cells, each at least 48px wide and 48px tall; with `100` in the free cell its `scrollWidth` is no wider than its `clientWidth` (phase 1's Bill check); `document.documentElement.scrollWidth` is 320.
**Design:** locked via [[projects/tip-calc/design/adr-calculator-screen]]
**Owns:** `tip-calc/index.html`, `tip-calc/page.test.mjs`
**Reads:** `calc()` result `{tipCents, totalCents, eachCents, collectedCents, invalid}`
**Writes:** `tip` field value
**QA:** browser
**Work:**
- Replace the Tip % row with the "Tip %" label over one 4-up row: buttons `15%`, `18%`, `20%` and the free percent field as the fourth cell, about 58px each at 320. The cells' side padding is `--space-2`, so `100` (36px of Plex Mono) fits the field's 58px; the board's `--space-3` leaves 32. The row is a `role="group"` named by the "Tip %" label, which is also the field's `<label>`; the presets are `<button type="button">` placed before the field, so Tab runs Bill, `15%`, `18%`, `20%`, the field, People. [Brief: "Tip presets (15 / 18 / 20) beside the free percent field"; screen ADR; DESIGN.md Spacing.]
- A preset click writes its number into the tip field and runs the same render as typing. The field is the single source of truth, so it shows the number too; the board's mock hid it behind "other" when a preset was lit, which would need a second piece of state. [Brief: "a test that a preset sets the percent and the results follow".]
- The preset whose number equals the field's valid value shows `aria-pressed="true"` and the accent fill; any other value presses none. The fill is styled from `[aria-pressed="true"]`, so what is seen and what a screen reader hears cannot disagree; a focused preset has the fields' 2px accent ring. [DESIGN.md Color: accent marks "the preset you chose".]
- Pressure valve: if the four cells cannot each stay at least 48px wide without sideways scroll at 320px, ship the free field alone and record why in the build log. [Brief, "Tip presets": "drop the presets and keep the field".]
- Add the cases above to `page.test.mjs`; no other tests.
**Decisions:** [[projects/tip-calc/design/adr-calculator-screen]]

Release closure: n/a — local, single-user, no release path. Numeric non-functional proof: n/a — no load (one user, constant work per keystroke), no stored state to crash, back up or migrate ([[projects/tip-calc/architecture]] Scale assumptions).

## Review

**Lock status:** pending
**Mode:** --auto (headless, factory harden station, LOCAL-6)
**Personas run:** eng (LOCK), security (DAILY), design (POLISH), then the economy sweep. Skipped: dx (a consumer page, not a library, API, CLI or SDK); scope (not requested; `--auto` skips it)
**Adversarial reviewer:** none, so the pass was skipped. Codex was picked by auto-probe (no `wiki/.forge/config.yaml`, `FORGE_REVIEWER` unset) and exited 1 with `401 Unauthorized`; `codex login status` says "Not logged in", and it wrote no output. Gemini is not installed. Claude is the driver's own family, which the selection rule excludes.
**Trend:** first harden of this plan; no earlier block to compare.
**plan-check:** `FAIL … 2 findings` before, `ok: 2 phases, 12 owned paths, 6 reads, 3 writes, 0 findings` after.

### Findings fixed
- eng (21: H 5 / M 9 / L 7). Self-scored, ungraded: edges 6→9, idempotency 8→9, integrity 8→9, errors 6→9, tests 5→9, perf 9→9, gates 5→8, economy 9→9.
  - Reads marked `(outside)`.
  - The rounding sweep is an integer oracle that pins half-up and catches a float bill parse.
  - The gate requires `fail 0 / cancelled 0 / skipped 0 / todo 0`, and the test script names both files.
  - Chromium launches in a `before` hook.
  - The page test runs in an `isMobile` context with `scrollWidth` 320.
  - The keypad Risk now needs `interactive-widget=resizes-content` and says it proves Chrome for Android only; iPhone is left to the human gate, which now records phone and browser.
  - A stale-output sequence on one load, `pageerror` and console counts, fonts reporting `loaded`, extra hostile inputs, and no `<form>`.
  - `vm.runInThisContext` with a function declaration.
  - `container-type` so `16cqw` resolves.
  - Phase 2's gate gets `npm ci` and a blank tip so a no-op click fails.
  - ADR 0003 gets checked facts: only `chromium_headless_shell-1194` is installed, and `playwright` has no install script.
- security (3: M 1 / L 2). Self-scored, ungraded: no-network 7→9, storage 5→9, supply chain 8→9; DOM output and release closure already sound.
  - A `wss:` WebSocket got past `context.route`, so `routeWebSocket` now closes and counts sockets and the gate asserts none opens.
  - The gate reads `localStorage`, `sessionStorage` and IndexedDB as empty at the end of the run.
  - ADR 0003 records the registry signature, provenance, integrity and the advisory state.
  - Secrets, CI, auth and LLM checks are n/a, with the reasons given.
- design (14: H 2 / M 6 / L 6). Self-scored, ungraded: hierarchy 7→9, states 5→9, journey 6→8, specificity 7→9, system 7→9, responsive+a11y 4→8.
  - New "Design — the one screen" section: sketch, state table, a Words table that is the page test's fixture, journey and viewports.
  - The readout names the first blank or invalid field.
  - Each message states its whole rule (People "1 to 999").
  - Notes are at most two lines in a 96px `min-height`, opaque readout.
  - Typing is tested key by key.
  - Re-render on `pageshow`, plus `autocomplete="off"`.
  - Access: `label for`, `aria-describedby`, `role="status"` with `aria-atomic`, a 2px accent ring, reduced motion, `lang` and `title`, Tab order, 48px boxes and an exact viewport meta.
  - Fit of `999999.99` in Bill and `100` in the tip cell.
  - The preset row is a group of `type="button"` with the fill keyed to `[aria-pressed]`.
  - DESIGN.md and the design-system ADR now say four cells of about 58px, matching the owner's screen ADR.

### Economy sweep — cuts
Economy 7→9. Plan words: 2,064 before, 5,302 after design, 5,063 after the sweep.
- Canvas text measurement of `999999.99` and `100` (added by design): folded into eng's `scrollWidth ≤ clientWidth` check, which gives the same verdict (probed in Chromium 141).
- The 1280 × 800 desktop gate case and its separate non-mobile context (design): the brief names no screen past a phone, and forge-polish checks desktop. The 390px cap stays in DESIGN.md.
- The empty-page sentence asserted twice (original case plus design's Words row): now a pointer.
- The People message re-checked in the stale-output sequence (eng, duplicating a Words row).
- The Tip message string restated in phase 2's gate (design).
- The "first field" rule restated in a Work bullet (design).
- Four message strings restated in the States table (design).
- Six closed "Open decisions" rows (design): each is already a Work bullet or a gate case.
- The "calc.js did not load." state, with its Words row, its special context exempt from the request and `pageerror` counts, and its DESIGN.md Voice string (design). Auto-decided below.

### Auto-decisions (--auto mode only)
- iPhone with the keypad up: no `visualViewport` follow in phase 1. The human-evidence gate, which records phone and browser, decides, and its trigger already names the fallback (variant 1, answer last). Principle 2: no gate here can run WebKit, so the added code would be unfalsifiable. Principle 4: no part without a test.
- Typing into the tip field after a preset: native typing, no select-on-focus handler. Principle 4: no new handler. Principle 2: the phone selection behaviour is unreachable by any test here. Reopen if forge-polish or the owner keeps typing onto a preset's number.
- The "calc.js did not load." state: cut. Principle 4: the brief never names it, both routes to the phone carry `calc.js`, and a missing `calc.js` already turns the gate red through the `pageerror` count. Reopen if the owner's route turns out to be sharing `index.html` alone.

### Open taste decisions
- None. The three above were auto-decided. No persona-vs-persona collision was left standing:
  - eng's "viewport meta includes" became design's "is exactly", a refinement in the same direction.
  - The canvas and `scrollWidth` overlap was cut.
  - The 3-versus-4 preset columns were reconciled to the owner's ADR.
  - The People message change propagated to plan, DESIGN.md and ADR 0002 (grep-verified).
- Nothing reached the always-surface allowlist:
  - no framework, language, persistence, auth or external-service change;
  - no new runtime dependency (`playwright-core` was already a pinned devDependency in ADR 0003);
  - the `calc()` result shape is unchanged.

### User Challenges (never auto-decided)
- None. Every pass kept the owner's screen, "Readout first, pinned answer", and no pass edited its ADR.

### Reviewer delta grades & disagreements
- Ungraded: the reviewer pass was skipped (see above). Every delta in this block is self-scored and stands as a claim, not a verified grade. Re-run the reviewer after `codex login` (or with `FORGE_REVIEWER` set) before or at the lock gate if a cross-model grade is wanted. The artifact it needs is the diff of this commit against `309d91f`, plus the deltas above.
