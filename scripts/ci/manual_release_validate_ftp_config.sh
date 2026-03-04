#!/usr/bin/env bash
set -euo pipefail

log_file="${RUNNER_TEMP:-/tmp}/ftps_deploy.log"
: > "${log_file}"

if [[ -z "${CPANEL_FTP_HOST:-}" || -z "${CPANEL_FTP_USER:-}" || -z "${CPANEL_FTP_PASSWORD:-}" ]]; then
  echo "Missing required FTPS secrets (CPANEL_FTP_HOST/CPANEL_FTP_USER/CPANEL_FTP_PASSWORD)." | tee -a "${log_file}"
  exit 1
fi

port="${CPANEL_FTP_PORT:-21}"
remote_dir="${CPANEL_FTP_REMOTE_DIR:-devopsdayschile.cl/}"

echo "Using FTPS host=${CPANEL_FTP_HOST} user=${CPANEL_FTP_USER} port=${port} remote_dir=${remote_dir}" | tee -a "${log_file}"

