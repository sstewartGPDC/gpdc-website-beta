/* ==========================================
   GPDC Decap CMS — Custom Preview Templates
   ========================================== */

// ——— Helpers ———
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function readingTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  return mins + ' min read';
}

function md(text) {
  // Very basic markdown→HTML for the body preview
  if (!text) return '';
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$2</h2>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/<\/blockquote>\s*<blockquote>/g, '<br>')
    .replace(/<p><\/p>/g, '');
}

// ——— ARTICLE PREVIEW ———
var ArticlePreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || 'Untitled Article';
    var category = entry.getIn(['data', 'category']) || 'News';
    var date = entry.getIn(['data', 'date']);
    var image = entry.getIn(['data', 'image']);
    var imageAlt = entry.getIn(['data', 'image_alt']) || '';
    var body = entry.getIn(['data', 'body']) || '';
    var featured = entry.getIn(['data', 'featured']) || false;
    var excerpt = entry.getIn(['data', 'excerpt']) || '';
    var widgetFor = this.props.widgetFor;

    return h('div', { className: 'preview-wrapper' },
      // Featured badge
      featured && h('div', { className: 'preview-featured-badge' }, '⭐ Featured Article'),

      // Article Header
      h('section', { className: 'article-header' },
        h('div', { className: 'article-header-inner' },
          h('div', { className: 'article-meta' },
            h('span', { className: 'article-category' }, category),
            h('span', { className: 'article-meta-divider' }),
            h('span', { className: 'article-date' }, formatDate(date))
          ),
          h('h1', {}, title),
          h('hr', { className: 'article-header-rule' })
        )
      ),

      // Featured Image
      image && h('div', { className: 'article-featured-image' },
        h('img', { src: this.props.getAsset(image).toString(), alt: imageAlt })
      ),

      // Layout: Sidebar + Body
      h('div', { className: 'article-layout' },
        // Main content
        h('article', { className: 'article-content' },
          h('div', { className: 'article-body' },
            widgetFor('body')
          )
        ),

        // Sidebar
        h('aside', { className: 'article-sidebar' },
          h('div', { className: 'article-sidebar-panel' },
            h('div', { className: 'sidebar-section' },
              h('div', { className: 'sidebar-label' }, 'Published'),
              h('div', { className: 'sidebar-value' }, formatDate(date))
            ),
            h('div', { className: 'sidebar-section' },
              h('div', { className: 'sidebar-label' }, 'Category'),
              h('div', { className: 'sidebar-value' }, category)
            ),
            h('div', { className: 'sidebar-section' },
              h('div', { className: 'sidebar-label' }, 'Reading Time'),
              h('div', { className: 'sidebar-value' }, readingTime(body))
            ),
            excerpt && h('div', { className: 'sidebar-section' },
              h('div', { className: 'sidebar-label' }, 'Excerpt'),
              h('div', { className: 'sidebar-value', style: { fontWeight: 400, fontSize: '0.8125rem', color: '#4a4a4a' } }, excerpt)
            )
          )
        )
      )
    );
  }
});

// ——— EVENT PREVIEW ———
var EventPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || 'Untitled Event';
    var date = entry.getIn(['data', 'date']);
    var endDate = entry.getIn(['data', 'end_date']);
    var time = entry.getIn(['data', 'time']) || '';
    var location = entry.getIn(['data', 'location']) || '';
    var type = entry.getIn(['data', 'type']) || 'in-person';
    var description = entry.getIn(['data', 'description']) || '';
    var image = entry.getIn(['data', 'image']);
    var registerUrl = entry.getIn(['data', 'register_url']) || '';
    var widgetFor = this.props.widgetFor;

    var typeLabels = { 'in-person': 'In Person', 'virtual': 'Virtual', 'hybrid': 'Hybrid', 'on-demand': 'On Demand' };
    var typeColors = { 'in-person': '#22c55e', 'virtual': '#3b82f6', 'hybrid': '#a855f7', 'on-demand': '#f59e0b' };

    var dateDisplay = formatDate(date);
    if (endDate) dateDisplay += ' — ' + formatDate(endDate);

    return h('div', { className: 'preview-wrapper' },
      // Event Card Preview
      h('div', { className: 'event-card', style: { maxWidth: '400px', marginBottom: '2rem' } },
        image && h('div', { className: 'event-image' },
          h('img', { src: this.props.getAsset(image).toString(), alt: title })
        ),
        h('div', { className: 'event-content' },
          h('div', { className: 'event-meta' },
            h('span', { className: 'event-location' }, location),
            h('span', { style: { color: '#6b6b6b' } }, ' · '),
            h('span', { className: 'event-date' }, formatDate(date))
          ),
          h('h3', { className: 'event-title' }, title),
          h('p', { className: 'event-description' }, description)
        )
      ),

      // Full event details
      h('div', { className: 'preview-detail-card' },
        h('h2', { style: { fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: "'Ubuntu', sans-serif" } }, title),

        h('div', { className: 'preview-meta-grid' },
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Date'),
            h('div', { className: 'sidebar-value' }, dateDisplay)
          ),
          time && h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Time'),
            h('div', { className: 'sidebar-value' }, time)
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Location'),
            h('div', { className: 'sidebar-value' }, location)
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Type'),
            h('span', {
              style: {
                display: 'inline-block',
                padding: '0.25rem 0.625rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'white',
                background: typeColors[type] || '#6b6b6b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }
            }, typeLabels[type] || type)
          ),
          registerUrl && h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Registration'),
            h('a', {
              href: registerUrl,
              style: { color: '#B85C38', fontWeight: 600, fontSize: '0.875rem' }
            }, 'Register →')
          )
        ),

        // Event body/details
        h('div', { style: { marginTop: '1.5rem', borderTop: '1px solid #e5e2dd', paddingTop: '1.5rem' } },
          h('div', { className: 'article-body' }, widgetFor('body'))
        )
      )
    );
  }
});

// ——— JOB POSTING PREVIEW ———
var PositionPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || 'Untitled Position';
    var date = entry.getIn(['data', 'date']);
    var expires = entry.getIn(['data', 'expires']);
    var location = entry.getIn(['data', 'location']) || '';
    var type = entry.getIn(['data', 'type']) || 'attorney';
    var division = entry.getIn(['data', 'division']) || '';
    var county = entry.getIn(['data', 'county']) || '';
    var isNew = entry.getIn(['data', 'is_new']);
    var description = entry.getIn(['data', 'description']) || '';
    var applyUrl = entry.getIn(['data', 'apply_url']) || '';
    var widgetFor = this.props.widgetFor;

    var typeLabels = { 'attorney': 'Attorney', 'non-attorney': 'Non-Attorney', 'contractor': 'Contractor', 'internship': 'Internship' };
    var divisionLabels = {
      'local': 'Local Offices', 'youth': 'Youth Division', 'social-services': 'Social Services',
      'administration': 'Administration', 'appeals': 'Appeals', 'capital': 'Capital Defense',
      'training': 'Training', 'mental-health': 'Mental Health', 'conflict': 'Conflict'
    };

    // Check if expired
    var isExpired = false;
    if (expires) {
      var expDate = new Date(expires);
      isExpired = expDate < new Date();
    }

    return h('div', { className: 'preview-wrapper', style: { padding: '1.5rem' } },

      // Expiration warning banner
      isExpired && h('div', { style: {
        background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
        padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#dc2626',
        display: 'flex', alignItems: 'center', gap: '0.5rem'
      } },
        h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 16, height: 16, flexShrink: 0 } },
          h('circle', { cx: '12', cy: '12', r: '10' }),
          h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
          h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' })
        ),
        'This posting expired on ' + formatDate(expires) + '. It will be hidden from the live site.'
      ),

      // Position Card (as it appears in listing)
      h('div', { className: 'position-card', style: {
        maxWidth: '480px', marginBottom: '2rem',
        opacity: isExpired ? 0.6 : 1
      } },
        h('div', { className: 'position-header' },
          h('span', { className: 'position-type' }, typeLabels[type] || type),
          isNew && !isExpired && h('span', { className: 'position-new' }, 'New'),
          isExpired && h('span', { style: {
            fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase',
            color: 'white', background: '#ef4444', padding: '0.2rem 0.4rem',
            borderRadius: '4px', display: 'inline-block'
          } }, 'Expired')
        ),
        h('h3', { className: 'position-title' }, title),
        h('p', { className: 'position-location' }, location),
        h('p', { className: 'position-description' }, description),
        h('div', { className: 'position-footer' },
          h('span', { className: 'position-posted' }, 'Posted ' + formatDate(date)),
          !isExpired && h('span', {
            style: {
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: '#B85C38',
              color: 'white',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 600
            }
          }, 'Apply Now \u2192')
        )
      ),

      // Full details card
      h('div', { className: 'preview-detail-card' },
        h('h2', { style: { fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: "'Ubuntu', sans-serif" } }, title),

        h('div', { className: 'preview-meta-grid' },
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Posted'),
            h('div', { className: 'sidebar-value' }, formatDate(date))
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Expires'),
            expires
              ? h('div', { className: 'sidebar-value', style: { color: isExpired ? '#dc2626' : 'inherit' } },
                  formatDate(expires),
                  isExpired && h('span', { style: { fontSize: '0.6875rem', color: '#dc2626', marginLeft: '0.375rem' } }, '(Expired)')
                )
              : h('div', { className: 'sidebar-value', style: { color: '#6b6b6b', fontStyle: 'italic' } }, 'No expiration')
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Location'),
            h('div', { className: 'sidebar-value' }, location)
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Type'),
            h('span', { className: 'position-type' }, typeLabels[type] || type)
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Division'),
            h('div', { className: 'sidebar-value' }, divisionLabels[division] || division)
          ),
          county && h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'County'),
            h('div', { className: 'sidebar-value' }, county.charAt(0).toUpperCase() + county.slice(1))
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Status'),
            isExpired
              ? h('span', { style: {
                  fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase',
                  color: 'white', background: '#ef4444', padding: '0.2rem 0.4rem',
                  borderRadius: '4px', display: 'inline-block'
                } }, 'Expired')
              : isNew
                ? h('span', { className: 'position-new' }, 'New')
                : h('span', { style: { fontSize: '0.75rem', color: '#6b6b6b' } }, 'Active')
          )
        ),

        // Full job description
        h('div', { style: { marginTop: '1.5rem', borderTop: '1px solid #e5e2dd', paddingTop: '1.5rem' } },
          h('div', { className: 'article-body' }, widgetFor('body'))
        )
      )
    );
  }
});

// ——— ANNOUNCEMENT BANNER PREVIEW ———
var AnnouncementPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var enabled = entry.getIn(['data', 'enabled']);
    var id = entry.getIn(['data', 'id']) || '';
    var icon = entry.getIn(['data', 'icon']) || 'calendar';
    var text = entry.getIn(['data', 'text']) || '';
    var linkText = entry.getIn(['data', 'linkText']) || '';
    var linkUrl = entry.getIn(['data', 'linkUrl']) || '';

    var icons = {
      calendar: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 18, height: 18, flexShrink: 0 } },
        h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
        h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
        h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
        h('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
      ),
      megaphone: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 18, height: 18, flexShrink: 0 } },
        h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
      ),
      alert: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 18, height: 18, flexShrink: 0 } },
        h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
        h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
        h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
      ),
      info: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 18, height: 18, flexShrink: 0 } },
        h('circle', { cx: '12', cy: '12', r: '10' }),
        h('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
        h('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' })
      )
    };

    return h('div', { className: 'preview-wrapper' },
      // Status
      !enabled && h('div', { style: {
        background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
        padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#dc2626'
      } }, '⚠ Banner is currently disabled and will not show on the site.'),

      // Live banner preview
      h('div', { className: 'announcement-banner visible', style: { position: 'relative', display: 'block' } },
        h('div', { className: 'announcement-banner-content' },
          h('span', { className: 'announcement-banner-text' },
            icons[icon] || icons.info,
            ' ',
            text,
            linkText && h('a', { className: 'announcement-banner-link', href: linkUrl || '#', style: { marginLeft: '0.5rem' } }, linkText)
          )
        ),
        h('button', { className: 'announcement-banner-close', style: { position: 'absolute' } },
          h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', style: { width: 18, height: 18 } },
            h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
            h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
          )
        )
      ),

      // Settings info card
      h('div', { className: 'preview-detail-card', style: { marginTop: '1.5rem' } },
        h('h3', { style: { fontSize: '1rem', marginBottom: '1rem', fontFamily: "'Ubuntu', sans-serif", color: '#4a4a4a' } }, 'Banner Settings'),
        h('div', { className: 'preview-meta-grid' },
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Status'),
            h('span', {
              style: {
                display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px',
                fontSize: '0.75rem', fontWeight: 600, color: 'white',
                background: enabled ? '#22c55e' : '#ef4444'
              }
            }, enabled ? 'Enabled' : 'Disabled')
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Banner ID'),
            h('div', { className: 'sidebar-value', style: { fontFamily: 'monospace', fontSize: '0.8125rem' } }, id)
          ),
          h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Icon'),
            h('div', { className: 'sidebar-value' }, icon.charAt(0).toUpperCase() + icon.slice(1))
          ),
          linkUrl && h('div', { className: 'preview-meta-item' },
            h('div', { className: 'sidebar-label' }, 'Link URL'),
            h('div', { className: 'sidebar-value', style: { fontFamily: 'monospace', fontSize: '0.8125rem' } }, linkUrl)
          )
        )
      )
    );
  }
});

// ——— Register Previews ———
CMS.registerPreviewTemplate('articles', ArticlePreview);
CMS.registerPreviewTemplate('events', EventPreview);
CMS.registerPreviewTemplate('positions', PositionPreview);
CMS.registerPreviewTemplate('announcement', AnnouncementPreview);
