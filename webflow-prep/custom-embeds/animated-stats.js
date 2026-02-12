/* ==================== ANIMATED STATS COUNTER ====================
 * Paste this into Webflow: Page-level custom code (before </body>)
 * Apply class "stat-number" to any element with a number to animate
 * The element text should be the target number (e.g., "45" or "2,500+")
 * ================================================================== */

(function() {
    'use strict';

    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[0-9,]/g, '');
        const hasComma = element.textContent.includes(',');

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(start + (end - start) * eased);

            let display = hasComma ? current.toLocaleString() : current.toString();
            element.textContent = display + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function initAnimatedStats() {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length === 0) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    if (!isNaN(number)) {
                        animateValue(entry.target, 0, number, 2000);
                    }
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function(stat) { observer.observe(stat); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimatedStats);
    } else {
        initAnimatedStats();
    }
})();
