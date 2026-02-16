/**
 * GPDC Dynamic Components Loader
 * Loads shared header, footer, hero components, and CMS-managed images across all pages
 */

(function() {
    'use strict';

    // Hardcoded fallback heroes (used if _data/heroes.json fetch fails)
    const fallbackHeroes = {
        'home': { image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80', position: 'center center' },
        'about': { image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg', label: 'ABOUT US', title: 'Who We Are', subtitle: 'Providing high-quality legal defense for individuals accused of crimes who cannot afford representation.', position: 'center center' },
        'team': { image: 'https://images.unsplash.com/photo-1454923634634-bd1614719a7b?w=1600&q=80', label: 'ABOUT US', title: 'Our Team', subtitle: 'Meet the dedicated professionals working to ensure justice for all Georgians.', position: 'center center' },
        'divisions': { image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg', label: 'ABOUT US', title: 'Divisions and Services', subtitle: 'Specialized divisions working together to provide comprehensive legal defense across Georgia.', position: 'center center' },
        'foundation': { image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg', label: 'ABOUT US', title: 'Our Foundation', subtitle: 'The history, mission, and impact of public defense in Georgia.', position: 'center center' },
        'clients': { image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80', label: 'CLIENTS & FAMILIES', title: 'Clients and Families', subtitle: 'Resources and information for those we serve and their loved ones.', position: 'center center' },
        'find-defender': { image: 'https://images.unsplash.com/photo-1743796055664-3473eedab36e?q=80&w=2148&auto=format&fit=crop', label: 'CLIENTS & FAMILIES', title: 'Find My Public Defender', subtitle: 'Locate the public defender office serving your county.', position: 'center center' },
        'apply': { image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80', label: 'CLIENTS & FAMILIES', title: 'Applying For Legal Representation', subtitle: 'Learn how to request a public defender if you cannot afford an attorney.', position: 'center center' },
        'legal-process': { image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80', label: 'CLIENTS & FAMILIES', title: 'The Legal Process', subtitle: 'Understanding the steps in a criminal case in Georgia.', position: 'center center' },
        'faq': { image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80', label: 'CLIENTS & FAMILIES', title: 'FAQs and Resources', subtitle: 'Answers to common questions about public defense in Georgia.', position: 'center center' },
        'careers': { image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&q=80', label: 'CAREERS', title: 'Join Our Team', subtitle: 'Build a meaningful career defending the constitutional rights of Georgians.', position: 'center center' },
        'positions': { image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&q=80', label: 'CAREERS', title: 'Available Positions', subtitle: 'Current job openings across Georgia\'s public defender offices.', position: 'center center' },
        'newsroom': { image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80', label: 'NEWSROOM', title: 'News & Updates', subtitle: 'The latest news and announcements from GPDC.', position: 'center center' },
        'contact': { image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=1310&auto=format&fit=crop', label: 'CONTACT', title: 'Contact Us', subtitle: 'Get in touch with the Georgia Public Defender Council.', position: 'center center' },
        'division-default': { image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1600&q=80', position: 'center center' },
        'circuit-default': { image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80', position: 'center center' },
        'article-default': { image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80', position: 'center center' }
    };

    // Active heroes object (will be overwritten by CMS data if available)
    let heroes = fallbackHeroes;

    // Determine base path based on current page location
    function getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;

        // Check if we're in a subdirectory
        if (path.includes('/divisions/') ||
            path.includes('/local-offices/') ||
            path.includes('/articles/') ||
            path.includes('/circuits/')) {
            return '../';
        }
        return '';
    }

    // Fetch a JSON data file with fallback
    async function fetchData(basePath, dataPath) {
        try {
            const response = await fetch(basePath + dataPath + '?v=' + Date.now());
            if (!response.ok) throw new Error('Data file not found');
            return await response.json();
        } catch (error) {
            console.warn('Failed to load data file: ' + dataPath, error);
            return null;
        }
    }

    // Load a component and insert it into the page
    async function loadComponent(elementId, componentPath, basePath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(basePath + componentPath + '?v=3');
            if (!response.ok) throw new Error('Component not found');

            let html = await response.text();

            // Replace {{BASE}} placeholder with actual base path
            html = html.replace(/\{\{BASE\}\}/g, basePath);

            element.innerHTML = html;

            // Dispatch event when component is loaded
            element.dispatchEvent(new CustomEvent('componentLoaded', {
                bubbles: true,
                detail: { component: componentPath }
            }));
        } catch (error) {
            console.warn(`Failed to load component: ${componentPath}`, error);
        }
    }

    // Load hero section based on data-hero attribute
    function loadHero() {
        const heroElement = document.getElementById('page-hero');
        if (!heroElement) {
            return;
        }

        const heroKey = heroElement.dataset.hero;
        if (!heroKey) {
            console.warn('Hero element found but no data-hero attribute');
            return;
        }

        if (!heroes[heroKey]) {
            console.warn('Hero config not found for key:', heroKey);
            return;
        }

        const config = heroes[heroKey];

        // Build hero HTML
        const html = `
            <div class="page-hero-bg">
                <img src="${config.image}" alt="${config.title || 'Hero image'}" style="object-position: ${config.position || 'center center'}">
            </div>
            <div class="page-hero-content">
                ${config.label ? `<p class="label">${config.label}</p>` : ''}
                ${config.title ? `<h1 class="page-hero-title">${config.title}</h1>` : ''}
                ${config.subtitle ? `<p class="page-hero-subtitle">${config.subtitle}</p>` : ''}
            </div>
        `;

        heroElement.innerHTML = html;
    }

    // Apply hero image position to existing hero sections (for pages not using component)
    function applyHeroPosition() {
        const heroImg = document.querySelector('.page-hero-bg img');
        if (!heroImg) return;

        // Check for data-position attribute on the hero section or image
        const heroSection = document.querySelector('.page-hero');
        const position = heroSection?.dataset.position || heroImg.dataset.position;

        if (position) {
            heroImg.style.objectPosition = position;
        }
    }

    // Load leadership data and update team page images
    async function loadLeadership(basePath) {
        // Only run on team.html
        const pagePath = window.location.pathname;
        if (!pagePath.endsWith('/team.html') && !pagePath.endsWith('/team')) return;

        const data = await fetchData(basePath, '_data/leadership.json');
        if (!data || !data.members) return;

        const members = data.members;

        // Build teamImages lookup for the contact modal
        var teamImagesMap = {};
        members.forEach(function(m) {
            teamImagesMap[m.id] = m.photo;
        });

        // Expose to global scope so the inline modal script can use it
        window.teamImages = teamImagesMap;

        // Update featured executive section image
        var featuredImg = document.querySelector('.featured-executive .featured-image img');
        if (featuredImg) {
            var featuredId = featuredImg.closest('[data-person]')
                ? featuredImg.closest('[data-person]').dataset.person
                : 'oalli'; // default to executive director
            var featuredMember = members.find(function(m) { return m.id === featuredId; });
            if (featuredMember) {
                featuredImg.src = featuredMember.photo;
            }
        }

        // Update all team cards with data-person attribute
        members.forEach(function(member) {
            var cards = document.querySelectorAll('[data-person="' + member.id + '"]');
            cards.forEach(function(card) {
                var img = card.querySelector('.team-image img') ||
                          card.querySelector('.featured-image img');
                if (img) {
                    img.src = member.photo;
                }
            });
        });
    }

    // Load divisions data and update division images
    async function loadDivisions(basePath) {
        var pagePath = window.location.pathname;
        var isDivisionsOverview = pagePath.endsWith('/divisions.html') || pagePath.endsWith('/divisions');
        var isDivisionPage = pagePath.includes('/divisions/');

        if (!isDivisionsOverview && !isDivisionPage) return;

        var data = await fetchData(basePath, '_data/divisions.json');
        if (!data || !data.divisions) return;

        var divisions = data.divisions;

        if (isDivisionsOverview) {
            // Update division cards on the overview page
            divisions.forEach(function(div) {
                var card = document.querySelector('[data-division="' + div.slug + '"]');
                if (!card) return;

                // Update header image
                var headerImg = card.querySelector('.division-card-image img');
                if (headerImg) {
                    headerImg.src = div.header_image;
                }

                // Update director photo
                var directorImg = card.querySelector('.division-card-leader img');
                if (directorImg) {
                    directorImg.src = div.director_photo;
                }
            });
        }

        if (isDivisionPage) {
            // Extract the division slug from the URL
            var slug = pagePath.split('/divisions/')[1].replace('.html', '').replace(/\/$/, '');
            var divData = divisions.find(function(d) { return d.slug === slug; });
            if (!divData) return;

            // Update leader profile image (supports both standard and training page layouts)
            var profileCard = document.querySelector('[data-division="' + slug + '"]');
            if (profileCard) {
                var profileImg = profileCard.querySelector('.leader-profile-image img') ||
                                 profileCard.querySelector('.pd-leader-image img');
                if (profileImg) {
                    profileImg.src = divData.director_photo;
                }
            }
        }
    }

    // Initialize components when DOM is ready
    async function init() {
        const basePath = getBasePath();

        // Fetch hero data from CMS, fall back to hardcoded
        const heroData = await fetchData(basePath, '_data/heroes.json');
        if (heroData) {
            heroes = heroData;
        }

        // Load hero component (if using data-hero attribute)
        loadHero();

        // Apply hero position (for pages with inline hero)
        applyHeroPosition();

        // Inject Connect With Us section before footer (if footer placeholder exists)
        const footerEl = document.getElementById('site-footer');
        if (footerEl && !document.getElementById('site-connect')) {
            const connectEl = document.createElement('div');
            connectEl.id = 'site-connect';
            footerEl.parentNode.insertBefore(connectEl, footerEl);
        }

        // Load header, connect section, and footer
        Promise.all([
            loadComponent('site-header', 'components/header.html', basePath),
            loadComponent('site-connect', 'components/connect.html', basePath),
            loadComponent('site-footer', 'components/footer.html', basePath)
        ]).then(() => {
            // Re-initialize navigation functionality after components load
            initNavigation();
            // Search is handled by main.js which has complete circuit data
        });

        // Load CMS-managed image data (runs in parallel, non-blocking)
        loadLeadership(basePath);
        loadDivisions(basePath);
    }

    // Initialize navigation (mobile toggle, dropdowns, scroll behavior)
    function initNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');

        let savedScrollY = 0;
        if (navToggle && mobileNav) {
            navToggle.addEventListener('click', function() {
                const isOpening = !mobileNav.classList.contains('active');
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                if (isOpening) {
                    savedScrollY = window.scrollY;
                    document.body.classList.add('nav-open');
                    document.body.style.top = `-${savedScrollY}px`;
                } else {
                    document.body.classList.remove('nav-open');
                    document.body.style.top = '';
                    window.scrollTo(0, savedScrollY);
                }
            });
        }

        // Scroll behavior for nav (throttled via rAF)
        if (nav) {
            let scrollTicking = false;
            window.addEventListener('scroll', function() {
                if (!scrollTicking) {
                    requestAnimationFrame(function() {
                        const currentScroll = window.pageYOffset;
                        if (currentScroll > 100) {
                            nav.classList.add('scrolled');
                        } else {
                            nav.classList.remove('scrolled');
                        }
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            });
        }

        // Close mobile nav when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-sublink, .mobile-nav-actions a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navToggle) navToggle.classList.remove('active');
                if (mobileNav) mobileNav.classList.remove('active');
                document.body.classList.remove('nav-open');
                document.body.style.top = '';
                window.scrollTo(0, savedScrollY);
            });
        });

        // Mobile nav collapsible groups
        const groupHeaders = document.querySelectorAll('.mobile-nav-group-header');
        groupHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                const group = this.closest('.mobile-nav-group');
                const isExpanded = group.classList.contains('expanded');

                // Close all other groups
                document.querySelectorAll('.mobile-nav-group.expanded').forEach(g => {
                    if (g !== group) {
                        g.classList.remove('expanded');
                        g.querySelector('.mobile-nav-group-header').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current group
                group.classList.toggle('expanded');
                this.setAttribute('aria-expanded', !isExpanded);
            });
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
