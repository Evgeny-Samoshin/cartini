/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Table, Clock, Check, ListCollapse } from 'lucide-react';
import { Service } from '../types';
import { SERVICES, FAQS } from '../data';

interface ServicesPageProps {
  onOpenCallback: (niche?: string) => void;
}

export default function ServicesPage({ onOpenCallback }: ServicesPageProps) {
  // Services details accordion state
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const toggleServiceExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const toggleFaqExpand = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Header content block */}
        <div className="max-w-3xl mb-16 animate-fade-up">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Прайс-лист и работы</span>
          <h1 className="text-balance text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
            Услуги CARTINI и ориентиры стоимости
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4 leading-relaxed">
            Проектируем, шьем и комплектуем шторы, портьеры, римские и рулонные системы, сценический и ресторанный текстиль. Итоговая цена зависит от ткани, размера, сборки и количества изделий.
          </p>
        </div>

        {/* Services List with accordion step details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((s: Service) => {
            const isExpanded = expandedServiceId === s.id;
            return (
              <div key={s.id} className="paper-panel flex flex-col justify-between rounded-[1.5rem] border border-white/70 p-6 shadow-[0_14px_45px_rgba(17,17,17,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)]">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="inline-flex rounded-full bg-accent/10 p-2 px-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                      {s.bulkAmount > 1 ? 'Объектная партия' : 'Индивидуальный расчет'}
                    </span>
                    <div className="text-right shrink-0">
                      <span className="block text-[11px] text-gray-500 uppercase tracking-widest font-bold">Стоимость:</span>
                      <span className="font-serif text-2xl font-bold text-accent">от {s.priceFrom} ₽</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-primary hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-secondary text-sm mt-3 leading-relaxed">
                    {s.shortDescription}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 mt-6">
                    {s.listBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-secondary leading-normal">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Accordion trigger */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => toggleServiceExpand(s.id)}
                      className="flex w-full cursor-pointer items-center justify-between py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-1.5">
                        <ListCollapse className="h-4 w-4" />
                        {isExpanded ? 'Скрыть этапы процесса' : 'Показать этапы по регламенту'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-accent' : 'text-primary'
                        }`}
                      />
                    </button>

                    {/* Accordion collapse pane */}
                    {isExpanded && (
                      <div className="mt-3 rounded-xl border border-gray-200/50 bg-bg-warm/80 p-4 text-xs leading-relaxed text-secondary space-y-3 animate-fade-up">
                        <p className="font-bold text-primary uppercase text-[10px] tracking-wider mb-2">
                          Подробный технологический регламент этой услуги:
                        </p>
                        <ol className="list-decimal pl-4 space-y-2 text-primary font-medium">
                          {s.details.map((step, stepId) => (
                            <li key={stepId} className="pl-1">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-secondary">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Срок выполнения: <strong>{s.duration}</strong></span>
                  </div>

                  <button onClick={() => onOpenCallback(s.id)} className="h-10 rounded-full bg-primary px-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent cursor-pointer">
                    Заказать услугу
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cost Breakdowns and Exclusions panel */}
        <div className="relative mb-20 overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-[0_30px_100px_rgba(17,17,17,0.22)] lg:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full opacity-5 filter blur-3xl pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-accent" />
            Что входит в расчет объектного текстиля
          </h2>
          <p className="text-gray-300 text-sm max-w-3xl leading-relaxed mb-8">
            Чтобы смета была прозрачной, мы разделяем работу, материалы, фурнитуру, монтажные элементы и логистику. Финальная стоимость фиксируется после спецификации.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-accent font-bold font-serif text-lg mb-3">Уже входит в стоимость:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Проверка размеров и геометрии изделий перед передачей.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Аккуратная обработка краев, низа, лент и креплений.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Комплектация изделий по помещениям, зонам или этажам.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Предварительная консультация по тканям и сценариям использования.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-amber-500 font-bold font-serif text-lg mb-3">Оплачивается отдельно / Давальческое:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 shrink-0 font-bold block w-4">*</span>
                  <span>Ткань, подклад, блэкаут, тюль и декоративные материалы.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 shrink-0 font-bold block w-4">*</span>
                  <span>Карнизы, механизмы, люверсы, крючки, утяжелители и монтажные элементы.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 shrink-0 font-bold block w-4">*</span>
                  <span>Выездной замер, монтаж и сложная логистика, если они нужны проекту.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 shrink-0 font-bold block w-4">*</span>
                  <span>Срочный запуск, нестандартные конструктивы и дополнительные образцы.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ according block */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest flex items-center justify-center gap-1">
              <HelpCircle className="h-4 w-4" />
              FAQ по ценообразованию
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2">
              Отвечаем на частые вопросы по ценам
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isFaqExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/90 shadow-[0_14px_45px_rgba(17,17,17,0.08)]"
                >
                  <button
                    onClick={() => toggleFaqExpand(faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between p-5 text-left text-sm font-bold text-primary transition-colors hover:bg-bg-warm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                        isFaqExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isFaqExpanded && (
                    <div className="p-5 pt-0 text-xs md:text-sm text-secondary leading-relaxed border-t border-gray-50 bg-bg-warm/30 animate-fade-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA section */}
        <div className="relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-[2rem] bg-accent p-8 text-center text-white shadow-[0_24px_80px_rgba(183,139,67,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Есть план помещения, фото окон или дизайн-проект?</h3>
          <p className="text-white/80 text-xs md:text-sm max-w-2xl mx-auto mb-6">
            Пришлите исходные данные. Мы подготовим предварительную спецификацию и уточним, какие размеры нужны для точного расчета.
          </p>
          <button
            onClick={() => onOpenCallback('general')}
            className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800"
          >
            Узнать стоимость своего заказа
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
