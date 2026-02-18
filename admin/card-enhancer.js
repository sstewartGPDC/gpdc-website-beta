/**
 * GPDC Card Enhancer for Sveltia CMS
 * Parses plain-text summary strings and rebuilds DOM with rich HTML cards.
 * Loaded after Sveltia CMS initializes to ensure JS context survives.
 */
(function() {
  'use strict';

  var MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  // SVG icons
  var calIcon = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 7h12M5 1v4M11 1v4"/></svg>';
  var pinIcon = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1C5.2 1 3 3.1 3 5.7 3 9.5 8 15 8 15s5-5.5 5-9.3C13 3.1 10.8 1 8 1zm0 6.4c-.9 0-1.6-.7-1.6-1.6S7.1 4.2 8 4.2s1.6.7 1.6 1.6S8.9 7.4 8 7.4z"/></svg>';
  var personIcon = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-3 0-5.5 1.5-5.5 3v1.5h11V12c0-1.5-2.5-3-5.5-3z"/></svg>';
  var phoneIcon = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 11.3v2a1.3 1.3 0 01-1.4 1.3A12.6 12.6 0 012 2.4 1.3 1.3 0 013.3 1h2a1.3 1.3 0 011.3 1.1c.08.6.23 1.2.45 1.8a1.3 1.3 0 01-.3 1.4l-.8.8a10.4 10.4 0 003.9 3.9l.8-.8a1.3 1.3 0 011.4-.3c.6.22 1.2.37 1.8.45A1.3 1.3 0 0114 11.3z"/></svg>';

  // Division label map
  var divLabels = {
    'local': 'Local Offices', 'youth': 'Youth', 'social-services': 'Social Services',
    'administration': 'Admin', 'appeals': 'Appeals', 'capital': 'Capital',
    'training': 'Training', 'mental-health': 'Mental Health', 'conflict': 'Conflict'
  };

  function getActiveCollection() {
    var hash = window.location.hash || '';
    if (hash.indexOf('/collections/events') !== -1) return 'events';
    if (hash.indexOf('/collections/articles') !== -1) return 'articles';
    if (hash.indexOf('/collections/positions') !== -1) return 'positions';
    if (hash.indexOf('/collections/people') !== -1) {
      if (hash.indexOf('/council') !== -1) return 'council';
      if (hash.indexOf('/leadership') !== -1) return 'leadership';
    }
    if (hash.indexOf('/collections/circuits') !== -1) return 'circuits';
    return null;
  }

  function parseDate(dateStr) {
    if (!dateStr) return null;
    var d = dateStr.trim();
    var m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return { year: m[1], month: parseInt(m[2], 10), day: parseInt(m[3], 10) };
    return null;
  }

  function buildEventCard(parts) {
    var title = (parts[0] || '').trim();
    var type = (parts[1] || '').trim();
    var dateStr = (parts[2] || '').trim();
    var location = (parts[3] || '').trim();

    var d = parseDate(dateStr);
    var calBlock = '';
    if (d) {
      calBlock = '<div class="gpdc-cal-block">'
        + '<div class="gpdc-cal-month">' + MONTHS[d.month - 1] + '</div>'
        + '<div class="gpdc-cal-day">' + d.day + '</div>'
        + '</div>';
    }

    var typeBadge = type
      ? '<span class="gpdc-badge gpdc-type" data-v="' + type.toLowerCase() + '">' + type.replace(/-/g, ' ') + '</span>'
      : '';

    var locBadge = location
      ? '<span class="gpdc-badge gpdc-loc">' + pinIcon + ' ' + location + '</span>'
      : '';

    return '<div class="gpdc-event-card">'
      + calBlock
      + '<div class="gpdc-event-info">'
      + '<div class="gpdc-event-title">' + title + '</div>'
      + '<div class="gpdc-event-meta">' + typeBadge + locBadge + '</div>'
      + '</div>'
      + '</div>';
  }

  function buildArticleCard(parts) {
    var title = (parts[0] || '').trim();
    var category = (parts[1] || '').trim();
    var dateStr = (parts[2] || '').trim();

    var d = parseDate(dateStr);
    var dateBadge = d
      ? '<span class="gpdc-badge gpdc-date">' + calIcon + ' ' + d.year + '-' + String(d.month).padStart(2,'0') + '-' + String(d.day).padStart(2,'0') + '</span>'
      : '';

    var catBadge = category
      ? '<span class="gpdc-badge gpdc-cat" data-v="' + category + '">' + category + '</span>'
      : '';

    return '<div class="gpdc-entry">'
      + '<span class="gpdc-title">' + title + '</span>'
      + '<span class="gpdc-badges">' + catBadge + dateBadge + '</span>'
      + '</div>';
  }

  function buildPositionCard(parts) {
    var title = (parts[0] || '').trim();
    var type = (parts[1] || '').trim();
    var division = (parts[2] || '').trim();
    var location = (parts[3] || '').trim();
    var status = (parts[4] || '').trim().toUpperCase();

    var typeBadge = type
      ? '<span class="gpdc-badge gpdc-type" data-v="' + type.toLowerCase() + '">' + type.replace(/-/g, ' ') + '</span>'
      : '';

    var divLabel = divLabels[division] || division;
    var divBadge = division
      ? '<span class="gpdc-badge gpdc-division">' + divLabel + '</span>'
      : '';

    var locBadge = location
      ? '<span class="gpdc-badge gpdc-loc">' + pinIcon + ' ' + location + '</span>'
      : '';

    var isExpired = status === 'EXPIRED';
    var statusClass = isExpired ? 'gpdc-status-expired' : 'gpdc-status-active';
    var statusLabel = isExpired ? 'EXPIRED' : 'ACTIVE';
    var statusBadge = '<span class="gpdc-badge gpdc-status ' + statusClass + '">'
      + '<span class="gpdc-status-dot"></span>' + statusLabel + '</span>';

    return '<div class="gpdc-entry">'
      + '<span class="gpdc-title">' + title + '</span>'
      + '<span class="gpdc-badges">' + statusBadge + typeBadge + divBadge + locBadge + '</span>'
      + '</div>';
  }

  function buildCouncilCard(parts) {
    var name = (parts[0] || '').trim();
    var role = (parts[1] || '').trim();

    var isChairman = role.toLowerCase().indexOf('chairman') !== -1;
    var roleClass = isChairman ? 'gpdc-role-chairman' : 'gpdc-role-member';
    var roleBadge = role
      ? '<span class="gpdc-badge ' + roleClass + '">' + role + '</span>'
      : '';

    return '<div class="gpdc-entry">'
      + '<span class="gpdc-title">' + name + '</span>'
      + '<span class="gpdc-badges">' + roleBadge + '</span>'
      + '</div>';
  }

  function buildLeadershipCard(parts) {
    var name = (parts[0] || '').trim();
    var role = (parts[1] || '').trim();
    var title = (parts[2] || '').trim();

    var isExec = role === 'Executive';
    var roleClass = isExec ? 'gpdc-role-exec' : 'gpdc-role-director';
    var roleBadge = role
      ? '<span class="gpdc-badge ' + roleClass + '">' + role + '</span>'
      : '';

    return '<div class="gpdc-entry">'
      + '<span class="gpdc-title">' + name + '</span>'
      + '<span class="gpdc-badges">' + roleBadge + '</span>'
      + '</div>'
      + (title ? '<div style="font-size:11.5px;color:#888;margin-top:2px;">' + title + '</div>' : '');
  }

  function buildCircuitCard(parts) {
    var circuit = (parts[0] || '').trim();
    var defender = (parts[1] || '').trim();
    var phone = (parts[2] || '').trim();

    var defenderBadge = defender
      ? '<span class="gpdc-badge gpdc-defender">' + personIcon + ' ' + defender + '</span>'
      : '';

    var phoneBadge = phone
      ? '<span class="gpdc-badge gpdc-phone">' + phoneIcon + ' ' + phone + '</span>'
      : '';

    return '<div class="gpdc-entry">'
      + '<span class="gpdc-title">' + circuit + '</span>'
      + '<span class="gpdc-badges">' + defenderBadge + phoneBadge + '</span>'
      + '</div>';
  }

  function enhanceCards() {
    var collection = getActiveCollection();
    if (!collection) return;

    var cards = document.querySelectorAll('[class*="ListCard-card"]:not([data-gpdc-enhanced])');
    if (!cards.length) return;

    cards.forEach(function(card) {
      // Find the summary element
      var summaryEl = card.querySelector('[class*="summary"]') ||
                      card.querySelector('[class*="Summary"]');

      // Fallback: find element with dot-separated summary text
      if (!summaryEl) {
        var allText = card.querySelectorAll('span, div');
        for (var i = 0; i < allText.length; i++) {
          var txt = allText[i].textContent || '';
          if (txt.indexOf(' \u00b7 ') !== -1 || txt.indexOf(' · ') !== -1) {
            summaryEl = allText[i];
            break;
          }
        }
      }

      if (!summaryEl) {
        card.setAttribute('data-gpdc-enhanced', 'skip');
        return;
      }

      var rawText = summaryEl.textContent || '';
      var parts = rawText.split(/\s*[\u00b7·]\s*/);
      if (parts.length < 2) {
        card.setAttribute('data-gpdc-enhanced', 'skip');
        return;
      }

      var html = '';
      switch (collection) {
        case 'events':
          html = buildEventCard(parts);
          break;
        case 'articles':
          html = buildArticleCard(parts);
          break;
        case 'positions':
          html = buildPositionCard(parts);
          break;
        case 'council':
          html = buildCouncilCard(parts);
          break;
        case 'leadership':
          html = buildLeadershipCard(parts);
          break;
        case 'circuits':
          html = buildCircuitCard(parts);
          break;
      }

      if (html) {
        summaryEl.innerHTML = html;
        summaryEl.style.display = 'block';
        summaryEl.style.width = '100%';
      }

      card.setAttribute('data-gpdc-enhanced', collection);
    });
  }

  // Poll for CMS app shell, then set up MutationObserver
  var pollId = setInterval(function() {
    var appShell = document.querySelector('.sui.app-shell') ||
                   document.querySelector('[class*="Shell"]') ||
                   document.querySelector('main') ||
                   document.querySelector('#nc-root');

    if (appShell) {
      clearInterval(pollId);

      // Initial enhancement
      setTimeout(enhanceCards, 500);

      // Watch for DOM changes (new cards being rendered)
      var observer = new MutationObserver(function() {
        if (!observer._raf) {
          observer._raf = requestAnimationFrame(function() {
            enhanceCards();
            observer._raf = null;
          });
        }
      });

      observer.observe(appShell, {
        childList: true,
        subtree: true
      });

      // Also enhance on hash change (collection switching)
      window.addEventListener('hashchange', function() {
        setTimeout(enhanceCards, 300);
      });
    }
  }, 200);
})();
