import { Award, ChevronDown, Clock } from 'lucide-react';
import { useState } from 'react';

interface HowWeWorkPageProps {
  onOpenCallback: () => void;
}

export default function HowWeWorkPage({ onOpenCallback }: HowWeWorkPageProps) {
  const steps = [
    {
      num: '01',
      title: 'Собираем исходные данные',
      duration: '1–2 рабочих дня',
      desc: 'Определяем тип объекта, помещения, количество окон или изделий, сроки и желаемый уровень бюджета.',
      clientRole: 'Прислать фотографии, планы, размеры или заявку на замер.',
      advice: 'Для предварительной оценки не нужны идеальные чертежи: достаточно фото и примерных размеров.'
    },
    {
      num: '02',
      title: 'Подбираем ткани и решения',
      duration: '2–5 рабочих дней',
      desc: 'Выбираем блэкаут, димаут, тюль, портьерные или технические ткани с учетом света, ухода, акустики и визуальной концепции.',
      clientRole: 'Согласовать фактуры, оттенки и ключевые эксплуатационные требования.',
      advice: 'Для коммерческого объекта важны не только цвет и цена, но и поведение ткани после чистки.'
    },
    {
      num: '03',
      title: 'Формируем спецификацию и смету',
      duration: '1–3 рабочих дня',
      desc: 'Фиксируем размеры, количество, тип креплений, коэффициент сборки, материалы и комплектацию по помещениям.',
      clientRole: 'Проверить ведомость и подтвердить состав проекта.',
      advice: 'Чем точнее спецификация до запуска, тем меньше вопросов и переделок на монтаже.'
    },
    {
      num: '04',
      title: 'Согласовываем образец',
      duration: '3–7 рабочих дней',
      desc: 'При необходимости шьем тестовое изделие или демонстрационный фрагмент, чтобы проверить обработку, складку и общий вид.',
      clientRole: 'Утвердить образец или дать список корректировок.',
      advice: 'Для больших партий образец особенно полезен: он становится техническим ориентиром производства.'
    },
    {
      num: '05',
      title: 'Шьем и контролируем партию',
      duration: 'от 7 рабочих дней',
      desc: 'Запускаем раскрой и пошив. Проверяем геометрию, длину полотен, обработку краев, крепления и повторяемость изделий.',
      clientRole: 'Быть на связи для согласования редких технических вопросов.',
      advice: 'Статусы и фотографии этапов можно согласовать заранее в формате коммуникации проекта.'
    },
    {
      num: '06',
      title: 'Комплектуем по объекту',
      duration: '1–3 рабочих дня',
      desc: 'Маркируем изделия по номерам, залам, этажам или зонам и готовим заказ к передаче или монтажу.',
      clientRole: 'Подтвердить порядок передачи и контакт ответственного на объекте.',
      advice: 'Маркировка по помещениям заметно ускоряет монтаж больших партий.'
    }
  ];

  const processFaqs = [
    {
      q: 'Можно ли получить предварительный расчет без точного замера?',
      a: 'Да. Для вилки бюджета достаточно фотографий, примерных размеров, количества окон и желаемого типа ткани. Финальную смету подтверждаем после точных данных.'
    },
    {
      q: 'Можно ли работать по дизайн-проекту?',
      a: 'Да. Мы работаем с дизайнерами, комплектаторами и управляющими объектов: разбираем визуализации, ведомости, эскизы и технические задания.'
    },
    {
      q: 'Как избежать путаницы при монтаже большого объекта?',
      a: 'До запуска мы формируем ведомость, а готовые изделия маркируем по помещениям, номерам, этажам или зонам.'
    }
  ];

  const [faqOpenState, setFaqOpenState] = useState<Record<number, boolean>>({});

  return (
    <div className="py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center animate-fade-up">
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-accent">От задачи до комплектации</span>
          <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-primary md:text-5xl">Как мы работаем с объектом</h1>
          <p className="mt-4 text-sm leading-relaxed text-secondary md:text-base">
            Прозрачный процесс помогает заранее увидеть состав проекта, бюджет и ответственность каждой стороны.
          </p>
        </div>

        <div className="relative mx-auto mb-20 flex max-w-3xl flex-col gap-12 pl-6 sm:pl-10">
          <div className="pointer-events-none absolute bottom-[-1px] left-0 top-[-4px] w-px bg-accent sm:top-[-8px]" />
          {steps.map((step) => (
            <div key={step.num} className="group relative">
              <span className="absolute left-[-24px] top-[-4px] flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-bg-main font-serif text-xs font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white sm:left-[-40px] sm:top-[-8px] sm:h-8 sm:w-8">
                {step.num}
              </span>
              <div className="paper-panel rounded-[1.35rem] border border-white/70 p-6 shadow-[0_14px_45px_rgba(17,17,17,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)] md:p-8">
                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="font-serif text-lg font-bold text-primary md:text-xl">{step.title}</h3>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                    <Clock className="h-3.5 w-3.5" /> {step.duration}
                  </span>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-secondary sm:text-sm">{step.desc}</p>
                <div className="mt-2 grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 text-xs leading-relaxed text-secondary md:grid-cols-2">
                  <div className="rounded-xl border border-gray-200/50 bg-bg-warm/80 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">От заказчика</p>
                    <p>{step.clientRole}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200/50 bg-bg-warm/80 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-accent">Практический ориентир</p>
                    <p>{step.advice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mb-20 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-primary p-8 text-gray-300 shadow-[0_30px_100px_rgba(17,17,17,0.22)] md:flex-row">
          <div className="flex items-start gap-4">
            <Award className="mt-1 h-8 w-8 shrink-0 text-accent" />
            <div>
              <h3 className="mb-1 font-serif text-lg font-bold text-white">Спецификация до запуска</h3>
              <p className="max-w-xl text-xs leading-relaxed text-gray-400">
                До производства фиксируем состав заказа, материалы, размеры и комплектацию. Это основа понятной сметы и предсказуемого результата.
              </p>
            </div>
          </div>
          <button onClick={onOpenCallback} className="h-11 shrink-0 rounded bg-accent px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover">
            Обсудить объект
          </button>
        </div>

        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-center font-serif text-xl font-bold text-primary md:text-2xl">Вопросы об организации проекта</h3>
          <div className="space-y-3">
            {processFaqs.map((item, id) => {
              const isOpen = !!faqOpenState[id];
              return (
                <div key={item.q} className="overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/90 shadow-[0_14px_45px_rgba(17,17,17,0.08)]">
                  <button onClick={() => setFaqOpenState((prev) => ({ ...prev, [id]: !prev[id] }))} className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-primary transition-colors hover:bg-bg-warm md:text-base">
                    <span>{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-accent transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <div className="border-t border-gray-100 bg-bg-warm/30 p-4 text-xs text-secondary md:text-sm">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
