#!/usr/bin/env node
/**
 * GPDC Circuit Page Generator
 *
 * Reads _data/circuits.json and generates all 44 local-office HTML pages
 * with the redesigned layout: regional hero, quick-action cards, county
 * badges, two-column map + info, additional offices, and news section.
 *
 * Usage:  node scripts/generate-circuits.js
 */

const fs = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, '_data', 'circuits.json');
const OUTPUT_DIR = path.join(ROOT, 'local-offices');

// ── Region hero images ─────────────────────────────────────────────────
const regionImages = {
    mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    metro:     'https://images.unsplash.com/photo-1575917649111-0cee4e7e8852?w=1600&q=80',
    piedmont:  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80',
    coastal:   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    south:     'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
    augusta:   'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600&q=80'
};

// ── SVG Icons ──────────────────────────────────────────────────────────
const icons = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
    directions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    apply: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    fax: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
};

// ── Helpers ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function encodeAddress(address) {
    return encodeURIComponent(address);
}

function formatPhoneForTel(phone) {
    return phone.replace(/[^0-9]/g, '');
}

function countyLabel(count) {
    return count === 1 ? '1 County Served' : `${count} Counties Served`;
}

// ── HTML Template ───────────────────────────────────────────────────────
function generatePage(circuit) {
    const {
        circuit: circuitName,
        counties,
        slug,
        defender,
        address,
        phone,
        fax,
        additionalOffices,
        description,
        region
    } = circuit;

    const heroImage = regionImages[region] || regionImages.piedmont;
    const encodedAddress = encodeAddress(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
    const phoneDigits = formatPhoneForTel(phone);
    const countyCount = counties.length;

    // Short name without "Circuit"
    const shortName = circuitName.replace(/ Circuit$/, '');

    // Meta description
    const metaDescription = `Find public defender services for the ${circuitName} in Georgia. Office location, contact information, and counties served by the ${circuitName} Public Defender.`;

    // Build additional offices HTML (conditional)
    let additionalOfficesHtml = '';
    if (additionalOffices && additionalOffices.length > 0) {
        const officeCards = additionalOffices.map(office => {
            let cardContent = `                    <div class="circuit-office-card">
                        <h4>${escapeHtml(office.location)}</h4>
                        <p>${escapeHtml(office.address)}</p>`;
            if (office.phone) {
                cardContent += `\n                        <p><a href="tel:${formatPhoneForTel(office.phone)}">${escapeHtml(office.phone)}</a></p>`;
            }
            if (office.fax) {
                cardContent += `\n                        <p class="circuit-office-fax">Fax: ${escapeHtml(office.fax)}</p>`;
            }
            cardContent += '\n                    </div>';
            return cardContent;
        }).join('\n');

        additionalOfficesHtml = `
    <section class="circuit-additional section-animate">
        <div class="circuit-container">
            <h3 class="circuit-section-title fade-in">Additional Offices</h3>
            <div class="circuit-office-cards fade-in">
${officeCards}
            </div>
        </div>
    </section>`;
    }

    // Build fax contact item (conditional)
    let faxHtml = '';
    if (fax) {
        faxHtml = `
                    <div class="circuit-contact-item">
                        ${icons.fax}
                        <div>
                            <span class="circuit-contact-label">Fax</span>
                            <span class="circuit-contact-value">${escapeHtml(fax)}</span>
                        </div>
                    </div>`;
    }

    // Build county badges (inside hero)
    const countyBadges = counties.map(c =>
        `                <span class="circuit-county-badge">${escapeHtml(c)} County</span>`
    ).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="${escapeHtml(metaDescription)}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(circuitName)} | Georgia Public Defender Council</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css?v=17">
    <link rel="canonical" href="https://gapubdef.org/local-offices/${slug}.html">
    <noscript><style>.section-animate{opacity:1;transform:none}</style></noscript>
    <script src="../js/transitions.js"></script>
</head>
<body>
    <div class="page-transition" id="pageTransition"></div>
    <!-- Header (loaded dynamically) -->
    <div id="site-header"></div>

    <section class="circuit-hero circuit-hero--${region}">
        <div class="circuit-hero-bg"><img src="${heroImage}" alt="${escapeHtml(shortName)} region landscape"></div>
        <div class="circuit-hero-content">
            <p class="label circuit-hero-label">LOCAL OFFICE</p>
            <h1 class="circuit-hero-title">${escapeHtml(circuitName)}</h1>
            <p class="circuit-hero-subtitle">${countyLabel(countyCount)}</p>
            <div class="circuit-hero-counties">
${countyBadges}
            </div>
        </div>
    </section>

    <section class="circuit-actions section-animate">
        <div class="circuit-action-cards">
            <a href="tel:${phoneDigits}" class="circuit-action-card circuit-action-card--call">
                <div class="circuit-action-icon">${icons.phone}</div>
                <span class="circuit-action-label">Call</span>
                <span class="circuit-action-detail">${escapeHtml(phone)}</span>
            </a>
            <a href="${mapsUrl}" target="_blank" rel="noopener" class="circuit-action-card circuit-action-card--directions">
                <div class="circuit-action-icon">${icons.directions}</div>
                <span class="circuit-action-label">Directions</span>
                <span class="circuit-action-detail">Get directions</span>
            </a>
            <a href="mailto:info@gapubdef.org" class="circuit-action-card circuit-action-card--email">
                <div class="circuit-action-icon">${icons.email}</div>
                <span class="circuit-action-label">Email</span>
                <span class="circuit-action-detail">Send a message</span>
            </a>
            <a href="../apply.html" class="circuit-action-card circuit-action-card--apply">
                <div class="circuit-action-icon">${icons.apply}</div>
                <span class="circuit-action-label">Apply</span>
                <span class="circuit-action-detail">Request a defender</span>
            </a>
        </div>
    </section>

    <section class="circuit-detail section-animate">
        <div class="circuit-detail-grid">
            <div class="circuit-detail-info fade-in">
                <h2 class="circuit-section-title">About This Circuit</h2>
                <p class="circuit-defender"><strong>Circuit Public Defender:</strong> ${escapeHtml(defender)}</p>
                <p class="circuit-description">${escapeHtml(description)}</p>
                <div class="circuit-contact-list">
                    <div class="circuit-contact-item">
                        ${icons.directions}
                        <div>
                            <span class="circuit-contact-label">Address</span>
                            <span class="circuit-contact-value">${escapeHtml(address)}</span>
                        </div>
                    </div>
                    <div class="circuit-contact-item">
                        ${icons.clock}
                        <div>
                            <span class="circuit-contact-label">Hours of Operation</span>
                            <span class="circuit-contact-value">Monday &ndash; Friday, 8:30am &ndash; 5:00pm</span>
                        </div>
                    </div>
                    <div class="circuit-contact-item">
                        ${icons.phone}
                        <div>
                            <span class="circuit-contact-label">Phone</span>
                            <a href="tel:${phoneDigits}" class="circuit-contact-value">${escapeHtml(phone)}</a>
                        </div>
                    </div>${faxHtml}
                </div>
            </div>
            <div class="circuit-detail-map fade-in">
                <iframe src="${mapsEmbedUrl}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="Map of ${escapeHtml(circuitName)} office location"></iframe>
            </div>
        </div>
    </section>
${additionalOfficesHtml}
    <section class="circuit-news section-animate">
        <div class="circuit-container">
            <h2 class="circuit-section-title fade-in">News From Around the Circuits</h2>
            <article class="news-article fade-in">
                <div class="news-article-image"><img loading="lazy" src="https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/684200c524675d5f75d8021d_Leadership%20Academy%20Graduation-10%20Large.jpeg" alt="GPDC News"></div>
                <div class="news-article-content">
                    <div class="news-article-meta"><span class="news-article-date">March 17, 2025</span><a href="../newsroom.html" class="news-article-category">Local Offices</a></div>
                    <h3 class="news-article-title">Georgia Public Defender Council Installs New Leaders</h3>
                    <p class="news-article-excerpt">During a recent biannual Circuit Public Defender meeting, Executive Director Omotayo Alli installed new Circuit Public Defenders across the state.</p>
                    <a href="../newsroom.html" class="link-arrow">Read ${icons.arrow}</a>
                </div>
            </article>
        </div>
    </section>

    <!-- Footer (loaded dynamically) -->
    <div id="site-footer"></div>
    <script src="../js/components.js"></script>
    <script src="../js/main.js"></script>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────
function main() {
    // Read circuit data
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    const circuits = data.circuits;

    if (!circuits || !circuits.length) {
        console.error('No circuits found in', DATA_FILE);
        process.exit(1);
    }

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let generated = 0;
    let errors = 0;

    for (const circuit of circuits) {
        const filename = `${circuit.slug}.html`;
        const filepath = path.join(OUTPUT_DIR, filename);

        try {
            const html = generatePage(circuit);
            fs.writeFileSync(filepath, html, 'utf8');
            generated++;
            console.log(`  \u2713  ${filename}`);
        } catch (err) {
            errors++;
            console.error(`  \u2717  ${filename}: ${err.message}`);
        }
    }

    console.log(`\nDone. Generated ${generated} pages.`);
    if (errors > 0) {
        console.log(`Errors: ${errors}`);
        process.exit(1);
    }
}

main();
