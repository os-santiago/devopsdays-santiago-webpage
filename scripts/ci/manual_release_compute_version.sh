#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

release_type="${RELEASE_TYPE:-}"

git fetch --tags --force

latest_rc_tag="$(git tag -l 'v[0-9]*.[0-9]*.[0-9]*-rc.[0-9]*' | sort -V | tail -n 1 || true)"
latest_stable_tag="$(git tag -l 'v[0-9]*.[0-9]*.[0-9]*' | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -n 1 || true)"

if [[ -z "${latest_rc_tag}" ]]; then
  echo "No active RC tag found. Expected something like vX.Y.Z-rc.N"
  exit 1
fi

if [[ ! "${latest_rc_tag}" =~ ^(v[0-9]+\.[0-9]+\.[0-9]+)-rc\.[0-9]+$ ]]; then
  echo "Invalid RC tag format: ${latest_rc_tag}"
  exit 1
fi

if [[ "${release_type}" != "minor" && "${release_type}" != "major" ]]; then
  echo "Unsupported release type: ${release_type}"
  exit 1
fi

# Policy: both minor and major promote the active RC base.
final_tag="${BASH_REMATCH[1]}"
rc_commit="$(git rev-list -n 1 "${latest_rc_tag}")"

if git rev-parse -q --verify "refs/tags/${final_tag}" >/dev/null; then
  echo "Final tag already exists: ${final_tag}"
  exit 1
fi

{
  echo "rc_tag=${latest_rc_tag}"
  echo "rc_commit=${rc_commit}"
  echo "final_tag=${final_tag}"
  echo "release_type=${release_type}"
  echo "last_stable_tag=${latest_stable_tag}"
} >> "${GITHUB_OUTPUT}"
