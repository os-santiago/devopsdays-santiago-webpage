#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

last_stable_tag="${LAST_STABLE_TAG:-}"
rc_commit="${RC_COMMIT:-}"

if [[ -n "${last_stable_tag}" ]]; then
  git log --pretty=format:'- %h %s' "${last_stable_tag}..${rc_commit}" > CHANGELOG_RELEASE.md
else
  git log --pretty=format:'- %h %s' "${rc_commit}" > CHANGELOG_RELEASE.md
fi

if [[ ! -s CHANGELOG_RELEASE.md ]]; then
  echo "- No commits found in selected range." > CHANGELOG_RELEASE.md
fi
