# ADR — design system for tip-calc: ledger slip

Part of [[index]]. Status: **accepted (assumed), 2026-11-09, project tip-calc.** Taken headless under forge-principles rule 10: no one was available to pick a direction, so the recommended option was locked. It is a two-way door; the owner can overturn it from the specimen at `design/specimen.html`. Lives here because the line restricts writes to `wiki/projects/tip-calc/`; promote it to `wiki/decisions/NNNN-design-system.md` when that path is open.

## Context

[[projects/tip-calc/brief]] asks for a one-page tip calculator that feels instant, works one-handed under restaurant light, never shows `0.00` for a blank field, and keeps money rounding honest (shares round up, the total sits beside them). It is a static page with no build step and no network calls. The stack's token vocabulary is plain CSS custom properties. No `wiki/.forge/taste.md` existed, so there was no record to bias against or conflict with.

The memorable thing, taken from the brief's "drawn to" line: the number each person owes is the loudest thing on the screen, and it changes under your thumb as you type.

## Decision

**Ledger slip.** Plex Mono for every number (600 for the answer, 500 for data), Plex Sans 400 for labels. Warm paper (#ECE6D6 page, #FAF7EE slip), ink text, one accent (#14468F, ballpoint blue) for the answer, the selected preset and the focus ring, one danger red for invalid input. 4px spacing scale, radius 4px on controls and 2px on the slip, ease-out motion with no animation on the result figure. Tokens and rules are in [[projects/tip-calc/DESIGN]].

## Why

- The layout is the arithmetic (bill, tip, total, each), so the odd-cent rounding rule is visible instead of hidden behind one big number.
- A blank row is a label and a leader with no value, which is exactly the brief's "no `0.00` while a field is blank".
- One loud figure (hero, up to 48px) against 20px data and 12px labels makes the answer the first thing read.
- The fonts are self-hosted woff2 (about 53 KB for three files), the cost of staying offline without falling back to `system-ui` as the personality.

## Alternatives

- **Lit instrument:** dark near-black, one amber readout. Right for a dim room, wrong in daylight, and the big readout hides the working, so the rounding rule goes unseen.
- **Chunky blocks:** yellow, thick borders, hard shadows, springy press. Fights "instant" and a utility that should disappear after ten seconds.

## Consequences

- One light scheme. In a dark restaurant the paper may glare. **Evidence that would change this:** the owner reports glare at the human-evidence gate (then add a dark scheme using the lit-instrument palette inverted), or the gate shows nobody reads the ledger rows (then switch to the lit instrument).
- Any phase that adds an off-token value, an unloaded font weight or an animated result is an objective finding in forge-polish.
- Fonts add three files to a page the brief wanted in "a few files"; they are assets, not code. If the owner wants a single file, drop to the system monospace stack and accept losing the typeface.
- The 15 / 18 / 20 preset row must fit 320px without scrolling; it does at 3 columns of about 79px. If it ever does not, the brief's pressure valve applies (drop the presets).

## Taste record, to append when the owner approves

Not written to `wiki/.forge/taste.md`: that file is outside this line's write path, and nothing here was approved by a person. When the owner reacts to the specimen, append: approved direction ledger slip, Plex Mono and Plex Sans, paper-and-ballpoint palette; rejected finalists lit instrument and chunky blocks (or whatever they say).
