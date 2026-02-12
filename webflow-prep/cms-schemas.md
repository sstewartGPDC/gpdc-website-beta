# Webflow CMS Collection Schemas

Reference document for migrating GPDC static HTML pages to Webflow CMS collections.

---

## 1. Circuit Offices Collection

**Source:** `js/main.js` circuitData array (49 entries) + 45 individual HTML pages in `/local-offices/`

### Fields

| Field Name | Type | Required | Notes |
|---|---|---|---|
| circuit_name | Plain Text | Yes | e.g., "Alapaha Circuit" |
| slug | Slug | Yes | Auto-generated, e.g., "alapaha-circuit" |
| defender_name | Plain Text | Yes | Current Circuit Public Defender |
| counties | Multi-reference or Plain Text | Yes | Array of county names, e.g., ["Atkinson", "Berrien", "Clinch", "Cook", "Lanier"] |
| address | Plain Text | Yes | Primary office address |
| phone | Phone | Yes | Primary phone number |
| fax | Phone | No | Fax number (not all circuits have one) |
| description | Rich Text | Yes | 2-3 sentence circuit description |
| additional_offices | Rich Text or nested Collection | No | Some circuits have multiple offices with separate addresses/phones |
| map_embed | Plain Text | No | Google Maps embed URL or coordinates |

### Additional Office Sub-fields (if using nested Collection)
| Field Name | Type | Notes |
|---|---|---|
| location_name | Plain Text | e.g., "Walton County" |
| address | Plain Text | Office address |
| phone | Phone | Office phone |
| fax | Phone | Optional |

### Notes
- 49 circuits defined in JS data, but only 45 have dedicated HTML pages
- The `circuitData` array in main.js is the canonical data source
- Circuit pages also display counties served and county-to-circuit mapping
- Additional offices vary: some circuits have 1 office, others have up to 7 (Ocmulgee)

---

## 2. Articles/Newsroom Collection

**Source:** 15 HTML pages in `/articles/` + newsroom.html listing page

### Fields

| Field Name | Type | Required | Notes |
|---|---|---|---|
| title | Plain Text | Yes | Article headline |
| slug | Slug | Yes | Auto-generated from title |
| category | Option (Dropdown) | Yes | Options: "Leadership", "Training", "Local Offices", "Events", "Awards", "Partnerships" |
| publish_date | Date | Yes | Article publication date |
| featured_image | Image | No | Hero image for article |
| featured_image_alt | Plain Text | No | Alt text for featured image |
| body | Rich Text | Yes | Full article content with headers, paragraphs, images |
| summary | Plain Text | No | 1-2 sentence summary for card previews (150 chars) |
| author | Plain Text | No | Not currently used but good to add |
| is_featured | Switch | No | Whether to show in featured slot on newsroom page |

### Article HTML Structure
```
article-header > article-meta (category + date) > h1
article-featured-image > img
article-layout > article-content > article-body (rich text)
                                 > article-sidebar (related links)
```

### Current Categories (inferred from articles)
- Leadership (academy, new leaders)
- Training (conferences, CPD meetings)
- Local Offices (appointments, swearing-in)
- Events (golf tournament, conferences)
- Awards (Fletcher Award)
- Partnerships (Kenya training, Emory)

---

## 3. Events Collection

**Source:** `js/events-data.js` GPDC_EVENTS array

### Fields

| Field Name | Type | Required | Notes |
|---|---|---|---|
| title | Plain Text | Yes | Event name |
| start_date | Date/Time | Yes | Event start date and time |
| end_date | Date/Time | No | Multi-day events have end date |
| location | Plain Text | Yes | Venue name and city |
| event_type | Option | Yes | Options: "in-person", "virtual", "hybrid", "on-demand" |
| description | Rich Text | Yes | Event description |
| image | Image | No | Event promotional image |
| register_url | URL | No | External registration link |
| is_featured | Switch | No | Show on homepage events widget |

### Notes
- Currently 9 events defined in JS
- Events are filtered by date (only upcoming shown)
- Helper function `getUpcomingEvents(limit)` handles sorting/filtering
- In Webflow: use CMS filter to show only future events, sorted by start_date ascending

---

## 4. Team Members Collection (Future)

**Source:** `team.html` (15 leadership profiles)

### Fields

| Field Name | Type | Required | Notes |
|---|---|---|---|
| name | Plain Text | Yes | Full name |
| title | Plain Text | Yes | Job title |
| division | Plain Text | No | Associated division |
| photo | Image | Yes | Headshot |
| email | Email | No | Contact email |
| phone | Phone | No | Contact phone |
| bio | Rich Text | No | Brief biography |
| sort_order | Number | No | Display order on team page |

---

## Migration Priority
1. **Circuit Offices** (45 pages, most repetitive, biggest win)
2. **Articles** (15 pages, growing content, CMS enables easy publishing)
3. **Events** (currently in JS, CMS enables non-developer editing)
4. **Team Members** (currently static, lower priority)
