#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

final_tag="${FINAL_TAG:-}"
rc_commit="${RC_COMMIT:-}"

git fetch --tags --force

if git rev-parse -q --verify "refs/tags/${final_tag}" >/dev/null; then
  echo "Tag already exists: ${final_tag}"
  exit 1
fi

git tag -a "${final_tag}" -m "Release ${final_tag}" "${rc_commit}"
git push origin "refs/tags/${final_tag}"
