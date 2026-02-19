/**
 * GPDC Page Transitions & Section Animations
 *
 * Extracted from main.js to prevent FOUC (Flash of Unstyled Content).
 * Sections with .section-animate are set to opacity:0 in HTML/CSS.
 * This script adds .visible on a stagger to animate them in on page load.
 *
 * Isolated so an unrelated JS error elsewhere won't leave pages invisible.
 */

function initPageTransitions() {
    var pageTransition = document.getElementById('pageTransition');
    if (!pageTransition) return;

    // Internal link click handler — show transition overlay then navigate
    var internalLinks = document.querySelectorAll(
        'a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])'
    );

    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = link.getAttribute('href');
            if (href === window.location.pathname || href.startsWith('http')) return;

            e.preventDefault();
            pageTransition.classList.add('active');

            setTimeout(function() {
                window.location.href = href;
            }, 400);
        });
    });

    // Page load animation
    window.addEventListener('load', function() {
        // Remove transition overlay
        if (pageTransition.classList.contains('active')) {
            setTimeout(function() {
                pageTransition.classList.remove('active');
                pageTransition.classList.add('exit');
            }, 100);
        }

        // Add page content animation class
        document.body.classList.add('page-loaded');

        // Staggered section reveal — .section-animate is already in HTML,
        // so we only add .visible on a stagger to trigger the animation.
        var sections = document.querySelectorAll('.section-animate');
        sections.forEach(function(section, index) {
            setTimeout(function() {
                section.classList.add('visible');
            }, 150 + (index * 100));
        });
    });

    // Handle back-forward cache (bfcache) — restore page state on back/forward
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            pageTransition.classList.remove('active');
            pageTransition.classList.remove('exit');
            document.querySelectorAll('.section-animate').forEach(function(s) {
                s.classList.add('visible');
            });
            document.body.classList.add('page-loaded');
        }
    });
}
