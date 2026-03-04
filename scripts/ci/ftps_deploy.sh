#!/usr/bin/env bash
set -euo pipefail

phase="${1:-}"

if [[ -z "${phase}" ]]; then
  echo "Usage: $0 <preflight|purge|upload>"
  exit 1
fi

required_envs=(CPANEL_FTP_HOST CPANEL_FTP_USER CPANEL_FTP_PASSWORD)
for key in "${required_envs[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "Missing required environment variable: ${key}"
    exit 1
  fi
done

port="${CPANEL_FTP_PORT:-21}"
remote_dir="${CPANEL_FTP_REMOTE_DIR:-devopsdayschile.cl/}"
insecure="${CPANEL_FTP_INSECURE:-false}"
verify_cert="true"
if [[ "${insecure}" == "true" ]]; then
  verify_cert="false"
fi

log_file="${RUNNER_TEMP:-/tmp}/ftps_deploy.log"
touch "${log_file}"

write_lftp_script() {
  local file="$1"
  local commands="$2"

  cat > "${file}" <<EOF
set cmd:fail-exit true
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate ${verify_cert}
set net:timeout 15
set net:max-retries 2
${commands}
bye
EOF
}

run_lftp_script() {
  local script_file="$1"
  # Some lftp builds do not support -f; feed commands through stdin for compatibility.
  lftp -u "${CPANEL_FTP_USER},${CPANEL_FTP_PASSWORD}" -p "${port}" "${CPANEL_FTP_HOST}" < "${script_file}" >> "${log_file}" 2>&1
}

case "${phase}" in
  preflight)
    if [[ "${verify_cert}" == "false" ]]; then
      echo "WARNING: ssl:verify-certificate disabled by CPANEL_FTP_INSECURE=true" | tee -a "${log_file}"
    fi

    script_file="$(mktemp)"
    write_lftp_script "${script_file}" $'pwd\nls'
    run_lftp_script "${script_file}"
    rm -f "${script_file}"

    {
      echo "## FTPS Deploy Summary"
      echo "- Host: ${CPANEL_FTP_HOST}"
      echo "- User: ${CPANEL_FTP_USER}"
      echo "- Port: ${port}"
      echo "- Remote dir: ${remote_dir}"
      echo "- FTPS preflight: OK"
      echo "- Certificate verify: ${verify_cert}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  purge)
    script_file="$(mktemp)"
    write_lftp_script "${script_file}" $'mkdir -p "'"${remote_dir}"'"\nglob -a rm -rf "'"${remote_dir}"'"/*'
    {
      echo "- Purge start: ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    run_lftp_script "${script_file}"
    rm -f "${script_file}"
    {
      echo "- Purge done: ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  upload)
    script_file="$(mktemp)"
    write_lftp_script "${script_file}" $'set xfer:clobber true\nmirror -R --parallel=4 --verbose --ignore-time dist "'"${remote_dir}"'"'
    run_lftp_script "${script_file}"
    rm -f "${script_file}"
    {
      echo "- Upload done: dist -> ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  *)
    echo "Unsupported phase: ${phase}"
    exit 1
    ;;
esac
