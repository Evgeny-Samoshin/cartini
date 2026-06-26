/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { CATALOG } from '../data';

interface CatalogPageProps {
  onNavigateCategory: (slug: string) => void;
  onOpenCallback: (niche?: string) => void;
}

const asset = (path: string) => import.meta.env.BASE_URL + path;

export default function CatalogPage({ onNavigateCategory, onOpenCallback }: CatalogPageProps) {
  const products = CATALOG.filter((c) => c.kind === 'product');
  const spaces = CATALOG.filter((c) => c.kind === 'room' || c.kind === 'outdoor');

  const renderCard = (slug: string) => {
    const item = CATALOG.find((c) => c.slug === slug)!;
    return (
      <article key={item.slug} className="group border-t border-primary/25 pt-3">
        <button onClick={() => onNavigateCategory(item.slug)} className="block w-full text-left cursor-pointer">
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
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-accent">{item.priceFrom}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors group-hover:text-accent-hover">
              Открыть <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </article>
    );
  };

  return (
    <div>
      <section className="border-b border-primary/15">
        <div className="mx-auto max-w-[1440px] px-6 py-16 lg:py-20">
          <p className="mb-5 border-l border-accent pl-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            Каталог · Саратов
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
            Шторы и текстиль на заказ — по типам изделий
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
            Выберите, что вам нужно: тюль, рулонные или римские шторы, блэкаут, плиссе или карнизы. Сошьём по размерам вашего окна с бесплатным выездом на замер.
          </p>
        </div>
      </section>

      <section className="border-b border-primary/15 py-20">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">По типу изделия</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Виды штор и аксессуары</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => renderCard(p.slug))}
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 py-20">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">По месту</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Шторы для дома и улицы</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {spaces.map((s) => renderCard(s.slug))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Не знаете, что выбрать?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
            Запишитесь на бесплатный замер — мастер приедет с образцами тканей, подскажет решение под ваше окно и интерьер.
          </p>
          <button
            onClick={() => onOpenCallback('catalog')}
            className="mt-8 h-12 rounded bg-accent px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            Записаться на замер
          </button>
        </div>
      </section>
    </div>
  );
}
