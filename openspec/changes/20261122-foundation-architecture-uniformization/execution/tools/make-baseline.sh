#!/usr/bin/env bash
# Exports the committed HTML Stack to an untracked baseline. Usage: make-baseline.sh <name>
set -euo pipefail
name="${1:?usage: make-baseline.sh <name>}"
[[ "$name" =~ ^[a-z0-9-]+$ ]] || { echo "STOP invalid name"; exit 1; }
source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
[ -z "$(git status --porcelain)" ] || { echo "STOP working tree must be clean"; exit 1; }
target="$BASELINES/$name"
[ ! -e "$target" ] || { echo "STOP baseline already exists: $target"; exit 1; }
mkdir -p "$target"
paths=(public/screenshots)
for p in public/html-kit public/html public/blueprints; do
  if [ -n "$(git ls-files -- "$p" | head -1)" ]; then paths+=("$p"); fi
done
git archive HEAD -- "${paths[@]}" | tar -x -C "$target"
git rev-parse HEAD > "$target/COMMIT"
echo "$target"
