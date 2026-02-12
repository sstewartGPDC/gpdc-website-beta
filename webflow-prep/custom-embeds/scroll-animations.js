/* ==================== SCROLL-TRIGGERED ANIMATIONS ====================
 * Optional fallback if you prefer custom code over Webflow Interactions
 * Add class "fade-in" to any element you want to animate on scroll
 * ================================================================== */

(function() {
    'use strict';

    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(function(el) { observer.observe(el); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();

/* CSS to add in Webflow custom code:
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
*/
