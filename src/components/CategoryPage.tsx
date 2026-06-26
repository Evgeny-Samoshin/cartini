/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Ruler, Check, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { CATALOG, FAQS } from '../data';
import { submitLead } from '../submitLead';
import SmartCaptcha from './SmartCaptcha';

interface CategoryPageProps {
  slug: string;
  onNavigateCategory: (slug: string) => void;
  onOpenCallback: (niche?: string) => void;
  onNavigate: (page: PageId) => void;
}

const asset = (path: string) => import.meta.env.BASE_URL + path;

export default function CategoryPage({
  slug,
  onNavigateCategory,
  onOpenCallback,
  onNavigate
}: CategoryPageProps) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const config = CATALOG.find((c) => c.slug === slug);

  if (!config) {
    return (
      <div className="py-24 text-center bg-bg-warm">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow border border-gray-100">
          <p className="text-secondary mb-4">Страница не найдена.</p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 h-10 rounded bg-primary text-white font-bold text-xs uppercase"
          >
            В каталог
          </button>
        </div>
      </div>
    );
  }

  const relatedItems = (config.relatedSlugs ?? [])
    .map((s) => CATALOG.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const faqItems = (config.faqIds ?? [])
    .map((id) => FAQS.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Пожалуйста, введите ваше имя');
      return;
    }
    if (formPhone.replace(/\D/g, '').length < 7) {
      setFormError('Введите корректный номер телефона');
      return;
    }

    try {
      setIsSending(true);
      await submitLead({
        name: formName,
        phone: formPhone,
        niche: config.slug,
        message: `Заявка со страницы: ${config.title}`,
        source: `category:${config.slug}`,
        captchaToken,
      });
      setIsSent(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Не удалось отправить запрос. Напишите нам в мессенджер.');
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormName('');
    setFormPhone('');
    setIsSent(false);
    setFormError('');
    setCaptchaToken('');
  };

  return (
    <div>
      {/* 1. Hero */}
      <section className="border-b border-primary/15">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6 animate-fade-up">
            <span className="rounded-full bg-accent/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Саратов · {config.keyword}
            </span>
            <h1 className="text-balance mt-4 font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
              {config.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
              {config.heroDescription}
            </p>
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <button
                onClick={() => onOpenCallback(config.slug)}
                className="h-12 border border-accent bg-accent px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Бесплатный замер
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="h-12 border border-primary px-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                Наши работы
              </button>
            </div>
            <div className="mt-10 grid gap-3 border-t border-stone-300/70 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:grid-cols-3">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Замер бесплатно</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Пошив по размерам</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {config.priceFrom}</span>
            </div>
          </div>

          <div className="lg:col-span-6 animate-fade-up">
            <div className="overflow-hidden border border-primary/15">
              <img
                src={asset(config.galleryImages[0])}
                alt={config.title}
                className="h-[480px] w-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro SEO-text */}
      <section className="border-b border-primary/15 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-5 text-base leading-relaxed text-secondary">
            {config.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Variants */}
      {config.variants && config.variants.length > 0 && (
        <section className="border-b border-primary/15 py-24">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Виды</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Что мы предлагаем</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {config.variants.map((variant, idx) => (
                <article key={variant.title} className="border-t border-primary/20 py-7 md:border-l md:px-7 first:md:border-l-0 first:md:pl-0">
                  <span className="font-serif text-2xl font-bold text-accent/35">0{idx + 1}</span>
                  <h3 className="mt-3 font-serif text-xl font-bold text-primary">{variant.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{variant.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Gallery */}
      {config.galleryImages.length > 1 && (
        <section className="border-b border-primary/15 py-24">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Наши работы</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Примеры из нашего цеха</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {config.galleryImages.map((img, idx) => (
                <div key={idx} className="overflow-hidden border border-primary/15">
                  <img
                    src={asset(img)}
                    alt={`${config.navLabel} — пример работы CARTINI ${idx + 1}, Саратов`}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Price + CTA strip */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Стоимость</p>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">{config.navLabel} — {config.priceFrom}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
              Точную стоимость назовём после бесплатного замера: она зависит от ткани, размеров окна и сборки.
            </p>
          </div>
          <button
            onClick={() => onOpenCallback(config.slug)}
            className="flex h-12 shrink-0 items-center gap-2 rounded bg-accent px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            <Ruler className="h-4 w-4" /> Записаться на замер
          </button>
        </div>
      </section>

      {/* 6. Related */}
      {relatedItems.length > 0 && (
        <section className="border-b border-primary/15 py-24">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Смотрите также</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Похожие решения</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedItems.map((item) => (
                <article key={item.slug} className="group border-t border-primary/25 pt-3">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={asset(item.galleryImages[0])}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="py-5">
                    <h3 className="font-serif text-xl font-bold text-primary">{item.navLabel}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-relaxed text-secondary">{item.priceFrom}</p>
                    <button
                      onClick={() => onNavigateCategory(item.slug)}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-hover"
                    >
                      Подробнее <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      {faqItems.length > 0 && (
        <section className="border-b border-primary/15 py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Вопросы и ответы</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Частые вопросы</h2>
            </div>
            <div className="divide-y divide-primary/10 border-y border-primary/10">
              {faqItems.map((faq) => (
                <details key={faq.id} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-serif text-lg font-bold text-primary">
                    {faq.question}
                    <ChevronRight className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Lead form */}
      <section className="py-24">
        <div className="mx-auto max-w-[640px] px-6">
          <div className="paper-panel rounded-[2rem] border border-white/70 p-8 text-center shadow-[0_24px_80px_rgba(17,17,17,0.12)] flex flex-col items-center">
            {!isSent ? (
              <form onSubmit={handleFormSubmit} className="w-full">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Бесплатный замер</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-3">
                  Запишитесь на замер в удобное время
                </h3>
                <p className="text-secondary text-xs mb-6">
                  Оставьте имя и телефон — мастер свяжется с вами, согласует время выезда и привезёт образцы тканей.
                </p>

                {formError && (
                  <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-100">
                    {formError}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Например, Екатерина"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      disabled={isSending}
                      className="w-full h-11 px-3 text-sm rounded bg-bg-warm border border-gray-300 focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Ваш номер телефона *</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      disabled={isSending}
                      className="w-full h-11 px-3 text-sm rounded bg-bg-warm border border-gray-300 focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <SmartCaptcha onToken={setCaptchaToken} />

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 flex items-center justify-center rounded bg-accent text-white hover:bg-accent-hover font-bold uppercase text-xs tracking-wider cursor-pointer mt-6 disabled:opacity-75"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    'Записаться на замер'
                  )}
                </button>
              </form>
            ) : (
              <div className="py-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-xl">✓</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Заявка отправлена!</h3>
                <p className="text-secondary text-xs max-w-sm mb-6 leading-relaxed">
                  Спасибо, <strong>{formName}</strong>! Мы свяжемся с вами по номеру <strong>{formPhone}</strong>, чтобы согласовать время бесплатного замера.
                </p>
                <button
                  onClick={handleReset}
                  className="h-10 px-6 rounded bg-primary text-white font-bold uppercase text-xs tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
