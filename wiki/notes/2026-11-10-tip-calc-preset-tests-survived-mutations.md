# tip-calc preset tests let three breaks through

Part of [[index]]. Project: [[projects/tip-calc/plan]] phase 2 (LOCAL-12).

## Timeline
- LOCAL-12 build shipped the 15 / 18 / 20 presets with the phase 2 gate green (49 pass).
- Review flagged missing selection cases and a fit test without row geometry.
- forge-debug made three one-line breaks in `tip-calc/index.html`. Each one still passed 49/49:
  1. drop the `!tipInvalid` guard on `aria-pressed`;
  2. press a preset only when `tipCents` is set, which ties it to Bill;
  3. lay the row out as `repeat(2, …)`, so it wraps to two lines.

## Root cause
The gate's cases were all happy-path for the fields around the tip. The only invalid tip tested was `101`, and that number matches no preset, so the validator guard was never exercised. Every press ran with a valid Bill and People. The fit check measured each cell's size but not where the cells sat, and a wrapped 2 × 2 grid still gives 48px+ cells and a `scrollWidth` of 320.

## Decision it forced
New assertions in `tip-calc/page.test.mjs`:
- `18.0` (a preset's number that fails the whole-percent rule) presses nothing;
- with Bill blank and People `0`, typing `18` and tapping `20%` still press the matching preset;
- the four cells share one row, do not overlap and end inside 320px.

Each break now fails exactly one test. The product code did not change.

## What it demonstrates
A state that is derived from a validator needs an input that the derivation would accept and the validator rejects. A layout fit test must assert position, not only size.
