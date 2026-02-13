// FIPS code to county name mapping for Georgia (3-digit county FIPS codes)
const fipsToCounty = {
    '001': 'appling', '003': 'atkinson', '005': 'bacon', '007': 'baker', '009': 'baldwin',
    '011': 'banks', '013': 'barrow', '015': 'bartow', '017': 'ben-hill', '019': 'berrien',
    '021': 'bibb', '023': 'bleckley', '025': 'brantley', '027': 'brooks', '029': 'bryan',
    '031': 'bulloch', '033': 'burke', '035': 'butts', '037': 'calhoun', '039': 'camden',
    '043': 'candler', '045': 'carroll', '047': 'catoosa', '049': 'charlton', '051': 'chatham',
    '053': 'chattahoochee', '055': 'chattooga', '057': 'cherokee', '059': 'clarke', '061': 'clay',
    '063': 'clayton', '065': 'clinch', '067': 'cobb', '069': 'coffee', '071': 'colquitt',
    '073': 'columbia', '075': 'cook', '077': 'coweta', '079': 'crawford', '081': 'crisp',
    '083': 'dade', '085': 'dawson', '087': 'decatur', '089': 'dekalb', '091': 'dodge',
    '093': 'dooly', '095': 'dougherty', '097': 'douglas', '099': 'early', '101': 'echols',
    '103': 'effingham', '105': 'elbert', '107': 'emanuel', '109': 'evans', '111': 'fannin',
    '113': 'fayette', '115': 'floyd', '117': 'forsyth', '119': 'franklin', '121': 'fulton',
    '123': 'gilmer', '125': 'glascock', '127': 'glynn', '129': 'gordon', '131': 'grady',
    '133': 'greene', '135': 'gwinnett', '137': 'habersham', '139': 'hall', '141': 'hancock',
    '143': 'haralson', '145': 'harris', '147': 'hart', '149': 'heard', '151': 'henry',
    '153': 'houston', '155': 'irwin', '157': 'jackson', '159': 'jasper', '161': 'jeff-davis',
    '163': 'jefferson', '165': 'jenkins', '167': 'johnson', '169': 'jones', '171': 'lamar',
    '173': 'lanier', '175': 'laurens', '177': 'lee', '179': 'liberty', '181': 'lincoln',
    '183': 'long', '185': 'lowndes', '187': 'lumpkin', '189': 'mcduffie', '191': 'mcintosh',
    '193': 'macon', '195': 'madison', '197': 'marion', '199': 'meriwether', '201': 'miller',
    '205': 'mitchell', '207': 'monroe', '209': 'montgomery', '211': 'morgan', '213': 'murray',
    '215': 'muscogee', '217': 'newton', '219': 'oconee', '221': 'oglethorpe', '223': 'paulding',
    '225': 'peach', '227': 'pickens', '229': 'pierce', '231': 'pike', '233': 'polk',
    '235': 'pulaski', '237': 'putnam', '239': 'quitman', '241': 'rabun', '243': 'randolph',
    '245': 'richmond', '247': 'rockdale', '249': 'schley', '251': 'screven', '253': 'seminole',
    '255': 'spalding', '257': 'stephens', '259': 'stewart', '261': 'sumter', '263': 'talbot',
    '265': 'taliaferro', '267': 'tattnall', '269': 'taylor', '271': 'telfair', '273': 'terrell',
    '275': 'thomas', '277': 'tift', '279': 'toombs', '281': 'towns', '283': 'treutlen',
    '285': 'troup', '287': 'turner', '289': 'twiggs', '291': 'union', '293': 'upson',
    '295': 'walker', '297': 'walton', '299': 'ware', '301': 'warren', '303': 'washington',
    '305': 'wayne', '307': 'webster', '309': 'wheeler', '311': 'white', '313': 'whitfield',
    '315': 'wilcox', '317': 'wilkes', '319': 'wilkinson', '321': 'worth'
};

// County to Circuit mapping for Georgia's 159 counties across 44 judicial circuits
const countyToCircuit = {
    // Alapaha Circuit
    'atkinson': 'alapaha-circuit',
    'berrien': 'alapaha-circuit',
    'clinch': 'alapaha-circuit',
    'cook': 'alapaha-circuit',
    'lanier': 'alapaha-circuit',
    // Alcovy Circuit
    'newton': 'alcovy-circuit',
    'walton': 'alcovy-circuit',
    // Appalachian Circuit
    'fannin': 'appalachian-circuit',
    'gilmer': 'appalachian-circuit',
    'pickens': 'appalachian-circuit',
    // Atlanta Circuit
    'fulton': 'atlanta-circuit',
    // Atlantic Circuit
    'bryan': 'atlantic-circuit',
    'evans': 'atlantic-circuit',
    'liberty': 'atlantic-circuit',
    'long': 'atlantic-circuit',
    'mcintosh': 'atlantic-circuit',
    'tattnall': 'atlantic-circuit',
    // Augusta Circuit
    'burke': 'augusta-circuit',
    'richmond': 'augusta-circuit',
    // Brunswick Circuit
    'appling': 'brunswick-circuit',
    'camden': 'brunswick-circuit',
    'glynn': 'brunswick-circuit',
    'jeff-davis': 'brunswick-circuit',
    'wayne': 'brunswick-circuit',
    // Chattahoochee Circuit
    'chattahoochee': 'chattahoochee-circuit',
    'harris': 'chattahoochee-circuit',
    'marion': 'chattahoochee-circuit',
    'muscogee': 'chattahoochee-circuit',
    'talbot': 'chattahoochee-circuit',
    'taylor': 'chattahoochee-circuit',
    // Cherokee Circuit
    'bartow': 'cherokee-circuit',
    'gordon': 'cherokee-circuit',
    // Clayton Circuit
    'clayton': 'clayton-circuit',
    // Conasauga Circuit
    'columbia': 'conasauga-circuit',
    // Columbia Circuit
    'murray': 'columbia-circuit',
    'whitfield': 'columbia-circuit',
    // Cordele Circuit
    'ben-hill': 'cordele-circuit',
    'crisp': 'cordele-circuit',
    'dooly': 'cordele-circuit',
    'wilcox': 'cordele-circuit',
    // Coweta Circuit
    'coweta': 'coweta-circuit',
    'meriwether': 'coweta-circuit',
    'troup': 'coweta-circuit',
    // Dekalb Circuit
    'dekalb': 'dekalb-circuit',
    // Dougherty Circuit
    'dougherty': 'dougherty-circuit',
    // Dublin Circuit
    'johnson': 'dublin-circuit',
    'laurens': 'dublin-circuit',
    'treutlen': 'dublin-circuit',
    'twiggs': 'dublin-circuit',
    // Eastern Circuit
    'chatham': 'eastern-circuit',
    // Enotah Circuit
    'lumpkin': 'enotah-circuit',
    'towns': 'enotah-circuit',
    'union': 'enotah-circuit',
    'white': 'enotah-circuit',
    // Flint Circuit
    'henry': 'flint-circuit',
    // Griffin Circuit
    'fayette': 'griffin-circuit',
    'pike': 'griffin-circuit',
    'spalding': 'griffin-circuit',
    'upson': 'griffin-circuit',
    // Lookout Mountain Circuit
    'catoosa': 'lookout-mountain-circuit',
    'chattooga': 'lookout-mountain-circuit',
    'dade': 'lookout-mountain-circuit',
    'walker': 'lookout-mountain-circuit',
    // Macon Circuit
    'bibb': 'macon-circuit',
    'crawford': 'macon-circuit',
    'peach': 'macon-circuit',
    // Middle Georgia Circuit
    'candler': 'middle-georgia-circuit',
    'emanuel': 'middle-georgia-circuit',
    'jefferson': 'middle-georgia-circuit',
    'toombs': 'middle-georgia-circuit',
    'washington': 'middle-georgia-circuit',
    // Mountain Circuit
    'habersham': 'mountain-circuit',
    'rabun': 'mountain-circuit',
    'stephens': 'mountain-circuit',
    // Northeastern Circuit
    'dawson': 'northeastern-circuit',
    'hall': 'northeastern-circuit',
    // Northern Circuit
    'elbert': 'northern-circuit',
    'franklin': 'northern-circuit',
    'hart': 'northern-circuit',
    'madison': 'northern-circuit',
    'oglethorpe': 'northern-circuit',
    // Ocmulgee Circuit
    'baldwin': 'ocmulgee-circuit',
    'greene': 'ocmulgee-circuit',
    'hancock': 'ocmulgee-circuit',
    'jasper': 'ocmulgee-circuit',
    'jones': 'ocmulgee-circuit',
    'morgan': 'ocmulgee-circuit',
    'putnam': 'ocmulgee-circuit',
    'wilkinson': 'ocmulgee-circuit',
    // Oconee Circuit
    'bleckley': 'oconee-circuit',
    'dodge': 'oconee-circuit',
    'montgomery': 'oconee-circuit',
    'pulaski': 'oconee-circuit',
    'telfair': 'oconee-circuit',
    'wheeler': 'oconee-circuit',
    // Ogeechee Circuit
    'bulloch': 'ogeechee-circuit',
    'effingham': 'ogeechee-circuit',
    'jenkins': 'ogeechee-circuit',
    'screven': 'ogeechee-circuit',
    // Pataula Circuit
    'clay': 'pataula-circuit',
    'early': 'pataula-circuit',
    'miller': 'pataula-circuit',
    'quitman': 'pataula-circuit',
    'randolph': 'pataula-circuit',
    'seminole': 'pataula-circuit',
    'terrell': 'pataula-circuit',
    // Paulding Circuit
    'paulding': 'paulding-circuit',
    // Piedmont Circuit
    'banks': 'piedmont-circuit',
    'barrow': 'piedmont-circuit',
    'jackson': 'piedmont-circuit',
    // Rockdale Circuit
    'rockdale': 'rockdale-circuit',
    // Rome Circuit
    'floyd': 'rome-circuit',
    // South Georgia Circuit
    'baker': 'south-georgia-circuit',
    'calhoun': 'south-georgia-circuit',
    'decatur': 'south-georgia-circuit',
    'grady': 'south-georgia-circuit',
    'mitchell': 'south-georgia-circuit',
    // Southern Circuit
    'brooks': 'southern-circuit',
    'colquitt': 'southern-circuit',
    'echols': 'southern-circuit',
    'lowndes': 'southern-circuit',
    'thomas': 'southern-circuit',
    // Southwestern Circuit
    'lee': 'southwestern-circuit',
    'macon': 'southwestern-circuit',
    'schley': 'southwestern-circuit',
    'stewart': 'southwestern-circuit',
    'sumter': 'southwestern-circuit',
    'webster': 'southwestern-circuit',
    // Tallapoosa Circuit
    'haralson': 'tallapoosa-circuit',
    'polk': 'tallapoosa-circuit',
    // Tifton Circuit
    'irwin': 'tifton-circuit',
    'tift': 'tifton-circuit',
    'turner': 'tifton-circuit',
    'worth': 'tifton-circuit',
    // Toombs Circuit
    'glascock': 'toombs-circuit',
    'lincoln': 'toombs-circuit',
    'mcduffie': 'toombs-circuit',
    'taliaferro': 'toombs-circuit',
    'warren': 'toombs-circuit',
    'wilkes': 'toombs-circuit',
    // Towaliga Circuit
    'butts': 'towaliga-circuit',
    'lamar': 'towaliga-circuit',
    'monroe': 'towaliga-circuit',
    // Waycross Circuit
    'bacon': 'waycross-circuit',
    'brantley': 'waycross-circuit',
    'charlton': 'waycross-circuit',
    'coffee': 'waycross-circuit',
    'pierce': 'waycross-circuit',
    'ware': 'waycross-circuit',
    // West Georgia Circuit
    'clarke': 'west-georgia-circuit',
    'oconee': 'west-georgia-circuit',
    // Western Circuit
    'carroll': 'western-circuit',
    'heard': 'western-circuit'
};

let mapLoaded = false;
let currentZoom = 1;
let isPanning = false;
let startX, startY, scrollLeft, scrollTop;
let isFullscreen = false;

// Initialize map functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize circuits list right away (always works)
    renderCircuitsList(circuitData);

    // Set up search functionality
    const mapSearch = document.getElementById('mapSearch');
    if (mapSearch) {
        mapSearch.addEventListener('input', handleSearch);
    }

    // Try to load the SVG map
    loadMap();
});

function loadMap() {
    const mapLoading = document.getElementById('mapLoading');
    const mapContainer = document.getElementById('mapContainer');
    const mapFallback = document.getElementById('mapFallback');

    // Check if we're running on a server (http/https) or locally (file://)
    const isLocalFile = window.location.protocol === 'file:';

    if (isLocalFile) {
        // For local files, show the fallback immediately
        if (mapLoading) mapLoading.style.display = 'none';
        if (mapFallback) mapFallback.style.display = 'flex';
        return;
    }

    // Try to fetch the SVG
    fetch('images/georgia-wiki.svg')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load map');
            return response.text();
        })
        .then(svgContent => {
            if (mapContainer) {
                mapContainer.innerHTML = svgContent;
                mapContainer.style.display = 'block';
            }
            if (mapLoading) mapLoading.style.display = 'none';

            // Initialize interactions
            const svg = mapContainer.querySelector('svg');
            if (svg) {
                mapLoaded = true;
                initializeMapInteractions(svg);
                initializeZoomControls();
            }
        })
        .catch(error => {
            console.log('Map loading failed, showing fallback:', error.message);
            if (mapLoading) mapLoading.style.display = 'none';
            if (mapFallback) mapFallback.style.display = 'flex';
        });
}

function initializeZoomControls() {
    const georgiaMap = document.getElementById('georgiaMap');
    if (!georgiaMap) return;

    // Create zoom controls container
    const controls = document.createElement('div');
    controls.className = 'map-controls';
    controls.innerHTML = `
        <button class="map-control-btn" id="zoomIn" title="Zoom In">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
        </button>
        <button class="map-control-btn" id="zoomOut" title="Zoom Out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M8 11h6"/>
            </svg>
        </button>
        <button class="map-control-btn" id="zoomReset" title="Reset View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
            </svg>
        </button>
        <button class="map-control-btn" id="fullscreen" title="Fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
        </button>
    `;
    georgiaMap.appendChild(controls);

    const mapContainer = document.getElementById('mapContainer');

    // Zoom In
    document.getElementById('zoomIn').addEventListener('click', () => {
        currentZoom = Math.min(currentZoom + 0.25, 3);
        applyZoom(mapContainer);
    });

    // Zoom Out
    document.getElementById('zoomOut').addEventListener('click', () => {
        currentZoom = Math.max(currentZoom - 0.25, 0.5);
        applyZoom(mapContainer);
    });

    // Reset
    document.getElementById('zoomReset').addEventListener('click', () => {
        currentZoom = 1;
        applyZoom(mapContainer);
        mapContainer.scrollTop = 0;
        mapContainer.scrollLeft = 0;
    });

    // Fullscreen
    document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

    // Mouse wheel zoom
    georgiaMap.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            if (e.deltaY < 0) {
                currentZoom = Math.min(currentZoom + 0.1, 3);
            } else {
                currentZoom = Math.max(currentZoom - 0.1, 0.5);
            }
            applyZoom(mapContainer);
        }
    });

    // Pan functionality
    mapContainer.style.overflow = 'auto';
    mapContainer.style.cursor = 'grab';

    mapContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('county')) return;
        isPanning = true;
        mapContainer.style.cursor = 'grabbing';
        startX = e.pageX - mapContainer.offsetLeft;
        startY = e.pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
    });

    mapContainer.addEventListener('mouseleave', () => {
        isPanning = false;
        mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mouseup', () => {
        isPanning = false;
        mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - mapContainer.offsetLeft;
        const y = e.pageY - mapContainer.offsetTop;
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });
}

function applyZoom(container) {
    const svg = container.querySelector('svg');
    if (svg) {
        svg.style.transform = `scale(${currentZoom})`;
        svg.style.transformOrigin = 'center top';
    }
}

function toggleFullscreen() {
    const georgiaMap = document.getElementById('georgiaMap');
    isFullscreen = !isFullscreen;

    if (isFullscreen) {
        georgiaMap.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
    } else {
        georgiaMap.classList.remove('fullscreen');
        document.body.style.overflow = '';
    }
}

function initializeMapInteractions(svg) {
    const counties = svg.querySelectorAll('.county');
    let currentHoveredCounty = null;

    // Safety: clear all hover states when mouse leaves the entire map
    svg.addEventListener('mouseleave', function() {
        if (currentHoveredCounty) {
            currentHoveredCounty.classList.remove('hovered');
            currentHoveredCounty = null;
        }
        hideTooltip();
    });

    counties.forEach(county => {
        const fipsCode = county.id;
        // Convert FIPS code to county name, then get circuit
        const countyName = fipsToCounty[fipsCode] || fipsCode;
        const circuitSlug = countyToCircuit[countyName];

        // Store county name for later use
        county.dataset.name = countyName;

        if (circuitSlug) {
            county.dataset.circuit = circuitSlug;
        } else {
            // Mark as opt-out county (not part of GPDC system)
            county.classList.add('opt-out');
        }

        // Individual county hover - just highlight this county
        county.addEventListener('mouseenter', function(e) {
            // Clear any previously hovered county first
            if (currentHoveredCounty && currentHoveredCounty !== county) {
                currentHoveredCounty.classList.remove('hovered');
            }

            if (!county.classList.contains('opt-out')) {
                county.classList.add('hovered');
                currentHoveredCounty = county;
            }
            showTooltip(county, countyName, svg);
        });

        county.addEventListener('mouseleave', function(e) {
            // Only remove hover if we're actually leaving this county
            // (not just because of DOM re-ordering)
            county.classList.remove('hovered');
            if (currentHoveredCounty === county) {
                currentHoveredCounty = null;
            }
            hideTooltip();
        });

        // Click to select circuit (highlights all counties in circuit)
        county.addEventListener('click', function() {
            if (circuitSlug) {
                const circuit = circuitData.find(c => c.slug === circuitSlug);
                if (circuit) {
                    showCircuitInfo(circuit, countyName);
                    selectCircuit(svg, circuitSlug, countyName);
                }
            }
        });
    });
}

function selectCircuit(svg, circuitSlug, clickedCountyName = null) {
    // Clear previous selection
    svg.querySelectorAll('.county.active, .county.circuit-member').forEach(county => {
        county.classList.remove('active', 'circuit-member');
    });

    // Select all counties in this circuit
    svg.querySelectorAll('.county').forEach(county => {
        const countyName = county.dataset.name || fipsToCounty[county.id] || county.id;
        const countyCircuit = countyToCircuit[countyName];
        if (countyCircuit === circuitSlug) {
            if (clickedCountyName && countyName === clickedCountyName) {
                // Clicked county gets solid fill
                county.classList.add('active');
            } else {
                // Other circuit counties just get border
                county.classList.add('circuit-member');
            }
        }
    });
}

let tooltip = null;

function showTooltip(county, name, svg) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        document.body.appendChild(tooltip);
    }

    const countyRect = county.getBoundingClientRect();
    const countyName = county.dataset.name || fipsToCounty[county.id] || name;
    const circuitSlug = countyToCircuit[countyName];
    const circuit = circuitData.find(c => c.slug === circuitSlug);
    const isOptOut = county.classList.contains('opt-out');

    const formattedName = countyName.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    if (isOptOut) {
        tooltip.innerHTML = `
            <strong>${formattedName} County</strong>
            <br><span class="tooltip-opt-out">Opt-Out County</span>
            <br><span class="tooltip-disclaimer">This county is not part of the GPDC system.</span>
        `;
    } else {
        tooltip.innerHTML = `
            <strong>${formattedName} County</strong>
            ${circuit ? `<br><span class="tooltip-circuit">${circuit.circuit}</span>` : ''}
        `;
    }

    // Position tooltip above the county (CSS transform handles centering and offset)
    // Using fixed positioning - getBoundingClientRect gives viewport coordinates
    tooltip.style.left = `${countyRect.left + countyRect.width / 2}px`;
    tooltip.style.top = `${countyRect.top - 8}px`;
    tooltip.classList.add('visible');
}

function hideTooltip() {
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

function renderCircuitsList(circuits) {
    const mapCircuitsList = document.getElementById('mapCircuitsList');
    if (!mapCircuitsList) return;

    mapCircuitsList.innerHTML = circuits.map(circuit => `
        <div class="circuit-list-item" data-slug="${circuit.slug}">
            <div class="circuit-list-name">${circuit.circuit}</div>
            <div class="circuit-list-counties">${circuit.counties.join(', ')}</div>
        </div>
    `).join('');

    document.querySelectorAll('.circuit-list-item').forEach(item => {
        item.addEventListener('click', () => {
            const slug = item.dataset.slug;
            const circuit = circuitData.find(c => c.slug === slug);
            if (circuit) {
                showCircuitInfo(circuit);

                // Highlight on map if loaded
                if (mapLoaded) {
                    const svg = document.querySelector('#mapContainer svg');
                    if (svg) selectCircuit(svg, slug);
                }
            }
        });
    });
}

function showCircuitInfo(circuit, countyName = null) {
    const mapInfoContent = document.getElementById('mapInfoContent');
    if (!mapInfoContent) return;

    // Format county name if provided
    let formattedCountyName = '';
    if (countyName) {
        formattedCountyName = countyName.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    mapInfoContent.innerHTML = `
        <div class="circuit-info-card">
            ${countyName ? `<h2 class="selected-county-name">${formattedCountyName} County</h2>` : ''}
            <h3 class="circuit-name-subtitle">${circuit.circuit}</h3>
            <p class="circuit-counties-label">${circuit.counties.join(', ')} ${circuit.counties.length > 1 ? 'Counties' : 'County'}</p>
            <div class="circuit-info-details">
                <div class="circuit-info-row">
                    <strong>Circuit Public Defender:</strong>
                    <span>${circuit.defender}</span>
                </div>
                <div class="circuit-info-row">
                    <strong>Address:</strong>
                    <span>${circuit.address}</span>
                </div>
                <div class="circuit-info-row">
                    <strong>Phone:</strong>
                    <a href="tel:${circuit.phone.replace(/-/g, '')}">${circuit.phone}</a>
                </div>
                <div class="circuit-info-row">
                    <strong>Email:</strong>
                    <a href="mailto:help@gapubdef.org?subject=Inquiry%20-%20${encodeURIComponent(circuit.circuit)}" class="circuit-email-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <path d="M22 6l-10 7L2 6"/>
                        </svg>
                        help@gapubdef.org
                    </a>
                </div>
            </div>
            <p class="circuit-description">${circuit.description}</p>
            <a href="local-offices/${circuit.slug}.html" class="btn btn-primary btn-sm">
                <span>View Office Details</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `;
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
        renderCircuitsList(circuitData);
        if (mapLoaded) {
            const svg = document.querySelector('#mapContainer svg');
            if (svg) {
                svg.querySelectorAll('.county.highlighted').forEach(c => c.classList.remove('highlighted'));
            }
        }
        return;
    }

    // Highlight matching counties on map
    if (mapLoaded) {
        const svg = document.querySelector('#mapContainer svg');
        if (svg) {
            svg.querySelectorAll('.county').forEach(county => {
                const countyName = (county.dataset.name || county.id).toLowerCase();
                if (countyName.includes(query)) {
                    county.classList.add('highlighted');
                } else {
                    county.classList.remove('highlighted');
                }
            });
        }
    }

    // Filter circuits list
    const filtered = circuitData.filter(circuit => {
        const circuitMatch = circuit.circuit.toLowerCase().includes(query);
        const countyMatch = circuit.counties.some(county => county.toLowerCase().includes(query));
        const defenderMatch = circuit.defender.toLowerCase().includes(query);
        return circuitMatch || countyMatch || defenderMatch;
    });

    renderCircuitsList(filtered);

    if (filtered.length === 1) {
        showCircuitInfo(filtered[0]);
        if (mapLoaded) {
            const svg = document.querySelector('#mapContainer svg');
            if (svg) selectCircuit(svg, filtered[0].slug);
        }
    }
}
