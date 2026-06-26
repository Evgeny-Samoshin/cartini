/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { WORKS, CATALOG } from '../data';

interface PortfolioPageProps {
  onNavigateCategory: (slug: string) => void;
  onOpenCallback: (niche?: string) => void;
}

const asset = (path: string) => import.meta.env.BASE_URL + path;
const labelForSlug = (slug: string) => CATALOG.find((c) => c.slug === slug)?.navLabel ?? slug;

export default function PortfolioPage({ onNavigateCategory, onOpenCallback }: PortfolioPageProps) {
  const [selected, setSelected] = useState<string>('all');

  // Фильтры строим из категорий, реально присутствующих в работах
  const presentSlugs = CATALOG
    .map((c) => c.slug)
    .filter((slug) => WORKS.some((w) => w.categorySlug === slug));

  const filters = [{ slug: 'all', label: 'Все работы' }, ...presentSlugs.map((slug) => ({ slug, label: labelForSlug(slug) }))];

  const filteredWorks = selected === 'all' ? WORKS : WORKS.filter((w) => w.categorySlug === selected);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 animate-fade-up">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Наши работы</span>
          <h1 className="text-balance text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
            Шторы, которые мы сшили в Саратове
          </h1>
          <p className="text-secondary text-sm md:text-base mt-3 leading-relaxed">
            Примеры готовых работ из нашего цеха — по типам изделий и комнатам. Выберите похожее решение, и мы сошьём его по размерам вашего окна.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 animate-fade-up">
          {filters.map((f) => {
            const isActive = selected === f.slug;
            return (
              <button
                key={f.slug}
                onClick={() => setSelected(f.slug)}
                className={`px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-primary border-primary text-accent shadow-lg shadow-black/10'
                    : 'bg-white/80 border-gray-200 text-primary hover:-translate-y-0.5 hover:bg-bg-warm'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Works grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work) => (
            <article
              key={work.id}
              className="group overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/90 shadow-[0_16px_50px_rgba(17,17,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(17,17,17,0.14)] flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={asset(work.image)}
                  alt={`${work.title} — работа CARTINI, ${work.location}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-accent text-xs font-bold uppercase tracking-wider">
                  {labelForSlug(work.categorySlug)}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary leading-snug transition-colors group-hover:text-accent">
                    {work.title}
                  </h3>
                  <p className="text-secondary text-xs mt-2">{work.location}</p>
                  <p className="text-secondary text-sm mt-3 leading-relaxed border-l-2 border-accent/30 pl-3 italic">
                    {work.fabric}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateCategory(work.categorySlug)}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                >
                  Хочу так же
                  <ArrowRight className="h-4 w-4 text-accent" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 grid grid-cols-1 gap-8 rounded-[2rem] border-b-4 border-accent bg-primary p-8 text-gray-300 shadow-[0_26px_90px_rgba(17,17,17,0.18)] md:grid-cols-3 md:p-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Бесплатный замер
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Мастер приедет с образцами тканей, снимет точные размеры и поможет с выбором.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Пошив по размерам
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Шьём в собственном цехе точно по вашему окну, а не по типовым шаблонам.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Доставка и установка
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Привезём, повесим шторы, установим карниз и отрегулируем механизмы.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-accent p-8 md:p-12 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <h3 className="text-xl md:text-3xl font-serif font-bold mb-3">Понравилась какая-то работа?</h3>
          <p className="text-white/85 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            Запишитесь на бесплатный замер — подберём ткань и сошьём похожие шторы по размерам вашего окна.
          </p>
          <button
            onClick={() => onOpenCallback('portfolio')}
            className="h-11 px-8 rounded bg-primary text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer text-center"
          >
            Записаться на замер
          </button>
        </div>
      </div>
    </div>
  );
}
