#!/usr/bin/env bash
# Exports the committed HTML Stack to an untracked baseline. Usage: make-baseline.sh <name>
# Safe to retry: an existing baseline for the same commit is reused.
set -euo pipefail
name="${1:?usage: make-baseline.sh <name>}"
[[ "$name" =~ ^[a-z0-9-]+$ ]] || { echo "STOP invalid name"; exit 1; }
source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
[ -z "$(git status --porcelain --untracked-files=all)" ] || { echo "STOP working tree must be clean"; exit 1; }
head="$(git rev-parse HEAD)"
target="$BASELINES/$name"
if [ -e "$target" ]; then
  if [ "$(cat "$target/COMMIT" 2>/dev/null || true)" = "$head" ]; then echo "$target"; exit 0; fi
  echo "STOP baseline $name exists for another commit: $target"
  exit 1
fi
mkdir -p "$BASELINES"
tmp="$(mktemp -d "$BASELINES/.tmp-$name.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT
paths=(public/screenshots)
for p in public/html-kit public/html public/blueprints public/assets; do
  if [ -n "$(git ls-files -- "$p" | head -1)" ]; then paths+=("$p"); fi
done
git archive HEAD -- "${paths[@]}" | tar -x -C "$tmp"
printf '%s\n' "$head" > "$tmp/COMMIT"
mv "$tmp" "$target"
trap - EXIT
echo "$target"
