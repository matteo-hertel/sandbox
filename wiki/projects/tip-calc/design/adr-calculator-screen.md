# ADR — the calculator screen for tip-calc: readout first, pinned answer

Part of [[index]]. Status: **accepted, 2026-11-09, project tip-calc. Chosen by the owner** (answer to the variants question on LOCAL-6: "Design chosen: Readout first, pinned answer"). Board: `design/explore-calculator.html`, variant 2. Lives here because the line restricts writes to `wiki/projects/tip-calc/`.

## Context

[[projects/tip-calc/DESIGN]] fixes the look (ledger slip) and not the shape of the one screen. `design/explore-calculator.html` drew four shapes on a 320 × 568 and a 390 × 844 phone, in seven states. The brief wants the result to change "under your thumb as you type", one-handed, with a numeric keypad that covers the lower half of a small phone.

## Decision

**Variant 2, readout first.** From top to bottom inside the slip: the each-pays readout, pinned; the Bill row; the Tip % row; the People row; a dashed rule; the Tip and Total ledger rows. Native inputs. Phase 2 turns the Tip % row into one 4-up row: the 15 / 18 / 20 presets and the free percent field.

One refinement, made at plan time: [[projects/tip-calc/DESIGN]] says the result area is always 96px tall so arriving digits never move the inputs. The board let the pinned block grow to about 150px when the "Rounded up to the cent." note appeared. The pinned block stays 96px, and the rounding note sits under the Total row, below the fields, where its arrival moves nothing.

## Why

- The owner chose it.
- It keeps the memorable thing visible over the phone keypad: the figure sits above every field and stays pinned.
- Fewest controls and plain native inputs, so the brief's `inputmode` keypad unlock applies and the first build is the cheapest of the four.

## Alternatives considered

- **1 · printed-slip (answer last):** reads like the check, but on a 320 × 568 phone the keypad hides the answer while typing.
- **3 · thumb-steppers:** twice the controls; 18 to 25% is seven taps; the answer and the steppers sit about 490px apart on a large phone.
- **4 · own-keypad:** the most build; screen readers, hardware keyboards, paste and the caret all become hand work, and the `inputmode` unlock stops applying.

## Consequences

- The answer reads before its working (tip and total sit under the fields).
- The pinned block plus a focused field must fit above the keypad on the smallest phone: Risk "Pinned readout" in [[projects/tip-calc/plan]]. Evidence that would reopen the choice: that gate fails, or the human-evidence gate shows people close the keypad and only then read (then variant 1).
- Phase 2's 4-up tip row is the tightest fit on the page (cells of about 58px at 320). The brief's pressure valve applies: if it does not fit without scrolling, drop the presets and keep the field.
