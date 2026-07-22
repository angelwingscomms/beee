import { SITE_URL, sitemap_entries } from '$lib/seo';

export const prerender = true;

export function GET() {
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls = sitemap_entries()
		.map(
			({ path, priority, changefreq }) => `	<url>
		<loc>${SITE_URL}${path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority.toFixed(1)}</priority>
	</url>`
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
		{ headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=3600' } }
	);
}
