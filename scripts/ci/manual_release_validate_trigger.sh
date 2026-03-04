#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

confirm_release="${CONFIRM_RELEASE:-}"

if [[ "${GITHUB_REF_NAME:-}" != "main" ]]; then
  echo "This workflow can only run from main. Current branch: ${GITHUB_REF_NAME:-unknown}"
  exit 1
fi

if [[ "${confirm_release}" != "true" ]]; then
  echo "Release confirmation was not provided. Set confirm_release=true."
  exit 1
fi
