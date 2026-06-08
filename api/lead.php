<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Некорректный формат заявки']);
    exit;
}

$name = trim((string)($data['name'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$niche = trim((string)($data['niche'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$source = trim((string)($data['source'] ?? 'site'));
$captchaToken = trim((string)($data['captchaToken'] ?? ''));

if ($name === '' || $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Укажите имя и телефон']);
    exit;
}

if (mb_strlen(preg_replace('/\D+/', '', $phone)) < 7) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Укажите корректный телефон']);
    exit;
}

$captchaSecret = getenv('YANDEX_CAPTCHA_SECRET') ?: '';
if ($captchaSecret !== '') {
    if ($captchaToken === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Подтвердите, что вы не робот']);
        exit;
    }

    $captchaPayload = http_build_query([
        'secret' => $captchaSecret,
        'token' => $captchaToken,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $captchaContext = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $captchaPayload,
            'timeout' => 5,
        ],
    ]);

    $captchaResponse = file_get_contents('https://smartcaptcha.yandexcloud.net/validate', false, $captchaContext);
    $captchaResult = json_decode($captchaResponse ?: '', true);

    if (!is_array($captchaResult) || ($captchaResult['status'] ?? '') !== 'ok') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Капча не пройдена. Попробуйте еще раз']);
        exit;
    }
}

$to = getenv('LEAD_TO_EMAIL') ?: 'info@shvey-saratov.ru';
$from = getenv('LEAD_FROM_EMAIL') ?: 'no-reply@cartini.local';
$subject = 'Заявка с сайта CARTINI';

$bodyLines = [
    'Новая заявка с сайта CARTINI',
    '',
    'Имя: ' . $name,
    'Телефон/мессенджер: ' . $phone,
    'Направление: ' . ($niche !== '' ? $niche : 'не указано'),
    'Источник: ' . $source,
    '',
    'Описание задачи:',
    $message !== '' ? $message : 'не указано',
    '',
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
    'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: CARTINI <' . $from . '>',
    'Reply-To: ' . $from,
];

$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $bodyLines), implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Не удалось отправить письмо. Напишите нам в мессенджер']);
    exit;
}

echo json_encode(['ok' => true]);
