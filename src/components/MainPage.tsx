import { ArrowRight, Check, ClipboardList, Hotel, Layers, Ruler, ShieldCheck, Store, Theater, Utensils } from 'lucide-react';
import { PageId } from '../types';
import { CASE_STUDIES, SERVICES } from '../data';

interface MainPageProps {
  onNavigate: (page: PageId) => void;
  onNavigateToCase: (caseId: string) => void;
  onNavigateSEO: (slug: string) => void;
  onOpenCallback: (niche?: string) => void;
}

export default function MainPage({ onNavigate, onNavigateToCase, onNavigateSEO, onOpenCallback }: MainPageProps) {
  const segments = [
    {
      title: 'Гостиницы и отели',
      desc: 'Блэкаут, тюль, портьеры, покрывала и текстиль для номерного фонда.',
      slug: 'shtory-dlya-oteley',
      icon: Hotel,
      image: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=600&q=80'
    },
    {
      title: 'Рестораны и кафе',
      desc: 'Портьеры, скатерти, раннеры, чехлы и текстиль для сезонных зон.',
      slug: 'shtory-dlya-restoranov',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
    },
    {
      title: 'Офисы и БЦ',
      desc: 'Римские и рулонные шторы для open space, кабинетов и переговорных.',
      slug: 'shtory-dlya-ofisov',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80'
    },
    {
      title: 'Театры и залы',
      desc: 'Сценические занавесы, кулисы, задники и акустический текстиль.',
      slug: 'scenicheskiy-tekstil',
      icon: Theater,
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80'
    }
  ];

  const process = [
    { title: 'Задача', desc: 'Собираем фото, размеры, планы помещений и сценарии использования.', icon: ClipboardList },
    { title: 'Ткани', desc: 'Подбираем фактуры под свет, уход, акустику и бюджет.', icon: Layers },
    { title: 'Спецификация', desc: 'Фиксируем изделия, размеры, крепления и комплектацию по зонам.', icon: Ruler },
    { title: 'Пошив', desc: 'Запускаем образец или партию с контролем геометрии.', icon: Layers },
    { title: 'Передача', desc: 'Маркируем комплекты по помещениям и готовим к монтажу.', icon: ShieldCheck }
  ];

  return (
    <div>
      <section className="border-b border-primary/15">
        <div className="mx-auto grid min-h-[680px] max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6 animate-fade-up">
            <p className="mb-7 border-l border-accent pl-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              CARTINI · объектный текстиль
            </p>
            <h1 className="text-balance max-w-[650px] font-serif text-5xl font-medium leading-[0.96] text-primary md:text-7xl">
              Шторы и текстильное оформление интерьеров
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
              Проектируем и шьем шторы, портьеры, блэкаут, римские и рулонные системы, сценический и ресторанный текстиль.
            </p>
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <button
                onClick={() => onOpenCallback('hotels')}
                className="h-12 border border-accent bg-accent px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Рассчитать проект
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="h-12 border border-primary px-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                Смотреть проекты
              </button>
            </div>
            <div className="mt-10 grid gap-3 border-t border-stone-300/70 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:grid-cols-3">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> По спецификации</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Комплектация по зонам</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Ткани под эксплуатацию</span>
            </div>
          </div>

          <div className="lg:col-span-6 animate-fade-up">
            <figure>
              <div className="overflow-hidden border border-primary/15">
              <img
                src={import.meta.env.BASE_URL + 'assets/cartini-hero-curtains.png'}
                alt="Премиальный интерьер со шторами, тюлем и объектным текстилем"
                className="h-[560px] w-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              </div>
              <figcaption className="mt-4 grid gap-2 border-t border-primary/15 pt-4 sm:grid-cols-[1fr_2fr]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Проектный подход</span>
                <span className="text-sm leading-relaxed text-secondary">Размеры, ткань, крепления, сборка и маркировка комплектов фиксируются до запуска партии.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-6 md:grid-cols-3">
          {[
            ['Для объектов', 'Работаем с отелями, ресторанами, офисами, учреждениями и дизайнерами интерьеров.'],
            ['Для повторяемости', 'Группируем окна и помещения, чтобы партия выглядела единообразно.'],
            ['Для эксплуатации', 'Подбираем ткани с учетом света, стирки, плотности, складки и сценария использования.']
          ].map(([title, desc], index) => (
            <div key={title} className={`py-5 md:px-8 ${index > 0 ? 'border-t border-white/15 md:border-l md:border-t-0' : ''}`}>
              <p className="font-serif text-2xl font-medium text-white">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Сегменты</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Под каждую нишу свой текстильный сценарий</h2>
            <p className="mt-3 text-secondary">Ассортимент строится вокруг коммерческих интерьеров: от затемнения номера до сцены, переговорной или ресторанного зала.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {segments.map((segment) => {
              const Icon = segment.icon;
              return (
                <article key={segment.slug} className="group border-t border-primary/25 pt-3">
                  <div className="h-52 overflow-hidden">
                    <img src={segment.image} alt={segment.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <div className="py-5">
                    <Icon className="mb-4 h-6 w-6 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                    <h3 className="font-serif text-xl font-bold text-primary">{segment.title}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-relaxed text-secondary">{segment.desc}</p>
                    <button onClick={() => onNavigateSEO(segment.slug)} className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-hover">
                      Открыть направление <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Услуги</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">От замера до готовых комплектов</h2>
            </div>
            <button onClick={() => onNavigate('services')} className="h-11 border border-primary px-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:bg-primary hover:text-white">
              Все услуги
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {SERVICES.slice(0, 3).map((service) => (
              <article key={service.id} className="border-t border-primary/20 py-7 md:border-l md:px-7 first:md:border-l-0 first:md:pl-0">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">от {service.priceFrom || 'расчет'} ₽</p>
                <h3 className="mt-3 font-serif text-xl font-bold text-primary">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{service.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Процесс</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Понятный путь от идеи до монтажа</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5">
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

      <section className="border-b border-primary/15 py-24">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Проекты</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Типовые сценарии, которые легко адаптировать</h2>
            </div>
            <button onClick={() => onNavigate('portfolio')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-hover">
              Все проекты <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {CASE_STUDIES.slice(0, 2).map((item) => (
              <article key={item.id} className="border-t border-primary/25 pt-3">
                <div className="overflow-hidden"><img src={item.image} alt={item.title} className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" referrerPolicy="no-referrer" /></div>
                <div className="py-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">{item.categoryTitle}</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.briefResult}</p>
                  <button onClick={() => onNavigateToCase(item.id)} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent">
                    Разобрать сценарий <ArrowRight className="h-4 w-4 text-accent" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24">
        <div className="mx-auto max-w-[900px] px-6 text-center text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Расчет</span>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">Подготовим вилку стоимости по вашему объекту</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base">
            Пришлите тип объекта, размеры или фотографии окон, желаемые ткани и сроки. Мы вернемся с предварительной спецификацией и вопросами для точного расчета.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={() => onOpenCallback('hotels')} className="h-12 rounded bg-accent px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover">
              Оставить заявку
            </button>
            <a href="https://wa.me/78452993104?text=Здравствуйте!%20Хочу%20рассчитать%20шторы%20и%20объектный%20текстиль." target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded border border-gray-500 px-8 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-accent hover:text-accent">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
