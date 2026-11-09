# Agent rules — sandbox-local-7-f32057fd

Part of [[index]]. The full text behind the short `forge-wiki-rules` block in
`AGENTS.md` and `CLAUDE.md`. `forge-init` writes it once and never overwrites it.

## Wiki — keep it current (the *why*, not just the *what*)

This repo has an Obsidian-style wiki at `wiki/`. It is the source of truth for the
*why*. Code says what; the wiki says why. Keeping it current is not optional.

- **Linking is Obsidian-style.** Cross-reference wiki files with `[[wikilinks]]`
  (e.g. `[[architecture]]`, `[[decisions/0007-slug]]`), not plain Markdown links.
  **Every wiki file must be reachable from `wiki/index.md`** — when you create one,
  add it to the relevant section of `index.md` in the same change.
- **Non-trivial decisions & trade-offs** → record an ADR in `wiki/decisions/`
  (Context · Decision · Why · Alternatives · Consequences). The *why* and the roads
  not taken matter more than the choice. Number ADRs sequentially, zero-padded
  (`0007-...`). Link every new ADR from `wiki/index.md` in the same change.
- **Incidents, failures, surprising root causes** → write `wiki/notes/YYYY-MM-DD-slug.md`
  (timeline · root cause · the decision it forced · what it demonstrates). How the
  system fails is stronger signal than the happy path.
- **Deliberate scope cuts** → record in `wiki/improvements.md` ("deferred X for Y").
- **Architecture changes** → `wiki/architecture.md` is reconciled by `forge-ship`
  every phase; if you change the system's shape outside a phase, update it in the
  same change.
- **Design system** → if `DESIGN.md` exists, all UI code uses its tokens (type,
  color, spacing scale, radius, motion). An off-system value — raw hex, px off
  the scale, a font outside the system — is a review finding, the same class as
  a type error.
- **External context that informs the build** (business rationale, research,
  email, a decision-driving conversation, competitive or user notes) → ingest it
  into the knowledge base at `wiki/knowledge/` as a living article with a Timeline.
  Use `forge-wiki` to do this (it's plan-first); `forge-wiki` MAINTAIN keeps the
  indexes and links healthy. **More context is better than less** — capture it.
- When you make such a change, **say so in your reply** — note which wiki file you
  updated. Under-capturing the *why* is the failure mode to avoid; when in doubt,
  write it down.

### Ambient capture — file context as it surfaces in conversation

You don't wait to be asked. When the user drops **durable, build-relevant context**
mid-conversation, capture it into `wiki/knowledge/` in the **same turn**, then note
it in one line. This is what keeps the wiki a living record instead of a stale one.

- **Capture** (durable, affects the build): stakeholder directives ("my PM said do X
  over Y"), constraints, deadlines, decision drivers, business rationale, user/research
  findings, hard preferences ("we must support offline"). Anything a future session
  would need to understand *why* the build is shaped as it is.
- **Skip** (transient): questions, thinking-aloud, chit-chat, instructions about the
  current task, anything not durable. When unsure, lean toward capturing — but a
  one-off aside is not an article.
- **Additive writes happen immediately, no approval** — a new `knowledge/` article, or
  a Timeline append (`Compiled` / `Reinforced`) to an existing one. Then say, briefly:
  `📓 noted: <one line> → [[knowledge/<topic>/<slug>]]`.
- **Only pause to confirm** when a capture would **rewrite or contradict** an existing
  article's Core Concept (a `Refined`/`Contradicted` change) — show the diff first.
- Use `forge-wiki`'s article format + Timeline and keep every new file reachable from
  the index. Run `forge-wiki` MAINTAIN now and then to regenerate indexes and check
  links. Explicit `forge-wiki` ingests (a pasted doc, a file) stay **plan-first**.
- **Control:** if the user says "pause/mute wiki capture", stop ambient capture for the
  rest of the session (explicit `forge-wiki` still works); "resume capture" re-enables it.

## Phase & branch discipline

- Work happens in ordered phases defined in `wiki/plan.md`.
- Each phase runs on its own branch `phase/<n>-<slug>` off the base branch.
- Commit as many times as needed *on the phase branch*. Never commit directly on
  the base branch.
- A finished phase merges back as **exactly one squashed commit**, and only after
  its declared **verifiable gate** is green.
- Every merged phase gets one `wiki/build-log.md` entry: what was done, the *why*
  of notable decisions, and the exact gate that was met.
- A repo can hold several projects: each keeps its brief, plan, build log, retro and
  improvements in `wiki/projects/<slug>/` and builds on `phase/<slug>-<n>-<name>`
  branches, while ADRs, notes, knowledge and architecture stay shared in `wiki/`.
