# CARTINI

Сайт штор и объектного текстиля для коммерческих интерьеров.

## Локальный запуск

```bash
npm install
npm run dev
```

## Проверка

```bash
npm run lint
npm run build
```

## Формы и PHP-хостинг

Формы отправляют JSON-заявки на `/api/lead.php`. При сборке Vite копирует обработчик из `public/api/lead.php` в `dist/api/lead.php`.

Настройте на хостинге:

- `YANDEX_CAPTCHA_SECRET` — секретный ключ Яндекс SmartCaptcha;
- `LEAD_TO_EMAIL` — адрес получателя заявок;
- `LEAD_FROM_EMAIL` — разрешенный адрес отправителя.

Для фронтенда задайте `VITE_YANDEX_CAPTCHA_SITE_KEY` перед сборкой. Если ключ и секрет капчи не заданы, локальная форма работает без проверки капчи.

Файл `public/.htaccess` направляет клиентские URL на `index.html`, но оставляет `/api/` доступным для PHP.
