#!/bin/bash
set -e

echo "=== sync-develop-base.sh START ===" >&2

[ "${CLAUDE_CODE_REMOTE:-}" != "true" ] && { echo "SKIP: not remote" >&2; exit 0; }

git fetch origin main develop >&2 2>&1 || { echo "WARN: fetch failed, skipping" >&2; exit 0; }

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "WARN: working tree not clean, skipping base sync" >&2
  exit 0
fi

current_branch=$(git rev-parse --abbrev-ref HEAD)
current_commit=$(git rev-parse HEAD)
main_commit=$(git rev-parse origin/main)
develop_commit=$(git rev-parse origin/develop)

if [ "$current_commit" = "$develop_commit" ]; then
  echo "Already based on develop, nothing to do" >&2
  exit 0
fi

if [ "$current_branch" = "main" ]; then
  echo "On main branch, switching to develop" >&2
  git checkout develop >&2
  exit 0
fi

if [ "$current_commit" = "$main_commit" ]; then
  echo "Branch based on main, merging develop to align base" >&2
  if ! git merge origin/develop -m "Merge develop into session branch to align base" >&2 2>&1; then
    echo "WARN: merge failed, aborting" >&2
    git merge --abort 2>/dev/null || true
  fi
fi

echo "=== sync-develop-base.sh DONE ===" >&2
exit 0
