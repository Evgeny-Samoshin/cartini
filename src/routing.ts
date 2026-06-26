import { CASE_STUDIES, SEO_NICHES, CATALOG } from './data';
import { PageId } from './types';

export interface RouteState {
  page: PageId;
  caseId: string;
  seoSlug: string;
  categorySlug: string;
}

export const pagePaths: Partial<Record<PageId, string>> = {
  home: '/',
  catalog: '/katalog',
  services: '/uslugi',
  portfolio: '/portfolio',
  'how-we-work': '/kak-my-rabotaem',
  about: '/o-kompanii',
  contacts: '/kontakty',
};

const emptyRoute = { caseId: '', seoSlug: '', categorySlug: '' };

export function resolveRoute(pathname: string): RouteState {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/') return { page: 'home', ...emptyRoute };
  if (path === '/katalog') return { page: 'catalog', ...emptyRoute };
  if (path === '/uslugi') return { page: 'services', ...emptyRoute };
  if (path === '/portfolio') return { page: 'portfolio', ...emptyRoute };
  if (path === '/kak-my-rabotaem') return { page: 'how-we-work', ...emptyRoute };
  if (path === '/o-kompanii') return { page: 'about', ...emptyRoute };
  if (path === '/kontakty') return { page: 'contacts', ...emptyRoute };

  const caseMatch = path.match(/^\/portfolio\/([^/]+)$/);
  if (caseMatch) return { page: 'case-detail', ...emptyRoute, caseId: caseMatch[1] };

  // Каталожные страницы (товары и комнаты) — проверяем раньше SEO-ниш
  const categoryMatch = CATALOG.find((item) => path === `/${item.slug}`);
  if (categoryMatch) return { page: 'category', ...emptyRoute, categorySlug: categoryMatch.slug };

  const seoMatch = SEO_NICHES.find((item) => path === `/${item.slug}`);
  if (seoMatch) return { page: 'seo-landing', ...emptyRoute, seoSlug: seoMatch.slug };

  return { page: 'home', ...emptyRoute };
}

export function getRouteTitle(route: RouteState) {
  const titles: Record<PageId, string> = {
    home: 'CARTINI — шторы на заказ в Саратове, пошив по размерам',
    catalog: 'Каталог штор и текстиля на заказ — CARTINI Саратов',
    category: `${CATALOG.find((item) => item.slug === route.categorySlug)?.title ?? 'Каталог'} — CARTINI`,
    services: 'Услуги и цены — CARTINI',
    portfolio: 'Наши работы — CARTINI Саратов',
    'case-detail': `${CASE_STUDIES.find((item) => item.id === route.caseId)?.title ?? 'Проект'} — CARTINI`,
    'how-we-work': 'Как мы работаем — CARTINI',
    about: 'О компании — CARTINI',
    'seo-landing': `${SEO_NICHES.find((item) => item.slug === route.seoSlug)?.title ?? 'Объектный текстиль'} — CARTINI`,
    contacts: 'Контакты — CARTINI',
  };

  return titles[route.page];
}

const DEFAULT_DESCRIPTION =
  'CARTINI — пошив штор на заказ в Саратове: тюль, рулонные, римские, блэкаут, плиссе и карнизы. Бесплатный замер на дому, пошив по размерам от 7 дней.';

const PAGE_DESCRIPTIONS: Partial<Record<PageId, string>> = {
  home: DEFAULT_DESCRIPTION,
  catalog:
    'Каталог CARTINI: тюль, рулонные и римские шторы, блэкаут, плиссе, карнизы и шторы по комнатам на заказ в Саратове. Бесплатный замер, пошив по размерам.',
  services: 'Услуги и цены CARTINI: пошив штор, рулонные и римские системы, карнизы, замер и установка в Саратове.',
  portfolio: 'Примеры работ CARTINI: шторы, тюль, рулонные и римские системы для квартир и объектов в Саратове.',
  'how-we-work': 'Как мы работаем: бесплатный замер, подбор ткани, пошив по размерам и установка штор в Саратове.',
  about: 'CARTINI — швейный цех штор в Саратове. Пошив по размерам, бесплатный замер на дому, собственное производство.',
  contacts: 'Контакты CARTINI в Саратове: телефон, адрес, часы работы. Закажите бесплатный замер штор.',
};

export interface RouteMeta {
  title: string;
  description: string;
}

export function getRouteMeta(route: RouteState): RouteMeta {
  const title = getRouteTitle(route);

  if (route.page === 'category') {
    const category = CATALOG.find((item) => item.slug === route.categorySlug);
    return { title, description: category?.metaDescription ?? DEFAULT_DESCRIPTION };
  }
  if (route.page === 'seo-landing') {
    const niche = SEO_NICHES.find((item) => item.slug === route.seoSlug);
    return { title, description: niche?.heroDescription ?? DEFAULT_DESCRIPTION };
  }
  if (route.page === 'case-detail') {
    const study = CASE_STUDIES.find((item) => item.id === route.caseId);
    return { title, description: study?.briefResult ?? DEFAULT_DESCRIPTION };
  }

  return { title, description: PAGE_DESCRIPTIONS[route.page] ?? DEFAULT_DESCRIPTION };
}

export function getPrerenderPaths() {
  return [
    '/',
    '/katalog',
    '/uslugi',
    '/portfolio',
    '/kak-my-rabotaem',
    '/o-kompanii',
    '/kontakty',
    ...CATALOG.map((item) => `/${item.slug}`),
    ...CASE_STUDIES.map((item) => `/portfolio/${item.id}`),
    ...SEO_NICHES.map((item) => `/${item.slug}`),
  ];
}
