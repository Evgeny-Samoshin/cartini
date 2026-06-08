/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Loader2, Phone, User, FileText, Settings } from 'lucide-react';
import { submitLead } from '../submitLead';
import SmartCaptcha from './SmartCaptcha';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNiche?: string;
}

export default function CallbackModal({ isOpen, onClose, initialNiche = '' }: CallbackModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [niche, setNiche] = useState(initialNiche || 'hotels');
  const [remarks, setRemarks] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNiche(initialNiche || 'hotels');
      setIsSuccess(false);
      setErrorText('');
    }
  }, [initialNiche, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) {
      setErrorText('Пожалуйста, введите ваше имя');
      return;
    }
    if (!phone.trim()) {
      setErrorText('Пожалуйста, введите номер телефона для связи');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorText('Пожалуйста, введите корректный номер телефона');
      return;
    }

    try {
      setIsLoading(true);
      await submitLead({
        name,
        phone,
        niche,
        message: remarks,
        source: 'callback-modal',
        captchaToken,
      });
      setIsSuccess(true);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : 'Не удалось отправить заявку. Напишите нам в WhatsApp или Telegram.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setNiche(initialNiche || 'hotels');
    setRemarks('');
    setCaptchaToken('');
    setIsSuccess(false);
    setErrorText('');
    onClose();
  };

  return (
    <div
      id="callback-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 transition-colors duration-200"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'callback-modal-overlay') {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden border border-primary/20 bg-bg-main shadow-[0_20px_60px_rgba(0,0,0,0.18)] animate-fade-up">
        {/* Header decoration bar */}
        <div className="h-2 bg-accent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary transition-all-custom p-1.5 rounded-full hover:bg-bg-warm"
          aria-label="Закрыть модальное окно"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-8">
            <h3 className="mb-2 font-serif text-3xl font-bold text-primary">
              Обсудить ваш заказ
            </h3>
            <p className="text-secondary text-sm mb-6">
              Заполните краткую форму. Мы уточним размеры, ткани и состав проекта, затем подготовим предварительную вилку стоимости.
            </p>

            {errorText && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-100">
                {errorText}
              </div>
            )}

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Ваше имя *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Например, Иван"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white/90 pl-9 pr-3 text-sm transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Номер телефона или Мессенджер *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white/90 pl-9 pr-3 text-sm transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Niche Choice */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Ниша или направление пошива
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                    <Settings className="h-4 w-4 text-secondary" />
                  </span>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    disabled={isLoading}
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white/90 pl-9 pr-3 text-sm transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                  >
                    <option value="hotels">Гостиницы и отели</option>
                    <option value="horeca">Рестораны и кафе</option>
                    <option value="offices">Офисы и бизнес-центры</option>
                    <option value="medical">Медицина и социальные объекты</option>
                    <option value="culture">Театры, ДК и конференц-залы</option>
                    <option value="designers">Дизайнеры интерьеров</option>
                    <option value="developers">Застройщики</option>
                    <option value="wholesale">Шоурумы и оптовые партнеры</option>
                    <option value="other">Другое / индивидуальный проект</option>
                  </select>
                </div>
              </div>

              {/* Remarks Area */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Краткое описание задачи
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-secondary">
                    <FileText className="h-4 w-4" />
                  </span>
                  <textarea
                    placeholder="Например: отель, 42 окна, нужны блэкаут и тюль; есть размеры и фото помещений..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    disabled={isLoading}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white/90 py-2 pl-9 pr-3 text-sm transition-all duration-150 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <SmartCaptcha onToken={setCaptchaToken} />

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full cursor-pointer items-center justify-center bg-accent text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-accent-hover disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="h-12 w-full border border-gray-300 bg-white px-6 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors duration-150 hover:bg-bg-warm disabled:opacity-60 sm:w-auto"
              >
                Отмена
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-gray-500 leading-normal">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Данные используются только для ответа на заявку.
            </p>
          </form>
        ) : (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="mb-4 rounded-full bg-green-50 p-3 text-green-600">
              <CheckCircle className="h-16 w-16" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">
              Заявка успешно принята!
            </h3>
            <p className="text-secondary text-sm max-w-md mb-6 leading-relaxed">
              Спасибо за обращение, <strong>{name}</strong>! Мы получили вводные по проекту.
              <br />
              Свяжемся с вами по номеру <strong className="text-accent">{phone}</strong>, чтобы уточнить размеры, ткани и сроки.
            </p>

            <button
              onClick={resetForm}
              className="flex h-11 min-w-44 w-full cursor-pointer items-center justify-center bg-primary text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto"
            >
              Отлично
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
