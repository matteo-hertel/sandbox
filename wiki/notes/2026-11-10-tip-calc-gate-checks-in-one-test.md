# tip-calc: gate checks that only one test ran

Part of [[index]]. Project: [[projects/tip-calc/plan]].

## Timeline

- 2026-11-10: review of `61df7c4` (LOCAL-11, PR #74) found the phase 1 gate green (45/45) but under-asserted in four places.
- Same day: fixed in the forge-debug pass; every new assertion was proved by a mutation the old suite passed and the new suite fails.
- Same day: review of `b3645d4` found the same shape again in the page geometry and the calc dependency checks (second round below).

## Root cause

The gate's run-wide conditions were written as inline assertions in one test instead of in a shared helper, and the Words and sweep tests checked the relations between values but not what the values must be:

- No request leaves the file, no console or page error, all three stores empty: asserted only in the first browser context; seven later contexts could break them silently. Mutation: a `localStorage` write under reduced motion passed.
- Words table: `>= 96` tested the CSS `min-height`, not the 96px the plan names; boxes were measured before `document.fonts.ready`; Tip and Total were never read. Mutations: a 100px readout and a Tip hidden while People is blank both passed.
- Rounding sweep: no integer check, so `each = (total + people - 1) / people` (fractional, never short, overage under `people`) passed.
- `calc.js`: the helpers were top-level declarations in a classic script, so five extra globals leaked against the plan's "one global".

## Decision it forced

Run-wide conditions now live in `assertClean(page, tracker)`, which every page test calls on its own context. Helpers moved inside `calc`, so `calc` is still a top-level function declaration (which `vm.runInThisContext` needs) and the only global; `calc.test.mjs` checks this in a fresh `vm` context.

## What it demonstrates

A green gate shows only what its assertions check. Test a sentence like "during the run" or "in every state" with a mutation that breaks it in the last context, not the first.

## Second round (review of `b3645d4`)

The suite measured element boxes and counted things where the plan names text and identity:

- Collected `118.02` under Total's `118.00`: both are block or flex boxes ending at the column edge, so their box edges matched whatever the text alignment. Mutation: `text-align: left` on the detail passed. Now the text's own `Range` rect is measured.
- Fonts: three faces `loaded` said nothing about which file sits behind each name. Mutations: the 600 face pointed at the Sans file, and the 500 and 600 files swapped, both passed. Now each face is drawn on a canvas beside a reference `FontFace` loaded from its expected file and the pixels must match.
- `document.fonts.ready` was awaited in two tests; every box is now measured after it. The readout height is now exactly 96, and the max figure's text rect must sit inside the readout.
- The 390px column cap (`.page { max-width }`) was unchecked. Mutation: removing it passed. A 768px context now asserts the column is 390.
- `calc`: whitespace-only was tested on Bill alone, and hostile values one field at a time. Mutations: a spaces-only tip read as `0`, and People validated only when Bill is filled, both passed. Now spaces, tabs and newlines are blank in every field, and a blank × valid × hostile sweep over all three fields asserts exactly which fields `invalid` names and which results exist.

What it adds: a box is not its text and a name is not its file. Check the thing the sentence names.
