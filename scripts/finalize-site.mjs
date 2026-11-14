import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const configuredUrl = process.env.SITE_URL?.trim();

if (!fs.existsSync(dist)) throw new Error('No existe dist/. Ejecuta vite build antes de finalizar el sitio.');
if (!configuredUrl) console.warn('SITE_URL no está configurada; se usa localhost solo para la compilación local. GitHub Actions genera la URL pública al publicar.');
const normalizedUrl = `${(configuredUrl || 'http://localhost:4173/').replace(/\/+$/, '')}/`;
for (const file of ['sitemap.xml', 'robots.txt']) {
  const target = path.join(dist, file);
  if (fs.existsSync(target)) {
    fs.writeFileSync(target, fs.readFileSync(target, 'utf8').replaceAll('%%SITE_URL%%', normalizedUrl));
  }
}

const indexPath = path.join(dist, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace('content="./images/hero-campaign.webp"', `content="${new URL('images/hero-campaign.webp', normalizedUrl).href}"`);
html = html.replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${normalizedUrl}" />\n    <link rel="canonical" href="${normalizedUrl}" />`);
fs.writeFileSync(indexPath, html);
console.log(`Sitemap y robots.txt generados para ${normalizedUrl}`);
