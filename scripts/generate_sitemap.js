import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const API_URL = 'https://api2.aindhin.com/api/blogs';

async function fetchBlogs() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch blogs. Status: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const blogs = JSON.parse(data);
          resolve(blogs);
        } catch (e) {
          reject(new Error(`Failed to parse blogs JSON: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function formatDate(dateStr) {
  const date = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0];
}

async function run() {
  console.log('[Sitemap Generator] Starting dynamic sitemap update...');
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`[Sitemap Generator] Error: Base sitemap.xml not found at: ${SITEMAP_PATH}`);
    process.exit(1);
  }
  
  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  
  // Extract all <url>...</url> blocks
  const urlBlocks = sitemapContent.match(/<url>[\s\S]*?<\/url>/g) || [];
  console.log(`[Sitemap Generator] Found ${urlBlocks.length} existing URL entries.`);
  
  // Filter out existing dynamic blog posts (e.g. https://aindhin.com/blog/...)
  // We keep static URLs and the main /blog list page
  const staticBlocks = urlBlocks.filter(block => {
    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    if (!locMatch) return true;
    const loc = locMatch[1].trim();
    return !loc.startsWith('https://aindhin.com/blog/');
  });
  
  console.log(`[Sitemap Generator] Retained ${staticBlocks.length} static URL entries.`);
  
  let blogs = [];
  try {
    blogs = await fetchBlogs();
    console.log(`[Sitemap Generator] Successfully fetched ${blogs.length} blogs from API.`);
  } catch (err) {
    console.warn(`[Sitemap Generator] WARNING: Could not fetch dynamic blogs: ${err.message}`);
    console.warn('[Sitemap Generator] Keeping the sitemap unmodified (or with existing entries).');
    process.exit(0);
  }
  
  // Generate XML blocks for published blogs
  const publishedBlogs = blogs.filter(b => b.status === 'Published' && b.slug);
  console.log(`[Sitemap Generator] Found ${publishedBlogs.length} published blogs.`);
  
  const blogBlocks = publishedBlogs.map(blog => {
    const lastmod = formatDate(blog.date);
    return `  <url>
    <loc>https://aindhin.com/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>
  </url>`;
  });
  
  // Reassemble the sitemap XML
  const newContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticBlocks.map(block => `  ${block.trim()}`).join('\n')}
${blogBlocks.join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_PATH, newContent, 'utf-8');
  console.log('[Sitemap Generator] Successfully wrote updated sitemap.xml to public directory!');
}

run();
