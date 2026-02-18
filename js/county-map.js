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

// Initialize map functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize circuit directory right away (always works)
    renderCircuitDirectory(circuitData);

    // Set up search functionality
    var mapSearch = document.getElementById('mapSearch');
    if (mapSearch) {
        mapSearch.addEventListener('input', handleSearch);
    }

    // Try to load the SVG map
    loadMap();

    // Initialize mobile experience
    renderMobileCircuits(circuitData);
    initMobileAlphaBar();
    initMobileSearch();

    // Modal close handlers
    var modalOverlay = document.getElementById('circuitModalOverlay');
    var modalClose = document.getElementById('circuitModalClose');

    if (modalClose) {
        modalClose.addEventListener('click', closeCircuitModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeCircuitModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeCircuitModal();
    });
});

// Re-render when CMS circuit data overrides the hardcoded fallback
window.addEventListener('circuitDataUpdated', function() {
    renderCircuitDirectory(circuitData);
    renderMobileCircuits(circuitData);
});

function loadMap() {
    var mapLoading = document.getElementById('mapLoading');
    var mapContainer = document.getElementById('mapContainer');
    var mapFallback = document.getElementById('mapFallback');

    // Check if we're running on a server (http/https) or locally (file://)
    var isLocalFile = window.location.protocol === 'file:';

    if (isLocalFile) {
        // For local files, show the fallback immediately
        if (mapLoading) mapLoading.style.display = 'none';
        if (mapFallback) mapFallback.style.display = 'flex';
        return;
    }

    // Try to fetch the SVG
    fetch('images/georgia-wiki.svg')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load map');
            return response.text();
        })
        .then(function(svgContent) {
            if (mapContainer) {
                mapContainer.innerHTML = svgContent;
                mapContainer.style.display = 'block';
            }
            if (mapLoading) mapLoading.style.display = 'none';

            // Initialize interactions
            var svg = mapContainer.querySelector('svg');
            if (svg) {
                mapLoaded = true;
                initializeMapInteractions(svg);
                initializeZoomControls();
            }
        })
        .catch(function(error) {
            console.log('Map loading failed, showing fallback:', error.message);
            if (mapLoading) mapLoading.style.display = 'none';
            if (mapFallback) mapFallback.style.display = 'flex';
        });
}

function initializeZoomControls() {
    var georgiaMap = document.getElementById('georgiaMap');
    if (!georgiaMap) return;

    // Create zoom controls container (3 buttons: zoom in, zoom out, reset)
    var controls = document.createElement('div');
    controls.className = 'map-controls';
    controls.innerHTML = ''
        + '<button class="map-control-btn" id="zoomIn" title="Zoom In">'
        +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
        +     '<circle cx="11" cy="11" r="8"/>'
        +     '<path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>'
        +   '</svg>'
        + '</button>'
        + '<button class="map-control-btn" id="zoomOut" title="Zoom Out">'
        +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
        +     '<circle cx="11" cy="11" r="8"/>'
        +     '<path d="M21 21l-4.35-4.35M8 11h6"/>'
        +   '</svg>'
        + '</button>'
        + '<button class="map-control-btn" id="zoomReset" title="Reset View">'
        +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
        +     '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>'
        +     '<path d="M3 3v5h5"/>'
        +   '</svg>'
        + '</button>';
    georgiaMap.appendChild(controls);

    var mapContainer = document.getElementById('mapContainer');

    // Zoom In
    document.getElementById('zoomIn').addEventListener('click', function() {
        currentZoom = Math.min(currentZoom + 0.25, 3);
        applyZoom(mapContainer);
    });

    // Zoom Out
    document.getElementById('zoomOut').addEventListener('click', function() {
        currentZoom = Math.max(currentZoom - 0.25, 0.5);
        applyZoom(mapContainer);
    });

    // Reset — clears zoom, scroll, selections, highlights, search, and modal
    document.getElementById('zoomReset').addEventListener('click', function() {
        currentZoom = 1;
        applyZoom(mapContainer);
        mapContainer.scrollTop = 0;
        mapContainer.scrollLeft = 0;

        // Clear all county selections and highlights
        var svg = mapContainer.querySelector('svg');
        if (svg) {
            svg.querySelectorAll('.county.active, .county.circuit-member, .county.highlighted').forEach(function(c) {
                c.classList.remove('active', 'circuit-member', 'highlighted');
            });
        }

        // Clear search input
        var searchInput = document.getElementById('mapSearch');
        if (searchInput) searchInput.value = '';

        // Close modal if open
        closeCircuitModal();

        // Reset directory to show all circuits
        renderCircuitDirectory(circuitData);
    });

    // Mouse wheel zoom (Ctrl+scroll or Cmd+scroll)
    georgiaMap.addEventListener('wheel', function(e) {
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

    mapContainer.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('county')) return;
        isPanning = true;
        mapContainer.style.cursor = 'grabbing';
        startX = e.pageX - mapContainer.offsetLeft;
        startY = e.pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
    });

    mapContainer.addEventListener('mouseleave', function() {
        isPanning = false;
        mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mouseup', function() {
        isPanning = false;
        mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mousemove', function(e) {
        if (!isPanning) return;
        e.preventDefault();
        var x = e.pageX - mapContainer.offsetLeft;
        var y = e.pageY - mapContainer.offsetTop;
        var walkX = (x - startX) * 1.5;
        var walkY = (y - startY) * 1.5;
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });
}

function applyZoom(container) {
    var svg = container.querySelector('svg');
    if (svg) {
        svg.style.transform = 'scale(' + currentZoom + ')';
        svg.style.transformOrigin = 'center top';
    }
}

function initializeMapInteractions(svg) {
    var counties = svg.querySelectorAll('.county');
    var currentHoveredCounty = null;

    // Safety: clear all hover states when mouse leaves the entire map
    svg.addEventListener('mouseleave', function() {
        if (currentHoveredCounty) {
            currentHoveredCounty.classList.remove('hovered');
            currentHoveredCounty = null;
        }
        hideTooltip();
    });

    counties.forEach(function(county) {
        var fipsCode = county.id;
        var countyName = fipsToCounty[fipsCode] || fipsCode;
        var circuitSlug = countyToCircuit[countyName];

        // Store county name for later use
        county.dataset.name = countyName;

        if (circuitSlug) {
            county.dataset.circuit = circuitSlug;
        } else {
            // Mark as opt-out county (not part of GPDC system)
            county.classList.add('opt-out');
        }

        // Individual county hover
        county.addEventListener('mouseenter', function() {
            if (currentHoveredCounty && currentHoveredCounty !== county) {
                currentHoveredCounty.classList.remove('hovered');
            }
            if (!county.classList.contains('opt-out')) {
                county.classList.add('hovered');
                currentHoveredCounty = county;
            }
            showTooltip(county, countyName, svg);
        });

        county.addEventListener('mouseleave', function() {
            county.classList.remove('hovered');
            if (currentHoveredCounty === county) {
                currentHoveredCounty = null;
            }
            hideTooltip();
        });

        // Click to select circuit and open modal
        county.addEventListener('click', function() {
            if (circuitSlug) {
                var circuit = circuitData.find(function(c) { return c.slug === circuitSlug; });
                if (circuit) {
                    openCircuitModal(circuit, countyName);
                    selectCircuit(svg, circuitSlug, countyName);
                }
            }
        });
    });
}

function selectCircuit(svg, circuitSlug, clickedCountyName) {
    // Clear previous selection
    svg.querySelectorAll('.county.active, .county.circuit-member').forEach(function(county) {
        county.classList.remove('active', 'circuit-member');
    });

    // Select all counties in this circuit
    svg.querySelectorAll('.county').forEach(function(county) {
        var countyName = county.dataset.name || fipsToCounty[county.id] || county.id;
        var countyCircuit = countyToCircuit[countyName];
        if (countyCircuit === circuitSlug) {
            if (clickedCountyName && countyName === clickedCountyName) {
                county.classList.add('active');
            } else {
                county.classList.add('circuit-member');
            }
        }
    });
}

// ==================== TOOLTIP ====================

var tooltip = null;

function showTooltip(county, name, svg) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        document.body.appendChild(tooltip);
    }

    var countyRect = county.getBoundingClientRect();
    var countyName = county.dataset.name || fipsToCounty[county.id] || name;
    var circuitSlug = countyToCircuit[countyName];
    var circuit = circuitData.find(function(c) { return c.slug === circuitSlug; });
    var isOptOut = county.classList.contains('opt-out');

    var formattedName = countyName.split('-').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    if (isOptOut) {
        tooltip.innerHTML = '<strong>' + formattedName + ' County</strong>'
            + '<br><span class="tooltip-opt-out">Opt-Out County</span>'
            + '<br><span class="tooltip-disclaimer">This county is not part of the GPDC system.</span>';
    } else {
        tooltip.innerHTML = '<strong>' + formattedName + ' County</strong>'
            + (circuit ? '<br><span class="tooltip-circuit">' + circuit.circuit + '</span>' : '');
    }

    tooltip.style.left = (countyRect.left + countyRect.width / 2) + 'px';
    tooltip.style.top = (countyRect.top - 8) + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

// ==================== CIRCUIT MODAL ====================

function openCircuitModal(circuit, countyName) {
    var modalBody = document.getElementById('circuitModalBody');
    var overlay = document.getElementById('circuitModalOverlay');
    if (!modalBody || !overlay) return;

    // Format county name if provided
    var formattedCountyName = '';
    if (countyName) {
        formattedCountyName = countyName.split('-').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    // Google Maps link for address
    var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(circuit.address);

    // Build counties tags
    var countyTags = circuit.counties.map(function(c) {
        var slug = c.toLowerCase().replace(/\s+/g, '-');
        var isActive = countyName && slug === countyName;
        return '<span class="circuit-modal-county-tag' + (isActive ? ' active-county' : '') + '">' + c + '</span>';
    }).join('');

    modalBody.innerHTML = ''
        + (countyName ? '<p class="circuit-modal-county-label">' + formattedCountyName + ' County</p>' : '')
        + '<h2 class="circuit-modal-circuit-name">' + circuit.circuit + '</h2>'
        // Defender
        + '<div class="circuit-modal-detail-row">'
        +   '<div class="circuit-modal-detail-icon">'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
        +   '</div>'
        +   '<div class="circuit-modal-detail-text">'
        +     '<div class="circuit-modal-detail-label">Circuit Public Defender</div>'
        +     '<div class="circuit-modal-detail-value">' + circuit.defender + '</div>'
        +   '</div>'
        + '</div>'
        // Phone
        + '<div class="circuit-modal-detail-row">'
        +   '<div class="circuit-modal-detail-icon">'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>'
        +   '</div>'
        +   '<div class="circuit-modal-detail-text">'
        +     '<div class="circuit-modal-detail-label">Phone</div>'
        +     '<div class="circuit-modal-detail-value"><a href="tel:' + circuit.phone.replace(/-/g, '') + '">' + circuit.phone + '</a></div>'
        +   '</div>'
        + '</div>'
        // Address
        + '<div class="circuit-modal-detail-row">'
        +   '<div class="circuit-modal-detail-icon">'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
        +   '</div>'
        +   '<div class="circuit-modal-detail-text">'
        +     '<div class="circuit-modal-detail-label">Address</div>'
        +     '<div class="circuit-modal-detail-value"><a href="' + mapsUrl + '" target="_blank" rel="noopener">' + circuit.address + '</a></div>'
        +   '</div>'
        + '</div>'
        // Counties
        + '<div class="circuit-modal-counties-list">'
        +   '<div class="circuit-modal-counties-label">Counties Served</div>'
        +   '<div class="circuit-modal-counties-tags">' + countyTags + '</div>'
        + '</div>'
        // Mobile-only action buttons
        + '<div class="circuit-modal-mobile-actions">'
        +   '<a href="tel:' + circuit.phone.replace(/-/g, '') + '" class="circuit-modal-action-btn circuit-modal-action-btn--call">'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>'
        +     'Call Now'
        +   '</a>'
        +   '<a href="' + mapsUrl + '" target="_blank" rel="noopener" class="circuit-modal-action-btn circuit-modal-action-btn--directions">'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
        +     'Directions'
        +   '</a>'
        + '</div>'
        // View full details button
        + '<div class="circuit-modal-actions">'
        +   '<a href="local-offices/' + circuit.slug + '.html" class="circuit-modal-view-btn">'
        +     '<span>View Full Details</span>'
        +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
        +   '</a>'
        + '</div>';

    // Show overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCircuitModal() {
    var overlay = document.getElementById('circuitModalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==================== CIRCUIT DIRECTORY (below map) ====================

function renderCircuitDirectory(circuits) {
    var directoryList = document.getElementById('circuitDirectoryList');
    var countEl = document.getElementById('circuitDirectoryCount');
    if (!directoryList) return;

    if (countEl) {
        countEl.textContent = circuits.length + ' circuit' + (circuits.length !== 1 ? 's' : '');
    }

    if (circuits.length === 0) {
        directoryList.innerHTML = '<div class="circuit-directory-empty">'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
            + '<circle cx="11" cy="11" r="8"/>'
            + '<path d="M21 21l-4.35-4.35"/>'
            + '</svg>'
            + '<p>No circuits found</p>'
            + '</div>';
        return;
    }

    directoryList.innerHTML = circuits.map(function(circuit) {
        return '<div class="circuit-directory-item" data-slug="' + circuit.slug + '">'
            + '<div class="circuit-directory-item-info">'
            +   '<div class="circuit-directory-item-name">' + circuit.circuit + '</div>'
            +   '<div class="circuit-directory-item-counties">' + circuit.counties.join(', ') + '</div>'
            + '</div>'
            + '<svg class="circuit-directory-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
            + '</div>';
    }).join('');

    // Click handlers for directory items
    directoryList.querySelectorAll('.circuit-directory-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var slug = item.dataset.slug;
            var circuit = circuitData.find(function(c) { return c.slug === slug; });
            if (circuit) {
                openCircuitModal(circuit);

                // Highlight on map if loaded
                if (mapLoaded) {
                    var svg = document.querySelector('#mapContainer svg');
                    if (svg) selectCircuit(svg, slug);
                }
            }
        });
    });
}

// ==================== SEARCH ====================

function handleSearch(e) {
    var query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
        // Reset everything
        renderCircuitDirectory(circuitData);
        if (mapLoaded) {
            var svg = document.querySelector('#mapContainer svg');
            if (svg) {
                svg.querySelectorAll('.county.highlighted').forEach(function(c) {
                    c.classList.remove('highlighted');
                });
            }
        }
        return;
    }

    // Highlight matching counties on map
    if (mapLoaded) {
        var svg = document.querySelector('#mapContainer svg');
        if (svg) {
            svg.querySelectorAll('.county').forEach(function(county) {
                var countyName = (county.dataset.name || county.id).toLowerCase();
                if (countyName.includes(query)) {
                    county.classList.add('highlighted');
                } else {
                    county.classList.remove('highlighted');
                }
            });
        }
    }

    // Filter circuit directory
    var filtered = circuitData.filter(function(circuit) {
        var circuitMatch = circuit.circuit.toLowerCase().includes(query);
        var countyMatch = circuit.counties.some(function(county) {
            return county.toLowerCase().includes(query);
        });
        var defenderMatch = circuit.defender.toLowerCase().includes(query);
        return circuitMatch || countyMatch || defenderMatch;
    });

    renderCircuitDirectory(filtered);

    // If single result, auto-open modal and highlight on map
    if (filtered.length === 1) {
        openCircuitModal(filtered[0]);
        if (mapLoaded) {
            var svg = document.querySelector('#mapContainer svg');
            if (svg) selectCircuit(svg, filtered[0].slug);
        }
    }
}

// ==================== MOBILE EXPERIENCE ====================

function renderMobileCircuits(circuits) {
    var grid = document.getElementById('mobileCircuitsGrid');
    var countEl = document.getElementById('mobileResultsCount');
    if (!grid) return;

    if (countEl) {
        countEl.innerHTML = 'Showing <span>' + circuits.length + '</span> circuit' + (circuits.length !== 1 ? 's' : '');
    }

    if (circuits.length === 0) {
        grid.innerHTML = '<div class="fypd-no-results">'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
            + '<circle cx="11" cy="11" r="8"/>'
            + '<path d="M21 21l-4.35-4.35"/>'
            + '</svg>'
            + '<p>No circuits found</p>'
            + '<p class="fypd-no-results-hint">Try a different search term or filter</p>'
            + '</div>';
        return;
    }

    grid.innerHTML = circuits.map(function(circuit) {
        var countyCount = circuit.counties.length;
        var countyLabel = countyCount + ' ' + (countyCount === 1 ? 'County' : 'Counties');
        return '<div class="fypd-circuit-card" data-slug="' + circuit.slug + '">'
            + '<div class="fypd-circuit-card-header">'
            + '<span class="fypd-circuit-badge">' + countyLabel + '</span>'
            + '</div>'
            + '<div class="fypd-circuit-card-content">'
            + '<h4 class="fypd-circuit-name">' + circuit.circuit + '</h4>'
            + '<div class="fypd-circuit-location">'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
            + circuit.counties.join(', ')
            + '</div>'
            + '<p class="fypd-circuit-defender">Circuit PD: ' + circuit.defender + '</p>'
            + '</div>'
            + '<div class="fypd-circuit-card-footer">'
            + '<a href="local-offices/' + circuit.slug + '.html" class="fypd-view-btn">'
            + 'View Office Details'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
            + '</a>'
            + '</div>'
            + '</div>';
    }).join('');
}

function initMobileAlphaBar() {
    var bar = document.getElementById('alphaBar');
    if (!bar) return;

    var letters = ['All', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'];

    bar.innerHTML = letters.map(function(letter) {
        var dataLetter = letter === 'All' ? 'all' : letter;
        return '<button class="fypd-alpha-btn' + (letter === 'All' ? ' active' : '') + '" data-letter="' + dataLetter + '">' + letter + '</button>';
    }).join('');

    bar.addEventListener('click', function(e) {
        var btn = e.target.closest('.fypd-alpha-btn');
        if (!btn) return;

        bar.querySelectorAll('.fypd-alpha-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Clear the mobile search input when using alpha filter
        var mobileSearch = document.getElementById('mobileMapSearch');
        if (mobileSearch) mobileSearch.value = '';

        var letter = btn.dataset.letter;
        if (letter === 'all') {
            renderMobileCircuits(circuitData);
        } else {
            var filtered = circuitData.filter(function(c) {
                return c.circuit.charAt(0).toUpperCase() === letter;
            });
            renderMobileCircuits(filtered);
        }
    });
}

function initMobileSearch() {
    var mobileSearch = document.getElementById('mobileMapSearch');
    if (!mobileSearch) return;

    // On focus, scroll the search hero into view so results appear above the keyboard
    mobileSearch.addEventListener('focus', function() {
        setTimeout(function() {
            var hero = document.querySelector('.fypd-mobile-search-hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    });

    mobileSearch.addEventListener('input', function(e) {
        var query = e.target.value.toLowerCase().trim();

        // Reset alpha bar to "All"
        document.querySelectorAll('.fypd-alpha-btn').forEach(function(b) { b.classList.remove('active'); });
        var allBtn = document.querySelector('.fypd-alpha-btn[data-letter="all"]');
        if (allBtn) allBtn.classList.add('active');

        if (!query) {
            renderMobileCircuits(circuitData);
            return;
        }

        var filtered = circuitData.filter(function(circuit) {
            return circuit.circuit.toLowerCase().includes(query) ||
                   circuit.counties.some(function(c) { return c.toLowerCase().includes(query); }) ||
                   circuit.defender.toLowerCase().includes(query);
        });

        renderMobileCircuits(filtered);
    });
}
