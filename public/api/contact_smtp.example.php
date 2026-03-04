<?php

declare(strict_types=1);

/**
 * Copy to public/api/contact_smtp.php on the server and set real credentials.
 * Do not commit the real file with secrets.
 */
return [
    'SMTP_HOST' => 'mail.devopsdayschile.cl',
    'SMTP_PORT' => 465,
    'SMTP_USER' => 'contacto@devopsdayschile.cl',
    'SMTP_PASS' => 'replace-with-real-password',
    'SMTP_SECURE' => 'ssl', // ssl for 465, tls for 587
];

