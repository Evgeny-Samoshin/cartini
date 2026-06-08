/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Check, MessageSquare, Quote, ShoppingBag, FolderOpen, Calendar, HelpCircle } from 'lucide-react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data';

interface CaseDetailPageProps {
  caseStudyId: string;
  onNavigateBack: () => void;
  onNavigateToCase: (caseId: string) => void;
  onOpenCallback: (niche?: string) => void;
}

export default function CaseDetailPage({
  caseStudyId,
  onNavigateBack,
  onNavigateToCase,
  onOpenCallback
}: CaseDetailPageProps) {
  // Find case study details from DB
  const currentCase = CASE_STUDIES.find((c: CaseStudy) => c.id === caseStudyId);

  if (!currentCase) {
    return (
      <div className="bg-bg-warm py-24 text-center">
        <div className="mx-auto max-w-md bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-secondary mb-4">Кейс не найден в нашей базе данных.</p>
          <button
            onClick={onNavigateBack}
            className="h-10 px-6 rounded bg-primary text-white font-bold uppercase tracking-wider text-xs transition-colors"
          >
            Вернуться в портфолио
          </button>
        </div>
      </div>
    );
  }

  // Find related cases (different from the current one but ideally matching niche)
  const relatedCases = CASE_STUDIES
    .filter((c: CaseStudy) => c.id !== currentCase.id)
    .sort((a) => (a.niche === currentCase.niche ? -1 : 1))
    .slice(0, 2);

  return (
    <div className="bg-bg-warm py-12">
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Breadcrumbs / Хлебные крошки */}
        <nav className="flex items-center gap-2 text-xs text-secondary font-medium uppercase tracking-wider mb-8">
          <button onClick={onNavigateBack} className="hover:text-accent transition-colors cursor-pointer">
            Портфолио
          </button>
          <span>/</span>
          <span className="text-primary truncate font-bold">{currentCase.title}</span>
        </nav>

        {/* Back Button and Title */}
        <div className="mb-10">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all cursor-pointer mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к списку кейсов
          </button>

          <span className="inline-block bg-accent/15 text-accent px-3 py-1 text-xs font-bold uppercase tracking-wide rounded mb-3">
            {currentCase.categoryTitle}
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-primary leading-tight">
            {currentCase.title}
          </h1>
        </div>

        {/* Metabar / Параметры заказа */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-gray-100 p-6 rounded-xl shadow-sm mb-12">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <FolderOpen className="h-3.5 w-3.5 text-accent" />
              Продукт
            </span>
            <span className="text-sm font-bold text-primary mt-1.5">{currentCase.paramProductType}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <ShoppingBag className="h-3.5 w-3.5 text-accent" />
              Объем тиража
            </span>
            <span className="text-sm font-bold text-primary mt-1.5">{currentCase.paramQuantity} единиц</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              Время пошива
            </span>
            <span className="text-sm font-bold text-primary mt-1.5">{currentCase.paramDurationDays} дней</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5 text-accent" />
              Формат
            </span>
            <span className="text-sm font-bold text-green-600 mt-1.5 flex items-center gap-1">
              <Check className="h-4 w-4 font-bold" />
              Типовой сценарий
            </span>
          </div>
        </div>

        {/* Case cover images header */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-12 border border-gray-100">
          <img
            src={currentCase.image}
            alt={currentCase.title}
            className="w-full h-[400px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Task Section / Задача */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-12">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4 pb-2 border-b border-gray-100">
            Поставленная задача клиента
          </h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed whitespace-pre-line">
            {currentCase.taskDescription}
          </p>
        </div>

        {/* Work Process / Процесс работы */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">
            Этапы технологической цепочки по кейсу
          </h2>

          <div className="space-y-8">
            {currentCase.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
              >
                {/* Text block */}
                <div className="md:col-span-7 flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-serif font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Optional step illustration */}
                {step.img && (
                  <div className="md:col-span-5 h-44 rounded-lg overflow-hidden border border-gray-100">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Result description */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-12 text-sm md:text-base text-secondary leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4 pb-2 border-b border-gray-100">
            Итоговый результат
          </h2>
          <p>{currentCase.resultDescription}</p>

          {/* Side photos list if exists */}
          {currentCase.otherProductPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {currentCase.otherProductPhotos.map((photo, pIdx) => (
                <div key={pIdx} className="h-44 md:h-52 rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={photo}
                    alt="Униформа крупный план"
	                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client testimonial review / Отзыв */}
        {currentCase.clientReview && (
          <div className="relative bg-primary text-white p-8 rounded-2xl mb-16 shadow-xl border-t-4 border-accent">
            {/* Absolute quotes icon design */}
            <Quote className="absolute top-6 right-6 h-12 w-12 text-white/5 pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Client Face Avatar */}
              {currentCase.clientReview.avatar && (
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-accent">
                  <img
                    src={currentCase.clientReview.avatar}
                    alt={currentCase.clientReview.author}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div>
                <span className="text-[10px] text-accent uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                  <MessageSquare className="h-3.5 w-3.5 text-accent" />
                  Отзыв представителя бренда
                </span>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed italic mb-4">
                  «{currentCase.clientReview.text}»
                </p>

                <div className="text-xs">
                  <strong className="text-white text-sm">{currentCase.clientReview.author}</strong>
                  <span className="text-gray-500 block sm:inline sm:ml-2">({currentCase.clientReview.role})</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Projects Carousel list / Похожие кейсы */}
        <div className="mb-16 border-t border-gray-200 pt-16">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-8 text-center">
            Другие проекты нашего цеха
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedCases.map((rc) => (
              <div
                key={rc.id}
                onClick={() => {
                  onNavigateToCase(rc.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex gap-4 items-center"
              >
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded">
                  <img
                    src={rc.image}
                    alt={rc.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
                    {rc.categoryTitle}
                  </span>
                  <h4 className="text-sm font-bold text-primary line-clamp-2 mt-1 hover:text-accent font-serif">
                    {rc.title}
                  </h4>
                  <span className="text-[11px] text-secondary mt-1 block">Тираж: {rc.paramQuantity} шт.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA B2B bottom trigger */}
        <div className="rounded-2xl bg-accent p-8 md:p-12 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <h3 className="text-xl md:text-3xl font-serif font-bold mb-3">Похожая коммерческая задача?</h3>
          <p className="text-white/85 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            Адаптируем сценарий под размеры, помещения, ткани, крепления и сроки вашего объекта. Для предварительной оценки достаточно фото и примерных размеров.
          </p>
          <button
            onClick={() => onOpenCallback(currentCase.niche)}
            className="h-11 px-8 rounded bg-primary text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer text-center"
          >
            Обсудить мой тираж
          </button>
        </div>
      </div>
    </div>
  );
}
