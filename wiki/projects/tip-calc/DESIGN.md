# Design — tip-calc

Part of [[index]]. Status: **locked by forge-design-system, 2026-11-09, headless.** The direction, the memorable thing and the choice of fonts were assumed (recommended option, no one to ask); nothing here is an owner-approved taste call yet. Specimen: `design/specimen.html`. Rationale: [[projects/tip-calc/design/adr-design-system]].

Location: this file sits in the project folder because the line restricts writes to `wiki/projects/tip-calc/`. The forge default is the repo root; moving it there is a plain `git mv`.

> **The memorable thing:** the number each person owes is the loudest thing on the screen, and it changes under your thumb as you type.

## Direction

**Ledger slip.** The bottom of a restaurant check: dot-leader rows, mono numerals right-aligned to one edge, warm paper, the answer written in ballpoint blue. The layout is the arithmetic (bill, tip, total, then each), so the rounding rule is visible. Wrong for: anything playful, a dark-mode-first product, a page with many rows.

## Typography

| Role      | Typeface       | Weights | Notes                                                            |
|-----------|----------------|---------|------------------------------------------------------------------|
| Display   | IBM Plex Mono  | 600     | the each-pays figure only, `--text-hero`, line-height 1          |
| Body      | IBM Plex Sans  | 400     | labels (12px caps, 0.08em tracking), notes and errors (16px, 1.5) |
| Code/data | IBM Plex Mono  | 500     | inputs, presets, ledger values; `font-variant-numeric: tabular-nums` |

Tokens: `--font-display`, `--font-body`, `--font-data`; `--text-label` 12px · `--text-body` 16px · `--text-data` 20px · `--text-hero` `min(48px, 16cqw)` (about 41px at 320px; ten characters fit a 256px column).

- Self-host the three woff2 files (latin subset, about 53 KB), `font-display: swap`, no CDN: the page works offline. Licence (SIL OFL) ships beside them.
- Why Plex Mono: a printed-check face, fixed-width digits so a moving figure never shakes, a dotted zero that cannot be read as O. Why Plex Sans: it carries only the quiet words, and pairs with it by design.
- Anti-defaults: no `system-ui` or `-apple-system`; no weight or style that is not loaded (no faux bold, no italic).
- Every input is at least 16px (it is 20px) so iOS Safari does not zoom on focus.

## Color

Philosophy: ink on paper. Blue is the pen: it marks only the answer, the preset you chose and the focus ring. Red appears only when input is invalid. Everything else is ink and paper.

| Token           | Value   | Use                                              | Contrast            |
|-----------------|---------|--------------------------------------------------|---------------------|
| `--color-bg`      | #ECE6D6 | page background                                  | text 13.8:1         |
| `--color-surface` | #FAF7EE | the slip, input and button faces                 | text 16.1:1         |
| `--color-text`    | #1C1B18 | primary text, input values, ledger values        | AA on bg and surface |
| `--color-muted`   | #5B574C | labels, notes, empty-state sentence              | 6.7:1 on surface    |
| `--color-accent`  | #14468F | the each-pays figure, selected preset, focus ring | 8.5:1 on surface    |
| `--color-danger`  | #A32A1C | invalid input: its border and its message only   | 6.8:1 on surface    |
| `--color-line`    | #857F6D | control borders, dot leaders, the dashed divider | 3.7:1 on surface (UI) |
| `--color-rule`    | #D4CCB6 | hairline around the slip and page frame, decor only | no minimum        |

Contrast was computed (WCAG 2.x relative luminance); selected-preset text is surface on accent, 8.5:1. One scheme: light, warm. No dark scheme in v1.

## Spacing

4px base, named by multiples: `--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-6` 24 · `-8` 32 · `-12` 48 · `-16` 64. Components use steps, never raw values.

Page padding 16 · slip padding 24 / 16 · between fields 12 · label column 88 · preset gap 8 · every control at least 48 tall. The result area (`.each`) is always 96 tall, so digits arriving never move the inputs. The 15 / 18 / 20 preset row is three equal columns and must fit 320px without scrolling.

## Radius

`--radius-control` 4px (inputs, presets) · `--radius-slip` 2px (the slip). Nothing else: no pills, no circles.

## Motion

`--dur-micro` 100ms (press: 1px down) · `--dur-short` 150ms (colour, border and focus changes) · `--dur-medium` 250ms (an error appearing) · `--dur-long` 400ms (unused). Easing: ease-out only, `--ease: cubic-bezier(0.2, 0, 0, 1)`; no springs, no bounce. The each-pays figure never animates: it changes at once. `prefers-reduced-motion: reduce` sets all four durations to 0ms; nothing depends on movement to be understood.

## Layout

One column, left-aligned, 320px minimum. Every number is right-aligned to one edge so the decimal points line up from the fields down to the answer. Blank means blank: a ledger row with no value shows only its label and leader; no `0.00`. Invalid input shows its message under the field (`aria-invalid="true"`, text as well as colour) and the result area says what to fix.

## Voice

Plain · exact · quiet. Say what to do or what happened in the fewest words; never apologise or cheer.
Empty state: "Type the bill. Each share shows here."
Invalid: "People: enter a whole number, 1 or more." Rounded: "Rounded up to the cent."

## Anti-patterns (objective findings in forge-polish)

- Any hex, px, font or duration that is not a token above; off-scale spacing.
- `system-ui`, `-apple-system`, a CDN font, any network request; a font weight or style that is not loaded.
- A radius other than 4px, 2px or 0; pills, circles, shadows, gradients.
- Icons, emoji, illustrations, decorative dividers beyond the dashed rule; centred text.
- Accent on anything but the answer, the selected preset and the focus ring; danger on anything but invalid input.
- `0.00`, `NaN`, `Infinity` or a negative share shown for blank or invalid input.
- Animating the result figure; a layout shift when the result appears.
- A currency symbol (the brief fixes this out).

## Decisions

[[projects/tip-calc/design/adr-design-system]] — direction rationale, alternatives and what would change it.
