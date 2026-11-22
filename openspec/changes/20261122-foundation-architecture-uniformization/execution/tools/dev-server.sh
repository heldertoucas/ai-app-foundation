#!/usr/bin/env bash
# Starts the app on 4300 against a disposable copy of prisma/dev.db, so manual checks never dirty the tree.
# Usage: bash dev-server.sh   (run it in the background; stop only the process you started)
set -euo pipefail
source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
if lsof -nP -iTCP:4300 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "STOP port 4300 is already in use. Do not stop that process; ask the human."
  exit 1
fi
mkdir -p "$BASELINES"
db="$BASELINES/run.db"
rm -f "$db" "$db-wal" "$db-shm"
sqlite3 prisma/dev.db ".backup '$db'"
export DATABASE_URL="file:$db"
exec pnpm dev
