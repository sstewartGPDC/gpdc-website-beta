// =====================================================================
//  GPDC Site Tutorial v2 — Premium First-Visit Walkthrough
//  Code-driven animated tour with FMPD typing demo
// =====================================================================
(function () {
    'use strict';

    const STORAGE_KEY  = 'gpdc-tutorial-seen';
    const STORAGE_VER  = 'gpdc-tutorial-v';
    const VERSION      = '3';

    // -----------------------------------------------------------------
    //  SVG icon paths (Feather-style, 24x24 viewBox)
    // -----------------------------------------------------------------
    const ICONS = {
        // Welcome — shield/scale
        welcome: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        // Navigate — compass
        nav: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        // FMPD — search
        search: '<circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        // Office — map-pin
        mappin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/>',
        // Search anywhere — command
        command: '<path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        // Mobile — smartphone
        mobile: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        // Beta — alert-triangle
        alert: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        // Feedback — send
        send: '<line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        // Arrows
        arrowR: '<path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        arrowL: '<path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        check:  '<polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        close:  '<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        // FAB — question in circle
        help: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        // Location pin (for FMPD result)
        pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    };

    function svg(name, size) {
        return `<svg viewBox="0 0 24 24" width="${size || 24}" height="${size || 24}" fill="none">${ICONS[name]}</svg>`;
    }

    // -----------------------------------------------------------------
    //  Step definitions
    // -----------------------------------------------------------------
    const STEPS = [
        {
            id: 'welcome',
            icon: 'welcome',
            image: null,
            subtitle: 'Beta Preview',
            title: 'Welcome to the New GPDC Website',
            desc: 'You\'re among the first to explore the redesigned Georgia Public Defender Council website. This quick tour will walk you through the key features.',
        },
        {
            id: 'navigate',
            icon: 'nav',
            image: null,
            subtitle: 'Site Navigation',
            title: 'Explore Six Key Sections',
            desc: 'Navigate through <strong>About Us</strong>, <strong>Clients & Families</strong>, <strong>Careers</strong>, <strong>Newsroom</strong>, and <strong>Contact</strong> — all accessible from the top navigation bar.',
        },
        {
            id: 'fmpd',
            icon: 'search',
            image: null,
            subtitle: 'Flagship Feature',
            title: 'Find My Public Defender',
            desc: 'Search by county, circuit, or name to instantly find your local public defender\'s office. Try geolocation for one-tap access.',
            demo: 'fmpd',
        },
        {
            id: 'offices',
            icon: 'mappin',
            image: null,
            subtitle: '45 Judicial Circuits',
            title: 'Local Office Pages',
            desc: 'Every circuit has a dedicated page with quick-action cards — <strong>Call</strong>, <strong>Directions</strong>, <strong>Email</strong>, and <strong>Apply</strong> — plus hours and contact details.',
        },
        {
            id: 'search',
            icon: 'command',
            image: null,
            subtitle: 'Power Feature',
            title: 'Search Anywhere, Instantly',
            desc: 'Press <kbd>⌘</kbd><kbd>K</kbd> (or <kbd>Ctrl</kbd><kbd>K</kbd>) to open the command palette. Jump to any page, circuit, or section in seconds.',
            demo: 'cmdk',
        },
        {
            id: 'mobile',
            icon: 'mobile',
            image: null,
            subtitle: 'Responsive Design',
            title: 'Works on Every Device',
            desc: 'The site is fully responsive. Test it on your phone, tablet, or desktop — every feature adapts seamlessly to your screen size.',
        },
        {
            id: 'beta',
            icon: 'alert',
            image: null,
            subtitle: 'Beta Notice',
            title: 'Known Limitations',
            desc: '<span class="tut-beta-badge">Beta</span> Some content is still being finalized. <strong>Events</strong>, <strong>Job Listings</strong>, and <strong>Newsroom Articles</strong> may contain placeholder data. All sections will be complete before public launch.',
        },
        {
            id: 'feedback',
            icon: 'send',
            image: null,
            subtitle: 'Your Input Matters',
            title: 'Share Your Feedback',
            desc: 'Reply to the launch email with your thoughts. Report broken links, confusing flows, or anything that doesn\'t feel right. Your feedback shapes the final product.',
        },
    ];

    // -----------------------------------------------------------------
    //  State
    // -----------------------------------------------------------------
    let currentStep = 0;
    let overlayEl = null;
    let fmpdInterval = null;
    let cmdkInterval = null;
    let cmdkTimeouts = [];
    let isTransitioning = false;
    let touchStartX = 0;

    // -----------------------------------------------------------------
    //  Build & show the modal
    // -----------------------------------------------------------------
    function showTutorial() {
        if (overlayEl) return; // already open

        currentStep = 0;
        overlayEl = document.createElement('div');
        overlayEl.className = 'tut-overlay';
        overlayEl.setAttribute('role', 'dialog');
        overlayEl.setAttribute('aria-label', 'Site tour');
        overlayEl.innerHTML = buildModalHTML();
        document.body.appendChild(overlayEl);
        document.body.style.overflow = 'hidden';

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlayEl.classList.add('active'));
        });

        bindEvents();
        renderStep(0, 'none');
    }

    function buildModalHTML() {
        return `
        <div class="tut-modal">
            <div class="tut-visual">
                <div class="tut-visual-overlay"></div>
                <img class="tut-visual-img" src="" alt="" />
                <div class="tut-visual-icon">${svg('welcome', 32)}</div>
                <div class="tut-fmpd-demo" style="display:none">
                    <div class="tut-fmpd-searchbox">
                        ${svg('search', 18)}
                        <span class="tut-fmpd-input"></span><span class="tut-fmpd-cursor"></span>
                    </div>
                    <div class="tut-fmpd-result">
                        <div class="tut-fmpd-result-icon">${svg('pin', 18)}</div>
                        <div class="tut-fmpd-result-text">
                            <div class="tut-fmpd-result-name">Atlanta Circuit</div>
                            <div class="tut-fmpd-result-meta">Fulton County · (404) 613-4406</div>
                        </div>
                    </div>
                </div>
                <div class="tut-cmdk-demo" style="display:none">
                    <div class="tut-cmdk-keys-row">
                        <div class="tut-cmdk-keys">
                            <span class="tut-cmdk-key">⌘</span>
                            <span class="tut-cmdk-key">K</span>
                        </div>
                        <span class="tut-cmdk-divider">/</span>
                        <div class="tut-cmdk-keys">
                            <span class="tut-cmdk-key tut-cmdk-key-wide">Ctrl</span>
                            <span class="tut-cmdk-key">K</span>
                        </div>
                    </div>
                    <div class="tut-cmdk-palette">
                        <div class="tut-cmdk-search">
                            ${svg('search', 16)}
                            <span class="tut-cmdk-input"></span><span class="tut-cmdk-cursor"></span>
                        </div>
                        <div class="tut-cmdk-results">
                            <div class="tut-cmdk-group">Circuits</div>
                            <div class="tut-cmdk-item tut-cmdk-item-hl">
                                <div class="tut-cmdk-item-icon">${svg('pin', 16)}</div>
                                <span>Atlanta Circuit</span>
                            </div>
                            <div class="tut-cmdk-group">Pages</div>
                            <div class="tut-cmdk-item">
                                <div class="tut-cmdk-item-icon">${svg('nav', 16)}</div>
                                <span>careers.html</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="tut-step-badge"></span>
                <button class="tut-close" aria-label="Close tour">${svg('close', 18)}</button>
            </div>
            <div class="tut-body">
                <div class="tut-subtitle"></div>
                <h3 class="tut-title"></h3>
                <p class="tut-desc"></p>
            </div>
            <div class="tut-footer">
                <div class="tut-dots">
                    ${STEPS.map((_, i) => `<div class="tut-dot" data-i="${i}"></div>`).join('')}
                </div>
                <div class="tut-actions">
                    <button class="tut-btn-skip">Skip</button>
                    <button class="tut-btn-prev" style="display:none">${svg('arrowL', 14)} Back</button>
                    <button class="tut-btn-next">Next ${svg('arrowR', 15)}</button>
                </div>
            </div>
        </div>`;
    }

    // -----------------------------------------------------------------
    //  Render a step
    // -----------------------------------------------------------------
    function renderStep(idx, direction) {
        if (!overlayEl) return;
        const step = STEPS[idx];
        const modal = overlayEl.querySelector('.tut-modal');
        const body  = overlayEl.querySelector('.tut-body');

        // Slide animation class
        const enterClass = direction === 'prev' ? 'tut-slide-enter-rev' : 'tut-slide-enter';

        // Update step badge
        overlayEl.querySelector('.tut-step-badge').textContent = `${idx + 1} / ${STEPS.length}`;

        // Update visual area
        const img      = overlayEl.querySelector('.tut-visual-img');
        const icon     = overlayEl.querySelector('.tut-visual-icon');
        const demo     = overlayEl.querySelector('.tut-fmpd-demo');
        const cmdkDemo = overlayEl.querySelector('.tut-cmdk-demo');

        // Clear all demos
        stopFmpdDemo();
        stopCmdkDemo();
        demo.style.display = 'none';
        cmdkDemo.style.display = 'none';
        icon.classList.remove('active');
        img.classList.remove('active');

        if (step.demo === 'fmpd') {
            // Show FMPD typing demo
            demo.style.display = 'block';
            icon.classList.remove('active');
            if (step.image) {
                img.src = step.image;
                img.classList.add('active');
                img.style.opacity = '0.3';
            }
            setTimeout(() => startFmpdDemo(), 400);
        } else if (step.demo === 'cmdk') {
            // Show CMD+K command palette demo
            cmdkDemo.style.display = 'flex';
            icon.classList.remove('active');
            if (step.image) {
                img.src = step.image;
                img.classList.add('active');
                img.style.opacity = '0.3';
            }
            setTimeout(() => startCmdkDemo(), 400);
        } else if (step.image) {
            // Photo with icon overlay
            img.src = step.image;
            img.style.opacity = '';
            setTimeout(() => img.classList.add('active'), 50);
            // Show icon overlaid on top of photo
            setTimeout(() => {
                icon.innerHTML = svg(step.icon, 32);
                icon.classList.add('active');
            }, 200);
        } else {
            // Icon only (no photo)
            img.classList.remove('active');
            setTimeout(() => {
                icon.innerHTML = svg(step.icon, 32);
                icon.classList.add('active');
            }, 100);
        }

        // Update text with slide animation
        body.classList.remove('tut-slide-enter', 'tut-slide-enter-rev');
        void body.offsetWidth; // force reflow
        body.classList.add(enterClass);

        overlayEl.querySelector('.tut-subtitle').textContent = step.subtitle;
        overlayEl.querySelector('.tut-title').textContent = step.title;
        overlayEl.querySelector('.tut-desc').innerHTML = step.desc;

        // Update dots
        overlayEl.querySelectorAll('.tut-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
            dot.classList.toggle('seen', i < idx);
        });

        // Update buttons
        const prevBtn = overlayEl.querySelector('.tut-btn-prev');
        const nextBtn = overlayEl.querySelector('.tut-btn-next');
        const skipBtn = overlayEl.querySelector('.tut-btn-skip');

        prevBtn.style.display = idx > 0 ? 'inline-flex' : 'none';

        if (idx === STEPS.length - 1) {
            nextBtn.innerHTML = `Get Started ${svg('check', 15)}`;
            skipBtn.style.display = 'none';
        } else {
            nextBtn.innerHTML = `Next ${svg('arrowR', 15)}`;
            skipBtn.style.display = '';
        }
    }

    // -----------------------------------------------------------------
    //  FMPD Typing Animation
    // -----------------------------------------------------------------
    function startFmpdDemo() {
        const inputEl  = overlayEl.querySelector('.tut-fmpd-input');
        const resultEl = overlayEl.querySelector('.tut-fmpd-result');
        const cursor   = overlayEl.querySelector('.tut-fmpd-cursor');
        const text = 'Fulton County';
        let i = 0;

        inputEl.textContent = '';
        resultEl.classList.remove('visible');
        cursor.style.display = '';

        fmpdInterval = setInterval(() => {
            if (i < text.length) {
                inputEl.textContent += text[i];
                i++;
            } else {
                clearInterval(fmpdInterval);
                fmpdInterval = null;
                cursor.style.display = 'none';
                // Show result after typing completes
                setTimeout(() => resultEl.classList.add('visible'), 300);
            }
        }, 75);
    }

    function stopFmpdDemo() {
        if (fmpdInterval) {
            clearInterval(fmpdInterval);
            fmpdInterval = null;
        }
    }

    // -----------------------------------------------------------------
    //  CMD+K Command Palette Animation
    // -----------------------------------------------------------------
    function startCmdkDemo() {
        const keysRow   = overlayEl.querySelector('.tut-cmdk-keys-row');
        const paletteEl = overlayEl.querySelector('.tut-cmdk-palette');
        const inputEl   = overlayEl.querySelector('.tut-cmdk-input');
        const cursorEl  = overlayEl.querySelector('.tut-cmdk-cursor');
        const resultsEl = overlayEl.querySelector('.tut-cmdk-results');
        const text = 'Atlanta Circ';
        let i = 0;

        // Reset state
        keysRow.classList.remove('pressed');
        paletteEl.classList.remove('visible');
        resultsEl.classList.remove('visible');
        inputEl.textContent = '';
        cursorEl.style.display = '';

        // Step 1: Both key groups press down simultaneously
        cmdkTimeouts.push(setTimeout(() => {
            keysRow.classList.add('pressed');
        }, 300));

        // Step 2: Keys release, palette fades in
        cmdkTimeouts.push(setTimeout(() => {
            keysRow.classList.remove('pressed');
        }, 600));
        cmdkTimeouts.push(setTimeout(() => {
            paletteEl.classList.add('visible');
        }, 750));

        // Step 3: Start typing into search box
        cmdkTimeouts.push(setTimeout(() => {
            cmdkInterval = setInterval(() => {
                if (i < text.length) {
                    inputEl.textContent += text[i];
                    i++;
                } else {
                    clearInterval(cmdkInterval);
                    cmdkInterval = null;
                    cursorEl.style.display = 'none';
                    // Step 4: Show results after typing
                    cmdkTimeouts.push(setTimeout(() => {
                        resultsEl.classList.add('visible');
                    }, 300));
                }
            }, 75);
        }, 1050));
    }

    function stopCmdkDemo() {
        if (cmdkInterval) {
            clearInterval(cmdkInterval);
            cmdkInterval = null;
        }
        cmdkTimeouts.forEach(t => clearTimeout(t));
        cmdkTimeouts = [];
    }

    // -----------------------------------------------------------------
    //  Navigation
    // -----------------------------------------------------------------
    function goNext() {
        if (isTransitioning) return;
        if (currentStep < STEPS.length - 1) {
            isTransitioning = true;
            currentStep++;
            renderStep(currentStep, 'next');
            setTimeout(() => isTransitioning = false, 350);
        } else {
            closeTutorial();
        }
    }

    function goPrev() {
        if (isTransitioning || currentStep <= 0) return;
        isTransitioning = true;
        currentStep--;
        renderStep(currentStep, 'prev');
        setTimeout(() => isTransitioning = false, 350);
    }

    function closeTutorial() {
        if (!overlayEl) return;
        stopFmpdDemo();
        stopCmdkDemo();
        localStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(STORAGE_VER, VERSION);
        overlayEl.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (overlayEl) { overlayEl.remove(); overlayEl = null; }
        }, 400);
    }

    // -----------------------------------------------------------------
    //  Event binding
    // -----------------------------------------------------------------
    function bindEvents() {
        if (!overlayEl) return;

        overlayEl.querySelector('.tut-btn-next').addEventListener('click', goNext);
        overlayEl.querySelector('.tut-btn-prev').addEventListener('click', goPrev);
        overlayEl.querySelector('.tut-btn-skip').addEventListener('click', closeTutorial);
        overlayEl.querySelector('.tut-close').addEventListener('click', closeTutorial);

        // Close on backdrop click
        overlayEl.addEventListener('click', (e) => {
            if (e.target === overlayEl) closeTutorial();
        });

        // Keyboard navigation
        overlayEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeTutorial();
            if (e.key === 'ArrowRight' || e.key === 'Enter') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        });

        // Touch / swipe support for mobile
        const modal = overlayEl.querySelector('.tut-modal');
        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 60) {
                if (diff > 0) goNext();
                else goPrev();
            }
        }, { passive: true });

        // Dot click navigation
        overlayEl.querySelectorAll('.tut-dot').forEach((dot) => {
            dot.addEventListener('click', () => {
                const target = parseInt(dot.dataset.i);
                if (target !== currentStep && !isTransitioning) {
                    const dir = target > currentStep ? 'next' : 'prev';
                    isTransitioning = true;
                    currentStep = target;
                    renderStep(currentStep, dir);
                    setTimeout(() => isTransitioning = false, 350);
                }
            });
            dot.style.cursor = 'pointer';
        });
    }

    // -----------------------------------------------------------------
    //  Initialization — called from main.js
    // -----------------------------------------------------------------
    function initTutorial() {
        const seen    = localStorage.getItem(STORAGE_KEY);
        const ver     = localStorage.getItem(STORAGE_VER);
        const isNew   = !seen || ver !== VERSION;

        if (isNew) {
            // First visit (or tutorial updated): auto-expand after delay
            setTimeout(() => showTutorial(), 1200);
        }
        // Returning visitors access the tour via the quick-actions widget
    }

    // -----------------------------------------------------------------
    //  Expose globally so main.js can call initTutorial() & showTutorial()
    // -----------------------------------------------------------------
    window.initTutorial = initTutorial;
    window.showTutorial = showTutorial;

})();
