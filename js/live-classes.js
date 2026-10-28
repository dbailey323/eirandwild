// js/live-classes.js
// Fills the website with live class information from /api/classes (Bookwhen):
//   [data-class="<key>"]  class cards on class pages: schedule line, dates, spaces left
//   #upcoming             the "coming up" list on the homepage
//   #week                 the weekly timetable
// Classes are identified using js/class-config.js.

(function () {
    const TZ = 'Europe/London';
    const DAY_MS = 24 * 60 * 60 * 1000;
    // Show how many spaces are left once a session gets down to this many
    const LOW_SPACES = 3;
    const MAX_DATES = 6;
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const API_GROUPS = { 'Motherhood': 'motherhood', 'Womanhood': 'womanhood', 'Online HIIT': 'hiit', 'Baby Massage': 'babymassage' };

    const ICONS = {
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
        calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
    };

    const weekday = (d) => d.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'long' });
    const weekdayShort = (d) => d.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'short' });
    const dayMonth = (d) => d.toLocaleDateString('en-GB', { timeZone: TZ, day: 'numeric', month: 'short' });
    const dayNum = (d) => d.toLocaleDateString('en-GB', { timeZone: TZ, day: 'numeric' });
    const monthShort = (d) => d.toLocaleDateString('en-GB', { timeZone: TZ, month: 'short' });
    const time = (d) => d.toLocaleTimeString('en-GB', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
    const sortTime = (d) => d.toLocaleTimeString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });
    const timeRange = (s) => (s.end && s.end > s.start ? `${time(s.start)} to ${time(s.end)}` : time(s.start));

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function iconText(icon, text) {
        const span = el('span');
        span.innerHTML = ICONS[icon];
        span.appendChild(document.createTextNode(text));
        return span;
    }

    // Match a Bookwhen session to a class in js/class-config.js: by title, then by reference
    function findClass(session) {
        const title = (session.title || '').toLowerCase();
        return window.EW_CLASSES.find((c) => c.match.every((word) => title.includes(word)))
            || window.EW_CLASSES.find((c) => (c.refs || []).includes(session.className))
            || null;
    }

    function prepare(session) {
        const cls = findClass(session);
        const groupKey = cls ? cls.group : (API_GROUPS[session.category] || 'motherhood');
        const group = window.EW_GROUPS[groupKey];
        return Object.assign({}, session, {
            cls,
            groupKey,
            group,
            start: new Date(session.startAt),
            end: session.endAt ? new Date(session.endAt) : null,
            venueLabel: session.venue || (groupKey === 'hiit' ? 'Live on Zoom' : ''),
            bookingLink: `${cls ? group.bookwhen : session.bookingPlatformUrl}#focus=${session.eventId}`
        });
    }

    function spacesText(session) {
        const n = session.spacesLeft;
        if (n === 0) return { text: 'Fully booked', full: true };
        if (n !== null && n !== undefined && n <= LOW_SPACES) return { text: `${n} ${n === 1 ? 'space' : 'spaces'} left`, full: false };
        return null;
    }

    let loading = null;
    function loadSessions() {
        if (!loading) {
            loading = fetch('/api/classes')
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.json();
                })
                .then((list) => {
                    const now = new Date();
                    return list
                        .filter((s) => s.startAt && new Date(s.startAt) >= now)
                        .map(prepare)
                        .sort((a, b) => a.start - b.start);
                });
        }
        return loading;
    }

    // ---------- Class cards ----------
    function renderClassCards(sessions) {
        document.querySelectorAll('[data-class]').forEach((card) => {
            const key = card.dataset.class;
            const cls = window.EW_CLASSES.find((c) => c.key === key);
            const own = sessions.filter((s) => s.cls && s.cls.key === key);
            if (!cls || !own.length) return; // keep the fallback text and booking link

            const next = own[0];
            const when = card.querySelector('[data-when]');
            if (when) {
                when.innerHTML = '';
                if (cls.course) {
                    when.appendChild(iconText('calendar', `${weekday(next.start)}s, next course starts ${dayMonth(next.start)}`));
                } else {
                    when.appendChild(iconText('calendar', `${weekday(next.start)}s`));
                }
                when.appendChild(iconText('clock', timeRange(next)));
                if (next.venueLabel) when.appendChild(iconText('pin', next.venueLabel));
            }

            const dates = card.querySelector('[data-dates]');
            if (dates) {
                dates.innerHTML = '';
                own.slice(0, cls.course ? 1 : MAX_DATES).forEach((s) => {
                    const slot = el('span', 'date-slot');
                    const spaces = spacesText(s);
                    const link = el('a', spaces && spaces.full ? 'date-btn full' : 'date-btn', dayMonth(s.start));
                    link.href = s.bookingLink;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.setAttribute('aria-label', `Book ${cls.name} on ${weekday(s.start)} ${dayMonth(s.start)} at ${time(s.start)}${spaces ? `: ${spaces.full ? 'fully booked, join the waiting list' : spaces.text}` : ''}`);
                    slot.appendChild(link);
                    if (spaces) {
                        const note = el('span', spaces.full ? 'date-note full' : 'date-note low', spaces.text);
                        note.setAttribute('aria-hidden', 'true');
                        slot.appendChild(note);
                    }
                    dates.appendChild(slot);
                });
            }
        });
    }

    // ---------- Homepage: coming up ----------
    function renderUpcoming(sessions) {
        const list = document.getElementById('upcoming');
        if (!list) return;
        const soon = sessions.filter((s) => s.start - new Date() <= 14 * DAY_MS).slice(0, 5);
        if (!soon.length) {
            document.getElementById('upcomingEmpty').hidden = false;
            return;
        }
        soon.forEach((s) => {
            const item = el('li', 'upcoming-item');
            const link = el('a');
            link.href = s.group.page;

            const date = el('span', 'upcoming-date');
            date.appendChild(el('span', 'dow', weekdayShort(s.start)));
            date.appendChild(el('span', 'day', dayNum(s.start)));
            date.appendChild(el('span', 'mon', monthShort(s.start)));
            link.appendChild(date);

            const info = el('span');
            info.appendChild(el('span', 'upcoming-title', s.cls ? s.cls.name : s.title));
            const meta = el('span', 'upcoming-meta');
            meta.appendChild(el('span', `tag tag-${s.groupKey}`, s.group.label));
            meta.appendChild(el('span', '', timeRange(s)));
            if (s.venueLabel) meta.appendChild(el('span', '', s.venueLabel));
            const spaces = spacesText(s);
            if (spaces) meta.appendChild(el('span', spaces.full ? 'spaces-full' : 'spaces-low', spaces.text));
            info.appendChild(meta);
            link.appendChild(info);

            const more = el('span', 'more', 'Details ');
            more.insertAdjacentHTML('beforeend', ICONS.arrow);
            link.appendChild(more);

            item.appendChild(link);
            list.appendChild(item);
        });
    }

    // ---------- Timetable ----------
    // Regular classes come from the next 4 weeks (so one skipped week doesn't hide them).
    // Classes not on in that time, like a baby massage course between blocks, are looked
    // for up to 12 weeks ahead and shown with their next start date.
    const REGULAR_WEEKS = 4;
    const LOOKAHEAD_WEEKS = 12;

    function isAlternateWeeks(dates) {
        if (dates.length < 2) return false;
        return dates.slice(1).every((d, i) => Math.round((d - dates[i]) / DAY_MS) === 14);
    }

    function renderWeek(sessions) {
        const container = document.getElementById('week');
        if (!container) return;
        const now = new Date();
        const regularCutoff = new Date(now.getTime() + REGULAR_WEEKS * 7 * DAY_MS);
        const cutoff = new Date(now.getTime() + LOOKAHEAD_WEEKS * 7 * DAY_MS);

        const slots = new Map();
        sessions.filter((s) => s.start <= cutoff).forEach((s) => {
            const name = s.cls ? s.cls.name : s.title;
            const key = `${weekday(s.start)}|${sortTime(s.start)}|${name}`;
            if (!slots.has(key)) slots.set(key, Object.assign({}, s, { name, dates: [] }));
            slots.get(key).dates.push(s.start);
        });

        const week = new Map(DAYS.map((d) => [d, []]));
        slots.forEach((slot) => {
            const soon = slot.dates.filter((d) => d <= regularCutoff);
            slot.startsLater = soon.length === 0;
            slot.alternate = isAlternateWeeks(soon);
            week.get(weekday(slot.start)).push(slot);
        });

        let total = 0;
        week.forEach((daySlots, day) => {
            if (!daySlots.length) return;
            daySlots.sort((a, b) => sortTime(a.start).localeCompare(sortTime(b.start)));
            total += daySlots.length;

            const section = el('section', 'week-day');
            section.appendChild(el('h2', '', day));
            const ul = el('ul', 'week-list');
            daySlots.forEach((slot) => {
                const li = el('li');
                const link = el('a', `week-class ${slot.groupKey}`);
                link.href = slot.group.page;
                link.appendChild(el('span', 'week-time', timeRange(slot)));
                link.appendChild(el('span', 'week-title', slot.name));
                link.appendChild(el('span', `tag tag-${slot.groupKey}`, slot.group.label));
                if (slot.venueLabel) link.appendChild(el('span', 'week-venue', slot.venueLabel));

                if (slot.startsLater) {
                    const label = slot.cls && slot.cls.course ? 'Next course starts' : 'Next on';
                    link.appendChild(el('span', 'week-flag', `${label} ${dayMonth(slot.start)}`));
                } else if (slot.alternate) {
                    link.appendChild(el('span', 'week-flag', `Alternate weeks · next on ${dayMonth(slot.start)}`));
                }

                const spaces = spacesText(slot);
                if (spaces) {
                    link.appendChild(el('span', spaces.full ? 'week-spaces full' : 'week-spaces',
                        spaces.full ? `Full on ${dayMonth(slot.start)}: join the waiting list` : `Only ${spaces.text} on ${dayMonth(slot.start)}`));
                }

                const more = el('span', 'more', 'Details ');
                more.insertAdjacentHTML('beforeend', ICONS.arrow);
                link.appendChild(more);
                li.appendChild(link);
                ul.appendChild(li);
            });
            section.appendChild(ul);
            container.appendChild(section);
        });

        if (!total) document.getElementById('weekEmpty').hidden = false;
        buildDayTabs(container);
    }

    // On phones the week becomes calendar-style day chips, starting from today.
    // CSS only applies the tabbed layout on small screens; computers keep the grid.
    function buildDayTabs(container) {
        const days = Array.from(container.querySelectorAll('.week-day'));
        if (days.length < 2) return;

        const today = new Date();
        const todayIndex = DAYS.indexOf(weekday(today));
        const entries = days.map((section) => {
            const name = section.querySelector('h2').textContent;
            const offset = (DAYS.indexOf(name) - todayIndex + 7) % 7;
            return { section, name, offset, date: new Date(today.getTime() + offset * DAY_MS) };
        }).sort((a, b) => a.offset - b.offset);

        const tabs = el('div', 'day-tabs');
        tabs.setAttribute('role', 'tablist');
        tabs.setAttribute('aria-label', 'Choose a day');

        const select = (entry, focus, fromUser) => {
            entries.forEach((e) => {
                const on = e === entry;
                e.button.setAttribute('aria-selected', on ? 'true' : 'false');
                e.button.tabIndex = on ? 0 : -1;
                e.section.classList.toggle('active', on);
            });
            if (focus) entry.button.focus();
            // Keep the chosen chip in view, without moving the page on first load
            if (fromUser) tabs.scrollTo({ left: entry.button.offsetLeft - tabs.clientWidth / 2 + entry.button.offsetWidth / 2, behavior: 'smooth' });
        };

        entries.forEach((entry, i) => {
            entry.section.id = `day-${entry.name.toLowerCase()}`;
            entry.section.setAttribute('role', 'tabpanel');
            entry.section.setAttribute('aria-label', entry.name);
            const button = el('button', 'day-tab');
            button.type = 'button';
            button.id = `tab-${entry.name.toLowerCase()}`;
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', entry.section.id);
            button.setAttribute('aria-label', `${entry.offset === 0 ? 'Today, ' : ''}${entry.name} ${dayMonth(entry.date)}`);
            button.appendChild(document.createTextNode(entry.offset === 0 ? 'Today' : entry.name.slice(0, 3)));
            button.appendChild(el('strong', '', dayNum(entry.date)));
            button.addEventListener('click', () => select(entry, false, true));
            button.addEventListener('keydown', (event) => {
                const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
                if (!step) return;
                event.preventDefault();
                select(entries[(i + step + entries.length) % entries.length], true, true);
            });
            entry.button = button;
            tabs.appendChild(button);
        });

        container.classList.add('tabbed');
        container.parentNode.insertBefore(tabs, container);
        select(entries[0], false);
    }

    function showError() {
        ['upcomingError', 'weekError'].forEach((id) => {
            const node = document.getElementById(id);
            if (node) node.hidden = false;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const needed = document.querySelector('[data-class], #upcoming, #week');
        if (!needed) return;
        loadSessions()
            .then((sessions) => {
                renderClassCards(sessions);
                renderUpcoming(sessions);
                renderWeek(sessions);
            })
            .catch((error) => {
                console.error('Error loading classes:', error);
                showError();
            })
            .finally(() => {
                document.querySelectorAll('[data-loading]').forEach((node) => { node.hidden = true; });
            });
    });
})();
