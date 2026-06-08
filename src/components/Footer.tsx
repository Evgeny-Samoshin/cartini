/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onNavigateSEO: (slug: string) => void;
}

export default function Footer({ onNavigate, onNavigateSEO }: FooterProps) {
  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSEONavClick = (slug: string) => {
    onNavigateSEO(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-primary pt-16 pb-12 text-gray-300">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company details */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-accent bg-accent font-serif text-lg font-bold text-primary transition-colors duration-200 group-hover:bg-white">
                C
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold tracking-[0.15em] uppercase">
                  CARTINI
                </span>
                <span className="text-[11px] text-accent uppercase tracking-[0.2em] font-bold">
                  Текстиль для объектов
                </span>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              CARTINI проектирует и шьет шторы, портьеры и объектный текстиль для отелей, ресторанов, офисов, общественных пространств и интерьерных проектов.
            </p>
            {/* Instant messaging row */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://wa.me/78452993104?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%80%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%20%D1%88%D1%82%D0%BE%D1%80%D1%8B%20%D0%B8%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B9%20%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B8%D0%BB%D1%8C."
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors duration-200 hover:border-accent hover:text-accent"
                title="Связаться в WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/sewing_saratov_manager"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors duration-200 hover:border-accent hover:text-accent"
                title="Связаться в Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Structural Page links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-xl font-bold text-white">Разделы сайта</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-semibold uppercase tracking-wider text-[12px]">
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="cursor-pointer text-left transition-colors hover:text-accent"
                >
                  Услуги и Прайс-лист
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('portfolio')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Типовые проекты
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('how-we-work')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Пошаговый процесс пошива
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  О нашей компании и цехе
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('vk-feed')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Новости и материалы
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contacts')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Контакты и реквизиты
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Custom SEO landings target links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-xl font-bold text-white">Направления</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => handleSEONavClick('shtory-dlya-oteley')}
                  className="hover:text-accent transition-colors cursor-pointer text-left hover:underline decoration-accent pointer-events-auto"
                >
                  Шторы для отелей
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSEONavClick('shtory-dlya-restoranov')}
                  className="hover:text-accent transition-colors cursor-pointer text-left hover:underline decoration-accent"
                >
                  Текстиль для ресторанов
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSEONavClick('shtory-dlya-ofisov')}
                  className="hover:text-accent transition-colors cursor-pointer text-left hover:underline decoration-accent"
                >
                  Рулонные шторы для офисов
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleSEONavClick('scenicheskiy-tekstil');
                  }}
                  className="hover:text-accent transition-colors cursor-pointer text-left hover:underline decoration-accent"
                >
                  Сценический текстиль
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Local Saratov Office, Map-info details */}
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <h4 className="font-serif text-xl font-bold text-white">Контакты в Саратове</h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span>г. Саратов, ул. Астраханская, д. 88 (Производственный корпус №3)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href="tel:+78452993104" className="hover:text-accent transition-colors font-bold">
                +7 (8452) 99-31-04
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a href="mailto:info@shvey-saratov.ru" className="hover:text-accent transition-colors">
                info@shvey-saratov.ru
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p>Будни: с 08:00 до 19:00</p>
                <p>Суббота (приемка): с 10:00 до 15:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row copyright & legal notices */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
            <p>© {currentYear} CARTINI — шторы и объектный текстиль в Саратове.</p>
            <p>Все права защищены. Расчет и производство изделий выполняются по согласованной спецификации.</p>
          </div>
          <p className="max-w-md text-center sm:text-right leading-relaxed">
            Вся представленная на сайте информация носит ознакомительный характер и не является публичной офертой, определяемой положениями ст. 437 ГК РФ.
          </p>
        </div>
      </div>
    </footer>
  );
}
