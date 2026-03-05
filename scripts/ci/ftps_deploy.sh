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
insecure_raw="${CPANEL_FTP_INSECURE:-false}"
insecure="$(printf '%s' "${insecure_raw}" | tr '[:upper:]' '[:lower:]')"
verify_cert="true"
if [[ "${insecure}" == "true" || "${insecure}" == "1" || "${insecure}" == "yes" ]]; then
  verify_cert="false"
fi

log_file="${RUNNER_TEMP:-/tmp}/ftps_deploy.log"
touch "${log_file}"

log_info() {
  echo "[ftps_deploy] $*" | tee -a "${log_file}"
}

write_lftp_script() {
  local file="$1"
  shift

  {
    cat <<EOF
set cmd:fail-exit true
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate ${verify_cert}
set net:timeout 15
set net:max-retries 2
EOF

    for cmd in "$@"; do
      printf '%s\n' "${cmd}"
    done

    cat <<EOF
bye
EOF
  } > "${file}"
}

run_lftp_script() {
  local script_file="$1"
  log_info "Executing lftp script: ${script_file}"
  log_info "----- lftp commands begin -----"
  sed -n '1,200p' "${script_file}" | tee -a "${log_file}"
  log_info "----- lftp commands end -------"
  # Some lftp builds do not support -f; feed commands through stdin for compatibility.
  # Redact password if lftp echoes connection URL in logs.
  lftp -u "${CPANEL_FTP_USER},${CPANEL_FTP_PASSWORD}" -p "${port}" "${CPANEL_FTP_HOST}" < "${script_file}" 2>&1 \
    | sed -E 's#(ftp://[^:]+:)[^@]+@#\1***@#g' \
    | tee -a "${log_file}"
}

case "${phase}" in
  preflight)
    log_info "Starting FTPS preflight (host=${CPANEL_FTP_HOST}, user=${CPANEL_FTP_USER}, port=${port}, remote_dir=${remote_dir})"
    if [[ "${verify_cert}" == "false" ]]; then
      log_info "WARNING: ssl:verify-certificate disabled by CPANEL_FTP_INSECURE=true"
    fi

    script_file="$(mktemp)"
    write_lftp_script "${script_file}" \
      "pwd" \
      "ls"
    run_lftp_script "${script_file}"
    rm -f "${script_file}"
    log_info "FTPS preflight completed"

    {
      echo "## FTPS Deploy Summary"
      echo "- Host: ${CPANEL_FTP_HOST}"
      echo "- User: ${CPANEL_FTP_USER}"
      echo "- Port: ${port}"
      echo "- Remote dir: ${remote_dir}"
      echo "- FTPS preflight: OK"
      echo "- Certificate verify: ${verify_cert}"
      echo "- Insecure mode (CPANEL_FTP_INSECURE): ${insecure_raw}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  purge)
    log_info "Starting FTPS purge (remote_dir=${remote_dir})"
    script_file="$(mktemp)"
    write_lftp_script "${script_file}" \
      "set cmd:fail-exit false" \
      "mkdir -p \"${remote_dir}\"" \
      "set cmd:fail-exit true" \
      "cd \"${remote_dir}\"" \
      "glob -a rm -rf *"
    {
      echo "- Purge start: ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    run_lftp_script "${script_file}"
    rm -f "${script_file}"
    log_info "FTPS purge completed"
    {
      echo "- Purge done: ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  upload)
    log_info "Starting FTPS upload (dist -> ${remote_dir})"
    script_file="$(mktemp)"
    write_lftp_script "${script_file}" \
      "set xfer:clobber true" \
      "mirror -R --parallel=4 --verbose --ignore-time dist \"${remote_dir}\""
    run_lftp_script "${script_file}"
    rm -f "${script_file}"
    log_info "FTPS upload completed"
    {
      echo "- Upload done: dist -> ${remote_dir}"
    } >> "${GITHUB_STEP_SUMMARY}"
    ;;

  *)
    echo "Unsupported phase: ${phase}"
    exit 1
    ;;
esac
