@AGENTS.md

<!-- BEGIN:forge-wiki-rules -->
## Wiki and branches (forge)

`wiki/` is the source of truth for the *why*. Full rules: `wiki/RULES.md`. Every turn:

- **Keep the wiki current** in the same change, and say which file you updated. Link with `[[wikilinks]]`; link every new file from `wiki/index.md`.
- **A decision or trade-off** → an ADR in `wiki/decisions/NNNN-slug.md` (Context · Decision · Why · Alternatives · Consequences).
- **An incident or surprising root cause** → a note in `wiki/notes/YYYY-MM-DD-slug.md`.
- **Durable context the user mentions** (a constraint, a deadline, a directive) → `wiki/knowledge/` in the same turn, via `forge-wiki`.
- **Phases** run on `phase/<n>-<slug>` off the base branch (never commit on it) and merge back as one squashed commit once the gate is green, with one `wiki/build-log.md` entry.
- **Projects:** another project keeps its record in `wiki/projects/<slug>/` and builds on `phase/<slug>-<n>-<name>`.
<!-- END:forge-wiki-rules -->
