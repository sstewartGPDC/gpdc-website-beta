/**
 * GPDC Dynamic Components Loader
 * Loads shared header, footer, and hero components across all pages
 */

(function() {
    'use strict';

    // Hero configurations - edit images and content here
    // Position: 'center top' shows top of image, 'center 50%' centers, 'center bottom' shows bottom
    const heroes = {
        // Main pages
        'home': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            position: 'center top'
        },
        'about': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            label: 'ABOUT US',
            title: 'Who We Are',
            subtitle: 'Providing high-quality legal defense for individuals accused of crimes who cannot afford representation.',
            position: 'center top'
        },
        'team': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            label: 'ABOUT US',
            title: 'Our Team',
            subtitle: 'Meet the dedicated professionals working to ensure justice for all Georgians.',
            position: 'center top'
        },
        'divisions': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            label: 'ABOUT US',
            title: 'Divisions and Services',
            subtitle: 'Specialized divisions working together to provide comprehensive legal defense across Georgia.',
            position: 'center top'
        },
        'foundation': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            label: 'ABOUT US',
            title: 'Our Foundation',
            subtitle: 'The history, mission, and impact of public defense in Georgia.',
            position: 'center top'
        },
        'clients': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/67e19c378ea9d881704ef7cc_67c9e88671b7f6e28f196e65_pexels-jep-gambardella-7689684.jpg',
            label: 'CLIENTS & FAMILIES',
            title: 'Clients and Families',
            subtitle: 'Resources and information for those we serve and their loved ones.',
            position: 'center top'
        },
        'find-defender': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/67e19c378ea9d881704ef7cc_67c9e88671b7f6e28f196e65_pexels-jep-gambardella-7689684.jpg',
            label: 'CLIENTS & FAMILIES',
            title: 'Find My Public Defender',
            subtitle: 'Locate the public defender office serving your county.',
            position: 'center top'
        },
        'apply': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/67e19c378ea9d881704ef7cc_67c9e88671b7f6e28f196e65_pexels-jep-gambardella-7689684.jpg',
            label: 'CLIENTS & FAMILIES',
            title: 'Applying For Legal Representation',
            subtitle: 'Learn how to request a public defender if you cannot afford an attorney.',
            position: 'center top'
        },
        'legal-process': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            label: 'CLIENTS & FAMILIES',
            title: 'The Legal Process',
            subtitle: 'Understanding the steps in a criminal case in Georgia.',
            position: 'center top'
        },
        'faq': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/67e19c378ea9d881704ef7cc_67c9e88671b7f6e28f196e65_pexels-jep-gambardella-7689684.jpg',
            label: 'CLIENTS & FAMILIES',
            title: 'FAQs and Resources',
            subtitle: 'Answers to common questions about public defense in Georgia.',
            position: 'center top'
        },
        'careers': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            label: 'CAREERS',
            title: 'Join Our Team',
            subtitle: 'Build a meaningful career defending the constitutional rights of Georgians.',
            position: 'center top'
        },
        'positions': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            label: 'CAREERS',
            title: 'Available Positions',
            subtitle: 'Current job openings across Georgia\'s public defender offices.',
            position: 'center top'
        },
        'newsroom': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            label: 'NEWSROOM',
            title: 'News & Updates',
            subtitle: 'The latest news and announcements from GPDC.',
            position: 'center top'
        },
        'contact': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            label: 'CONTACT',
            title: 'Contact Us',
            subtitle: 'Get in touch with the Georgia Public Defender Council.',
            position: 'center top'
        },
        // Division pages
        'division-default': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            position: 'center top'
        },
        // Circuit/Local office pages
        'circuit-default': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/68228662548ff71e50f7b446_pexels-pavel-danilyuk-8152740.jpg',
            position: 'center top'
        },
        // Article pages
        'article-default': {
            image: 'https://cdn.prod.website-files.com/66c9595206b0d169d1677e69/6822865ea01745d8498a0e91_pexels-august-de-richelieu-4427430.jpg',
            position: 'center top'
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
        if (!heroElement) return;

        const heroKey = heroElement.dataset.hero;
        if (!heroKey || !heroes[heroKey]) return;

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
