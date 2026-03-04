#!/usr/bin/env bash
set -euo pipefail
[[ "${TRACE:-false}" == "true" ]] && set -x

expected_tag="${EXPECTED_TAG:-}"
url="${SMOKE_TEST_URL:-https://santiago.devopsdayschile.cl/}"
max_attempts="${SMOKE_TEST_MAX_ATTEMPTS:-12}"
sleep_seconds="${SMOKE_TEST_SLEEP_SECONDS:-10}"

attempt=1
deployed_version=""
last_status="meta_not_found"
normalized_html=""

while [[ ${attempt} -le ${max_attempts} ]]; do
  html="$(curl -fsSL --connect-timeout 10 --max-time 20 -H 'Cache-Control: no-cache' "${url}" || true)"
  normalized_html="$(tr '\n' ' ' <<< "${html}")"

  meta_tag="$(
    grep -Eio "<meta[^>]*name=['\"]app-version['\"][^>]*>|<meta[^>]*content=['\"][^'\"]+['\"][^>]*name=['\"]app-version['\"][^>]*>" <<< "${normalized_html}" \
    | head -n 1 || true
  )"

  deployed_version=""
  if [[ -n "${meta_tag}" ]]; then
    deployed_version="$(sed -nE "s/.*content=['\"]([^'\"]+)['\"].*/\1/p" <<< "${meta_tag}" | head -n 1)"
  fi

  if [[ -z "${meta_tag}" || -z "${deployed_version}" ]]; then
    last_status="meta_not_found"
    echo "Attempt ${attempt}/${max_attempts}: status=meta_not_found"
  elif [[ "${deployed_version}" == "${expected_tag}" ]]; then
    last_status="version_match"
    echo "Attempt ${attempt}/${max_attempts}: status=version_match expected=${expected_tag} deployed=${deployed_version}"
    {
      echo "## Smoke Test Summary"
      echo "- URL: ${url}"
      echo "- Expected version: ${expected_tag}"
      echo "- Detected version: ${deployed_version}"
      echo "- Result: pass"
    } >> "${GITHUB_STEP_SUMMARY}"
    exit 0
  else
    last_status="version_mismatch"
    echo "Attempt ${attempt}/${max_attempts}: status=version_mismatch expected=${expected_tag} deployed=${deployed_version}"
  fi

  attempt=$((attempt + 1))
  sleep "${sleep_seconds}"
done

head_excerpt="$(sed -nE 's/.*<head[^>]*>(.*)<\/head>.*/\1/p' <<< "${normalized_html}" | cut -c1-200 || true)"

{
  echo "## Smoke Test Summary"
  echo "- URL: ${url}"
  echo "- Expected version: ${expected_tag}"
  echo "- Detected version: ${deployed_version:-not_found}"
  echo "- Result: fail"
  echo "- Final status: ${last_status}"
} >> "${GITHUB_STEP_SUMMARY}"

if [[ -n "${head_excerpt}" ]]; then
  echo "Head excerpt (first 200 chars): ${head_excerpt}"
fi

echo "Smoke test failed: expected=${expected_tag} detected=${deployed_version:-not_found} status=${last_status}"
exit 1
