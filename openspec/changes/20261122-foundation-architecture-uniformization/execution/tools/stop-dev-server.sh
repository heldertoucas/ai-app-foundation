#!/usr/bin/env bash
# Stops only the process tree recorded by dev-server.sh.
set -euo pipefail
source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
pid_file="$BASELINES/dev-server.pid"
[ -f "$pid_file" ] || exit 0
pid="$(cat "$pid_file")"
[[ "$pid" =~ ^[0-9]+$ ]] || { echo "STOP invalid pid file"; exit 1; }
if kill -0 "$pid" 2>/dev/null; then
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -1)"
  if [ "$(cd "$cwd" 2>/dev/null && pwd -P)" != "$(cd "$ROOT" && pwd -P)" ]; then
    echo "STOP recorded process does not belong to this checkout"
    exit 1
  fi
  kill_tree() {
    local child
    for child in $(pgrep -P "$1" 2>/dev/null || true); do kill_tree "$child"; done
    kill -TERM "$1" 2>/dev/null || true
  }
  kill_tree "$pid"
fi
rm -f "$pid_file"
