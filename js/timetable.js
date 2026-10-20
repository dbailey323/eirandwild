// js/timetable.js
// Builds the timetable from /api/classes (live Bookwhen data), grouped by day.

const WEEKS_AHEAD = 6;
const TZ = 'Europe/London';

const CATEGORY_CLASS = {
    'Motherhood': 'tt-tag-motherhood',
    'Womanhood': 'tt-tag-womanhood',
    'Online HIIT': 'tt-tag-hiit',
    'Baby Massage': 'tt-tag-babymassage'
};

const dayKey = (date) => date.toLocaleDateString('en-CA', { timeZone: TZ });
const dayLabel = (date) => date.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' });
const timeLabel = (date) => date.toLocaleTimeString('en-GB', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

function renderClass(cls) {
    const start = new Date(cls.startAt);
    const end = cls.endAt ? new Date(cls.endAt) : null;

    const row = el('li', 'tt-class');
    row.dataset.category = cls.category;

    const time = el('div', 'tt-time', timeLabel(start));
    if (end && end > start) time.appendChild(el('span', 'tt-time-end', `to ${timeLabel(end)}`));
    row.appendChild(time);

    const info = el('div', 'tt-info');
    info.appendChild(el('h3', 'tt-title', cls.title));
    const meta = el('p', 'tt-meta');
    meta.appendChild(el('span', `tt-tag ${CATEGORY_CLASS[cls.category] || ''}`, cls.category));
    const venue = cls.category === 'Online HIIT' ? 'Live on Zoom' : cls.venue;
    if (venue) meta.appendChild(el('span', 'tt-venue', venue));
    info.appendChild(meta);
    row.appendChild(info);

    const book = el('a', cls.isFull ? 'tt-book tt-book-full' : 'tt-book', cls.isFull ? 'Full: join waitlist' : 'Book');
    book.href = `${cls.bookingPlatformUrl}#focus=${cls.eventId}`;
    book.target = '_blank';
    book.rel = 'noopener noreferrer';
    book.setAttribute('aria-label', `${cls.isFull ? 'Join the waiting list for' : 'Book'} ${cls.title} on ${dayLabel(start)} at ${timeLabel(start)}`);
    row.appendChild(book);

    return row;
}

function render(classes) {
    const list = document.getElementById('ttDays');
    const filters = document.getElementById('ttFilters');
    list.innerHTML = '';

    const now = new Date();
    const cutoff = new Date(now.getTime() + WEEKS_AHEAD * 7 * 24 * 60 * 60 * 1000);
    const upcoming = classes
        .filter((c) => c.startAt && new Date(c.startAt) >= now && new Date(c.startAt) <= cutoff)
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

    if (!upcoming.length) {
        document.getElementById('ttEmpty').hidden = false;
        return;
    }

    const days = new Map();
    upcoming.forEach((c) => {
        const key = dayKey(new Date(c.startAt));
        if (!days.has(key)) days.set(key, []);
        days.get(key).push(c);
    });

    days.forEach((dayClasses) => {
        const section = el('section', 'tt-day');
        section.appendChild(el('h2', 'tt-day-title', dayLabel(new Date(dayClasses[0].startAt))));
        const ul = el('ul', 'tt-class-list');
        dayClasses.forEach((c) => ul.appendChild(renderClass(c)));
        section.appendChild(ul);
        list.appendChild(section);
    });

    // Only offer filters for categories that actually have classes
    const categories = [...new Set(upcoming.map((c) => c.category))];
    if (categories.length > 1) {
        ['All', ...categories].forEach((cat, i) => {
            const btn = el('button', 'tt-filter', cat);
            btn.type = 'button';
            btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
            btn.addEventListener('click', () => applyFilter(cat));
            filters.appendChild(btn);
        });
        filters.hidden = false;
    }
}

function applyFilter(category) {
    document.querySelectorAll('.tt-filter').forEach((btn) => {
        btn.setAttribute('aria-pressed', btn.textContent === category ? 'true' : 'false');
    });
    document.querySelectorAll('.tt-day').forEach((day) => {
        let visible = 0;
        day.querySelectorAll('.tt-class').forEach((row) => {
            const show = category === 'All' || row.dataset.category === category;
            row.hidden = !show;
            if (show) visible++;
        });
        day.hidden = visible === 0;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/classes')
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(render)
        .catch((error) => {
            console.error('Error loading timetable:', error);
            document.getElementById('ttError').hidden = false;
        })
        .finally(() => {
            document.getElementById('ttLoading').hidden = true;
        });
});
