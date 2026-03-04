<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 900; // 15 minutes
const SMTP_HOST_DEFAULT = 'mail.devopsdayschile.cl';
const SMTP_PORT_DEFAULT = 465;
const SMTP_USER_DEFAULT = 'contacto@devopsdayschile.cl';
const SMTP_SECURE_DEFAULT = 'ssl';

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function invalid_input_response(string $reason, array $fields = []): void
{
    json_response(400, [
        'ok' => false,
        'error' => 'invalid_input',
        'details' => [
            'reason' => $reason,
            'fields' => $fields,
        ],
    ]);
}

function str_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value);
    }

    return strlen($value);
}

function sanitize_header_value(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function rate_limit_file_path(): string
{
    return rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'devopsdays_contact_rate_limit.json';
}

function smtp_config_candidates(): array
{
    $paths = [];

    $home = getenv('HOME');
    if (!is_string($home) || $home === '') {
        $home = isset($_SERVER['HOME']) && is_string($_SERVER['HOME']) ? $_SERVER['HOME'] : '';
    }

    if ($home !== '') {
        $paths[] = rtrim($home, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'secure' . DIRECTORY_SEPARATOR . 'contact_smtp.php';
    }

    $paths[] = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'secure' . DIRECTORY_SEPARATOR . 'contact_smtp.php';
    $paths[] = __DIR__ . DIRECTORY_SEPARATOR . 'contact_smtp.php';

    return array_values(array_unique($paths));
}

function load_smtp_config(): ?array
{
    $defaults = [
        'SMTP_HOST' => SMTP_HOST_DEFAULT,
        'SMTP_PORT' => SMTP_PORT_DEFAULT,
        'SMTP_USER' => SMTP_USER_DEFAULT,
        'SMTP_SECURE' => SMTP_SECURE_DEFAULT,
    ];

    foreach (smtp_config_candidates() as $path) {
        if (!file_exists($path)) {
            continue;
        }

        $loaded = require $path;
        if (!is_array($loaded)) {
            return null;
        }

        return array_merge($defaults, $loaded);
    }

    return null;
}

function is_rate_limited(string $ip, int $maxRequests, int $windowSeconds): bool
{
    $now = time();
    $path = rate_limit_file_path();

    $handle = fopen($path, 'c+');
    if ($handle === false) {
        // Fail-open to avoid dropping legit requests when temp storage fails.
        return false;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return false;
        }

        rewind($handle);
        $raw = stream_get_contents($handle);
        $data = [];

        if (is_string($raw) && trim($raw) !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $data = $decoded;
            }
        }

        foreach ($data as $key => $timestamps) {
            if (!is_array($timestamps)) {
                unset($data[$key]);
                continue;
            }

            $data[$key] = array_values(array_filter($timestamps, static fn($ts) => is_int($ts) && $ts >= ($now - $windowSeconds)));

            if (count($data[$key]) === 0) {
                unset($data[$key]);
            }
        }

        $ipKey = hash('sha256', $ip);
        $ipTimestamps = $data[$ipKey] ?? [];

        if (count($ipTimestamps) >= $maxRequests) {
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, (string)json_encode($data));
            fflush($handle);
            return true;
        }

        $ipTimestamps[] = $now;
        $data[$ipKey] = $ipTimestamps;

        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, (string)json_encode($data));
        fflush($handle);

        return false;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function smtp_expect($socket, array $allowedCodes): string
{
    $lastLine = '';
    $code = null;

    while (($line = fgets($socket, 515)) !== false) {
        $lastLine = rtrim($line, "\r\n");

        if (preg_match('/^(\d{3})([ -])(.*)$/', $lastLine, $matches) === 1) {
            $code = (int)$matches[1];
            $separator = $matches[2];

            if ($separator === ' ') {
                break;
            }
        }
    }

    if ($code === null || !in_array($code, $allowedCodes, true)) {
        throw new RuntimeException('Unexpected SMTP response: ' . $lastLine);
    }

    return $lastLine;
}

function smtp_command($socket, string $command, array $allowedCodes): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $allowedCodes);
}

function smtp_send_mail(array $cfg, string $from, string $to, string $replyTo, string $subject, string $body): void
{
    $host = (string)($cfg['SMTP_HOST'] ?? '');
    $port = (int)($cfg['SMTP_PORT'] ?? 0);
    $user = (string)($cfg['SMTP_USER'] ?? '');
    $pass = (string)($cfg['SMTP_PASS'] ?? '');
    $secure = strtolower((string)($cfg['SMTP_SECURE'] ?? 'tls'));

    if ($host === '' || $port <= 0 || $user === '' || $pass === '') {
        throw new RuntimeException('SMTP configuration is incomplete.');
    }

    $transportHost = $secure === 'ssl' ? 'ssl://' . $host : $host;

    $socket = @stream_socket_client(
        $transportHost . ':' . $port,
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );

    if ($socket === false) {
        throw new RuntimeException('Unable to connect to SMTP server: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, 15);

    try {
        smtp_expect($socket, [220]);

        $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
        smtp_command($socket, 'EHLO ' . $serverName, [250]);

        if ($secure === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);

            $cryptoEnabled = stream_socket_enable_crypto(
                $socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            );

            if ($cryptoEnabled !== true) {
                throw new RuntimeException('Unable to enable TLS encryption.');
            }

            smtp_command($socket, 'EHLO ' . $serverName, [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($user), [334]);
        smtp_command($socket, base64_encode($pass), [235]);

        smtp_command($socket, 'MAIL FROM:<' . $from . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

        $headers = [
            'From: ' . $from,
            'To: ' . $to,
            'Reply-To: ' . $replyTo,
            'Subject: DevOpsDays Santiago | Contacto desde la web - ' . $encodedSubject,
            'Date: ' . date('r'),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $message = str_replace(["\r\n", "\r"], "\n", $message);
        $message = (string)preg_replace('/^\./m', '..', $message);
        $message = str_replace("\n", "\r\n", $message);

        fwrite($socket, $message . "\r\n.\r\n");
        smtp_expect($socket, [250]);

        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, [
        'ok' => false,
        'error' => 'method_not_allowed',
        'details' => [
            'allowed_method' => 'POST',
            'received_method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
        ],
    ]);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
    invalid_input_response('invalid_content_type', [
        'content_type' => $contentType === '' ? 'missing' : $contentType,
    ]);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode((string)$rawBody, true);

if (!is_array($payload)) {
    invalid_input_response('invalid_json_body');
}

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$subject = sanitize_header_value((string)($payload['subject'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
$website = trim((string)($payload['website'] ?? ''));

if ($website !== '') {
    invalid_input_response('honeypot_triggered', [
        'website' => 'must_be_empty',
    ]);
}

$validationErrors = [];

$nameLength = str_length($name);
if ($nameLength < 2 || $nameLength > 120) {
    $validationErrors['name'] = 'must_be_between_2_and_120_chars';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validationErrors['email'] = 'must_be_valid_email';
}

$subjectLength = str_length($subject);
if ($subjectLength < 3 || $subjectLength > 180) {
    $validationErrors['subject'] = 'must_be_between_3_and_180_chars';
}

$messageLength = str_length($message);
if ($messageLength < 10 || $messageLength > 5000) {
    $validationErrors['message'] = 'must_be_between_10_and_5000_chars';
}

if (count($validationErrors) > 0) {
    invalid_input_response('validation_failed', $validationErrors);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (is_rate_limited($ip, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_SECONDS)) {
    json_response(429, [
        'ok' => false,
        'error' => 'rate_limited',
        'details' => [
            'max_requests' => RATE_LIMIT_MAX_REQUESTS,
            'window_seconds' => RATE_LIMIT_WINDOW_SECONDS,
        ],
    ]);
}

$config = load_smtp_config();
if ($config === null) {
    json_response(500, [
        'ok' => false,
        'error' => 'send_failed',
        'details' => [
            'reason' => 'smtp_config_not_found_or_invalid',
        ],
    ]);
}

$timestamp = date('c');
$userAgent = trim((string)($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'));
$mailSubject = '[Contacto web] ' . $subject;
$mailBody = "Nuevo mensaje desde formulario de contacto\n\n"
    . "Nombre: {$name}\n"
    . "Email: {$email}\n"
    . "Asunto: {$subject}\n\n"
    . "Mensaje:\n{$message}\n\n"
    . "IP: {$ip}\n"
    . "User-Agent: {$userAgent}\n"
    . "Fecha servidor: {$timestamp}\n";

try {
    smtp_send_mail(
        $config,
        'contacto@devopsdayschile.cl',
        'contacto@devopsdayschile.cl',
        $email,
        $mailSubject,
        $mailBody
    );

    json_response(200, ['ok' => true, 'message' => 'Mensaje enviado']);
} catch (Throwable $exception) {
    json_response(500, [
        'ok' => false,
        'error' => 'send_failed',
        'details' => [
            'reason' => 'smtp_delivery_failed',
        ],
    ]);
}
