/* ==================== DARK MODE TOGGLE ====================
 * Paste this into Webflow: Project Settings > Custom Code > Footer Code
 * Add a button with id="darkModeToggle" to your header symbol
 * ================================================================== */

(function() {
    'use strict';

    const STORAGE_KEY = 'gpdc-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Update toggle button icon
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Apply theme immediately (before DOM ready to prevent flash)
    setTheme(getPreferredTheme());

    // Set up toggle button after DOM loads
    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const current = document.documentElement.getAttribute('data-theme');
                setTheme(current === 'dark' ? 'light' : 'dark');
            });
        }
    });
})();
