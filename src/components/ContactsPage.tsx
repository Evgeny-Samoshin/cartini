/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { submitLead } from '../submitLead';
import SmartCaptcha from './SmartCaptcha';

export default function ContactsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Dual-map toggle (visual mock vs real iframe)
  const [isRealMapActive, setIsRealMapActive] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) {
      setErrorText('Пожалуйста, введите ваше имя');
      return;
    }
    if (!phone.trim()) {
      setErrorText('Пожалуйста, укажите контактный телефон');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorText('Введите корректный номер телефона');
      return;
    }

    try {
      setIsSending(true);
      await submitLead({
        name,
        phone,
        message,
        source: 'contacts-page',
        captchaToken,
      });
      setIsSent(true);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : 'Не удалось отправить сообщение. Напишите нам в мессенджер.');
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setMessage('');
    setCaptchaToken('');
    setIsSent(false);
    setErrorText('');
  };

  return (
    <div className="py-16 text-sm text-secondary">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Page Title Header */}
        <div className="mb-12 max-w-2xl animate-fade-up">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Связь с нами</span>
          <h1 className="text-balance text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
            Контакты CARTINI в Саратове
          </h1>
          <p className="text-secondary text-sm md:text-base mt-2 leading-relaxed">
            Напишите нам, чтобы обсудить шторы, сценический текстиль, ресторанный или офисный проект. Для предварительного расчета достаточно описания объекта, фото и примерных размеров.
          </p>
        </div>

        {/* Structural Info Cards Columns */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Phone */}
          <div className="paper-panel rounded-[1.35rem] border border-white/70 p-6 text-center shadow-[0_14px_45px_rgba(17,17,17,0.08)] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Звонок на фабрику</h3>
            <a href="tel:+78452993104" className="text-base font-bold text-primary hover:text-accent transition-colors font-serif block">
              +7 (8452) 99-31-04
            </a>
            <p className="text-xs text-gray-500 mt-1">Звонки бесплатные по РФ</p>
          </div>

          {/* Card 2: Email */}
          <div className="paper-panel rounded-[1.35rem] border border-white/70 p-6 text-center shadow-[0_14px_45px_rgba(17,17,17,0.08)] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Написать нам</h3>
            <a href="mailto:info@shvey-saratov.ru" className="text-base font-bold text-primary hover:text-accent transition-colors block underline">
              info@shvey-saratov.ru
            </a>
            <p className="text-xs text-gray-500 mt-1">Ответ за 30 минут по почте</p>
          </div>

          {/* Card 3: Address */}
          <div className="paper-panel rounded-[1.35rem] border border-white/70 p-6 text-center shadow-[0_14px_45px_rgba(17,17,17,0.08)] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Адрес цеха</h3>
            <span className="text-xs font-bold text-primary block leading-snug">
              Саратов, ул. Астраханская, 88
            </span>
            <p className="text-[11px] text-gray-500 mt-1">Офис 304, литер К6</p>
          </div>

          {/* Card 4: Hours */}
          <div className="paper-panel rounded-[1.35rem] border border-white/70 p-6 text-center shadow-[0_14px_45px_rgba(17,17,17,0.08)] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">График работы</h3>
            <span className="text-xs text-primary font-bold">Будни: 08:00 – 19:00</span>
            <p className="text-[11px] text-gray-500 mt-1">Суббота (по записи): 10:00 – 15:00</p>
          </div>
        </div>

        {/* Form and Map side-by-side splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Form Block (Col span 5) */}
          <div className="paper-panel lg:col-span-5 flex flex-col justify-between rounded-[2rem] border border-white/70 p-8 shadow-[0_24px_80px_rgba(17,17,17,0.12)]">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="w-full">
                <h2 className="text-xl font-serif font-bold text-primary md:text-2xl mb-2">
                  Форма обратной связи
                </h2>
                <p className="text-secondary text-xs mb-6">
                  Напишите нам письмо напрямую. Мы ответим на вопросы партнерства, вышлем каталоги тканей и обсудим ТЗ.
                </p>

                {errorText && (
                  <div className="mb-4 rounded bg-red-50 p-3 text-red-600 font-medium border border-red-100 text-xs">
                    {errorText}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      placeholder="Например, Александр"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSending}
                    className="w-full h-11 rounded-lg border border-gray-300 bg-white/90 px-3 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Телефон / Мессенджер *
                    </label>
                    <input
                      type="tel"
                      placeholder="Например, +7 (927) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSending}
                    className="w-full h-11 rounded-lg border border-gray-300 bg-white/90 px-3 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Сообщение / Ваша задача
                    </label>
                    <textarea
                      placeholder="Опишите вкратце требования вашего бренда к пошиву..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSending}
                      rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <SmartCaptcha onToken={setCaptchaToken} />

                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-accent text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover disabled:opacity-70"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка письма...
                    </>
                  ) : (
                    'Отправить сообщение'
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Сообщение отправлено!</h3>
                <p className="text-secondary text-xs max-w-sm mb-6 leading-relaxed">
                  Спасибо, <strong>{name}</strong>! Ваше обращение принято. Мы свяжемся с вами по номеру <strong className="text-accent">{phone}</strong>, чтобы уточнить детали проекта.
                </p>
                <button
                  onClick={handleReset}
                  className="h-10 rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gray-800 cursor-pointer"
                >
                  Отправить еще раз
                </button>
              </div>
            )}
          </div>

          {/* Interactive Map Block (Col span 7) */}
          <div className="lg:col-span-7 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(17,17,17,0.12)] flex flex-col justify-between">
            <div className="relative flex-grow flex flex-col justify-between h-[340px] lg:h-full min-h-[300px]">
              {/* Map controls */}
              <div className="absolute left-4 top-4 z-10 max-w-xs rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Адрес производства
                </h4>
                <p className="text-[11px] text-secondary leading-normal">
                  Саратов, ул. Астраханская, д. 88 (территория бывшей промзоны у ТРЦ Триумф Молл).
                </p>
                <button
                  onClick={() => setIsRealMapActive(!isRealMapActive)}
                  className="mt-2 flex cursor-pointer items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent hover:underline"
                >
                  {isRealMapActive ? 'Скрыть интерактивную карту' : 'Показать интерактивную Яндекс.Карту'}
                </button>
              </div>

              {isRealMapActive ? (
                /* Real Yandex Maps Iframe */
                <iframe
                  src="https://yandex.com/map-widget/v1/?um=constructor%3A322f9ca2bc239bc7a61d6ce6765275e7aebd84ce64f7dfd67da918a287df5c68&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full min-h-[300px]"
                  title="Yandex Map Saratov Office Location"
                />
              ) : (
                /* Beautiful Premium Vector Mockup Map */
                <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden border border-gray-200 bg-slate-50 p-8">
                  {/* Styled geographical dots backings */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-accent/40 animate-ping" />
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-accent border-2 border-white shadow shadow-accent" />

                  {/* Abstract street grids mockup using borders inside relative space */}
                  <div className="absolute inset-x-0 top-1/2 border-t border-gray-200/85 rotate-[-15deg] pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/3 border-l border-gray-200/85 rotate-[10deg] pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-1/4 border-t border-gray-200/85 rotate-[-5deg] pointer-events-none" />

                  <div className="z-10 text-center flex flex-col items-center">
                    <MapPin className="h-10 w-10 text-accent mb-3 animate-bounce" />
                    <p className="text-primary font-bold text-sm">Схема проезда (климатический ориентир)</p>
                    <p className="text-secondary text-[11px] max-w-sm mt-1.5 leading-normal">
                      Рядом с ТРЦ «Триумф Молл». Ворота со стороны ул. Астраханской. 
                      <br /> Напишите нашему менеджеру — мы закажем для вас бесплатный пропуск на парковку цеха!
                    </p>
                    <button
                      onClick={() => setIsRealMapActive(true)}
                      className="mt-4 h-9 cursor-pointer rounded-full bg-primary px-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent"
                    >
                      Активировать интерактивную карту
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Directions advice text line */}
            <div className="border-t border-gray-100 bg-bg-warm/70 p-4 text-xs leading-relaxed text-secondary">
              <p>
                <strong>Как к нам добраться:</strong> Трамваи №3, №11 (остановка «Астраханская улица»). На машине — заезд с ул. Зарубина. Вход со стороны шлагбаума через проходную №1. При себе необходимо иметь удостоверение личности.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
