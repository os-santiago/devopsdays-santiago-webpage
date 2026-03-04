#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

rc_tag="${RC_TAG:-}"

git fetch --tags --force

if [[ ! "${rc_tag}" =~ ^(v[0-9]+\.[0-9]+\.[0-9]+)-rc\.[0-9]+$ ]]; then
  echo "RC tag does not match expected format, skipping cleanup: ${rc_tag}"
  exit 0
fi

rc_base="${BASH_REMATCH[1]}"
mapfile -t rc_tags < <(git tag -l "${rc_base}-rc.*" | sort -V)

if [[ "${#rc_tags[@]}" -eq 0 ]]; then
  echo "No RC tags found to clean for ${rc_base}"
  exit 0
fi

echo "Deleting RC tags for ${rc_base}: ${rc_tags[*]}"

for tag in "${rc_tags[@]}"; do
  git tag -d "${tag}" >/dev/null 2>&1 || true
  git push origin ":refs/tags/${tag}"
done
