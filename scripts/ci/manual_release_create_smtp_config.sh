#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SMTP_USER_PASSWORD:-}" ]]; then
  echo "Missing required secret: SMTP_USER_PASSWORD"
  exit 1
fi

mkdir -p dist/api
umask 077

cat > dist/api/contact_smtp.php <<EOF
<?php
declare(strict_types=1);

return [
    'SMTP_HOST' => 'mail.devopsdayschile.cl',
    'SMTP_PORT' => 465,
    'SMTP_USER' => 'contacto@devopsdayschile.cl',
    'SMTP_PASS' => '${SMTP_USER_PASSWORD}',
    'SMTP_SECURE' => 'ssl',
];
EOF

