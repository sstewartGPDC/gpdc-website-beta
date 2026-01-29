/**
 * GPDC Dynamic Components Loader
 * Loads shared header, footer, and hero components across all pages
 */

(function() {
    'use strict';

    // Hero configurations - edit images and content here
    // Position: 'center top' shows top of image, 'center center' centers, 'center bottom' shows bottom
    // Each hero can have its own position value for individual adjustment
    const heroes = {
        // Main pages - Using Unsplash for reliable public access
        'home': {
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
            position: 'center center'
        },
        'about': {
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg',
            label: 'ABOUT US',
            title: 'Who We Are',
            subtitle: 'Providing high-quality legal defense for individuals accused of crimes who cannot afford representation.',
            position: 'center center'
        },
        'team': {
            image: 'https://images.unsplash.com/photo-1454923634634-bd1614719a7b?w=1600&q=80',
            label: 'ABOUT US',
            title: 'Our Team',
            subtitle: 'Meet the dedicated professionals working to ensure justice for all Georgians.',
            position: 'center center'
        },
        'divisions': {
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg',
            label: 'ABOUT US',
            title: 'Divisions and Services',
            subtitle: 'Specialized divisions working together to provide comprehensive legal defense across Georgia.',
            position: 'center center'
        },
        'foundation': {
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Georgia_State_Capitol%2C_Atlanta%2C_West_view_20160716_1.jpg',
            label: 'ABOUT US',
            title: 'Our Foundation',
            subtitle: 'The history, mission, and impact of public defense in Georgia.',
            position: 'center center'
        },
        'clients': {
            image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80',
            label: 'CLIENTS & FAMILIES',
            title: 'Clients and Families',
            subtitle: 'Resources and information for those we serve and their loved ones.',
            position: 'center center'
        },
        'find-defender': {
            image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80',
            label: 'CLIENTS & FAMILIES',
            title: 'Find My Public Defender',
            subtitle: 'Locate the public defender office serving your county.',
            position: 'center center'
        },
        'apply': {
            image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80',
            label: 'CLIENTS & FAMILIES',
            title: 'Applying For Legal Representation',
            subtitle: 'Learn how to request a public defender if you cannot afford an attorney.',
            position: 'center center'
        },
        'legal-process': {
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
            label: 'CLIENTS & FAMILIES',
            title: 'The Legal Process',
            subtitle: 'Understanding the steps in a criminal case in Georgia.',
            position: 'center center'
        },
        'faq': {
            image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1600&q=80',
            label: 'CLIENTS & FAMILIES',
            title: 'FAQs and Resources',
            subtitle: 'Answers to common questions about public defense in Georgia.',
            position: 'center center'
        },
        'careers': {
            image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&q=80',
            label: 'CAREERS',
            title: 'Join Our Team',
            subtitle: 'Build a meaningful career defending the constitutional rights of Georgians.',
            position: 'center center'
        },
        'positions': {
            image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&q=80',
            label: 'CAREERS',
            title: 'Available Positions',
            subtitle: 'Current job openings across Georgia\'s public defender offices.',
            position: 'center center'
        },
        'newsroom': {
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
            label: 'NEWSROOM',
            title: 'News & Updates',
            subtitle: 'The latest news and announcements from GPDC.',
            position: 'center center'
        },
        'contact': {
            image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80',
            label: 'CONTACT',
            title: 'Contact Us',
            subtitle: 'Get in touch with the Georgia Public Defender Council.',
            position: 'center center'
        },
        // Division pages
        'division-default': {
            image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1600&q=80',
            position: 'center center'
        },
        // Circuit/Local office pages
        'circuit-default': {
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
            position: 'center center'
        },
        // Article pages
        'article-default': {
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
            position: 'center center'
        }
    };

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

    // Load a component and insert it into the page
    async function loadComponent(elementId, componentPath, basePath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(basePath + componentPath);
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

    // Initialize components when DOM is ready
    function init() {
        const basePath = getBasePath();

        // Load hero component (if using data-hero attribute)
        loadHero();

        // Apply hero position (for pages with inline hero)
        applyHeroPosition();

        // Load header and footer
        Promise.all([
            loadComponent('site-header', 'components/header.html', basePath),
            loadComponent('site-footer', 'components/footer.html', basePath)
        ]).then(() => {
            // Re-initialize navigation functionality after components load
            initNavigation();
            // Search is handled by main.js which has complete circuit data
        });
    }

    // Initialize navigation (mobile toggle, dropdowns, scroll behavior)
    function initNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');

        if (navToggle && mobileNav) {
            navToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
        }

        // Scroll behavior for nav
        if (nav) {
            let lastScroll = 0;
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            });
        }

        // Close mobile nav when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navToggle) navToggle.classList.remove('active');
                if (mobileNav) mobileNav.classList.remove('active');
                document.body.classList.remove('nav-open');
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
