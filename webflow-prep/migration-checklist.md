# Webflow Migration Checklist

Step-by-step migration plan for moving GPDC website from static HTML to Webflow.

---

## Phase 1: Webflow Project Setup (Week 1)

- [ ] Create Webflow project
- [ ] Set up design system:
  - [ ] Colors: primary (#B85C38), primary-dark, primary-light, primary-subtle, text-dark, text-medium, text-light, bg-light, bg-white, border-light
  - [ ] Fonts: Manrope (body), Ubuntu (headings) — both available on Google Fonts
  - [ ] Spacing: Use consistent 0.5rem increments
  - [ ] Shadows: sm, md, lg (match current CSS variables)
  - [ ] Border radius: 8px (small), 16px (medium), 20px (large), 24px (extra-large)
- [ ] Set up global styles:
  - [ ] Base typography (body, h1-h4)
  - [ ] `.btn`, `.btn-primary`, `.btn-outline` button styles
  - [ ] `.label` tag style
  - [ ] `.section-header` / `.section-title` patterns
  - [ ] `.fade-in` animation class
- [ ] Configure site settings:
  - [ ] Favicon + webclip
  - [ ] Global meta tags (og:site_name, default og:image)
  - [ ] Smooth scroll enabled
  - [ ] 404 page

---

## Phase 2: Symbols (Shared Components) (Week 1-2)

- [ ] **Header Symbol**
  - [ ] Desktop nav with logo, nav links, dropdowns, search, Contact CTA
  - [ ] Mobile nav with hamburger toggle
  - [ ] Beta badge (remove for production)
  - [ ] Scroll effect (add `.scrolled` class via Interaction)
  - [ ] Active nav link highlighting
  - [ ] Dropdown + submenu hover behavior
  - [ ] Circuit search input (custom embed)
  - Reference: `components/header.html`

- [ ] **Footer Symbol**
  - [ ] 6-column link grid (Home, About, Clients, Careers, Newsroom, Contact)
  - [ ] Copyright bar with logo
  - [ ] Social media links (Facebook, Instagram, LinkedIn, X)
  - [ ] Team GPDC intranet link
  - Reference: `components/footer.html`

- [ ] **Connect Section Symbol**
  - [ ] 5-card grid: Call, Email, Find Office, FAQs, Newsletter
  - [ ] Newsletter signup form (connected to email service)
  - Reference: `components/connect.html`

---

## Phase 3: CMS Collections (Week 2-3)

- [ ] **Circuit Offices Collection**
  - [ ] Create collection with fields per `cms-schemas.md`
  - [ ] Import data from `circuitData` array (49 circuits)
  - [ ] Build circuit page template
  - [ ] Build circuit listing/search page
  - [ ] Add county-to-circuit search (custom embed)
  - Reference: `local-offices/*.html`, `js/county-map.js`

- [ ] **Articles Collection**
  - [ ] Create collection with fields per `cms-schemas.md`
  - [ ] Import 15 existing articles
  - [ ] Build article page template (header, featured image, body, sidebar)
  - [ ] Build newsroom listing page with filters
  - Reference: `articles/*.html`, `newsroom.html`

- [ ] **Events Collection**
  - [ ] Create collection with fields per `cms-schemas.md`
  - [ ] Import events from `events-data.js`
  - [ ] Build events widget (homepage + training page)
  - [ ] Add filter for upcoming events only
  - Reference: `js/events-data.js`

---

## Phase 4: Page Templates (Week 3-5)

Build these page templates using Webflow components:

### High Priority
- [ ] **Homepage** (`index.html`)
  - Hero with parallax background
  - Quick actions widget
  - Divisions overview
  - Events widget
  - Featured article
  - Stats section
  - Connect section

- [ ] **Standard Division Page** (6 pages)
  - Hero with leader profile card
  - About section (2-column)
  - Services grid (3-column)
  - Contact cards (3-column)
  - Uses shared `divisions.css` styles
  - Pages: Administration, Appellate, Capital, Customer Support, Mental Health, Youth Defense

- [ ] **Social Services Page** (custom)
  - Hero with manager cards
  - Crisis banner
  - "What We Do" visual section
  - Program cards with overlays
  - Quiz flowchart (custom embed)
  - Ladders gallery
  - Connect section

- [ ] **Training Page** (custom)
  - Custom hero with stats
  - Calendar widget with events CMS
  - Program cards
  - Contact grid

### Medium Priority
- [ ] **About Us** (`about.html`)
- [ ] **Team** (`team.html`) — consider Team Members CMS collection
- [ ] **Foundation** (`foundation.html`)
- [ ] **Divisions Overview** (`divisions.html`) — card grid linking to division pages
- [ ] **Find My Defender** (`find-defender.html`) — search + county map
- [ ] **Clients & Families** (`clients.html`)

### Lower Priority
- [ ] **FAQ** (`faq.html`) — accordion component
- [ ] **Careers** (`careers.html`)
- [ ] **Positions** (`positions.html`) — consider Jobs CMS collection
- [ ] **Apply** (`apply.html`)
- [ ] **Legal Process** (`legal-process.html`)
- [ ] **Contact** (`contact.html`) — form integration
- [ ] **Local Public Defense** (`divisions/local-public-defense.html`)

---

## Phase 5: Custom Code Embeds (Week 5-6)

Per `custom-code-inventory.md`:

- [ ] Circuit search + county mapping (8-12 hrs)
- [ ] Dark mode toggle (2-3 hrs)
- [ ] Typewriter placeholder effect (1 hr)
- [ ] Animated stats counter (1-2 hrs)
- [ ] Breadcrumb generation (1-2 hrs)
- [ ] Copy-to-clipboard for contact info (1 hr)
- [ ] Quiz flowchart for Social Services (6-8 hrs)
- [ ] Reading time calculator (30 min)

---

## Phase 6: Hosting & Configuration (Week 6-7)

- [ ] Configure custom domain (gapubdef.org)
- [ ] Set up SSL certificate
- [ ] Configure form submissions (contact form, newsletter)
- [ ] Set up 301 redirects from old URLs:
  - `/divisions/[name].html` -> `/divisions/[name]`
  - `/local-offices/[name].html` -> `/local-offices/[name]`
  - `/articles/[name].html` -> `/articles/[name]`
- [ ] Set up sitemap.xml
- [ ] Configure robots.txt
- [ ] Add Google Analytics / Tag Manager
- [ ] Set up backup/export schedule

---

## Phase 7: QA & Launch (Week 7-8)

- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Lighthouse > 90)
- [ ] SEO check (meta descriptions, OG tags, canonical URLs — already implemented)
- [ ] Form testing (all forms submit correctly)
- [ ] Link testing (no broken links)
- [ ] Dark mode testing (all pages)
- [ ] CMS publishing workflow test
- [ ] Redirect verification
- [ ] DNS cutover plan
- [ ] Launch!

---

## Estimated Timeline

| Phase | Duration | Effort |
|---|---|---|
| 1. Project Setup | 1 week | 20 hrs |
| 2. Symbols | 1 week | 30 hrs |
| 3. CMS Collections | 1.5 weeks | 40 hrs |
| 4. Page Templates | 2 weeks | 80 hrs |
| 5. Custom Code | 1.5 weeks | 30 hrs |
| 6. Configuration | 1 week | 15 hrs |
| 7. QA & Launch | 1 week | 25 hrs |
| **Total** | **~8 weeks** | **~240 hrs** |

---

## Decision Points (Discuss Before Starting)

1. **Webflow plan tier:** CMS plan required (collections). Business plan if >10,000 CMS items
2. **Intranet pages:** Migrate to Webflow or keep separate? (10 pages in `/intranet/`)
3. **Newsletter provider:** Which email service to integrate with Webflow forms?
4. **Circuit search:** Full custom search vs. simplified Webflow CMS filter?
5. **Dark mode:** Keep or drop? (adds significant complexity)
6. **Command palette:** Keep or drop? (low user visibility)
7. **Content freeze:** When to stop updating static site and switch to Webflow?
