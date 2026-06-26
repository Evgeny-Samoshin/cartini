import { ArrowRight, Check, ClipboardList, Ruler, Scissors, Truck } from 'lucide-react';
import { PageId } from '../types';
import { WORKS, CATALOG } from '../data';

interface MainPageProps {
  onNavigate: (page: PageId) => void;
  onNavigateSEO: (slug: string) => void;
  onNavigateCategory: (slug: string) => void;
  onOpenCallback: (niche?: string) => void;
}

const asset = (path: string) => import.meta.env.BASE_URL + path;
const labelForSlug = (slug: string) => CATALOG.find((c) => c.slug === slug)?.navLabel ?? slug;

export default function MainPage({ onNavigate, onNavigateSEO, onNavigateCategory, onOpenCallback }: MainPageProps) {
  const products = CATALOG.filter((c) => c.kind === 'product');
  const spaces = CATALOG.filter((c) => c.kind === 'room' || c.kind === 'outdoor');
  const works = WORKS.slice(0, 3);

  const process = [
    { title: 'Заявка', desc: 'Оставляете заявку — мы созваниваемся и согласуем удобное время выезда.', icon: ClipboardList },
    { title: 'Бесплатный замер', desc: 'Мастер приезжает с образцами тканей, снимает размеры, помогает выбрать.', icon: Ruler },
    { title: 'Пошив', desc: 'Шьём по вашим размерам в собственном цехе, от 7 рабочих дней.', icon: Scissors },
    { title: 'Доставка и монтаж', desc: 'Привозим, вешаем шторы, устанавливаем карниз и регулируем механизмы.', icon: Truck }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-primary/15">
        <div className="mx-auto grid min-h-[640px] max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6 animate-fade-up">
            <p className="mb-7 border-l border-accent pl-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              CARTINI · швейный цех в Саратове
            </p>
            <h1 className="text-balance max-w-[650px] font-serif text-5xl font-medium leading-[0.98] text-primary md:text-7xl">
              Шторы на заказ в Саратове
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
              Шьём тюль, рулонные и римские шторы, блэкаут и плиссе по размерам вашего окна. Бесплатный замер на дому, образцы тканей с собой, пошив от 7 дней.
            </p>
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <button
                onClick={() => onOpenCallback('home')}
                className="h-12 border border-accent bg-accent px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Бесплатный замер
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="h-12 border border-primary px-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                Смотреть каталог
              </button>
            </div>
            <div className="mt-10 grid gap-3 border-t border-stone-300/70 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:grid-cols-3">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Замер бесплатно</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Пошив по размерам</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Своё производство</span>
            </div>
          </div>

          <div className="lg:col-span-6 animate-fade-up">
            <figure>
              <div className="overflow-hidden border border-primary/15">
                <img
                  src={asset('assets/cartini-hero-curtains.png')}
                  alt="Шторы на заказ в интерьере — тюль, портьеры и текстиль от CARTINI, Саратов"
                  className="h-[560px] w-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="mt-4 grid gap-2 border-t border-primary/15 pt-4 sm:grid-cols-[1fr_2fr]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Пошив по размерам</span>
                <span className="text-sm leading-relaxed text-secondary">Подбираем ткань под комнату и освещение, шьём точно по вашему окну.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Каталог</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Что мы шьём</h2>
              <p className="mt-3 text-secondary">Выберите тип изделия — расскажем подробнее, покажем работы и рассчитаем стоимость.</p>
            </div>
            <button onClick={() => onNavigate('catalog')} className="h-11 shrink-0 border border-primary px-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white">
              Весь каталог
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <article key={item.slug} className="group border-t border-primary/25 pt-3">
                <button onClick={() => onNavigateCategory(item.slug)} className="block w-full cursor-pointer text-left">
                  <div className="h-52 overflow-hidden">
                    <img src={asset(item.galleryImages[0])} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" referrerPolicy="no-referrer" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Rooms strip */}
      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">По месту</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Шторы для дома и улицы</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {spaces.map((item) => (
              <button
                key={item.slug}
                onClick={() => onNavigateCategory(item.slug)}
                className="group relative h-64 overflow-hidden border border-primary/15 text-left"
              >
                <img src={asset(item.galleryImages[0])} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white">{item.navLabel.replace('В ', 'Шторы в ').replace('На ', 'Шторы на ')}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Как это работает</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">От заявки до готовых штор на окне</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="border-t border-primary/20 py-6 md:border-l md:px-5 first:md:border-l-0 first:md:pl-0">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-accent" />
                    <span className="font-serif text-2xl font-bold text-accent/35">0{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-secondary">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Наши работы</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Примеры выполненных проектов</h2>
            </div>
            <button onClick={() => onNavigate('portfolio')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-hover">
              Все работы <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {works.map((item) => (
              <article key={item.id} className="flex flex-col border-t border-primary/25 pt-3">
                <div className="overflow-hidden"><img src={asset(item.image)} alt={`${item.title} — работа CARTINI, ${item.location}`} className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" referrerPolicy="no-referrer" /></div>
                <div className="flex flex-grow flex-col py-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">{labelForSlug(item.categorySlug)}</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-primary md:min-h-[4rem] lg:min-h-0">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.fabric}</p>
                  <button onClick={() => onNavigateCategory(item.categorySlug)} className="mt-auto self-start inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent">
                    Хочу так же <ArrowRight className="h-4 w-4 text-accent" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* B2B secondary block */}
      <section className="border-b border-primary/15 py-16">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] border border-primary/15 bg-bg-warm/60 p-8 md:flex-row md:items-center md:p-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Работаем с объектами</span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-primary md:text-3xl">Текстиль для отелей, ресторанов и офисов</h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                Шьём объектный текстиль партиями: блэкаут для номерного фонда, текстиль для HoReCa, рулонные и римские шторы для бизнес-центров. Работаем по спецификации и через дизайнеров.
              </p>
            </div>
            <button onClick={() => onNavigateSEO('shtory-dlya-oteley')} className="h-11 shrink-0 border border-primary px-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white">
              Объектам
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Замер</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-primary md:text-5xl">Запишитесь на бесплатный замер</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
            Мастер приедет в удобное время с образцами тканей, снимет точные размеры и поможет выбрать решение под ваш интерьер. Замер по Саратову — бесплатно.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={() => onOpenCallback('home')} className="h-12 rounded bg-accent px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover">
              Записаться на замер
            </button>
            <a href="https://wa.me/79879020909?text=Здравствуйте!%20Хочу%20заказать%20шторы%20и%20записаться%20на%20замер." target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded border border-primary px-8 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
