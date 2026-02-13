#!/usr/bin/env node
/**
 * GPDC Build Script
 * Reads _articles/*.md (Decap CMS source) and generates:
 *   1. articles/*.html (individual article pages)
 *   2. Updated newsroom.html (news grid cards + featured article)
 *   3. Updated index.html (featured article on homepage)
 *
 * Runs on every Netlify deploy via: node build.js
 */

const fs = require('fs');
const path = require('path');

// ——————————————————————————————
// Helpers
// ——————————————————————————————

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const data = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (/^\d{4}-\d{2}-\d{2}$/.test(val)) val = val; // keep date as string
      else if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      data[m[1]] = val;
    }
  });
  return { data, body: match[2].trim() };
}

function markdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '            <h3>$1</h3>')
    .replace(/^> (.+)$/gm, '            <blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '            <li>$1</li>')
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<')) return '\n' + block;
      return '\n            <p>' + block + '</p>';
    })
    .join('\n');
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220)) + ' min read';
}

function categorySlug(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

// ——————————————————————————————
// Load all articles
// ——————————————————————————————

const articlesDir = path.join(__dirname, '_articles');
const outputDir = path.join(__dirname, 'articles');

if (!fs.existsSync(articlesDir)) {
  console.log('No _articles directory found, skipping build.');
  process.exit(0);
}

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
console.log(`Found ${files.length} articles to build.`);

const articles = files.map(file => {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
  const { data, body } = parseFrontmatter(content);
  const slug = file.replace('.md', '');
  return { slug, file, ...data, body, bodyHtml: markdownToHtml(body) };
});

// Sort by date descending (newest first)
articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

// ——————————————————————————————
// 1. Generate article HTML pages
// ——————————————————————————————

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Find related articles (same category, excluding self)
function getRelated(article, all) {
  return all
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);
}

articles.forEach(article => {
  const related = getRelated(article, articles);
  const relatedHtml = related.map(r =>
    `                        <li><a href="${r.slug}.html">${r.title.substring(0, 60)}${r.title.length > 60 ? '...' : ''}</a></li>`
  ).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="${(article.description || article.excerpt || '').replace(/"/g, '&quot;')}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} | Georgia Public Defender Council</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="canonical" href="https://gapubdef.org/articles/${article.slug}.html">
</head>
<body>
    <div class="page-transition" id="pageTransition"></div>
    <div id="site-header"></div>

    <section class="article-header reveal">
        <div class="article-header-inner">
            <div class="article-meta">
                <span class="article-category">${article.category || 'News'}</span>
                <span class="article-meta-divider"></span>
                <span class="article-date">${formatDate(article.date)}</span>
            </div>
            <h1>${article.title}</h1>
            <hr class="article-header-rule">
        </div>
    </section>

    ${article.image ? `<div class="article-featured-image reveal">
        <img src="${article.image}" alt="${(article.image_alt || article.title).replace(/"/g, '&quot;')}">
    </div>` : ''}

    <!-- Article Content -->
    <div class="article-layout">
    <article class="article-content reveal">
        <div class="article-body">${article.bodyHtml}
        </div>
    </article>

        <!-- Article Sidebar -->
        <aside class="article-sidebar reveal">
            <div class="article-sidebar-panel">
                <div class="sidebar-section">
                    <div class="sidebar-label">Published</div>
                    <div class="sidebar-value">${formatDate(article.date)}</div>
                </div>
                <div class="sidebar-section">
                    <div class="sidebar-label">Category</div>
                    <div class="sidebar-value">${article.category || 'News'}</div>
                </div>
                <div class="sidebar-section">
                    <div class="sidebar-label">Reading Time</div>
                    <div class="sidebar-value">${readingTime(article.body)}</div>
                </div>
                <div class="sidebar-section">
                    <div class="sidebar-label">Share</div>
                    <div class="sidebar-share">
                        <button class="sidebar-share-btn" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank')">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                        </button>
                        <button class="sidebar-share-btn" onclick="window.open('https://www.linkedin.com/shareArticle?url='+encodeURIComponent(location.href),'_blank')">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/></svg>
                        </button>
                        <button class="sidebar-share-btn" onclick="window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href),'_blank')">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </button>
                    </div>
                </div>${related.length > 0 ? `
                <div class="sidebar-section">
                    <div class="sidebar-label">Related</div>
                    <ul class="sidebar-related">
${relatedHtml}
                    </ul>
                </div>` : ''}
            </div>
        </aside>
    </div>

    <!-- Article Footer -->
    <div class="article-page-footer reveal">
        <a href="../newsroom.html" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Newsroom
        </a>
    </div>

    <div id="site-footer"></div>

    <script src="../js/components.js"></script>
    <script src="../js/main.js"></script>

    <script>
        // Scroll-triggered reveal
        const revealEls = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    </script>
</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, article.slug + '.html'), html);
  console.log(`  ✓ articles/${article.slug}.html`);
});

// ——————————————————————————————
// 2. Update newsroom.html
// ——————————————————————————————

const newsroomPath = path.join(__dirname, 'newsroom.html');
if (fs.existsSync(newsroomPath)) {
  let newsroom = fs.readFileSync(newsroomPath, 'utf-8');

  // Find the featured article (first one with featured: true, or newest)
  const featured = articles.find(a => a.featured === true) || articles[0];

  // Build featured article HTML
  const featuredHtml = `<a href="articles/${featured.slug}.html" class="featured-article" data-category="${categorySlug(featured.category)}">
                <div class="featured-image">
                    <span class="featured-badge">Featured</span>
                    ${featured.image ? `<img src="${featured.image}" alt="${(featured.image_alt || featured.title).replace(/"/g, '&quot;')}">` : ''}
                </div>
                <div class="featured-content">
                    <div class="featured-meta">
                        <span class="featured-category">${featured.category}</span>
                        <span class="featured-date">${formatDate(featured.date)}</span>
                    </div>
                    <h2>${featured.title}</h2>
                    <p class="featured-excerpt">${featured.excerpt || featured.description || ''}</p>
                    <span class="read-more">
                        Read Full Article
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            </a>`;

  // Build news grid cards (all articles except featured, newest first)
  const gridArticles = articles.filter(a => a.slug !== featured.slug);
  const cardsHtml = gridArticles.map((a, i) => {
    const hidden = i >= 6 ? ' hidden' : '';
    return `                <a href="articles/${a.slug}.html" class="news-card${hidden}" data-category="${categorySlug(a.category)}">
                    <div class="card-image">
                        <span class="card-category">${a.category}</span>
                        ${a.image ? `<img loading="lazy" src="${a.image}" alt="${(a.image_alt || a.title).replace(/"/g, '&quot;')}">` : ''}
                    </div>
                    <div class="card-content">
                        <div class="card-date">${formatDate(a.date)}</div>
                        <h3>${a.title}</h3>
                        <p class="card-excerpt">${a.excerpt || a.description || ''}</p>
                        <span class="card-link">
                            Read More
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </div>
                </a>`;
  }).join('\n\n');

  // Replace featured article section
  newsroom = newsroom.replace(
    /<!-- Featured Article -->\s*<a href="articles\/[^"]*"[\s\S]*?<\/a>\s*(?=\n\s*<!-- Section Header -->)/,
    `<!-- Featured Article -->\n            ${featuredHtml}\n\n            `
  );

  // Replace news grid contents
  newsroom = newsroom.replace(
    /(<div class="news-grid" id="newsGrid">)[\s\S]*?(<\/div>\s*\n\s*<!-- No Results -->)/,
    `$1\n${cardsHtml}\n            $2`
  );

  fs.writeFileSync(newsroomPath, newsroom);
  console.log(`  ✓ newsroom.html updated (${gridArticles.length} cards + featured)`);
}

// ——————————————————————————————
// 3. Update homepage featured article
// ——————————————————————————————

const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let index = fs.readFileSync(indexPath, 'utf-8');
  const featured = articles.find(a => a.featured === true) || articles[0];

  // Update the featured article link on homepage if it exists
  // Look for the newsroom section with featured article
  const featuredLinkRegex = /<a\s+href="articles\/[^"]*\.html"\s+class="featured-article"/;
  if (featuredLinkRegex.test(index)) {
    index = index.replace(
      /<a\s+href="articles\/[^"]*\.html"\s+class="featured-article"[\s\S]*?<\/a>/,
      `<a href="articles/${featured.slug}.html" class="featured-article" data-category="${categorySlug(featured.category)}">
                <div class="featured-image">
                    <span class="featured-badge">Featured</span>
                    ${featured.image ? `<img src="${featured.image}" alt="${(featured.image_alt || featured.title).replace(/"/g, '&quot;')}">` : ''}
                </div>
                <div class="featured-content">
                    <div class="featured-meta">
                        <span class="featured-category">${featured.category}</span>
                        <span class="featured-date">${formatDate(featured.date)}</span>
                    </div>
                    <h2>${featured.title}</h2>
                    <p class="featured-excerpt">${featured.excerpt || featured.description || ''}</p>
                    <span class="read-more">
                        Read Full Article
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            </a>`
    );
    fs.writeFileSync(indexPath, index);
    console.log(`  ✓ index.html updated (featured article)`);
  }
}

console.log(`\nBuild complete! ${articles.length} articles processed.`);
