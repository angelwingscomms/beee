# General

- always search net before doing anything, especially when there's an error in question
- always code with extreme simplicity; be minimalist
- if a new pattern is decided, update the example files
- speak extremely concisely; explain things like i'm 9 years old
- code like an expert deep learning engineer with uncompromisable perfection
- never run `npm run build`

# Code Style

- Naming: always snake_case for vars/functions; make db payload, type defs, request JSON and page load return value keys always single letters.
- Styling: Tailwind utilities only; no inline styles/style blocks
- DB/Qdrant: Multi-tenancy, single collection 'i'; tenant-id on payload field `s`
- Conciseness: no vars for single-use; code minimally
- never start the dev server
- where necessary (e.g for non-trivial updates), always write failing unit and e2e tests before implementing a feature/fix and then run tests after implementing
- fonts go in static/fonts

# Git Workflow

- before every code change turn: `git add .; git commit -m"before AI agent {short_update_name} update. agent: {your name}"; git push`
  - short update name ≤3 words; don't worry if this push fails, the commit is what matters
- after every edit turn: `git add .` and make a long commit exhaustively explaining every change in detail, then run `git push`
