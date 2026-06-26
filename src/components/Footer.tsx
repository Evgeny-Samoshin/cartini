/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { CATALOG, FAQS } from '../data';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onNavigateSEO: (slug: string) => void;
  onNavigateCategory: (slug: string) => void;
}

const seoLinks = [
  { slug: 'shtory-dlya-oteley', label: 'Шторы для отелей' },
  { slug: 'shtory-dlya-restoranov', label: 'Текстиль для ресторанов' },
  { slug: 'shtory-dlya-ofisov', label: 'Шторы для офисов' },
  { slug: 'scenicheskiy-tekstil', label: 'Сценический текстиль' }
];

export default function Footer({ onNavigate, onNavigateSEO, onNavigateCategory }: FooterProps) {
  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSEONavClick = (slug: string) => {
    onNavigateSEO(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug: string) => {
    onNavigateCategory(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const catalogLinks = CATALOG;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };

  return (
    <>
      {/* FAQ — светлая секция (SEO) */}
      <section className="border-t border-primary/15 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6">
          <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">Частые вопросы о пошиве штор</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            {FAQS.map((faq) => (
              <details key={faq.id} className="group border-b border-primary/10 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-bold text-primary">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </div>
      </section>

    <footer className="bg-primary pt-16 pb-12 text-gray-300">
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
                  Шторы на заказ
                </span>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              CARTINI — швейный цех в Саратове. Шьём шторы, тюль, рулонные и римские шторы, блэкаут и плиссе по размерам вашего окна. Бесплатный замер на дому.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://wa.me/79879020909?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%88%D1%82%D0%BE%D1%80%D1%8B."
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

          {/* Column 2: Catalog links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold text-white">Каталог</h3>
            <ul className="space-y-2 text-[12px] font-semibold uppercase tracking-wider text-gray-400">
              {catalogLinks.map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => handleCategoryClick(item.slug)}
                    className="cursor-pointer text-left transition-colors hover:text-accent"
                  >
                    {item.navLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sections + B2B */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold text-white">Разделы</h3>
            <ul className="space-y-2 text-[12px] font-semibold uppercase tracking-wider text-gray-400">
              <li><button onClick={() => handleNavClick('catalog')} className="cursor-pointer text-left transition-colors hover:text-accent">Каталог</button></li>
              <li><button onClick={() => handleNavClick('portfolio')} className="cursor-pointer text-left transition-colors hover:text-accent">Наши работы</button></li>
              <li><button onClick={() => handleNavClick('about')} className="cursor-pointer text-left transition-colors hover:text-accent">О компании</button></li>
              <li><button onClick={() => handleNavClick('contacts')} className="cursor-pointer text-left transition-colors hover:text-accent">Контакты</button></li>
            </ul>
            <h3 className="font-serif text-xl font-bold text-white mt-4">Объектам</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              {seoLinks.map((link) => (
                <li key={link.slug}>
                  <button
                    onClick={() => handleSEONavClick(link.slug)}
                    className="cursor-pointer text-left transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts */}
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <h3 className="font-serif text-xl font-bold text-white">Контакты в Саратове</h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span>г. Саратов, ул. Астраханская, д. 88 (Производственный корпус №3)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href="tel:+79879020909" className="hover:text-accent transition-colors font-bold">
                +7 (987) 902-09-09
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
                <p>Суббота: с 10:00 до 15:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
            <p>© {currentYear} CARTINI — шторы на заказ в Саратове.</p>
            <p>Пошив по индивидуальным размерам. Бесплатный замер на дому.</p>
          </div>
          <p className="max-w-md text-center sm:text-right leading-relaxed">
            Вся представленная на сайте информация носит ознакомительный характер и не является публичной офертой, определяемой положениями ст. 437 ГК РФ.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
