/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Phone, ShoppingBag, Eye, HelpCircle, Compass, Award, MessageSquare } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenCallback: () => void;
}

export default function Header({ currentPage, onNavigate, onOpenCallback }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Услуги', icon: ShoppingBag },
    { id: 'portfolio', label: 'Проекты', icon: Eye },
    { id: 'how-we-work', label: 'Процесс', icon: HelpCircle },
    { id: 'about', label: 'О компании', icon: Award },
    { id: 'vk-feed', label: 'Новости', icon: MessageSquare },
    { id: 'contacts', label: 'Контакты', icon: Compass },
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/15 bg-bg-main/95">
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-x-5 gap-y-2 px-4 py-3 lg:grid-cols-[auto_1fr_auto] lg:items-center xl:h-20 xl:px-6 xl:py-0">
        {/* Brand Logotype */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex shrink-0 cursor-pointer items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary font-serif text-lg font-bold text-bg-main transition-colors duration-300 group-hover:bg-accent">
            C
          </div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em] text-primary leading-tight transition-colors group-hover:text-accent">
              CARTINI
            </span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] leading-tight text-secondary">
              интерьер · текстиль
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden w-full items-center justify-center gap-7 border-t border-primary/15 pt-2 lg:col-span-3 lg:row-start-2 lg:flex xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:min-w-0 xl:border-t-0 xl:pt-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`cursor-pointer whitespace-nowrap border-b py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-accent ${
                currentPage === item.id || (item.id === 'portfolio' && currentPage === 'case-detail')
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side contact information & Callback Button */}
        <div className="absolute right-4 top-5 hidden shrink-0 items-center gap-4 md:flex lg:static lg:col-start-3 lg:row-start-1 lg:ml-auto xl:gap-5">
          <a
            href="tel:+78452993104"
            className="flex items-center gap-1.5 whitespace-nowrap text-primary hover:text-accent transition-colors font-bold text-sm tracking-wide"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span>+7 (8452) 99-31-04</span>
          </a>

          <button onClick={onOpenCallback} className="h-10 whitespace-nowrap border border-accent bg-accent px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-accent-hover">
            Оставить заявку
          </button>
        </div>

        {/* Mobile controls */}
        <div className="absolute right-4 top-5 flex items-center gap-4 lg:hidden">
          {/* Quick Phone Call icon for smartphone clickers */}
          <a
            href="tel:+78452993104"
            className="border border-primary/15 p-2 text-primary transition-colors hover:text-accent md:hidden"
            aria-label="Позвонить в цех"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* Hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer border border-primary/15 p-2 text-primary transition-colors hover:bg-bg-warm"
            aria-label="Переключатель мобильного меню"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-primary/15 bg-bg-main lg:hidden">
          <div className="space-y-3 px-6 py-4">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center gap-3 border-b border-primary/10 px-2 py-3 text-left text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-accent'
                      : 'text-primary hover:text-accent'
                  }`}
                >
                  <IconComp className="h-4 w-4 text-secondary" />
                  {item.label}
                </button>
              );
            })}

            {/* Callback CTA on mobile */}
            <div className="flex flex-col gap-3 border-t border-primary/15 pt-4">
              <a href="tel:+78452993104" className="flex items-center justify-center gap-2 border border-primary/20 py-3 font-bold text-primary transition-colors hover:border-accent">
                <Phone className="h-4 w-4 text-accent" />
                <span>+7 (8452) 99-31-04</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCallback();
                }}
                className="w-full cursor-pointer bg-accent py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
