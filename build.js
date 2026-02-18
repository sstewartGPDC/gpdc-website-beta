#!/usr/bin/env node
/**
 * GPDC Build Script
 * Reads CMS markdown sources and generates frontend output:
 *   1. articles/*.html (individual article pages from _articles/*.md)
 *   2. Updated newsroom.html (news grid cards + featured article)
 *   3. Updated index.html (featured article on homepage)
 *   4. Auto-expire job postings in _positions/*.md
 *   5. js/events-data.js (from _events/*.md)
 *   6. Updated positions.html (job cards from _positions/*.md)
 *
 * Runs on every deploy via: node build.js
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
  const lines = match[1].split('\n');
  let currentKey = null;

  lines.forEach(line => {
    const m = line.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (m) {
      currentKey = m[1];
      let val = m[2].trim();
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (/^\d{4}-\d{2}-\d{2}$/.test(val)) val = val; // keep date as string
      else if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      else if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) val = val.slice(1, -1);
      data[currentKey] = val;
    } else if (currentKey && /^\s+/.test(line)) {
      // Continuation line (indented) — append to current key
      const continuation = line.trim();
      if (continuation && typeof data[currentKey] === 'string') {
        data[currentKey] += ' ' + continuation;
      }
    }
  });
  return { data, body: match[2].trim() };
}

function markdownToHtml(md) {
  // Process inline markdown (bold, italic, links, inline images)
  function inlineMarkdown(text) {
    return text
      // Inline images with captions: ![alt](url) → <figure>
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, url) {
        const caption = alt ? `\n            <figcaption>${alt}</figcaption>` : '';
        return `</p>\n            <figure class="article-inline-image">\n            <img src="${url}" alt="${alt.replace(/"/g, '&quot;')}">${caption}\n            </figure>\n            <p>`;
      })
      // Links: [text](url) → <a>
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Bold: **text** → <strong>
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic: *text* → <em> (single asterisks, not preceded/followed by space for safety)
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
  }

  return md
    .replace(/^### (.+)$/gm, '            <h3>$1</h3>')
    .replace(/^> (.+)$/gm, '            <blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '            <li>$1</li>')
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<')) return '\n' + inlineMarkdown(block);
      return '\n            <p>' + inlineMarkdown(block) + '</p>';
    })
    .join('\n')
    // Clean up empty <p></p> tags created by image extraction
    .replace(/<p>\s*<\/p>/g, '');
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

    ${article.image ? `<figure class="article-featured-image reveal">
        <img src="${article.image}" alt="${(article.image_alt || article.title).replace(/"/g, '&quot;')}"${article.image_position ? ` style="object-position: ${article.image_position}"` : ''}>
        ${article.image_alt ? `<figcaption>${article.image_alt}</figcaption>` : ''}
    </figure>` : ''}

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

  // Build featured article HTML — matches existing newsroom.html card structure
  const featuredHtml = `<a href="articles/${featured.slug}.html" class="featured-article" data-category="${categorySlug(featured.category)}">
                <div class="featured-image">
                    <img src="${featured.image || ''}" alt="${(featured.image_alt || featured.title).replace(/"/g, '&quot;')}"${featured.image_position ? ` style="object-position: ${featured.image_position}"` : ''}>
                </div>
                <div class="featured-content">
                    <span class="featured-badge">Featured</span>
                    <h2>${featured.title}</h2>
                    <div class="featured-meta">
                        <span class="featured-category">${featured.category || 'News'}</span>
                        <span class="featured-meta-sep">&bull;</span>
                        <span class="featured-date">${formatDate(featured.date)}</span>
                        <span class="featured-meta-sep">&bull;</span>
                        <span class="featured-read-time">${readingTime(featured.body)}</span>
                    </div>
                    <p class="featured-excerpt">${featured.excerpt || featured.description || ''}</p>
                    <span class="read-more">
                        Read Article
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
                        <span class="card-category">${a.category || 'News'}</span>
                        ${a.image ? `<img loading="lazy" src="${a.image}" alt="${(a.image_alt || a.title).replace(/"/g, '&quot;')}"${a.image_position ? ` style="object-position: ${a.image_position}"` : ''}>` : ''}
                    </div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="card-meta-category">${a.category || 'News'}</span>
                            <span class="card-meta-sep">&bull;</span>
                            <span class="card-date">${formatDate(a.date)}</span>
                        </div>
                        <h3>${a.title}</h3>
                        <p class="card-excerpt">${a.excerpt || a.description || ''}</p>
                        <div class="card-footer">
                            <span class="card-read-time">${readingTime(a.body)}</span>
                            <span class="card-link">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                        </div>
                    </div>
                </a>`;
  }).join('\n\n');

  // Replace featured article section
  // Match from the featured article comment to just before <!-- Section Header -->
  newsroom = newsroom.replace(
    /<!-- Featured Article[^>]*-->\s*<a href="articles\/[^"]*"[\s\S]*?<\/a>\s*(?=\n\s*(?:<!-- Section Header -->|\s*<div class="section-header"))/,
    `<!-- Featured Article — Editorial Lead -->\n            ${featuredHtml}\n\n            `
  );

  // Replace news grid contents
  // Match from opening grid div through all cards to the closing </div> before <!-- Load More -->
  newsroom = newsroom.replace(
    /(<div class="news-grid" id="newsGrid">)[\s\S]*?(<\/div>\s*\n\s*(?:<!-- Load More -->|<!-- No Results))/,
    `$1\n${cardsHtml}\n            </div>\n\n            <!-- Load More -->`
  );

  fs.writeFileSync(newsroomPath, newsroom);
  console.log(`  ✓ newsroom.html updated (${gridArticles.length} cards + featured)`);
}

// ——————————————————————————————
// 3. Update homepage editorial newsroom section
// ——————————————————————————————

const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let index = fs.readFileSync(indexPath, 'utf-8');
  const featured = articles.find(a => a.featured === true) || articles[0];

  // Update the featured (lead) story on homepage
  const editorialLeadRegex = /<!-- Featured Story[^>]*-->\s*<a href="articles\/[^"]*"[\s\S]*?<\/a>\s*(?=\n\s*<!-- Secondary Stories -->)/;
  if (editorialLeadRegex.test(index)) {
    const leadHtml = `<!-- Featured Story — Hero -->
            <a href="articles/${featured.slug}.html" class="editorial-lead fade-in">
                <div class="editorial-lead-image">
                    <img loading="lazy" src="${featured.image || ''}" alt="${(featured.image_alt || featured.title).replace(/"/g, '&quot;')}"${featured.image_position ? ` style="object-position: ${featured.image_position}"` : ''}>
                </div>
                <div class="editorial-lead-overlay">
                    <span class="editorial-badge">Featured</span>
                    <h2 class="editorial-lead-headline">${featured.title}</h2>
                    <div class="editorial-lead-meta">
                        <span class="editorial-meta-category">${featured.category || 'News'}</span>
                        <span class="editorial-meta-sep">&bull;</span>
                        <span class="editorial-meta-date">${formatDate(featured.date)}</span>
                        <span class="editorial-meta-sep">&bull;</span>
                        <span class="editorial-meta-read">${readingTime(featured.body)}</span>
                    </div>
                    <p class="editorial-lead-excerpt">${featured.excerpt || featured.description || ''}</p>
                    <span class="editorial-lead-read-btn">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                </div>
            </a>

            `;
    index = index.replace(editorialLeadRegex, leadHtml);
    console.log(`  ✓ index.html updated (featured article)`);
  }

  // Update secondary stories (next 3 articles after featured)
  const secondaryArticles = articles.filter(a => a.slug !== featured.slug).slice(0, 3);
  const secondaryRegex = /<!-- Secondary Stories -->\s*<div class="editorial-secondary fade-in">[\s\S]*?<\/div>\s*(?=\n\s*<!-- Bottom rule)/;
  if (secondaryRegex.test(index) && secondaryArticles.length > 0) {
    const storiesHtml = secondaryArticles.map(a => {
      return `                <a href="articles/${a.slug}.html" class="editorial-story">
                    <div class="editorial-story-image">
                        <img loading="lazy" src="${a.image || ''}" alt="${(a.image_alt || a.title).replace(/"/g, '&quot;')}"${a.image_position ? ` style="object-position: ${a.image_position}"` : ''}>
                    </div>
                    <div class="editorial-story-body">
                        <div class="editorial-story-meta">
                            <span class="editorial-meta-category">${a.category || 'News'}</span>
                            <span class="editorial-meta-sep">&bull;</span>
                            <span class="editorial-meta-date">${formatDate(a.date)}</span>
                        </div>
                        <h3 class="editorial-story-headline">${a.title}</h3>
                        <p class="editorial-story-excerpt">${a.excerpt || a.description || ''}</p>
                        <div class="editorial-story-footer">
                            <span class="editorial-meta-read">${readingTime(a.body)}</span>
                            <span class="editorial-read-btn">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                        </div>
                    </div>
                </a>`;
    }).join('\n\n');

    index = index.replace(
      secondaryRegex,
      `<!-- Secondary Stories -->\n            <div class="editorial-secondary fade-in">\n${storiesHtml}\n            </div>\n\n            `
    );
    console.log(`  ✓ index.html updated (${secondaryArticles.length} secondary stories)`);
  }

  fs.writeFileSync(indexPath, index);
}

// ——————————————————————————————
// 4. Auto-expire job postings
// ——————————————————————————————

const positionsDir = path.join(__dirname, '_positions');
if (fs.existsSync(positionsDir)) {
  const posFiles = fs.readdirSync(positionsDir).filter(f => f.endsWith('.md'));
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  let expiredCount = 0;

  posFiles.forEach(file => {
    const filePath = path.join(positionsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(content);

    // Check if position has an expiration date and if it's passed
    if (data.expires && data.expires <= today && data.expired !== true) {
      // Update the frontmatter to mark as expired
      const newContent = content.replace(
        /^expired\s*:\s*false$/m,
        'expired: true'
      );

      // If "expired" field doesn't exist yet, add it after "expires"
      if (newContent === content && !content.match(/^expired\s*:/m)) {
        const updated = content.replace(
          /^(expires\s*:.*)$/m,
          '$1\nexpired: true'
        );
        fs.writeFileSync(filePath, updated);
      } else {
        fs.writeFileSync(filePath, newContent);
      }
      expiredCount++;
      console.log(`  ⏰ ${file} marked as expired (was due ${data.expires})`);
    }
  });

  if (expiredCount > 0) {
    console.log(`  ✓ ${expiredCount} position(s) auto-expired`);
  } else {
    console.log(`  ✓ ${posFiles.length} positions checked, none expired`);
  }
}

// ——————————————————————————————
// 5. Generate js/events-data.js from _events/*.md
// ——————————————————————————————

/**
 * Parse a time string like "9:00 AM", "5:00 PM", "9:00 AM - 12:00 PM"
 * Returns { hour, minute } for the first (start) time, or null
 */
function parseTime(timeStr) {
  if (!timeStr || timeStr === "''") return null;
  // Remove wrapping quotes if present
  const cleaned = timeStr.replace(/^['"]|['"]$/g, '').trim();
  if (!cleaned) return null;

  // Match "H:MM AM/PM" pattern (take the first time if range)
  const m = cleaned.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;

  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const period = m[3].toUpperCase();

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  return { hour, minute };
}

/**
 * Parse the end time from a time range string like "9:00 AM - 12:00 PM"
 * Returns { hour, minute } for the second (end) time, or null
 */
function parseEndTime(timeStr) {
  if (!timeStr || timeStr === "''") return null;
  const cleaned = timeStr.replace(/^['"]|['"]$/g, '').trim();
  if (!cleaned) return null;

  // Match everything after the dash/hyphen
  const parts = cleaned.split(/\s*[-–]\s*/);
  if (parts.length < 2) return null;

  const m = parts[1].match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;

  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const period = m[3].toUpperCase();

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  return { hour, minute };
}

const eventsDir = path.join(__dirname, '_events');
const eventsOutputPath = path.join(__dirname, 'js', 'events-data.js');

if (fs.existsSync(eventsDir)) {
  const eventFiles = fs.readdirSync(eventsDir).filter(f => f.endsWith('.md'));
  console.log(`\nFound ${eventFiles.length} events to build.`);

  const events = eventFiles.map(file => {
    const content = fs.readFileSync(path.join(eventsDir, file), 'utf-8');
    const { data } = parseFrontmatter(content);
    return data;
  });

  // Sort by date ascending
  events.sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  // Build the JS array entries
  const eventEntries = events.map((evt, i) => {
    const id = i + 1;
    const title = (evt.title || '').replace(/'/g, "\\'");
    const description = (evt.description || '').replace(/'/g, "\\'");
    const location = (evt.location || '').replace(/'/g, "\\'");
    const image = (evt.image || '').replace(/^''$/, '').replace(/'/g, "\\'");
    let registerUrl = (evt.register_url || '').replace(/^''$/, '').replace(/'/g, "\\'");

    // Map type: CMS uses "virtual", frontend uses "online"
    let type = evt.type || 'in-person';
    if (type === 'virtual') type = 'online';

    // Parse start date + time
    const dateParts = (evt.date || '').split('-').map(Number);
    const startTime = parseTime(evt.time);
    let dateArgs = `${dateParts[0]}, ${dateParts[1] - 1}, ${dateParts[2]}`;
    if (startTime) {
      dateArgs += `, ${startTime.hour}, ${startTime.minute}`;
    }

    // Parse end date + end time
    let endDateLine = '';
    const endDateStr = evt.end_date && evt.end_date !== "''" ? evt.end_date : '';
    if (endDateStr) {
      const endParts = endDateStr.split('-').map(Number);
      const endTime = parseEndTime(evt.time) || parseTime(evt.end_time);
      let endArgs = `${endParts[0]}, ${endParts[1] - 1}, ${endParts[2]}`;
      if (endTime) {
        endArgs += `, ${endTime.hour}, ${endTime.minute}`;
      }
      endDateLine = `\n        endDate: new Date(${endArgs}),`;
    } else if (startTime) {
      // Single-day event with start time — check for end time in time field
      const endTime = parseEndTime(evt.time);
      if (endTime) {
        endDateLine = `\n        endDate: new Date(${dateParts[0]}, ${dateParts[1] - 1}, ${dateParts[2]}, ${endTime.hour}, ${endTime.minute}),`;
      }
    }

    return `    {
        id: ${id},
        title: '${title}',
        date: new Date(${dateArgs}),${endDateLine}
        location: '${location}',
        type: '${type}',
        description: '${description}',
        image: '${image}',
        registerUrl: '${registerUrl}'
    }`;
  });

  const eventsJs = `// Auto-generated by build.js from _events/*.md — DO NOT EDIT MANUALLY
// Last built: ${new Date().toISOString()}

const GPDC_EVENTS = [
${eventEntries.join(',\n')}
];

// Helper function to get upcoming events sorted by date
function getUpcomingEvents(limit) {
    limit = limit || null;
    var now = new Date();
    var events = GPDC_EVENTS
        .filter(function(e) { return e.date >= now || (e.endDate && e.endDate >= now); })
        .sort(function(a, b) { return a.date - b.date; });

    if (limit) {
        events = events.slice(0, limit);
    }

    return events;
}
`;

  fs.writeFileSync(eventsOutputPath, eventsJs);
  console.log(`  ✓ js/events-data.js generated (${events.length} events)`);
} else {
  console.log('\nNo _events directory found, skipping events build.');
}

// ——————————————————————————————
// 6. Update positions.html from _positions/*.md
// ——————————————————————————————

const positionsPath = path.join(__dirname, 'positions.html');
if (fs.existsSync(positionsDir) && fs.existsSync(positionsPath)) {
  const posFiles2 = fs.readdirSync(positionsDir).filter(f => f.endsWith('.md'));
  console.log(`\nBuilding ${posFiles2.length} position cards.`);

  const positions = posFiles2.map(file => {
    const content = fs.readFileSync(path.join(positionsDir, file), 'utf-8');
    const { data } = parseFrontmatter(content);
    return data;
  });

  // Sort: non-expired first, then by date descending (newest first)
  positions.sort((a, b) => {
    if (a.expired !== b.expired) return a.expired ? 1 : -1;
    return (b.date || '').localeCompare(a.date || '');
  });

  // Format type label: "attorney" → "Attorney", "non-attorney" → "Non-Attorney"
  function typeLabel(type) {
    return (type || '').split('-').map(function(w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join('-');
  }

  const posCardsHtml = positions.map(pos => {
    const isNew = pos.is_new === true;
    const isExpired = pos.expired === true;
    const type = pos.type || 'attorney';
    const county = (pos.county || 'statewide').toLowerCase();
    const applyUrl = pos.apply_url || 'contact.html';

    const expiredAttr = isExpired ? ' data-expired="true"' : '';
    const newBadge = isNew && !isExpired
      ? '\n                    <span class="position-new-badge">New</span>'
      : '';

    return `            <div class="position-card fade-in" data-type="${type}" data-county="${county}"${expiredAttr}>
                <div class="position-card-header">
                    <span class="position-type-badge ${type}">${typeLabel(type)}</span>${newBadge}
                </div>
                <div class="position-card-content">
                    <h3 class="position-title">${pos.title || 'Untitled Position'}</h3>
                    <div class="position-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${pos.location || 'Georgia'}
                    </div>
                    <div class="position-posted">Posted ${formatDate(pos.date)}</div>
                    <p class="position-description">${(pos.description || '').replace(/"/g, '&quot;')}</p>
                </div>
                <div class="position-card-footer">
                    <a href="${applyUrl}" class="apply-btn">
                        Apply Now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>`;
  }).join('\n\n');

  // Replace position cards in positions.html
  // The grid div contains all cards, then closes with </div> before <!-- No Results Message -->
  let positionsHtml = fs.readFileSync(positionsPath, 'utf-8');
  positionsHtml = positionsHtml.replace(
    /(<div class="positions-grid" id="positionsGrid">)[\s\S]*?(\s*<\/div>\s*\n\s*<!-- No Results Message -->)/,
    `$1\n\n${posCardsHtml}\n\n        </div>\n\n        <!-- No Results Message -->`
  );

  fs.writeFileSync(positionsPath, positionsHtml);
  console.log(`  ✓ positions.html updated (${positions.length} cards)`);
} else {
  console.log('\nSkipping positions build (missing directory or positions.html).');
}

console.log(`\nBuild complete! ${articles.length} articles, events, and positions processed.`);
