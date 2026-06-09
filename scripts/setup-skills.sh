#!/bin/bash
set -e

# ローカルでは走らせない
[ "$CLAUDE_CODE_REMOTE" != "true" ] && exit 0

npx skills add ryotaKFC/ryotaKFC -g -s '*'

exit 0
