// ==================== GPDC SHARED JAVASCRIPT ====================

// ==================== UTILITIES ====================
// Throttle function — limits how often a function fires (default: ~60fps)
function throttle(fn, delay = 16) {
    let lastCall = 0;
    let rafId = null;
    return function(...args) {
        const now = performance.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        } else if (!rafId) {
            rafId = requestAnimationFrame(() => {
                lastCall = performance.now();
                rafId = null;
                fn.apply(this, args);
            });
        }
    };
}

// Circuit Data - All Georgia Judicial Circuits
// Updated: February 5, 2026 — phone, address, fax, and additional offices synced from gapubdef.org
// Backup saved to: js/circuitData-backup-2026-02-05.js
const circuitData = [
    { circuit: "Alapaha Circuit", counties: ["Atkinson", "Berrien", "Clinch", "Cook", "Lanier"], slug: "alapaha-circuit", defender: "Gabriel Cason", address: "105 North Parrish Ave, Adel, GA 31620", phone: "229-896-2858", fax: "229-896-2875", description: "The Alapaha Judicial Circuit is located in southern Georgia and encompasses five counties: Atkinson, Berrien, Clinch, Cook, and Lanier. This circuit primarily covers rural areas known for their agricultural landscapes and small-town charm." },
    { circuit: "Alcovy Circuit", counties: ["Newton", "Walton"], slug: "alcovy-circuit", defender: "Anthony Carter", address: "1160 Pace St, Covington, GA 30014", phone: "770-788-3750", fax: "770-788-3757", additionalOffices: [{ location: "Walton County", address: "303 S. Hammond Dr., Suite 98, Monroe, GA 30655", phone: "770-266-1540", fax: "770-266-1545" }], description: "The Alcovy Judicial Circuit serves Newton and Walton Counties in the north-central Piedmont region of Georgia, providing public defense services to communities east of metropolitan Atlanta." },
    { circuit: "Appalachian Circuit", counties: ["Fannin", "Gilmer", "Pickens"], slug: "appalachian-circuit", defender: "Clint Hooker", address: "1 Broad St, Ste 001, Ellijay, GA 30540", phone: "706-698-7322", fax: "706-698-7333", description: "The Appalachian Judicial Circuit covers three mountainous counties in north Georgia: Fannin, Gilmer, and Pickens. The circuit is known for its scenic beauty and outdoor recreation." },
    { circuit: "Atlanta Circuit", counties: ["Fulton"], slug: "atlanta-circuit", defender: "Maurice Kenner", address: "100 Peachtree Street, NW, Suite 1600, Atlanta, GA 30303", phone: "404-612-5200", fax: "404-730-5856", description: "The Atlanta Judicial Circuit is located in north-central Georgia and encompasses Fulton County. This circuit covers a highly urbanized area, including the city of Atlanta, the state's capital and largest city." },
    { circuit: "Atlantic Circuit", counties: ["Bryan", "Evans", "Liberty", "Long", "McIntosh", "Tattnall"], slug: "atlantic-circuit", defender: "Joshua Brockington", address: "201 South Main Street, Suite 2400, Hinesville, GA 31313", phone: "912-369-6338", fax: "912-369-8327", additionalOffices: [{ location: "Bryan County", address: "P.O. Box 1270, Pembroke, GA 31321", phone: "912-653-4605" }, { location: "McIntosh County", address: "102 Madison Street, Darien, GA 31305", phone: "912-437-3880" }, { location: "Tattnall County", address: "108 W. Brazell St, Suite 321, Reidsville, GA 30453", phone: "912-557-4426", fax: "912-557-4428" }, { location: "Appling/Jeff Davis/Wayne Counties", address: "241 East Walnut Street, Jesup, GA 31598", phone: "912-427-9066" }], description: "The Atlantic Judicial Circuit serves six coastal and near-coastal counties in southeastern Georgia, including the area surrounding Fort Stewart military installation." },
    { circuit: "Augusta Circuit", counties: ["Burke", "Richmond"], slug: "augusta-circuit", defender: "Lee Prescott", address: "902 Greene Street, Augusta, GA 30901", phone: "706-312-5105", description: "The Augusta Judicial Circuit encompasses two counties in the Central Savannah River Area, including Georgia's second-largest city, Augusta." },
    { circuit: "Brunswick Circuit", counties: ["Appling", "Camden", "Glynn", "Jeff Davis", "Wayne"], slug: "brunswick-circuit", defender: "Stephen Tillman", address: "11 Judicial Lane, Suite 111, Brunswick, GA 31520", phone: "912-554-7072", fax: "912-279-2964", additionalOffices: [{ location: "Camden County", address: "403 Georgia Avenue, Woodbine, GA 31569", phone: "912-673-9488" }, { location: "Appling/Jeff Davis/Wayne Counties", address: "241 East Walnut Street, Jesup, GA 31598", phone: "912-427-9066" }], description: "The Brunswick Judicial Circuit covers five counties along Georgia's southeastern coast, including the historic port city of Brunswick and the Golden Isles." },
    { circuit: "Chattahoochee Circuit", counties: ["Chattahoochee", "Harris", "Marion", "Muscogee", "Talbot", "Taylor"], slug: "chattahoochee-circuit", defender: "T. Moffett Flournoy", address: "420 10th Street, Ste 001, Columbus, GA 31901", phone: "706-653-4301", fax: "706-225-4309", description: "The Chattahoochee Judicial Circuit serves six counties in west-central Georgia, including Columbus, the state's third-largest city." },
    { circuit: "Cherokee Circuit", counties: ["Bartow", "Gordon"], slug: "cherokee-circuit", defender: "Christopher Paul", address: "128 W. Cherokee Ave, Cartersville, GA 30120", phone: "678-721-3254", fax: "678-721-3255", description: "The Cherokee Judicial Circuit covers Bartow and Gordon Counties in northwest Georgia, an area with a rich history in the Cherokee Nation." },
    { circuit: "Clayton Circuit", counties: ["Clayton"], slug: "clayton-circuit", defender: "Douglas Smith", address: "6525 Professional Place, Riverdale, GA 30274", phone: "678-479-5036", fax: "678-479-5037", description: "The Clayton Judicial Circuit serves Clayton County, located south of Atlanta and home to Hartsfield-Jackson Atlanta International Airport." },
    { circuit: "Conasauga Circuit", counties: ["Murray", "Whitfield"], slug: "conasauga-circuit", defender: "Amanda McCoy", address: "121 North 4th Avenue, Chatsworth, GA 30705", phone: "706-517-8547", fax: "706-517-7405", additionalOffices: [{ location: "Whitfield County", address: "214 W. King Street, Dalton, GA 30720", phone: "706-876-1576", fax: "706-876-1528" }], description: "The Conasauga Judicial Circuit serves Murray and Whitfield Counties in northwest Georgia, known as the 'Carpet Capital of the World.'" },
    { circuit: "Columbia Circuit", counties: ["Columbia"], slug: "columbia-circuit", defender: "Mack Taylor", address: "7045 Evans Town Center Boulevard, 3rd Floor, Evans, GA 30209", phone: "706-447-6750", description: "The Columbia Judicial Circuit serves Columbia County in east Georgia." },
    { circuit: "Cordele Circuit", counties: ["Ben Hill", "Crisp", "Dooly", "Wilcox"], slug: "cordele-circuit", defender: "Kyle Hollomon", address: "716-B 16th Avenue East, Cordele, GA 31015", phone: "229-426-5091", fax: "229-426-5093", description: "The Cordele Judicial Circuit covers four counties in south-central Georgia, an agricultural region known for its watermelon production." },
    { circuit: "Coweta Circuit", counties: ["Coweta", "Meriwether", "Troup"], slug: "coweta-circuit", defender: "Ricardo Samper", address: "8B Madison Street, Newnan, GA 30263", phone: "770-254-2704", fax: "770-254-2706", additionalOffices: [{ location: "Meriwether County", address: "126 North Court Square, Greenville, GA 30222", phone: "706-672-2056" }, { location: "Troup County", address: "134 Bull St, LaGrange, GA 30240", phone: "706-883-3000", fax: "706-883-3004" }], description: "The Coweta Judicial Circuit serves three counties in west Georgia, including the cities of Newnan and LaGrange." },
    { circuit: "Dekalb Circuit", counties: ["DeKalb"], slug: "dekalb-circuit", defender: "Letitia Delan", address: "320 Church Street, Decatur, GA 30030", phone: "404-371-2222", fax: "404-371-2298", description: "The Dekalb Judicial Circuit serves DeKalb County, one of Georgia's most populous and diverse counties, located east of Atlanta." },
    { circuit: "Dougherty Circuit", counties: ["Dougherty"], slug: "dougherty-circuit", defender: "Troy Golden", address: "225 Pine Avenue, Room 100, Albany, GA 31701", phone: "229-483-6240", fax: "229-438-3927", description: "The Dougherty Judicial Circuit serves Dougherty County in southwest Georgia, home to the city of Albany, a regional hub for commerce and healthcare." },
    { circuit: "Dublin Circuit", counties: ["Johnson", "Laurens", "Treutlen", "Twiggs"], slug: "dublin-circuit", defender: "Clay Tapley", address: "1506 Bellvue Rd, Dublin, GA 31021", phone: "478-272-7210", fax: "478-272-3378", description: "The Dublin Judicial Circuit covers four counties in central Georgia, centered around the city of Dublin." },
    { circuit: "Eastern Circuit", counties: ["Chatham"], slug: "eastern-circuit", defender: "Todd Martin", address: "222 W Oglethorpe Ave, Suite 130, Savannah, GA 31401", phone: "912-447-4901", fax: "912-447-4909", additionalOffices: [{ location: "Juvenile Division", address: "197 Carl Griffin Dr, Savannah, GA 31405", phone: "912-652-6904", fax: "912-652-6923" }], description: "The Eastern Judicial Circuit serves Chatham County, home to the historic city of Savannah and Georgia's busiest seaport." },
    { circuit: "Enotah Circuit", counties: ["Lumpkin", "Towns", "Union", "White"], slug: "enotah-circuit", defender: "Penny Hunter", address: "194 Courthouse Hill, Annex B, Dahlonega, GA 30533", phone: "706-864-1555", fax: "706-864-1367", additionalOffices: [{ location: "Towns County", address: "48 River St, Ste 1, Hiawassee, GA 30546", phone: "706-896-7819", fax: "706-896-8441" }, { location: "Union County", address: "65 Courthouse Street, Suite 265, Blairsville, GA 30512", phone: "706-745-8156", fax: "706-745-8166" }, { location: "White County", address: "59 South Main Street, Suite C, Cleveland, GA 30528", phone: "706-348-8577", fax: "706-348-8578" }], description: "The Enotah Judicial Circuit covers four mountain counties in northeast Georgia, including popular tourist destinations in the Blue Ridge Mountains." },
    { circuit: "Flint Circuit", counties: ["Henry"], slug: "flint-circuit", defender: "Jennifer Lewis", address: "30 Atlanta Street, McDonough, GA 30253", phone: "770-288-7460", fax: "770-288-7468", description: "The Flint Judicial Circuit serves Henry County, a rapidly growing suburban community south of Atlanta." },
    { circuit: "Griffin Circuit", counties: ["Fayette", "Pike", "Spalding", "Upson"], slug: "griffin-circuit", defender: "William Imhoff", address: "175 Johnson Ave, Ste 001, Fayetteville, GA 30214", phone: "770-716-4340", fax: "770-460-8685", additionalOffices: [{ location: "Pike/Spalding Counties", address: "141 West Solomon Street, Suite 4099, Griffin, GA 30224", phone: "770-467-4725", fax: "770-467-4724" }, { location: "Upson County", address: "715 Andrews Drive, Thomaston, GA 30286", phone: "706-647-7020", fax: "706-647-7032" }], description: "The Griffin Judicial Circuit covers four counties in west-central Georgia, including the city of Griffin, known for its textile history." },
    { circuit: "Lookout Mountain Circuit", counties: ["Catoosa", "Chattooga", "Dade", "Walker"], slug: "lookout-mountain-circuit", defender: "Jad Johnson", address: "72 Millennium Circle, Ringgold, GA 30736", phone: "706-935-3400", fax: "706-935-3582", additionalOffices: [{ location: "Chattooga County", address: "10035 Commerce Street, Summerville, GA 30747", phone: "706-857-9243", fax: "706-857-9218" }, { location: "Dade County", address: "111 Railway Lane, Trenton, GA 30752", phone: "706-657-2602", fax: "706-657-2744" }, { location: "Walker County", address: "101 Napier Street, LaFayette, GA 30739", phone: "706-638-3290", fax: "706-638-7331" }], description: "The Lookout Mountain Judicial Circuit covers four counties in Georgia's northwest corner, including areas near Lookout Mountain and Chickamauga Battlefield." },
    { circuit: "Macon Circuit", counties: ["Bibb", "Crawford", "Peach"], slug: "macon-circuit", defender: "Rick Waller Jr.", address: "201 Second Street, Ste 550, Macon, GA 31201", phone: "478-621-5950", fax: "478-621-5975", description: "The Macon Judicial Circuit serves three counties in central Georgia, including Macon, a major hub of commerce, transportation, and higher education." },
    { circuit: "Middle Georgia Circuit", counties: ["Candler", "Emanuel", "Jefferson", "Toombs", "Washington"], slug: "middle-georgia-circuit", defender: "Brandi Payne", address: "360 Bulldog Rd. Ste. A, Lyons, GA 30436", phone: "478-237-9014", fax: "478-237-9017", description: "The Middle Georgia Judicial Circuit covers five counties in east-central Georgia, a primarily rural agricultural region." },
    { circuit: "Mountain Circuit", counties: ["Habersham", "Rabun", "Stephens"], slug: "mountain-circuit", defender: "Jeanne Tiger", address: "226 Grant Street, Clarkesville, GA 30523", phone: "706-754-6427", fax: "706-754-8064", description: "The Mountain Judicial Circuit serves three counties in northeast Georgia's Blue Ridge Mountains, a popular destination for tourism and outdoor recreation." },
    { circuit: "Northeastern Circuit", counties: ["Dawson", "Hall"], slug: "northeastern-circuit", defender: "Mark Alexander", address: "1 Courthouse Square, Dawsonville, GA 30534", phone: "770-718-5523", fax: "770-718-5538", additionalOffices: [{ location: "Hall County", address: "111 Spring Street, SE, Gainesville, GA 30501", phone: "770-718-5523", fax: "770-718-5538" }], description: "The Northeastern Judicial Circuit covers two counties in the foothills of the Blue Ridge Mountains in northeast Georgia." },
    { circuit: "Northern Circuit", counties: ["Elbert", "Franklin", "Hart", "Madison", "Oglethorpe"], slug: "northern-circuit", defender: "Amanda Grantham", address: "461 Cook St. Ste J, Royston, GA 30662", phone: "706-246-9320", fax: "706-246-9325", description: "The Northern Judicial Circuit serves five counties in northeast Georgia along the South Carolina border." },
    { circuit: "Ocmulgee Circuit", counties: ["Baldwin", "Greene", "Hancock", "Jasper", "Jones", "Morgan", "Putnam", "Wilkinson"], slug: "ocmulgee-circuit", defender: "Kristin Waller", address: "121 N. Wilkinson St., Milledgeville, GA 31059", phone: "478-445-8100", fax: "478-445-8111", additionalOffices: [{ location: "Greene County", address: "113 N. Main St, Suite 123, Greensboro, GA 30642" }, { location: "Hancock County", address: "12630 Broad Street, Suite J, Sparta, GA 31087" }, { location: "Jasper County", address: "126 W Greene Street, Monticello, GA 31064" }, { location: "Jones County", address: "166 Industrial Blvd, Gray, GA 31032", phone: "478-986-6185", fax: "478-986-6359" }, { location: "Morgan County", address: "1380 Monticello Rd, Madison, GA 30650" }, { location: "Putnam County", address: "100 S Jefferson Street, Eatonton, GA 31024" }, { location: "Wilkinson County", address: "100 Bacon Street, Irwinton, GA 31042" }], description: "The Ocmulgee Judicial Circuit covers eight counties in central Georgia, including Milledgeville, the state's former capital." },
    { circuit: "Oconee Circuit", counties: ["Bleckley", "Dodge", "Montgomery", "Pulaski", "Telfair", "Wheeler"], slug: "oconee-circuit", defender: "Ashley McLaughlin", address: "5120 Norman Street, Eastman, GA 31023", phone: "478-448-1801", fax: "478-448-1805", description: "The Oconee Judicial Circuit serves six rural counties in central Georgia, an agricultural region known for its forestry and farming." },
    { circuit: "Ogeechee Circuit", counties: ["Bulloch", "Effingham", "Jenkins", "Screven"], slug: "ogeechee-circuit", defender: "Renata Newbill-Jallow", address: "30 N Main St, Statesboro, GA 30458", phone: "912-764-6292", fax: "912-489-3223", description: "The Ogeechee Judicial Circuit covers four counties in east Georgia, including Statesboro, home to Georgia Southern University." },
    { circuit: "Pataula Circuit", counties: ["Clay", "Early", "Miller", "Quitman", "Randolph", "Seminole", "Terrell"], slug: "pataula-circuit", defender: "Marla Chambless", address: "575 College Street, Blakely, GA 39823", phone: "229-758-6236", fax: "229-758-6187", additionalOffices: [{ location: "Randolph/Terrell Counties", address: "181 Cuthbert St, Colquitt, GA 39837" }], description: "The Pataula Judicial Circuit serves seven rural counties in southwest Georgia along the Alabama and Florida borders." },
    { circuit: "Paulding Circuit", counties: ["Paulding"], slug: "paulding-circuit", defender: "Michael Syrop", address: "1387 Industrial Blvd., N, Dallas, GA 30132", phone: "770-443-3463", fax: "770-443-9936", description: "The Paulding Judicial Circuit encompasses Paulding County, one of the fastest-growing counties in metropolitan Atlanta's western suburbs." },
    { circuit: "Piedmont Circuit", counties: ["Banks", "Barrow", "Jackson"], slug: "piedmont-circuit", defender: "Donna Seagraves", address: "5000 Jackson Pkwy, Suite 270, Jefferson, GA 30549", phone: "706-387-6317", fax: "706-387-6329", additionalOffices: [{ location: "Barrow County", address: "652 Barrow Park Dr., Suite C, Winder, GA 30680", phone: "770-307-3006", fax: "770-307-0839" }], description: "The Piedmont Judicial Circuit serves three counties in northeast Georgia, a mix of rural communities and growing suburbs." },
    { circuit: "Rockdale Circuit", counties: ["Rockdale"], slug: "rockdale-circuit", defender: "Gina Bernard", address: "882 Main Street, Conyers, GA 30012", phone: "770-278-7820", fax: "770-918-6313", description: "The Rockdale Judicial Circuit encompasses Rockdale County, a suburban community east of Atlanta with a diverse population." },
    { circuit: "Rome Circuit", counties: ["Floyd"], slug: "rome-circuit", defender: "Sean Lowe", address: "12 East Fourth Avenue, Suite 10, Rome, GA 30161", phone: "706-234-0975", fax: "706-234-0978", description: "The Rome Judicial Circuit serves Floyd County in northwest Georgia, home to the city of Rome, situated at the confluence of three rivers." },
    { circuit: "South Georgia Circuit", counties: ["Baker", "Calhoun", "Decatur", "Grady", "Mitchell"], slug: "south-georgia-circuit", defender: "Tre McLendon", address: "118 River St, Bainbridge, GA 39818", phone: "229-246-2877", fax: "229-246-9158", description: "The South Georgia Judicial Circuit covers five counties in the southwest corner of Georgia, a region known for hunting plantations and agriculture." },
    { circuit: "Southern Circuit", counties: ["Brooks", "Colquitt", "Echols", "Lowndes", "Thomas"], slug: "southern-circuit", defender: "Wade Krueger", address: "106 S Patterson St, Suite 201, Valdosta, GA 31601", phone: "229-671-2800", fax: "229-245-5220", additionalOffices: [{ location: "Colquitt County", address: "9 South Main St, Ste 105, Moultrie, GA 31768", phone: "229-616-7070", fax: "229-616-7067" }, { location: "Thomas County", address: "418 Smith Ave, Thomasville, GA 31792", phone: "229-226-3616", fax: "229-226-5696" }], description: "The Southern Judicial Circuit serves five counties in south Georgia, including Valdosta, home to Valdosta State University." },
    { circuit: "Southwestern Circuit", counties: ["Lee", "Macon", "Schley", "Stewart", "Sumter", "Webster"], slug: "southwestern-circuit", defender: "David Winheim", address: "510 West Lamar Street, 2nd Floor, Americus, GA 31709", phone: "229-928-4610", fax: "229-928-4594", description: "The Southwestern Judicial Circuit covers six counties in southwest Georgia, including Americus, home to Georgia Southwestern State University." },
    { circuit: "Tallapoosa Circuit", counties: ["Haralson", "Polk"], slug: "tallapoosa-circuit", defender: "David Smith", address: "4485 Highway 120, Suite 1600, Buchanan, GA 30113", phone: "770-646-6629", fax: "770-646-6628", additionalOffices: [{ location: "Polk County", address: "109 East Avenue, Cedartown, GA 30125", phone: "770-748-3480", fax: "770-748-3493" }], description: "The Tallapoosa Judicial Circuit covers Haralson and Polk Counties in west Georgia near the Alabama border." },
    { circuit: "Tifton Circuit", counties: ["Irwin", "Tift", "Turner", "Worth"], slug: "tifton-circuit", defender: "Janice Prince", address: "1212 Chestnut Ave, Tifton, GA 31794", phone: "229-387-6488", fax: "229-387-6234", description: "The Tifton Judicial Circuit serves four counties in south-central Georgia, with Tifton serving as a regional agricultural research center." },
    { circuit: "Toombs Circuit", counties: ["Glascock", "Lincoln", "McDuffie", "Taliaferro", "Warren", "Wilkes"], slug: "toombs-circuit", defender: "Caryn Lobdell", address: "306 Greenway Street, Suite 1600, Thomson, GA 30824", phone: "706-595-7650", fax: "706-595-6030", description: "The Toombs Judicial Circuit serves six counties in east-central Georgia, a region with rich colonial and Civil War history." },
    { circuit: "Towaliga Circuit", counties: ["Butts", "Lamar", "Monroe"], slug: "towaliga-circuit", defender: "David Tatem", address: "135 L. Cary Bittick Drive, Forsyth, GA 31029", phone: "478-994-0040", fax: "478-994-0018", description: "The Towaliga Judicial Circuit covers three counties in central Georgia between Atlanta and Macon along Interstate 75." },
    { circuit: "Waycross Circuit", counties: ["Bacon", "Brantley", "Charlton", "Coffee", "Pierce", "Ware"], slug: "waycross-circuit", defender: "Joshua Larkey", address: "605 Church Street, Suite D, Waycross, GA 31501", phone: "912-287-4360", fax: "912-287-4362", description: "The Waycross Judicial Circuit serves six counties in southeast Georgia, including areas adjacent to the Okefenokee Swamp." },
    { circuit: "West Georgia Circuit", counties: ["Carroll", "Heard"], slug: "west-georgia-circuit", defender: "Maryellen Simmons", address: "166A Independence Drive, Carrollton, GA 30116", phone: "770-830-1323", fax: "770-830-0715", additionalOffices: [{ location: "Heard County", address: "215 East Court Square, Suite 4099, Franklin, GA 30217", phone: "706-675-0288" }], description: "The West Georgia Judicial Circuit serves Carroll and Heard Counties in west Georgia, a growing region west of metropolitan Atlanta." },
    { circuit: "Western Circuit", counties: ["Clarke", "Oconee"], slug: "western-circuit", defender: "John Donnelly", address: "440 College Avenue, Suite 220, Athens, GA 30601", phone: "706-369-6440", description: "The Western Judicial Circuit serves Clarke and Oconee Counties, home to the University of Georgia in Athens." }
];

// ==================== NAVIGATION ====================
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');

    // Scroll effect (throttled)
    if (nav) {
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }));
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

// Opt-Out Circuits - Counties that manage their own public defense
const optOutCircuits = [
    { circuit: "Blue Ridge Circuit", counties: ["Cherokee"], note: "Cherokee County operates its own public defender office independently." },
    { circuit: "Cobb Circuit", counties: ["Cobb"], note: "Cobb County operates its own public defender office independently." },
    { circuit: "Douglas Circuit", counties: ["Douglas"], note: "Douglas County operates its own public defender office independently." },
    { circuit: "Bell-Forsyth Circuit", counties: ["Forsyth"], note: "Forsyth County operates its own public defender office independently." },
    { circuit: "Gwinnett Circuit", counties: ["Gwinnett"], note: "Gwinnett County operates its own public defender office independently." },
    { circuit: "Houston Circuit", counties: ["Houston"], note: "Houston County operates its own public defender office independently." },
    { circuit: "Stone Mountain Circuit", counties: ["DeKalb"], note: "Note: DeKalb County is served by the state system through the Dekalb Circuit." }
];

// ==================== CIRCUIT SEARCH ====================
function initCircuitSearch() {
    const searchInput = document.getElementById('defenderSearch');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');

    if (!searchInput || !searchResults || !searchResultsList) return;

    let highlightedIndex = -1;
    let filteredResults = [];

    function checkOptOut(query) {
        // Check if query matches an opt-out county
        for (const circuit of optOutCircuits) {
            for (const county of circuit.counties) {
                if (county.toLowerCase().includes(query) || query.includes(county.toLowerCase())) {
                    // Skip DeKalb since it's actually in the state system
                    if (county === "DeKalb") continue;
                    return circuit;
                }
            }
            if (circuit.circuit.toLowerCase().includes(query)) {
                if (circuit.counties.includes("DeKalb")) continue;
                return circuit;
            }
        }
        return null;
    }

    function renderResults(results, optOutMatch = null) {
        filteredResults = results;
        highlightedIndex = -1;

        let html = '';

        // Show opt-out message if applicable
        if (optOutMatch) {
            html += `
                <div class="search-opt-out-notice">
                    <div class="opt-out-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <div class="opt-out-content">
                        <div class="opt-out-title">${optOutMatch.counties.join(', ')} ${optOutMatch.counties.length > 1 ? 'Counties' : 'County'}</div>
                        <div class="opt-out-message">${optOutMatch.note}</div>
                        <div class="opt-out-help">Contact your local county courthouse for public defender information.</div>
                    </div>
                </div>
            `;
        }

        if (results.length === 0 && !optOutMatch) {
            searchResultsList.innerHTML = '<div class="search-no-results">No circuits found matching your search</div>';
            return;
        }

        // Determine the base path based on current page location
        const isInSubfolder = window.location.pathname.includes('/local-offices/') || window.location.pathname.includes('/local%20offices/');
        const basePath = isInSubfolder ? '' : 'local-offices/';

        html += results.map((item, index) => `
            <a href="${basePath}${item.slug}.html" class="search-result-item" data-index="${index}">
                <div class="search-result-circuit">${item.circuit}</div>
                <div class="search-result-counties">${item.counties.join(', ')} ${item.counties.length > 1 ? 'Counties' : 'County'}</div>
            </a>
        `).join('');

        searchResultsList.innerHTML = html;
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

        // Check for opt-out circuits first
        const optOutMatch = checkOptOut(query);

        const results = circuitData.filter(item => {
            const circuitMatch = item.circuit.toLowerCase().includes(query);
            const countyMatch = item.counties.some(county => county.toLowerCase().includes(query));
            return circuitMatch || countyMatch;
        });

        renderResults(results, optOutMatch);
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
    
    const cachedSearchResults = document.getElementById('searchResults');
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            if (cachedSearchResults) cachedSearchResults.classList.add('active');
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
            }, 400);
        });
    });

    // Page load animation
    window.addEventListener('load', () => {
        // Remove transition overlay
        if (pageTransition.classList.contains('active')) {
            setTimeout(() => {
                pageTransition.classList.remove('active');
                pageTransition.classList.add('exit');
            }, 100);
        }

        // Add page content animation class
        document.body.classList.add('page-loaded');

        // Staggered section animations
        const sections = document.querySelectorAll('section:not(.hero):not(.pd-hero)');
        sections.forEach((section, index) => {
            section.classList.add('section-animate');
            setTimeout(() => {
                section.classList.add('visible');
            }, 150 + (index * 100));
        });
    });
}

// ==================== PARALLAX HERO EFFECT ====================
function initParallax() {
    const heroElements = document.querySelectorAll('.hero, .pd-hero, [data-parallax]');
    if (heroElements.length === 0) return;

    // Add parallax class to hero elements
    heroElements.forEach(hero => {
        hero.classList.add('parallax-hero');
    });

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        heroElements.forEach(hero => {
            const heroRect = hero.getBoundingClientRect();
            const heroTop = heroRect.top + scrolled;
            const heroHeight = heroRect.height;

            // Only apply parallax when hero is in view
            if (scrolled < heroTop + heroHeight) {
                const parallaxSpeed = 0.4;
                const yPos = (scrolled - heroTop) * parallaxSpeed;

                // Apply to background images or pseudo-elements
                const bgElement = hero.querySelector('.hero-bg, .parallax-bg');
                if (bgElement) {
                    bgElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
                } else {
                    // Apply subtle transform to content
                    hero.style.backgroundPositionY = `${yPos * 0.5}px`;
                }
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Initial call
    updateParallax();
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

    // Show/hide based on scroll position (throttled)
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }));

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
    // Skip if page already has breadcrumbs (e.g., division pages with inline breadcrumbs)
    if (document.querySelector('.breadcrumb') || document.querySelector('.breadcrumbs')) {
        return;
    }

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
    const navLinks = stickyNav.querySelectorAll('.sticky-section-nav-link');

    const updateVisibility = () => {
        const scrollY = window.pageYOffset;
        const firstTop = firstSection.offsetTop - 200;
        const lastBottom = lastSection.offsetTop + lastSection.offsetHeight;

        if (scrollY > firstTop && scrollY < lastBottom) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }

        // Update active link (using cached navLinks)
        let activeIndex = 0;
        sections.forEach((section, i) => {
            if (scrollY >= section.offsetTop - 150) {
                activeIndex = i;
            }
        });
        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === activeIndex);
        });
    };

    window.addEventListener('scroll', throttle(updateVisibility));
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

// ==================== COMMAND PALETTE ====================
function initCommandPalette() {
    // Define navigation items for command palette
    const commandItems = [
        { title: 'Home', subtitle: 'Go to homepage', url: 'index.html', icon: 'home', category: 'Navigation' },
        { title: 'About Us', subtitle: 'Learn about GPDC', url: 'about.html', icon: 'info', category: 'Navigation' },
        { title: 'Our Team', subtitle: 'Meet our leadership', url: 'team.html', icon: 'users', category: 'Navigation' },
        { title: 'Divisions & Services', subtitle: 'Explore our divisions', url: 'divisions.html', icon: 'grid', category: 'Navigation' },
        { title: 'Clients & Families', subtitle: 'Resources for clients', url: 'clients.html', icon: 'users', category: 'Navigation' },
        { title: 'Find My Public Defender', subtitle: 'Search by county or circuit', url: 'find-defender.html', icon: 'search', category: 'Navigation' },
        { title: 'Careers', subtitle: 'Join our team', url: 'careers.html', icon: 'briefcase', category: 'Navigation' },
        { title: 'Available Positions', subtitle: 'View job openings', url: 'positions.html', icon: 'clipboard', category: 'Navigation' },
        { title: 'Newsroom', subtitle: 'Latest news and updates', url: 'newsroom.html', icon: 'newspaper', category: 'Navigation' },
        { title: 'Contact Us', subtitle: 'Get in touch', url: 'contact.html', icon: 'mail', category: 'Navigation' },
        { title: 'Professional Development', subtitle: 'Training and events', url: 'divisions/training.html', icon: 'book', category: 'Divisions' },
        { title: 'Capital Defense', subtitle: 'Capital case services', url: 'divisions/capital-defense.html', icon: 'shield', category: 'Divisions' },
        { title: 'Appellate Defense', subtitle: 'Appeals services', url: 'divisions/appellate-defense.html', icon: 'scale', category: 'Divisions' },
        { title: 'Mental Health Defense', subtitle: 'Mental health services', url: 'divisions/mental-health-defense.html', icon: 'heart', category: 'Divisions' },
        { title: 'Youth Advocacy', subtitle: 'Juvenile defense', url: 'divisions/youth-defense.html', icon: 'users', category: 'Divisions' },
        { title: 'Toggle Dark Mode', subtitle: 'Switch theme', action: 'toggleDarkMode', icon: 'moon', category: 'Actions' },
    ];

    const icons = {
        home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
        grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>',
        clipboard: '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
        newspaper: '<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M18 18h-8M18 10h-8"/>',
        mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        scale: '<path d="M16 16l3-8 3 8c-.9 1.8-2.5 3-4.5 3s-3.6-1.2-4.5-3zm-10 0l3-8 3 8c-.9 1.8-2.5 3-4.5 3s-3.6-1.2-4.5-3zM12 3v18M3 7h18"/>',
        heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
        moon: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'
    };

    // Create command palette HTML
    const overlay = document.createElement('div');
    overlay.className = 'command-palette-overlay';
    overlay.innerHTML = `
        <div class="command-palette">
            <div class="command-palette-input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" class="command-palette-input" placeholder="Search pages, actions..." autofocus>
                <span class="command-palette-hint">ESC</span>
            </div>
            <div class="command-palette-results"></div>
            <div class="command-palette-footer">
                <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>1</kbd>-<kbd>9</kbd> jump</span>
                <span><kbd>↵</kbd> select</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.command-palette-input');
    const results = overlay.querySelector('.command-palette-results');
    let highlightedIndex = -1;
    let filteredItems = [];

    // Determine base path
    const path = window.location.pathname;
    const basePath = path.includes('/divisions/') ? '../' :
                     path.includes('/local-offices/') ? '../' : '';

    function renderResults(items) {
        filteredItems = items;
        highlightedIndex = items.length > 0 ? 0 : -1;

        if (items.length === 0) {
            results.innerHTML = '<div class="command-palette-empty">No results found</div>';
            return;
        }

        // Group by category
        const grouped = items.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        results.innerHTML = Object.entries(grouped).map(([category, categoryItems]) => `
            <div class="command-palette-group">
                <div class="command-palette-group-title">${category}</div>
                ${categoryItems.map((item, idx) => {
                    const globalIdx = items.indexOf(item);
                    // Show shortcut number (1-9, then 0 for 10)
                    const shortcutNum = globalIdx < 9 ? globalIdx + 1 : (globalIdx === 9 ? 0 : null);
                    return `
                        <div class="command-palette-item ${globalIdx === 0 ? 'highlighted' : ''}" data-index="${globalIdx}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${icons[item.icon] || icons.home}
                            </svg>
                            <div class="command-palette-item-text">
                                <div class="command-palette-item-title">${item.title}</div>
                                <div class="command-palette-item-subtitle">${item.subtitle}</div>
                            </div>
                            ${shortcutNum !== null ? `<kbd class="command-palette-shortcut">${shortcutNum}</kbd>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `).join('');

        // Add click handlers
        results.querySelectorAll('.command-palette-item').forEach(el => {
            el.addEventListener('click', () => selectItem(parseInt(el.dataset.index)));
        });
    }

    function updateHighlight() {
        results.querySelectorAll('.command-palette-item').forEach((el, idx) => {
            el.classList.toggle('highlighted', parseInt(el.dataset.index) === highlightedIndex);
        });
        const highlighted = results.querySelector('.command-palette-item.highlighted');
        if (highlighted) highlighted.scrollIntoView({ block: 'nearest' });
    }

    function selectItem(index) {
        const item = filteredItems[index];
        if (!item) return;

        if (item.action === 'toggleDarkMode') {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        } else if (item.url) {
            window.location.href = basePath + item.url;
        }
        closeCommandPalette();
    }

    function openCommandPalette() {
        overlay.classList.add('active');
        input.value = '';
        renderResults(commandItems);
        // Focus after a brief delay to ensure overlay is visible
        setTimeout(() => input.focus(), 50);
    }

    function closeCommandPalette() {
        overlay.classList.remove('active');
    }

    // Event listeners
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commandItems.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.subtitle.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        renderResults(filtered);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeCommandPalette();
    });

    // Handle all keyboard events at document level when palette is active
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + K to toggle
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('active')) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
            return;
        }

        // Only handle other keys when palette is active
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, filteredItems.length - 1);
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            updateHighlight();
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            selectItem(highlightedIndex);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeCommandPalette();
        } else if (/^[0-9]$/.test(e.key) && !input.value) {
            // Number shortcuts only work when search is empty
            const num = parseInt(e.key);
            // 1-9 maps to index 0-8, 0 maps to index 9
            const targetIndex = num === 0 ? 9 : num - 1;
            if (targetIndex < filteredItems.length) {
                e.preventDefault();
                selectItem(targetIndex);
            }
        }
    });
}

// ==================== COPY TO CLIPBOARD ====================
function initCopyToClipboard() {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
        Copied to clipboard!
    `;
    document.body.appendChild(toast);

    function showToast() {
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 2000);
    }

    // Find phone numbers and addresses and add copy buttons
    document.querySelectorAll('[data-copyable], .contact-phone, .contact-address, .circuit-phone, .circuit-address').forEach(el => {
        if (el.querySelector('.copy-btn')) return; // Already has button

        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '0.5rem';

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.setAttribute('aria-label', 'Copy to clipboard');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
        `;

        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const text = el.textContent.trim();

            try {
                await navigator.clipboard.writeText(text);
                btn.classList.add('copied');
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                `;
                showToast();

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                    `;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });

        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.appendChild(btn);
    });
}

// ==================== 3D CARD TILT EFFECT ====================
function initCardTilt() {
    const cards = document.querySelectorAll('.event-card, .news-card, .team-card, .division-card, .position-card');

    cards.forEach(card => {
        // Add shine element
        const shine = document.createElement('div');
        shine.className = 'tilt-shine';
        card.appendChild(shine);
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle tilt effect - reduced intensity
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

            // Update shine position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            shine.style.setProperty('--mouse-x', percentX + '%');
            shine.style.setProperty('--mouse-y', percentY + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==================== QUICK ACTIONS WIDGET ====================
function initQuickActions() {
    const widget = document.createElement('div');
    widget.className = 'quick-actions-widget';
    widget.innerHTML = `
        <div class="quick-actions-menu">
            <div class="quick-actions-header">Quick Actions</div>
            <a href="find-defender.html" class="quick-actions-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <div class="quick-actions-item-text">
                    <div class="quick-actions-item-label">Find Defender</div>
                    <div class="quick-actions-item-value">Search by county</div>
                </div>
            </a>
            <a href="tel:404-795-2440" class="quick-actions-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div class="quick-actions-item-text">
                    <div class="quick-actions-item-label">Call Us</div>
                    <div class="quick-actions-item-value">(404) 795-2440</div>
                </div>
            </a>
            <a href="mailto:help@gapubdef.org" class="quick-actions-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <div class="quick-actions-item-text">
                    <div class="quick-actions-item-label">Email Us</div>
                    <div class="quick-actions-item-value">help@gapubdef.org</div>
                </div>
            </a>
            <div class="quick-actions-divider"></div>
            <div class="quick-actions-item" id="openTutorial">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>
                </svg>
                <div class="quick-actions-item-text">
                    <div class="quick-actions-item-label">Site Guide</div>
                    <div class="quick-actions-item-value">How to use this site</div>
                </div>
            </div>
            <div class="quick-actions-item theme-toggle" id="widgetThemeToggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
                <div class="quick-actions-item-text">
                    <div class="quick-actions-item-label">Dark Mode</div>
                    <div class="quick-actions-item-value">Toggle theme</div>
                </div>
                <div class="theme-toggle-switch"></div>
            </div>
        </div>
        <button class="quick-actions-toggle" aria-label="Quick actions">
            <svg class="icon-grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
    `;
    document.body.appendChild(widget);

    const toggle = widget.querySelector('.quick-actions-toggle');
    toggle.addEventListener('click', () => {
        widget.classList.toggle('open');
    });

    // Theme toggle functionality
    const themeToggle = widget.querySelector('#widgetThemeToggle');
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Open tutorial
    const tutorialBtn = widget.querySelector('#openTutorial');
    tutorialBtn.addEventListener('click', (e) => {
        e.preventDefault();
        widget.classList.remove('open');
        showTutorial();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            widget.classList.remove('open');
        }
    });
}

// ==================== SITE TUTORIAL ====================
function initTutorial() {
    // Check if this is first visit
    if (!localStorage.getItem('gpdc-tutorial-seen')) {
        // Show tutorial after a brief delay
        setTimeout(() => {
            showTutorial();
        }, 1500);
    }
}

function showTutorial() {
    const steps = [
        {
            title: 'Welcome to GPDC',
            content: 'The Georgia Public Defender Council website helps you find legal resources, connect with public defenders, and learn about our services.',
            icon: 'home'
        },
        {
            title: 'Find Your Public Defender',
            content: 'Use the search bar in the navigation or visit "Find My Public Defender" to locate your local office by county or circuit.',
            icon: 'search'
        },
        {
            title: 'Quick Navigation',
            content: 'Press <kbd>Ctrl</kbd>+<kbd>K</kbd> (or <kbd>⌘</kbd>+<kbd>K</kbd> on Mac) to open the command palette for instant navigation to any page.',
            icon: 'command'
        },
        {
            title: 'Quick Actions',
            content: 'Click the grid button in the bottom-right corner anytime to access quick actions like calling us, toggling dark mode, or reopening this guide.',
            icon: 'grid'
        },
        {
            title: 'You\'re All Set!',
            content: 'Explore our divisions, career opportunities, and newsroom. If you need help, our contact information is always available.',
            icon: 'check'
        }
    ];

    const icons = {
        home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        command: '<path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/>',
        grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
        check: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
    };

    let currentStep = 0;

    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.innerHTML = `
        <div class="tutorial-modal">
            <div class="tutorial-progress">
                ${steps.map((_, i) => `<div class="tutorial-progress-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
            </div>
            <div class="tutorial-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${icons[steps[0].icon]}
                </svg>
            </div>
            <h3 class="tutorial-title">${steps[0].title}</h3>
            <p class="tutorial-content">${steps[0].content}</p>
            <div class="tutorial-actions">
                <button class="tutorial-skip">Skip Tour</button>
                <button class="tutorial-next">Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    const modal = overlay.querySelector('.tutorial-modal');
    const iconEl = overlay.querySelector('.tutorial-icon svg');
    const titleEl = overlay.querySelector('.tutorial-title');
    const contentEl = overlay.querySelector('.tutorial-content');
    const dots = overlay.querySelectorAll('.tutorial-progress-dot');
    const nextBtn = overlay.querySelector('.tutorial-next');
    const skipBtn = overlay.querySelector('.tutorial-skip');

    function updateStep(step) {
        currentStep = step;
        const data = steps[step];

        // Update content with animation
        modal.classList.add('transitioning');
        setTimeout(() => {
            iconEl.innerHTML = icons[data.icon];
            titleEl.textContent = data.title;
            contentEl.innerHTML = data.content;
            dots.forEach((dot, i) => dot.classList.toggle('active', i <= step));

            if (step === steps.length - 1) {
                nextBtn.innerHTML = 'Get Started <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                skipBtn.style.display = 'none';
            }

            modal.classList.remove('transitioning');
        }, 150);
    }

    function closeTutorial() {
        localStorage.setItem('gpdc-tutorial-seen', 'true');
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            updateStep(currentStep + 1);
        } else {
            closeTutorial();
        }
    });

    skipBtn.addEventListener('click', closeTutorial);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeTutorial();
    });
}

// ==================== READING TIME ESTIMATE ====================
function initReadingTime() {
    // Skip on article pages that have their own sidebar with reading time
    if (document.querySelector('.article-layout')) return;

    // Find article content areas
    const articles = document.querySelectorAll('.news-article-content, .article-content, [data-reading-time]');

    articles.forEach(article => {
        const text = article.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        // Find or create meta area
        let metaArea = article.parentElement.querySelector('.article-meta, .news-article-meta');
        if (!metaArea) {
            metaArea = document.createElement('div');
            metaArea.className = 'article-meta';
            article.parentElement.insertBefore(metaArea, article);
        }

        // Add reading time badge
        if (!metaArea.querySelector('.reading-time')) {
            const badge = document.createElement('span');
            badge.className = 'reading-time';
            badge.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                ${readingTime} min read
            `;
            metaArea.appendChild(badge);
        }
    });

    // Add to news cards (handles both .card-excerpt and .news-card-excerpt)
    document.querySelectorAll('.news-card').forEach(card => {
        const excerpt = card.querySelector('.card-excerpt, .news-card-excerpt');
        if (!excerpt) return;

        // Estimate based on typical article length (excerpt is usually ~10% of article)
        const excerptWords = excerpt.textContent.trim().split(/\s+/).length;
        const estimatedWords = excerptWords * 10;
        const readingTime = Math.max(2, Math.ceil(estimatedWords / 200));

        // Find the date element
        const dateEl = card.querySelector('.card-date, .news-card-date');
        if (dateEl && !dateEl.querySelector('.reading-time')) {
            // Append reading time inside the date element for inline display
            const badge = document.createElement('span');
            badge.className = 'reading-time';
            badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${readingTime} min`;
            dateEl.appendChild(badge);
        }
    });

    // Add to featured article
    document.querySelectorAll('.featured-article').forEach(article => {
        const excerpt = article.querySelector('.featured-excerpt');
        if (!excerpt) return;

        const excerptWords = excerpt.textContent.trim().split(/\s+/).length;
        const estimatedWords = excerptWords * 10;
        const readingTime = Math.max(3, Math.ceil(estimatedWords / 200));

        const dateEl = article.querySelector('.featured-date');
        if (dateEl && !dateEl.querySelector('.reading-time')) {
            const badge = document.createElement('span');
            badge.className = 'reading-time';
            badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${readingTime} min`;
            dateEl.appendChild(badge);
        }
    });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initButtonRipples();
    initPageTransitions();
    initSmoothScroll();

    initBackToTop();
    initAnimatedStats();
    initDarkMode();
    initAnnouncementBanner();
    initBreadcrumbs();
    initStickySectionNav();
    initParallax();
    initCommandPalette();
    initCopyToClipboard();
    initCardTilt();
    initQuickActions();
    initTutorial();
    initReadingTime();

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
