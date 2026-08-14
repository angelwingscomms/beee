#!/bin/bash
# The two tests in src/routes/dashboard/dashboard.test.ts call a live Qdrant and were
# already red when this plan was written. Every other test must stay green.
pnpm vitest run --pool=threads \
	--exclude 'e2e/**' \
	--exclude '**/node_modules/**' \
	--exclude 'dist/**' \
	--exclude '.worktrees/**' \
	--exclude 'src/routes/dashboard/dashboard.test.ts'
