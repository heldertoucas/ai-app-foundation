#!/usr/bin/env bash
# Runs a command with this checkout's app on 4300 and a disposable database, then stops the app.
# Usage: bash with-server.sh pnpm test:e2e
set -euo pipefail
source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
[ "$#" -gt 0 ] || { echo "Usage: with-server.sh <command...>"; exit 2; }
if lsof -nP -iTCP:4300 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "STOP port 4300 is already in use. Do not stop that process; ask the human."
  exit 1
fi
mkdir -p "$BASELINES"
log="$BASELINES/dev-server.log"
bash "$T/dev-server.sh" > "$log" 2>&1 &
trap 'bash "$T/stop-dev-server.sh"' EXIT
ready=0
for _ in $(seq 1 90); do
  if curl -fs -o /dev/null http://127.0.0.1:4300/; then ready=1; break; fi
  sleep 1
done
[ "$ready" = 1 ] || { echo "STOP app did not start. Log: $log"; exit 1; }
"$@"
