/**
 * GPDC Dynamic Components Loader
 * Loads shared header and footer components across all pages
 */

(function() {
    'use strict';

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

    // Initialize components when DOM is ready
    function init() {
        const basePath = getBasePath();

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
