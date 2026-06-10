#!/bin/bash
set -e

echo "=== setup-skills.sh START ===" >&2
echo "CLAUDE_CODE_REMOTE=${CLAUDE_CODE_REMOTE}" >&2
echo "CLAUDE_PROJECT_DIR=${CLAUDE_PROJECT_DIR}" >&2

[ "$CLAUDE_CODE_REMOTE" != "true" ] && { echo "SKIP: not remote" >&2; exit 0; }

echo "Running: npx skills add ryotaKFC/ryotaKFC --all -a claude-code -y" >&2
npx skills add ryotaKFC/ryotaKFC --all -a claude-code -y
echo "=== setup-skills.sh DONE ===" >&2

exit 0
