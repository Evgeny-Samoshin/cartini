import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    smartCaptcha?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => number;
      destroy?: (widgetId: number) => void;
    };
  }
}

interface SmartCaptchaProps {
  onToken: (token: string) => void;
}

export default function SmartCaptcha({ onToken }: SmartCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = import.meta.env.VITE_YANDEX_CAPTCHA_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let widgetId: number | undefined;
    let attempts = 0;
    const renderCaptcha = () => {
      if (widgetId !== undefined || !containerRef.current) return;
      if (window.smartCaptcha) {
        widgetId = window.smartCaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onToken,
        });
      } else if (attempts < 50) {
        attempts += 1;
        window.setTimeout(renderCaptcha, 100);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-smartcaptcha]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
      script.async = true;
      script.defer = true;
      script.dataset.smartcaptcha = 'true';
      script.onload = renderCaptcha;
      document.head.appendChild(script);
    } else {
      renderCaptcha();
    }

    return () => {
      if (widgetId !== undefined) {
        window.smartCaptcha?.destroy?.(widgetId);
      }
    };
  }, [onToken, siteKey]);

  if (!siteKey) return null;

  return <div ref={containerRef} className="mt-4 min-h-20" />;
}
