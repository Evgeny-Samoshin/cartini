/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Cpu, Building2, MapPin, Target, ChevronRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';
import { PageId } from '../types';

interface AboutPageProps {
  onOpenCallback: () => void;
  onNavigate: (page: PageId) => void;
}

export default function AboutPage({ onOpenCallback, onNavigate }: AboutPageProps) {
  const qualities = [
    {
      title: 'Точная спецификация объекта',
      desc: 'Фиксируем размеры, типы изделий, ткани, крепления и комплектацию по помещениям.',
      icon: Cpu
    },
    {
      title: 'Работа с фактурой и эксплуатацией',
      desc: 'Подбираем ткани не только по цвету, но и по затемнению, уходу, плотности и поведению складки.',
      icon: Building2
    },
    {
      title: 'Контроль партии и комплектации',
      desc: 'Проверяем геометрию изделий и маркируем комплекты по номерам, этажам, залам или зонам.',
      icon: ShieldCheck
    }
  ];

  const galleryImages = [
    {
      title: 'Раскройный цех',
      desc: 'Многослойный настил ткани и прецизионная резка дисковыми ножами.',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80'
    },
    {
      title: 'Стачивающий узел',
      desc: 'Современные промышленные оверлоки с усиленными направляющими лапками.',
      url: 'https://images.unsplash.com/photo-1528570220003-f9e5a2979342?w=500&q=80'
    },
    {
      title: 'Вышивка и брендирование',
      desc: 'Высокоточные многоигольные вышивальные японские машины Tajima.',
      url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&q=80'
    },
    {
      title: 'Узел финишной ВТО',
      desc: 'Утюжка паром под давлением на вакуумных гладильных столах.',
      url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=500&q=80'
    }
  ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section 1: Hero Story */}
        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-up">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Сделано на совесть</span>
            <h1 className="text-balance text-3xl font-serif font-bold leading-tight text-primary md:text-5xl">
              CARTINI: текстиль, который работает в интерьере
            </h1>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              Мы создаем шторы и объектный текстиль для пространств, где важны одновременно эстетика, повторяемость и практичность: гостиниц, ресторанов, офисов, сценических залов и интерьерных проектов.
            </p>
            <p className="text-secondary text-sm">
              В основе работы CARTINI — понятная спецификация. До запуска мы разбираем помещение, условия эксплуатации, ткани, размеры, крепления и порядок комплектации объекта.
            </p>

            <button
              onClick={() => {
                onNavigate('contacts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all cursor-pointer mt-2"
            >
              Связаться с нами и приехать в офис
              <ChevronRight className="h-4 w-4 text-accent" />
            </button>
          </div>

          <div className="lg:col-span-5 animate-fade-up">
            <div className="relative h-[380px] overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_24px_80px_rgba(17,17,17,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Интерьерный текстиль CARTINI"
                className="h-full w-full object-cover animate-slow-float"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-sm font-bold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>г. Саратов, ул. Астраханская, 88</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Qualities and USP cards */}
        <div className="paper-panel rounded-[2rem] p-8 lg:p-12 soft-border mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Наши сильные стороны</h2>
            <p className="text-xs text-secondary mt-2 uppercase tracking-wide">Что важно в объектном текстиле</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualities.map((q, i) => {
              const IconComp = q.icon;
              return (
                <div key={i} className="rounded-[1.25rem] border border-white/70 bg-white/90 p-6 text-center shadow-[0_14px_45px_rgba(17,17,17,0.08)] flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 shrink-0">
                    <IconComp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 font-serif">{q.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{q.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Team list */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Наши профессионалы</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Люди, которые создают ваши вещи</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((tm) => (
              <div key={tm.id} className="bg-bg-warm rounded-xl p-6 border border-gray-100 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-accent">
                  <img src={tm.image} alt={tm.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-base font-bold text-primary font-serif">{tm.name}</h3>
                <span className="text-xs text-accent mt-0.5 font-medium">{tm.role}</span>
                <p className="text-xs text-secondary leading-relaxed italic mt-4 border-t border-gray-200/50 pt-4">
                  «{tm.quote}»
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Production Photo Gallery grids */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1 font-sans">Фотогалерея</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Оборудование и рабочие зоны цеха</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((gi, index) => (
              <div key={index} className="group overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/90 shadow-[0_14px_45px_rgba(17,17,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)]">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={gi.url}
                    alt={gi.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-primary font-serif">{gi.title}</h4>
                  <p className="text-xs text-secondary mt-1 leading-normal">{gi.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Certificates or Documents segment */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border-b-4 border-accent bg-primary p-8 text-white shadow-[0_30px_100px_rgba(17,17,17,0.22)] md:flex-row md:p-12">
          <div className="flex items-start gap-4">
            <Target className="h-10 w-10 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold font-serif text-white mb-2">Приезжайте на бесплатную экскурсию в Саратовский цех</h3>
              <p className="text-xs text-gray-400 max-w-lg leading-relaxed">
                Обсудим ваш объект, покажем образцы тканей и разберем, какие решения подойдут под свет, эксплуатацию, бюджет и интерьер.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCallback}
            className="h-11 px-6 rounded bg-accent text-white hover:bg-accent-hover font-bold uppercase tracking-wider text-xs transition-colors shrink-0 cursor-pointer"
          >
            Согласовать дату визита
          </button>
        </div>
      </div>
    </div>
  );
}
