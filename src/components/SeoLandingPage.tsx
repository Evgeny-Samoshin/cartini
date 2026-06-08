/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ShieldCheck, AlertCircle, ChevronRight, Loader2 } from 'lucide-react';
import { CaseStudy, PageId } from '../types';
import { SEO_NICHES, CASE_STUDIES } from '../data';
import { submitLead } from '../submitLead';
import SmartCaptcha from './SmartCaptcha';

interface SeoLandingPageProps {
  slug: string;
  onNavigateToCase: (caseId: string) => void;
  onOpenCallback: (niche?: string) => void;
  onNavigate: (page: PageId) => void;
}

export default function SeoLandingPage({
  slug,
  onNavigateToCase,
  onOpenCallback,
  onNavigate
}: SeoLandingPageProps) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  // Find SEO config corresponding to slug
  const config = SEO_NICHES.find((s) => s.slug === slug);

  if (!config) {
    return (
      <div className="py-24 text-center bg-bg-warm">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow border border-gray-100">
          <p className="text-secondary mb-4">Посадочная страница не найдена.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 h-10 rounded bg-primary text-white font-bold text-xs uppercase"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  // Filter case studies by configuration's default niche
  const nicheCases = CASE_STUDIES.filter((c: CaseStudy) => c.niche === config.defaultNiche);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Пожалуйста, введите ваше имя');
      return;
    }
    if (!formPhone.trim()) {
      setFormError('Пожалуйста, введите телефон');
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
        niche: config.defaultNiche,
        message: `Заявка со страницы: ${config.title}`,
        source: `seo:${config.slug}`,
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
      {/* 1. Hero Block with Niche keyword branding */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="max-w-3xl flex flex-col items-start gap-4">
            <span className="rounded-full bg-accent/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              B2B Саратов · {config.keyword}
            </span>
            <h1 className="text-balance mt-1 text-3xl font-serif font-bold leading-tight text-primary md:text-5xl">
              {config.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
              {config.heroDescription}
            </p>

            <button
              onClick={() => onOpenCallback(config.defaultNiche)}
              className="mt-4 h-12 cursor-pointer rounded-full bg-accent px-8 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Рассчитать стоимость пошива
            </button>
          </div>
        </div>
      </section>

      {/* 2. Pains and Solutions Side-by-Side comparison */}
      <section className="border-b border-gray-100 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Проблемы и решения</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2">
              С какими трудностями сталкиваются клиенты в этой нише?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pains block card list */}
            <div className="rounded-[1.5rem] border border-red-100/60 bg-red-50/50 p-6 md:p-8">
              <h3 className="text-red-700 font-bold font-serif text-lg mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Как бывает без объектной спецификации:
              </h3>
              <div className="space-y-6">
                {config.pains.map((pain, pIdx) => (
                  <div key={pIdx} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <h4 className="text-primary font-bold text-sm">{pain.title}</h4>
                      <p className="text-secondary text-xs mt-1 leading-relaxed">{pain.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions block card list */}
            <div className="rounded-[1.5rem] border border-green-100/60 bg-green-50/50 p-6 md:p-8">
              <h3 className="text-green-800 font-bold font-serif text-lg mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Как CARTINI закрывает эти риски:
              </h3>
              <div className="space-y-6">
                {config.solutions.map((sol, sIdx) => (
                  <div key={sIdx} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-primary font-bold text-sm">{sol.title}</h4>
                      <p className="text-secondary text-xs mt-1 leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Niche-specific Case list */}
      {nicheCases.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Наш опыт</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2">
                Реальные кейсы в этом направлении
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {nicheCases.map((nc) => (
                <div key={nc.id} className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-[0_14px_45px_rgba(17,17,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)] flex flex-col justify-between">
                  <div className="h-48 overflow-hidden">
                    <img src={nc.image} alt={nc.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{nc.categoryTitle}</span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-primary">{nc.title}</h3>
                    <p className="text-secondary text-xs mt-2 italic border-l-2 border-accent/25 pl-3">{nc.briefResult}</p>

                    <button
                      onClick={() => onNavigateToCase(nc.id)}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                    >
                      Смотреть подробности кейса
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Target Specific Pricing spreadsheets */}
      <section className="border-b border-gray-100 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Нишевые цены</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2">
              Примерная вилка цен по направлению
            </h2>
          </div>

          <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-[0_14px_45px_rgba(17,17,17,0.08)]">
            <div className="grid grid-cols-3 bg-primary p-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
              <span className="col-span-2">Изделие</span>
              <span className="text-right">Цена пошива</span>
            </div>
            <div className="divide-y divide-gray-100">
              {config.priceRange.map((p, idx) => (
                <div key={idx} className="grid grid-cols-3 items-center p-4 text-sm transition-colors hover:bg-bg-warm/80 md:text-base">
                  <span className="col-span-2 font-bold text-primary text-xs md:text-sm">{p.item}</span>
                  <span className="text-right font-serif font-bold text-accent text-sm md:text-base">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. In-Screen Lead Capture Form with simulation feedback */}
      <section className="border-t border-gray-100 py-24">
        <div className="mx-auto max-w-[640px] px-6">
          <div className="paper-panel rounded-[2rem] border border-white/70 p-8 text-center shadow-[0_24px_80px_rgba(17,17,17,0.12)] flex flex-col items-center">
            {!isSent ? (
              <form onSubmit={handleFormSubmit} className="w-full">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Получить калькуляцию</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-3">
                  Узнать стоимость вашего тиража
                </h3>
                <p className="text-secondary text-xs mb-6">
                  Заполните форму ниже. Мы уточним вводные и подготовим предварительную вилку стоимости по вашему объекту.
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
                      Обработка ТЗ...
                    </>
                  ) : (
                    'Отправить запрос на прайс'
                  )}
                </button>
              </form>
            ) : (
              <div className="py-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-xl">✓</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Запрос отправлен!</h3>
                <p className="text-secondary text-xs max-w-sm mb-6 leading-relaxed">
	                  Спасибо, <strong>{formName}</strong>! Мы получили запрос и свяжемся с вами по номеру <strong>{formPhone}</strong>, чтобы уточнить размеры и состав проекта.
                </p>
                <button
                  onClick={handleReset}
                  className="h-10 px-6 rounded bg-primary text-white font-bold uppercase text-xs tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Отправить еще один запрос
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
