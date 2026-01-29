// ==================== GPDC SHARED JAVASCRIPT ==================== 

// Circuit Data - All Georgia Judicial Circuits
const circuitData = [
    { circuit: "Alapaha Circuit", counties: ["Atkinson", "Berrien", "Clinch", "Cook", "Lanier"], slug: "alapaha-circuit", defender: "Gabriel Cason", address: "105 North Parrish Ave, Adel, GA 31620", phone: "229-507-6401", description: "The Alapaha Judicial Circuit is located in southern Georgia and encompasses five counties: Atkinson, Berrien, Clinch, Cook, and Lanier. This circuit primarily covers rural areas known for their agricultural landscapes and small-town charm." },
    { circuit: "Alcovy Circuit", counties: ["Newton", "Walton"], slug: "alcovy-circuit", defender: "Anthony Carter", address: "1160 Pace St, Covington, GA 30014", phone: "770-266-1540", description: "The Alcovy Judicial Circuit serves Newton and Walton Counties in the north-central Piedmont region of Georgia, providing public defense services to communities east of metropolitan Atlanta." },
    { circuit: "Appalachian Circuit", counties: ["Fannin", "Gilmer", "Pickens"], slug: "appalachian-circuit", defender: "Clint Hooker", address: "52 N Main St, Jasper, GA 30143", phone: "706-669-4941", description: "The Appalachian Judicial Circuit covers three mountainous counties in north Georgia: Fannin, Gilmer, and Pickens. The circuit is known for its scenic beauty and outdoor recreation." },
    { circuit: "Atlanta Circuit", counties: ["Fulton"], slug: "atlanta-circuit", defender: "Maurice Kenner", address: "55 Park Place NE Suite 1600, Atlanta, GA 30303", phone: "404-612-0731", description: "The Atlanta Judicial Circuit is located in north-central Georgia and encompasses Fulton County. This circuit covers a highly urbanized area, including the city of Atlanta, the state's capital and largest city." },
    { circuit: "Atlantic Circuit", counties: ["Bryan", "Evans", "Liberty", "Long", "McIntosh", "Tattnall"], slug: "atlantic-circuit", defender: "Joshua Brockington", address: "701 S Main St, Hinesville, GA 31313", phone: "912-256-6101", description: "The Atlantic Judicial Circuit serves six coastal and near-coastal counties in southeastern Georgia, including the area surrounding Fort Stewart military installation." },
    { circuit: "Augusta Circuit", counties: ["Burke", "Richmond"], slug: "augusta-circuit", defender: "Lee Prescott", address: "902 Greene Street, Augusta, GA 30901", phone: "706-312-5105", description: "The Augusta Judicial Circuit encompasses two counties in the Central Savannah River Area, including Georgia's second-largest city, Augusta." },
    { circuit: "Brunswick Circuit", counties: ["Appling", "Camden", "Glynn", "Jeff Davis", "Wayne"], slug: "brunswick-circuit", defender: "Stephen Tillman", address: "701 H St, Brunswick, GA 31520", phone: "912-240-1770", description: "The Brunswick Judicial Circuit covers five counties along Georgia's southeastern coast, including the historic port city of Brunswick and the Golden Isles." },
    { circuit: "Chattahoochee Circuit", counties: ["Chattahoochee", "Harris", "Marion", "Muscogee", "Talbot", "Taylor"], slug: "chattahoochee-circuit", defender: "Matthew Flournoy", address: "420 10th Street, Columbus, GA 31901", phone: "706-225-4621", description: "The Chattahoochee Judicial Circuit serves six counties in west-central Georgia, including Columbus, the state's third-largest city." },
    { circuit: "Cherokee Circuit", counties: ["Bartow", "Gordon"], slug: "cherokee-circuit", defender: "Christopher Paul", address: "114 W Cherokee Ave, Cartersville, GA 30120", phone: "770-881-6172", description: "The Cherokee Judicial Circuit covers Bartow and Gordon Counties in northwest Georgia, an area with a rich history in the Cherokee Nation." },
    { circuit: "Clayton Circuit", counties: ["Clayton"], slug: "clayton-circuit", defender: "Douglas Smith", address: "9151 Tara Blvd, Jonesboro, GA 30236", phone: "706-876-1576", description: "The Clayton Judicial Circuit serves Clayton County, located south of Atlanta and home to Hartsfield-Jackson Atlanta International Airport." },
    { circuit: "Conasauga Circuit", counties: ["Columbia"], slug: "conasauga-circuit", defender: "Amanda Cosson-McCoy", address: "201 S. Hamilton Street 3rd Floor, Dalton, GA 30720", phone: "706-447-6750", description: "The Conasauga Judicial Circuit serves Columbia County in east Georgia." },
    { circuit: "Columbia Circuit", counties: ["Murray", "Whitfield"], slug: "columbia-circuit", defender: "Mack Taylor", address: "201 S. Hamilton Street, Dalton, GA 30720", phone: "229-322-4111", description: "The Columbia Judicial Circuit serves Murray and Whitfield Counties in northwest Georgia, known as the 'Carpet Capital of the World.'" },
    { circuit: "Cordele Circuit", counties: ["Ben Hill", "Crisp", "Dooly", "Wilcox"], slug: "cordele-circuit", defender: "Kyle Hollomon", address: "716-B 16th Avenue East, Cordele, GA 31015", phone: "229-276-2768", description: "The Cordele Judicial Circuit covers four counties in south-central Georgia, an agricultural region known for its watermelon production." },
    { circuit: "Coweta Circuit", counties: ["Coweta", "Meriwether", "Troup"], slug: "coweta-circuit", defender: "Ricardo Samper", address: "306 Tanner St, Carrollton, GA 30117", phone: "770-830-1323", description: "The Coweta Judicial Circuit serves three counties in west Georgia, including the cities of Newnan and LaGrange." },
    { circuit: "Dekalb Circuit", counties: ["DeKalb"], slug: "dekalb-circuit", defender: "Letitia Delan", address: "320 Church Street, Decatur, GA 30030", phone: "404-371-2802", description: "The Dekalb Judicial Circuit serves DeKalb County, one of Georgia's most populous and diverse counties, located east of Atlanta." },
    { circuit: "Dougherty Circuit", counties: ["Dougherty"], slug: "dougherty-circuit", defender: "Troy Golden", address: "P.O. Box 1827, Albany, GA 31702", phone: "229-302-3769", description: "The Dougherty Judicial Circuit serves Dougherty County in southwest Georgia, home to the city of Albany, a regional hub for commerce and healthcare." },
    { circuit: "Dublin Circuit", counties: ["Johnson", "Laurens", "Treutlen", "Twiggs"], slug: "dublin-circuit", defender: "Clay Tapley", address: "1506 Bellvue Rd, Dublin, GA 31021", phone: "478-609-0533", description: "The Dublin Judicial Circuit covers four counties in central Georgia, centered around the city of Dublin." },
    { circuit: "Eastern Circuit", counties: ["Chatham"], slug: "eastern-circuit", defender: "Todd Martin", address: "222 W Oglethorpe Ave, Suite 130, Savannah, GA 31401", phone: "912-447-4908", description: "The Eastern Judicial Circuit serves Chatham County, home to the historic city of Savannah and Georgia's busiest seaport." },
    { circuit: "Enotah Circuit", counties: ["Lumpkin", "Towns", "Union", "White"], slug: "enotah-circuit", defender: "Penny Hunter", address: "59 South Main Street Suite C, Cleveland, GA 30528", phone: "706-348-8577", description: "The Enotah Judicial Circuit covers four mountain counties in northeast Georgia, including popular tourist destinations in the Blue Ridge Mountains." },
    { circuit: "Flint Circuit", counties: ["Henry"], slug: "flint-circuit", defender: "Jennifer Lewis", address: "30 Atlanta Street Ste 001, McDonough, GA 30253", phone: "770-288-7471", description: "The Flint Judicial Circuit serves Henry County, a rapidly growing suburban community south of Atlanta." },
    { circuit: "Griffin Circuit", counties: ["Fayette", "Pike", "Spalding", "Upson"], slug: "griffin-circuit", defender: "William Imhoff", address: "141 West Solomon Street, Suite 4099, Griffin, GA 30224", phone: "404-200-5870", description: "The Griffin Judicial Circuit covers four counties in west-central Georgia, including the city of Griffin, known for its textile history." },
    { circuit: "Lookout Mountain Circuit", counties: ["Catoosa", "Chattooga", "Dade", "Walker"], slug: "lookout-mountain-circuit", defender: "Jad Johnson", address: "101 Napier Street, LaFayette, GA 30739", phone: "706-638-3290", description: "The Lookout Mountain Judicial Circuit covers four counties in Georgia's northwest corner, including areas near Lookout Mountain and Chickamauga Battlefield." },
    { circuit: "Macon Circuit", counties: ["Bibb", "Crawford", "Peach"], slug: "macon-circuit", defender: "Rick Waller Jr.", address: "201 Second Street, Ste 550, Macon, GA 31201", phone: "478-310-2059", description: "The Macon Judicial Circuit serves three counties in central Georgia, including Macon, a major hub of commerce, transportation, and higher education." },
    { circuit: "Middle Georgia Circuit", counties: ["Candler", "Emanuel", "Jefferson", "Toombs", "Washington"], slug: "middle-georgia-circuit", defender: "Brandi Payne", address: "360 Bulldog Rd. Ste. A, Lyons, GA 30436", phone: "478-237-9014", description: "The Middle Georgia Judicial Circuit covers five counties in east-central Georgia, a primarily rural agricultural region." },
    { circuit: "Mountain Circuit", counties: ["Habersham", "Rabun", "Stephens"], slug: "mountain-circuit", defender: "Jeanne Tiger", address: "226 Grant Street, Clarkesville, GA 30523", phone: "706-754-6427", description: "The Mountain Judicial Circuit serves three counties in northeast Georgia's Blue Ridge Mountains, a popular destination for tourism and outdoor recreation." },
    { circuit: "Northeastern Circuit", counties: ["Dawson", "Hall"], slug: "northeastern-circuit", defender: "Mark Alexander", address: "225 Green St SE, Gainesville, GA 30501", phone: "770-718-5528", description: "The Northeastern Judicial Circuit covers two counties in the foothills of the Blue Ridge Mountains in northeast Georgia." },
    { circuit: "Northern Circuit", counties: ["Elbert", "Franklin", "Hart", "Madison", "Oglethorpe"], slug: "northern-circuit", defender: "Amanda Grantham", address: "461 Cook St. Ste J, Royston, GA 30662", phone: "706-246-9320", description: "The Northern Judicial Circuit serves five counties in northeast Georgia along the South Carolina border." },
    { circuit: "Ocmulgee Circuit", counties: ["Baldwin", "Greene", "Hancock", "Jasper", "Jones", "Morgan", "Putnam", "Wilkinson"], slug: "ocmulgee-circuit", defender: "Kristin Waller", address: "121 N. Wilkinson St., Milledgeville, GA 31059", phone: "478-445-8100", description: "The Ocmulgee Judicial Circuit covers eight counties in central Georgia, including Milledgeville, the state's former capital." },
    { circuit: "Oconee Circuit", counties: ["Bleckley", "Dodge", "Montgomery", "Pulaski", "Telfair", "Wheeler"], slug: "oconee-circuit", defender: "Ashley McLaughlin", address: "5168 Anson Ave, Eastman, GA 31023", phone: "478-448-1801", description: "The Oconee Judicial Circuit serves six rural counties in central Georgia, an agricultural region known for its forestry and farming." },
    { circuit: "Ogeechee Circuit", counties: ["Bulloch", "Effingham", "Jenkins", "Screven"], slug: "ogeechee-circuit", defender: "Renata Newbill-Jallow", address: "30 N Main St, Statesboro, GA 30458", phone: "912-764-6292", description: "The Ogeechee Judicial Circuit covers four counties in east Georgia, including Statesboro, home to Georgia Southern University." },
    { circuit: "Pataula Circuit", counties: ["Clay", "Early", "Miller", "Quitman", "Randolph", "Seminole", "Terrell"], slug: "pataula-circuit", defender: "Marla Chambless", address: "111 S Washington St, Blakely, GA 39823", phone: "229-886-8153", description: "The Pataula Judicial Circuit serves seven rural counties in southwest Georgia along the Alabama and Florida borders." },
    { circuit: "Paulding Circuit", counties: ["Paulding"], slug: "paulding-circuit", defender: "Michael Syrop", address: "280 Constitution Blvd, Dallas, GA 30132", phone: "770-443-3463", description: "The Paulding Judicial Circuit encompasses Paulding County, one of the fastest-growing counties in metropolitan Atlanta's western suburbs." },
    { circuit: "Piedmont Circuit", counties: ["Banks", "Barrow", "Jackson"], slug: "piedmont-circuit", defender: "Donna Seagraves", address: "5000 Thompson Mill Rd, Hoschton, GA 30548", phone: "706-387-6317", description: "The Piedmont Judicial Circuit serves three counties in northeast Georgia, a mix of rural communities and growing suburbs." },
    { circuit: "Rockdale Circuit", counties: ["Rockdale"], slug: "rockdale-circuit", defender: "Gina Bernard", address: "922 Court St NE, Conyers, GA 30012", phone: "470-621-8085", description: "The Rockdale Judicial Circuit encompasses Rockdale County, a suburban community east of Atlanta with a diverse population." },
    { circuit: "Rome Circuit", counties: ["Floyd"], slug: "rome-circuit", defender: "Sean Lowe", address: "3 Government Plaza Suite 206, Rome, GA 30161", phone: "706-234-0975", description: "The Rome Judicial Circuit serves Floyd County in northwest Georgia, home to the city of Rome, situated at the confluence of three rivers." },
    { circuit: "South Georgia Circuit", counties: ["Baker", "Calhoun", "Decatur", "Grady", "Mitchell"], slug: "south-georgia-circuit", defender: "Tre McLendon", address: "112 S Broad St Suite A, Bainbridge, GA 39817", phone: "229-246-2877", description: "The South Georgia Judicial Circuit covers five counties in the southwest corner of Georgia, a region known for hunting plantations and agriculture." },
    { circuit: "Southern Circuit", counties: ["Brooks", "Colquitt", "Echols", "Lowndes", "Thomas"], slug: "southern-circuit", defender: "Wade Krueger", address: "106 S Patterson St, Suite 201, Valdosta, GA 31601", phone: "229-300-6334", description: "The Southern Judicial Circuit serves five counties in south Georgia, including Valdosta, home to Valdosta State University." },
    { circuit: "Southwestern Circuit", counties: ["Lee", "Macon", "Schley", "Stewart", "Sumter", "Webster"], slug: "southwestern-circuit", defender: "David Winheim", address: "500 W Lamar St Suite A, Americus, GA 31709", phone: "229-928-4610", description: "The Southwestern Judicial Circuit covers six counties in southwest Georgia, including Americus, home to Georgia Southwestern State University." },
    { circuit: "Tallapoosa Circuit", counties: ["Haralson", "Polk"], slug: "tallapoosa-circuit", defender: "David Smith", address: "141 Prior St Suite 101, Cedartown, GA 30125", phone: "770-646-6629", description: "The Tallapoosa Judicial Circuit covers Haralson and Polk Counties in west Georgia near the Alabama border." },
    { circuit: "Tifton Circuit", counties: ["Irwin", "Tift", "Turner", "Worth"], slug: "tifton-circuit", defender: "Janice Prince", address: "1212 Chestnut Ave, Tifton, GA 31794", phone: "229-387-6488", description: "The Tifton Judicial Circuit serves four counties in south-central Georgia, with Tifton serving as a regional agricultural research center." },
    { circuit: "Toombs Circuit", counties: ["Glascock", "Lincoln", "McDuffie", "Taliaferro", "Warren", "Wilkes"], slug: "toombs-circuit", defender: "Caryn Lobdell", address: "130 Main Street, Thomson, GA 30824", phone: "706-595-7650", description: "The Toombs Judicial Circuit serves six counties in east-central Georgia, a region with rich colonial and Civil War history." },
    { circuit: "Towaliga Circuit", counties: ["Butts", "Lamar", "Monroe"], slug: "towaliga-circuit", defender: "David Tatem", address: "49 W Church St, Forsyth, GA 31029", phone: "478-994-0040", description: "The Towaliga Judicial Circuit covers three counties in central Georgia between Atlanta and Macon along Interstate 75." },
    { circuit: "Waycross Circuit", counties: ["Bacon", "Brantley", "Charlton", "Coffee", "Pierce", "Ware"], slug: "waycross-circuit", defender: "Joshua Larkey", address: "605 Church Street, Suite D, Waycross, GA 31501", phone: "912-287-4360", description: "The Waycross Judicial Circuit serves six counties in southeast Georgia, including areas adjacent to the Okefenokee Swamp." },
    { circuit: "West Georgia Circuit", counties: ["Clarke", "Oconee"], slug: "west-georgia-circuit", defender: "Maryellen Simmons", address: "440 College Avenue, Suite 220, Athens, GA 30601", phone: "770-830-1323", description: "The West Georgia Judicial Circuit serves Clarke and Oconee Counties, home to the University of Georgia in Athens." },
    { circuit: "Western Circuit", counties: ["Carroll", "Heard"], slug: "western-circuit", defender: "John Donnelly", address: "306 Tanner St, Carrollton, GA 30117", phone: "706-369-6447", description: "The Western Judicial Circuit serves Carroll and Heard Counties in west Georgia, a growing region west of metropolitan Atlanta." }
];

// ==================== NAVIGATION ====================
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');

    // Scroll effect
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Mobile nav toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ==================== CIRCUIT SEARCH ====================
function initCircuitSearch() {
    const searchInput = document.getElementById('defenderSearch');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    
    if (!searchInput || !searchResults || !searchResultsList) return;

    let highlightedIndex = -1;
    let filteredResults = [];

    function renderResults(results) {
        filteredResults = results;
        highlightedIndex = -1;
        
        if (results.length === 0) {
            searchResultsList.innerHTML = '<div class="search-no-results">No circuits found matching your search</div>';
            return;
        }

        // Determine the base path based on current page location
        const isInSubfolder = window.location.pathname.includes('/local-offices/') || window.location.pathname.includes('/local%20offices/');
        const basePath = isInSubfolder ? '' : 'local-offices/';

        searchResultsList.innerHTML = results.map((item, index) => `
            <a href="${basePath}${item.slug}.html" class="search-result-item" data-index="${index}">
                <div class="search-result-circuit">${item.circuit}</div>
                <div class="search-result-counties">${item.counties.join(', ')} ${item.counties.length > 1 ? 'Counties' : 'County'}</div>
            </a>
        `).join('');
    }

    function highlightResult(index) {
        const items = searchResultsList.querySelectorAll('.search-result-item');
        items.forEach((item, i) => {
            item.classList.toggle('highlighted', i === index);
        });
        
        if (index >= 0 && items[index]) {
            items[index].scrollIntoView({ block: 'nearest' });
        }
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchResults.classList.remove('active');
            return;
        }

        const results = circuitData.filter(item => {
            const circuitMatch = item.circuit.toLowerCase().includes(query);
            const countyMatch = item.counties.some(county => county.toLowerCase().includes(query));
            return circuitMatch || countyMatch;
        });

        renderResults(results);
        searchResults.classList.add('active');
    });

    searchInput.addEventListener('keydown', (e) => {
        if (!searchResults.classList.contains('active')) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, filteredResults.length - 1);
            highlightResult(highlightedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            highlightResult(highlightedIndex);
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            const item = filteredResults[highlightedIndex];
            if (item) {
                const isInSubfolder = window.location.pathname.includes('/local-offices/') || window.location.pathname.includes('/local%20offices/');
                const basePath = isInSubfolder ? '' : 'local-offices/';
                window.location.href = `${basePath}${item.slug}.html`;
            }
        } else if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            searchInput.blur();
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            searchResults.classList.remove('active');
        }
    });
}

// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const searchInput = document.getElementById('defenderSearch');
    if (!searchInput) return;

    const placeholderTexts = [
        'Search "Fulton County"',
        'Search "Atlanta Circuit"',
        'Search "DeKalb County"',
        'Search "Clayton"',
        'Search "Cherokee Circuit"',
        'Search "Chatham County"',
        'Search "Hall County"',
        'Search "Richmond County"'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typewriterActive = false;
    
    function typewriterEffect() {
        if (!typewriterActive) return;
        
        if (searchInput.value.length > 0) {
            searchInput.placeholder = '';
            return;
        }
        
        if (document.activeElement !== searchInput) {
            searchInput.placeholder = 'Find My Public Defender Office';
            typewriterActive = false;
            currentTextIndex = 0;
            currentCharIndex = 0;
            isDeleting = false;
            isPaused = false;
            return;
        }
        
        const currentText = placeholderTexts[currentTextIndex];
        
        if (isPaused) {
            isPaused = false;
            isDeleting = true;
            setTimeout(typewriterEffect, 50);
            return;
        }
        
        if (isDeleting) {
            currentCharIndex--;
            searchInput.placeholder = currentText.substring(0, currentCharIndex) + '|';
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
                setTimeout(typewriterEffect, 300);
            } else {
                setTimeout(typewriterEffect, 30);
            }
        } else {
            currentCharIndex++;
            searchInput.placeholder = currentText.substring(0, currentCharIndex) + '|';
            
            if (currentCharIndex === currentText.length) {
                isPaused = true;
                searchInput.placeholder = currentText;
                setTimeout(typewriterEffect, 2000);
            } else {
                setTimeout(typewriterEffect, 80);
            }
        }
    }
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) searchResults.classList.add('active');
            return;
        }
        
        typewriterActive = true;
        setTimeout(() => {
            if (typewriterActive && document.activeElement === searchInput) {
                typewriterEffect();
            }
        }, 500);
    });
    
    searchInput.addEventListener('blur', () => {
        typewriterActive = false;
        if (searchInput.value.length === 0) {
            searchInput.placeholder = 'Find My Public Defender Office';
        }
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
function initButtonRipples() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== PAGE TRANSITIONS ====================
function initPageTransitions() {
    const pageTransition = document.getElementById('pageTransition');
    if (!pageTransition) return;

    const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === window.location.pathname || href.startsWith('http')) return;
            
            e.preventDefault();
            pageTransition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    window.addEventListener('load', () => {
        if (pageTransition.classList.contains('active')) {
            setTimeout(() => {
                pageTransition.classList.remove('active');
                pageTransition.classList.add('exit');
            }, 100);
        }
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== SCROLL PROGRESS BAR ====================
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const progressFill = progressBar.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressFill.style.width = scrollPercent + '%';
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== ANIMATED STATISTICS ====================
function initAnimatedStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const animateValue = (element, start, end, duration) => {
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[0-9,]/g, ''); // Get any suffix like + or K

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(numericValue)) {
                    animateValue(entry.target, 0, numericValue, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// ==================== DARK MODE ====================
function initDarkMode() {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
    `;
    document.body.appendChild(darkModeToggle);

    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ==================== ANNOUNCEMENT BANNER ====================
function initAnnouncementBanner() {
    // Configuration - Edit this to change the announcement
    const announcement = {
        enabled: true,
        id: 'winter-cpd-2026', // Unique ID for dismissal tracking
        icon: 'calendar', // 'calendar', 'megaphone', 'alert', or 'info'
        text: 'Winter CPD Meeting - February 27-28, 2026',
        linkText: 'Learn More',
        linkUrl: 'divisions/training.html'
    };

    if (!announcement.enabled) return;

    // Check if user has dismissed this announcement
    if (localStorage.getItem('dismissed-' + announcement.id)) return;

    // Create banner HTML
    const icons = {
        calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
        megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    const banner = document.createElement('div');
    banner.className = 'announcement-banner visible';
    banner.innerHTML = `
        <div class="announcement-banner-content">
            <span class="announcement-banner-text">
                ${icons[announcement.icon] || icons.info}
                ${announcement.text}
                ${announcement.linkUrl ? `<a href="${announcement.linkUrl}" class="announcement-banner-link">${announcement.linkText}</a>` : ''}
            </span>
        </div>
        <button class="announcement-banner-close" aria-label="Dismiss">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
    `;

    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-announcement');

    // Handle close button
    banner.querySelector('.announcement-banner-close').addEventListener('click', () => {
        banner.classList.remove('visible');
        document.body.classList.remove('has-announcement');
        localStorage.setItem('dismissed-' + announcement.id, 'true');
        setTimeout(() => banner.remove(), 300);
    });
}

// ==================== BREADCRUMB NAVIGATION ====================
function initBreadcrumbs() {
    // Define page hierarchy
    const pageHierarchy = {
        'index.html': { title: 'Home', parent: null },
        'about.html': { title: 'About Us', parent: 'index.html' },
        'team.html': { title: 'Our Team', parent: 'about.html' },
        'divisions.html': { title: 'Divisions and Services', parent: 'about.html' },
        'foundation.html': { title: 'Our Foundation', parent: 'about.html' },
        'clients.html': { title: 'Clients & Families', parent: 'index.html' },
        'fypd.html': { title: 'Find Your Public Defender', parent: 'clients.html' },
        'find-defender.html': { title: 'Find Your Public Defender', parent: 'clients.html' },
        'apply.html': { title: 'Apply for Representation', parent: 'clients.html' },
        'faq.html': { title: 'FAQ', parent: 'clients.html' },
        'careers.html': { title: 'Careers', parent: 'index.html' },
        'positions.html': { title: 'Available Positions', parent: 'careers.html' },
        'newsroom.html': { title: 'Newsroom', parent: 'index.html' },
        'contact.html': { title: 'Contact Us', parent: 'index.html' },
        // Division pages
        'divisions/training.html': { title: 'Professional Development & Training', parent: 'divisions.html' },
        'divisions/appellate-defense.html': { title: 'Appellate Defense', parent: 'divisions.html' },
        'divisions/capital-defense.html': { title: 'Capital Defense', parent: 'divisions.html' },
        'divisions/mental-health-defense.html': { title: 'Mental Health Defense', parent: 'divisions.html' },
        'divisions/youth-defense.html': { title: 'Youth Advocacy', parent: 'divisions.html' },
        'divisions/social-services.html': { title: 'Social Services', parent: 'divisions.html' },
        'divisions/customer-support.html': { title: 'Customer Support', parent: 'divisions.html' },
        'divisions/administration.html': { title: 'Administration', parent: 'divisions.html' },
        'divisions/local-public-defense.html': { title: 'Local Public Defense', parent: 'divisions.html' }
    };

    // Get current page
    const path = window.location.pathname;
    let currentPage = path.split('/').pop() || 'index.html';

    // Check if in divisions folder
    if (path.includes('/divisions/')) {
        currentPage = 'divisions/' + currentPage;
    }

    const pageInfo = pageHierarchy[currentPage];
    if (!pageInfo || currentPage === 'index.html') return; // No breadcrumbs for home

    // Build breadcrumb trail
    const trail = [];
    let page = currentPage;
    while (page) {
        const info = pageHierarchy[page];
        if (info) {
            trail.unshift({ page, title: info.title });
            page = info.parent;
        } else {
            break;
        }
    }

    if (trail.length < 2) return; // Need at least 2 items for breadcrumbs

    // Determine base path
    const basePath = path.includes('/divisions/') ? '../' : '';

    // Create breadcrumbs HTML
    const breadcrumbs = document.createElement('div');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.innerHTML = `
        <div class="breadcrumbs-inner">
            ${trail.map((item, i) => {
                if (i === trail.length - 1) {
                    return `<span class="breadcrumb-current">${item.title}</span>`;
                }
                const href = item.page.startsWith('divisions/') ? basePath + item.page : basePath + item.page;
                return `<a href="${href}" class="breadcrumb-item">${item.title}</a><span class="breadcrumb-separator">/</span>`;
            }).join('')}
        </div>
    `;

    // Insert after header
    const header = document.getElementById('site-header');
    if (header) {
        header.insertAdjacentElement('afterend', breadcrumbs);
    }
}

// ==================== STICKY SECTION NAVIGATION ====================
function initStickySectionNav() {
    // Only initialize on pages with sections
    const sections = document.querySelectorAll('[data-section-nav]');
    if (sections.length < 3) return; // Need at least 3 sections

    // Create sticky nav
    const stickyNav = document.createElement('nav');
    stickyNav.className = 'sticky-section-nav';
    stickyNav.innerHTML = `
        <div class="sticky-section-nav-title">On This Page</div>
        <div class="sticky-section-nav-links">
            ${Array.from(sections).map(section => {
                const id = section.id;
                const title = section.getAttribute('data-section-nav');
                return `<a href="#${id}" class="sticky-section-nav-link">${title}</a>`;
            }).join('')}
        </div>
    `;
    document.body.appendChild(stickyNav);

    // Show/hide based on scroll
    const firstSection = sections[0];
    const lastSection = sections[sections.length - 1];

    const updateVisibility = () => {
        const scrollY = window.pageYOffset;
        const firstTop = firstSection.offsetTop - 200;
        const lastBottom = lastSection.offsetTop + lastSection.offsetHeight;

        if (scrollY > firstTop && scrollY < lastBottom) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }

        // Update active link
        const links = stickyNav.querySelectorAll('.sticky-section-nav-link');
        let activeIndex = 0;
        sections.forEach((section, i) => {
            if (scrollY >= section.offsetTop - 150) {
                activeIndex = i;
            }
        });
        links.forEach((link, i) => {
            link.classList.toggle('active', i === activeIndex);
        });
    };

    window.addEventListener('scroll', updateVisibility);
    updateVisibility();

    // Smooth scroll on click
    stickyNav.querySelectorAll('.sticky-section-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initButtonRipples();
    initPageTransitions();
    initSmoothScroll();
    initScrollProgress();
    initBackToTop();
    initAnimatedStats();
    initDarkMode();
    initAnnouncementBanner();
    initBreadcrumbs();
    initStickySectionNav();

    // Initialize search after header component loads (since search is in header)
    document.addEventListener('componentLoaded', (e) => {
        if (e.detail && e.detail.component === 'components/header.html') {
            initCircuitSearch();
            initTypewriter();
        }
    });

    // Fallback: also try initializing if elements already exist
    if (document.getElementById('defenderSearch')) {
        initCircuitSearch();
        initTypewriter();
    }
});

// Export circuit data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { circuitData };
}
