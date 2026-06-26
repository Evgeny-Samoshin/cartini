import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const templatePath = path.join(distDir, 'index.html');
const template = await readFile(templatePath, 'utf8');
const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

// Базовый путь (GitHub Pages кладёт сайт в подкаталог) и origin для абсолютных URL.
const basePath = process.env.GH_PAGES ? '/cartini/' : '/';
const siteUrl = (process.env.SITE_URL || 'https://cartini-saratov.ru').replace(/\/$/, '');

const base = basePath.endsWith('/') ? basePath : `${basePath}/`;
const canonicalFor = (routePath) => {
  if (routePath === '/') return `${siteUrl}${base}`;
  return `${siteUrl}${base}${routePath.replace(/^\//, '')}`;
};

const paths = server.getPrerenderPaths();

for (const routePath of paths) {
  const appHtml = server.render(routePath);
  const { title, description } = server.metaForPath(routePath);
  const canonical = canonicalFor(routePath);

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escapeHtml(title)}" />`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const filePath = routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  paths
    .map(
      (routePath) =>
        `  <url><loc>${escapeHtml(canonicalFor(routePath))}</loc><lastmod>${today}</lastmod></url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);

// robots.txt
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}${base}sitemap.xml\n`;
await writeFile(path.join(distDir, 'robots.txt'), robots);

await rm(ssrDir, { recursive: true, force: true });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
