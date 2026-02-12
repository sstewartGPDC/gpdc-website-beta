/* ==================== CIRCUIT SEARCH / COUNTY FINDER ====================
 * Paste this into a Webflow HTML Embed on the "Find My Defender" page
 * Requires: An input with id="defenderSearch" and a div with id="searchResults"
 *
 * HTML structure to add in Webflow:
 * <div class="search-wrapper">
 *   <input type="text" id="defenderSearch" placeholder="Search by county or circuit name" autocomplete="off">
 *   <div id="searchResults">
 *     <div class="search-hint">Search by circuit name or county</div>
 *     <div id="searchResultsList"></div>
 *   </div>
 * </div>
 * ================================================================== */

(function() {
    'use strict';

    // County to Circuit mapping (159 Georgia counties)
    // This data can also be pulled from a Webflow CMS collection if preferred
    const countyMap = {
        "Appling": "Brunswick Circuit", "Atkinson": "Alapaha Circuit", "Bacon": "Waycross Circuit",
        "Baker": "South Georgia Circuit", "Baldwin": "Ocmulgee Circuit", "Banks": "Piedmont Circuit",
        "Barrow": "Piedmont Circuit", "Bartow": "Cherokee Circuit", "Ben Hill": "Cordele Circuit",
        "Berrien": "Alapaha Circuit", "Bibb": "Macon Circuit", "Bleckley": "Oconee Circuit",
        "Brantley": "Waycross Circuit", "Brooks": "Southern Circuit", "Bryan": "Atlantic Circuit",
        "Bulloch": "Ogeechee Circuit", "Burke": "Augusta Circuit", "Butts": "Towaliga Circuit",
        "Calhoun": "South Georgia Circuit", "Camden": "Brunswick Circuit", "Candler": "Middle Georgia Circuit",
        "Carroll": "West Georgia Circuit", "Catoosa": "Lookout Mountain Circuit",
        "Charlton": "Waycross Circuit", "Chatham": "Eastern Circuit", "Chattahoochee": "Chattahoochee Circuit",
        "Chattooga": "Lookout Mountain Circuit", "Cherokee": "Blue Ridge Circuit",
        "Clarke": "Western Circuit", "Clay": "Pataula Circuit", "Clayton": "Clayton Circuit",
        "Clinch": "Alapaha Circuit", "Cobb": "Cobb Circuit", "Coffee": "Waycross Circuit",
        "Colquitt": "Southern Circuit", "Columbia": "Columbia Circuit", "Cook": "Alapaha Circuit",
        "Coweta": "Coweta Circuit", "Crawford": "Macon Circuit", "Crisp": "Cordele Circuit",
        "Dade": "Lookout Mountain Circuit", "Dawson": "Northeastern Circuit", "Decatur": "South Georgia Circuit",
        "DeKalb": "Dekalb Circuit", "Dodge": "Oconee Circuit", "Dooly": "Cordele Circuit",
        "Dougherty": "Dougherty Circuit", "Douglas": "Douglas Circuit", "Early": "Pataula Circuit",
        "Echols": "Southern Circuit", "Effingham": "Ogeechee Circuit", "Elbert": "Northern Circuit",
        "Emanuel": "Middle Georgia Circuit", "Evans": "Atlantic Circuit", "Fannin": "Appalachian Circuit",
        "Fayette": "Griffin Circuit", "Floyd": "Rome Circuit", "Forsyth": "Bell-Forsyth Circuit",
        "Franklin": "Northern Circuit", "Fulton": "Atlanta Circuit", "Gilmer": "Appalachian Circuit",
        "Glascock": "Toombs Circuit", "Glynn": "Brunswick Circuit", "Gordon": "Cherokee Circuit",
        "Grady": "South Georgia Circuit", "Greene": "Ocmulgee Circuit", "Gwinnett": "Gwinnett Circuit",
        "Habersham": "Mountain Circuit", "Hall": "Northeastern Circuit", "Hancock": "Ocmulgee Circuit",
        "Haralson": "Tallapoosa Circuit", "Harris": "Chattahoochee Circuit", "Hart": "Northern Circuit",
        "Heard": "West Georgia Circuit", "Henry": "Flint Circuit", "Houston": "Houston Circuit",
        "Irwin": "Tifton Circuit", "Jackson": "Piedmont Circuit", "Jasper": "Ocmulgee Circuit",
        "Jeff Davis": "Brunswick Circuit", "Jefferson": "Middle Georgia Circuit",
        "Jenkins": "Ogeechee Circuit", "Johnson": "Dublin Circuit", "Jones": "Ocmulgee Circuit",
        "Lamar": "Towaliga Circuit", "Lanier": "Alapaha Circuit", "Laurens": "Dublin Circuit",
        "Lee": "Southwestern Circuit", "Liberty": "Atlantic Circuit", "Lincoln": "Toombs Circuit",
        "Long": "Atlantic Circuit", "Lowndes": "Southern Circuit", "Lumpkin": "Enotah Circuit",
        "Macon": "Southwestern Circuit", "Madison": "Northern Circuit", "Marion": "Chattahoochee Circuit",
        "McDuffie": "Toombs Circuit", "McIntosh": "Atlantic Circuit", "Meriwether": "Coweta Circuit",
        "Miller": "Pataula Circuit", "Mitchell": "South Georgia Circuit", "Monroe": "Towaliga Circuit",
        "Montgomery": "Oconee Circuit", "Morgan": "Ocmulgee Circuit", "Murray": "Conasauga Circuit",
        "Muscogee": "Chattahoochee Circuit", "Newton": "Alcovy Circuit", "Oconee": "Western Circuit",
        "Oglethorpe": "Northern Circuit", "Paulding": "Paulding Circuit", "Peach": "Macon Circuit",
        "Pickens": "Appalachian Circuit", "Pierce": "Waycross Circuit", "Pike": "Griffin Circuit",
        "Polk": "Tallapoosa Circuit", "Pulaski": "Oconee Circuit", "Putnam": "Ocmulgee Circuit",
        "Quitman": "Pataula Circuit", "Rabun": "Mountain Circuit", "Randolph": "Pataula Circuit",
        "Richmond": "Augusta Circuit", "Rockdale": "Rockdale Circuit", "Schley": "Southwestern Circuit",
        "Screven": "Ogeechee Circuit", "Seminole": "Pataula Circuit", "Spalding": "Griffin Circuit",
        "Stephens": "Mountain Circuit", "Stewart": "Southwestern Circuit", "Sumter": "Southwestern Circuit",
        "Talbot": "Chattahoochee Circuit", "Taliaferro": "Toombs Circuit", "Tattnall": "Atlantic Circuit",
        "Taylor": "Chattahoochee Circuit", "Telfair": "Oconee Circuit", "Terrell": "Pataula Circuit",
        "Thomas": "Southern Circuit", "Tift": "Tifton Circuit", "Toombs": "Middle Georgia Circuit",
        "Towns": "Enotah Circuit", "Treutlen": "Dublin Circuit", "Troup": "Coweta Circuit",
        "Turner": "Tifton Circuit", "Twiggs": "Dublin Circuit", "Union": "Enotah Circuit",
        "Upson": "Griffin Circuit", "Walker": "Lookout Mountain Circuit", "Walton": "Alcovy Circuit",
        "Ware": "Waycross Circuit", "Warren": "Toombs Circuit", "Washington": "Middle Georgia Circuit",
        "Wayne": "Brunswick Circuit", "Webster": "Southwestern Circuit", "Wheeler": "Oconee Circuit",
        "White": "Enotah Circuit", "Whitfield": "Conasauga Circuit", "Wilcox": "Cordele Circuit",
        "Wilkes": "Toombs Circuit", "Wilkinson": "Ocmulgee Circuit", "Worth": "Tifton Circuit"
    };

    function initSearch() {
        const searchInput = document.getElementById('defenderSearch');
        const searchResults = document.getElementById('searchResults');
        const searchResultsList = document.getElementById('searchResultsList');

        if (!searchInput || !searchResults || !searchResultsList) return;

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();

            if (query.length < 2) {
                searchResults.classList.remove('active');
                searchResultsList.innerHTML = '';
                return;
            }

            const results = [];

            // Search counties
            Object.entries(countyMap).forEach(([county, circuit]) => {
                if (county.toLowerCase().includes(query)) {
                    const slug = circuit.toLowerCase().replace(/\s+/g, '-');
                    results.push({
                        type: 'county',
                        name: county + ' County',
                        circuit: circuit,
                        url: '/local-offices/' + slug
                    });
                }
            });

            // Search circuit names (deduplicated)
            const circuits = [...new Set(Object.values(countyMap))];
            circuits.forEach(circuit => {
                if (circuit.toLowerCase().includes(query)) {
                    const slug = circuit.toLowerCase().replace(/\s+/g, '-');
                    if (!results.find(r => r.circuit === circuit && r.type === 'circuit')) {
                        results.push({
                            type: 'circuit',
                            name: circuit,
                            circuit: circuit,
                            url: '/local-offices/' + slug
                        });
                    }
                }
            });

            if (results.length === 0) {
                searchResultsList.innerHTML = '<div class="search-no-results">No results found</div>';
            } else {
                searchResultsList.innerHTML = results.slice(0, 8).map(r =>
                    `<a href="${r.url}" class="search-result-item">
                        <span class="search-result-name">${r.name}</span>
                        ${r.type === 'county' ? `<span class="search-result-circuit">${r.circuit}</span>` : ''}
                    </a>`
                ).join('');
            }

            searchResults.classList.add('active');
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Show on focus if has value
        searchInput.addEventListener('focus', function() {
            if (this.value.length >= 2) {
                searchResults.classList.add('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
