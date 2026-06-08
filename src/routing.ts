import { CASE_STUDIES, SEO_NICHES } from './data';
import { PageId } from './types';

export interface RouteState {
  page: PageId;
  caseId: string;
  seoSlug: string;
}

export const pagePaths: Partial<Record<PageId, string>> = {
  home: '/',
  services: '/uslugi',
  portfolio: '/portfolio',
  'how-we-work': '/kak-my-rabotaem',
  about: '/o-kompanii',
  'vk-feed': '/novosti',
  contacts: '/kontakty',
};

export function resolveRoute(pathname: string): RouteState {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/') return { page: 'home', caseId: '', seoSlug: '' };
  if (path === '/uslugi') return { page: 'services', caseId: '', seoSlug: '' };
  if (path === '/portfolio') return { page: 'portfolio', caseId: '', seoSlug: '' };
  if (path === '/kak-my-rabotaem') return { page: 'how-we-work', caseId: '', seoSlug: '' };
  if (path === '/o-kompanii') return { page: 'about', caseId: '', seoSlug: '' };
  if (path === '/novosti') return { page: 'vk-feed', caseId: '', seoSlug: '' };
  if (path === '/kontakty') return { page: 'contacts', caseId: '', seoSlug: '' };

  const caseMatch = path.match(/^\/portfolio\/([^/]+)$/);
  if (caseMatch) return { page: 'case-detail', caseId: caseMatch[1], seoSlug: '' };

  const seoMatch = SEO_NICHES.find((item) => path === `/${item.slug}`);
  if (seoMatch) return { page: 'seo-landing', caseId: '', seoSlug: seoMatch.slug };

  return { page: 'home', caseId: '', seoSlug: '' };
}

export function getRouteTitle(route: RouteState) {
  const titles: Record<PageId, string> = {
    home: 'CARTINI — шторы и объектный текстиль в Саратове',
    services: 'Услуги и цены — CARTINI',
    portfolio: 'Типовые проекты — CARTINI',
    'case-detail': `${CASE_STUDIES.find((item) => item.id === route.caseId)?.title ?? 'Проект'} — CARTINI`,
    'how-we-work': 'Как мы работаем — CARTINI',
    about: 'О компании — CARTINI',
    'vk-feed': 'Новости — CARTINI',
    'seo-landing': `${SEO_NICHES.find((item) => item.slug === route.seoSlug)?.title ?? 'Объектный текстиль'} — CARTINI`,
    contacts: 'Контакты — CARTINI',
  };

  return titles[route.page];
}

export function getPrerenderPaths() {
  return [
    '/',
    '/uslugi',
    '/portfolio',
    '/kak-my-rabotaem',
    '/o-kompanii',
    '/novosti',
    '/kontakty',
    ...CASE_STUDIES.map((item) => `/portfolio/${item.id}`),
    ...SEO_NICHES.map((item) => `/${item.slug}`),
  ];
}
