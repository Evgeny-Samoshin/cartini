/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, Scissors, CheckCircle } from 'lucide-react';
import { CaseStudy, NicheId } from '../types';
import { CASE_STUDIES } from '../data';

interface PortfolioPageProps {
  onNavigateToCase: (caseId: string) => void;
  onOpenCallback: (niche?: string) => void;
}

export default function PortfolioPage({ onNavigateToCase, onOpenCallback }: PortfolioPageProps) {
  const [selectedNiche, setSelectedNiche] = useState<NicheId | 'all'>('all');

  const nichesFilters = [
    { id: 'all', label: 'Все проекты' },
    { id: 'hotels', label: 'Отели' },
    { id: 'horeca', label: 'Рестораны' },
    { id: 'offices', label: 'Офисы' },
    { id: 'culture', label: 'Сцены и залы' },
    { id: 'designers', label: 'Дизайнеры' }
  ] satisfies { id: NicheId | 'all'; label: string }[];

  const filteredCases = selectedNiche === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c: CaseStudy) => c.niche === selectedNiche);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Page Header */}
        <div className="max-w-2xl mb-12 animate-fade-up">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Выполненное</span>
          <h1 className="text-balance text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
            Типовые проекты и сценарии
          </h1>
          <p className="text-secondary text-sm md:text-base mt-3 leading-relaxed">
            Здесь собраны типовые проектные сценарии CARTINI. Реальные фотографии, названия клиентов и точные цифры можно добавить после согласования материалов.
          </p>
        </div>

        {/* Niche Category Tags Filters Row */}
        <div className="flex flex-wrap items-center gap-2 mb-10 animate-fade-up">
          {nichesFilters.map((nf) => {
            const isActive = selectedNiche === nf.id;
            return (
              <button
                key={nf.id}
                onClick={() => setSelectedNiche(nf.id)}
                className={`px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-primary border-primary text-accent shadow-lg shadow-black/10'
                    : 'bg-white/80 border-gray-200 text-primary hover:-translate-y-0.5 hover:bg-bg-warm'
                }`}
              >
                {nf.label}
              </button>
            );
          })}
        </div>

        {/* Сетка кейсов / Case studies grid */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCases.map((cs: CaseStudy) => (
              <div
                key={cs.id}
                className="group overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/90 shadow-[0_16px_50px_rgba(17,17,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(17,17,17,0.14)] flex flex-col"
              >
                {/* Cover image height adjusted for detail */}
                <div className="relative h-64 md:h-76 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

                  {/* Badges row inside Image frame */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="p-1 px-3 bg-accent text-white font-bold text-[10px] tracking-[0.18em] uppercase rounded-full shadow-sm">
                      Тираж: {cs.paramQuantity} шт.
                    </span>
                    <span className="p-1 px-3 bg-white text-primary font-bold text-[10px] tracking-[0.18em] uppercase rounded-full shadow-sm">
                      Срок: {cs.paramDurationDays} дн.
                    </span>
                  </div>

                  <span className="absolute bottom-4 left-4 text-accent text-xs font-bold uppercase tracking-wider">
                    {cs.categoryTitle}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-primary leading-snug transition-colors group-hover:text-accent">
                      {cs.title}
                    </h3>
                    <p className="text-secondary text-sm mt-3 leading-relaxed border-l-2 border-accent/30 pl-3 italic">
                      {cs.briefResult}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-secondary font-medium">
                      Тип товара: <strong className="text-primary">{cs.paramProductType}</strong>
                    </div>

                    <button
                      onClick={() => onNavigateToCase(cs.id)}
                    className="inline-flex items-center gap-1.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                    >
                      Детали проекта
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty / Пусто state */
          <div className="paper-panel mx-auto flex max-w-xl flex-col items-center rounded-[1.5rem] border border-white/70 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Scissors className="h-8 w-8 text-accent shrink-0" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">
              Кейсы в этой нише формируются
            </h3>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Мы регулярно пополняем наше портфолио за счет съемок в цеху. Мы шьем любые изделия мелким и крупным оптом. Позвоните нам или оставьте заявку, и мы покажем примеры выполненных работ в этой тематике лично.
            </p>
            <button onClick={() => onOpenCallback(selectedNiche)} className="h-11 rounded-full bg-accent px-6 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B58428] cursor-pointer">
              Рассказать о моей задаче
            </button>
          </div>
        )}

        {/* Quality guarantee badges footer */}
        <div className="mt-20 grid grid-cols-1 gap-8 rounded-[2rem] border-b-4 border-accent bg-primary p-8 text-gray-300 shadow-[0_26px_90px_rgba(17,17,17,0.18)] md:grid-cols-3 md:p-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Контроль спецификации
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Проверяем размеры, комплектность, обработку краев и соответствие изделий ведомости помещений.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Подбор тканей под задачу
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Смотрим плотность, степень затемнения, уход, устойчивость цвета и поведение складки.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Комплектация по объекту
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Передаем комплекты по номерам, залам, этажам или зонам, чтобы монтаж шел без путаницы.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
