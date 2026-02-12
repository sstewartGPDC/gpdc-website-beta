# Webflow Custom Code Inventory

Classification of current JS features for Webflow migration. Each feature is categorized by its Webflow implementation approach.

---

## Native Webflow Interactions (No Custom Code Needed)

These features can be replicated using Webflow's built-in Interactions system.

### 1. Scroll-Triggered Fade-In Animations
**Current:** IntersectionObserver in main.js applies `.fade-in` class to elements on scroll
**Webflow:** Use "While scrolling in view" or "Scroll into view" interaction triggers
**Effort:** Low (1-2 hours to set up across site)

### 2. Button Hover Effects
**Current:** CSS transitions + JS ripple effect (`initButtonRipples()`)
**Webflow:** Native hover interactions. Ripple effect can be dropped (adds little value)
**Effort:** Low

### 3. Mobile Navigation Toggle
**Current:** `initNavigation()` toggles `.active` class on mobile nav
**Webflow:** Native Navbar component handles mobile toggle automatically
**Effort:** None (built-in)

### 4. Back-to-Top Button
**Current:** `initBackToTop()` creates button, shows/hides on scroll
**Webflow:** Can use "While page is scrolling" interaction to show/hide element
**Effort:** Low (30 min)

### 5. Smooth Scroll
**Current:** `initSmoothScroll()` handles anchor link scrolling
**Webflow:** Native smooth scroll is built into Webflow page settings
**Effort:** None (built-in)

---

## Custom Code Required (Embed Scripts)

These features require custom `<script>` tags embedded in Webflow.

### 6. Circuit Search / County Finder
**Current:** `initCircuitSearch()` + `county-map.js` (672 lines, 159 counties mapped)
**Implementation:** Full search interface with typeahead, county-to-circuit mapping
**Webflow approach:**
- Embed custom `<script>` with search logic
- Use Webflow form element for input
- CMS data could be pulled via Webflow API, or county map kept as JS object
- Estimated: 8-12 hours
**Files:** `js/main.js` (lines 136-271), `js/county-map.js` (full file)

### 7. Typewriter Effect
**Current:** `initTypewriter()` animates search placeholder text
**Webflow approach:** Embed as custom `<script>`, lightweight
**Estimated:** 1 hour
**Files:** `js/main.js` (lines 273-368)

### 8. Command Palette (Ctrl+K)
**Current:** `initCommandPalette()` — keyboard-driven site navigation
**Webflow approach:** Embed as custom `<script>` with HTML overlay
**Decision point:** Consider dropping this feature (power-user tool, low usage)
**Estimated:** 4-6 hours if kept
**Files:** `js/main.js` (lines 791-1030)

### 9. Dark Mode Toggle
**Current:** Reads/writes localStorage, toggles `data-theme="dark"` on root, swaps CSS variables
**Webflow approach:** Embed custom script. Dark mode CSS variables already in `:root` and `[data-theme="dark"]`
**Estimated:** 2-3 hours (script + ensure all Webflow classes respect variables)
**Files:** `js/main.js` (lines 1050-1090 approx), `css/styles.css` (lines 4053-4130)

### 10. Animated Statistics Counter
**Current:** `initAnimatedStats()` counts up numbers when scrolled into view
**Webflow approach:** Can use Webflow Interactions with number counter, OR embed lightweight script
**Estimated:** 1-2 hours
**Files:** `js/main.js` (lines 522-590)

### 11. Parallax Hero Background
**Current:** `initParallax()` uses rAF to offset hero background on scroll
**Webflow approach:** Webflow has native parallax via Interactions ("Move" with scroll trigger)
**Estimated:** Low (Webflow native is simpler than current implementation)
**Files:** `js/main.js` (lines 430-472)

### 12. Quiz Flowchart (Social Services only)
**Current:** Custom multi-step quiz with branching logic, animated transitions
**Webflow approach:** Must be custom embed (HTML + CSS + JS)
**Estimated:** 6-8 hours
**Files:** `divisions/social-services.html` (inline JS ~200 lines + CSS ~200 lines)

### 13. Dynamic Component Loading
**Current:** `components.js` fetches header/footer/connect HTML and injects via JS
**Webflow approach:** NOT NEEDED. Webflow Symbols handle this natively
**Action:** Delete components.js entirely during migration
**Files:** `js/components.js` (293 lines)

### 14. Breadcrumb Generation
**Current:** `initBreadcrumbs()` generates breadcrumb bar from `pageHierarchy` map
**Webflow approach:** Can use CMS-powered breadcrumbs or a simple custom script
**Estimated:** 1-2 hours
**Files:** `js/main.js` (lines 637-722)

### 15. Page Transitions
**Current:** `initPageTransitions()` fades between page loads
**Webflow approach:** Webflow native page load animations
**Effort:** None (built-in)

---

## Recommended to Drop

These features add complexity without proportional user value.

| Feature | Reason to Drop |
|---|---|
| 3D Card Tilt | Visual novelty, no functional purpose, accessibility concerns |
| Command Palette | Power-user feature, very low discoverability/usage |
| Button Ripple Effect | Subtle effect, not worth custom code budget |
| Page Transition Overlay | Webflow handles this natively |

---

## Effort Summary

| Category | Features | Estimated Hours |
|---|---|---|
| Native Webflow (no code) | 5 features | 2-3 hours setup |
| Custom embed (keep) | 8 features | 25-35 hours |
| Drop | 4 features | 0 hours |
| **Total custom code effort** | | **27-38 hours** |

---

## File Dependencies

```
js/main.js (1,454 lines)
  ├── circuitData array (lines 6-52) → CMS Collection
  ├── initNavigation() → Webflow native
  ├── initScrollAnimations() → Webflow Interactions
  ├── initCircuitSearch() → Custom embed
  ├── initTypewriter() → Custom embed
  ├── initButtonRipples() → Drop
  ├── initPageTransitions() → Webflow native
  ├── initParallax() → Webflow Interactions
  ├── initSmoothScroll() → Webflow native
  ├── initBackToTop() → Webflow Interactions
  ├── initAnimatedStats() → Custom embed
  ├── initBreadcrumbs() → Custom embed or CMS
  ├── initStickyNav() → Custom embed (page-specific)
  ├── initCommandPalette() → Drop
  ├── initCopyToClipboard() → Custom embed (lightweight)
  ├── init3DCards() → Drop
  └── initReadingTime() → Custom embed (lightweight)

js/components.js (293 lines) → DELETE (Webflow Symbols replace this)
js/county-map.js (672 lines) → Custom embed (needed for circuit search)
js/events-data.js (114 lines) → CMS Collection replaces this
```
