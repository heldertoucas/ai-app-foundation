# Source this at the start of every shell block:
#   source "$(git rev-parse --show-toplevel)/openspec/changes/20261122-foundation-architecture-uniformization/execution/tools/shell-setup.sh"
ROOT="$(git rev-parse --show-toplevel)" || return 1
CH="$ROOT/openspec/changes/20261122-foundation-architecture-uniformization"
T="$CH/execution/tools"
BASELINES="$(git rev-parse --path-format=absolute --git-common-dir)/foundation-baselines"
export DATABASE_URL="file:./dev.db"
export NEXT_TELEMETRY_DISABLED=1
export ROOT CH T BASELINES
cd "$ROOT" || return 1
