// js/timetable.js
// Builds a weekly schedule from /api/classes (live Bookwhen data). Each class
// links to its class page, where people see upcoming dates and book.

// Regular classes are found in the next few weeks (so one skipped week doesn't hide them).
// Classes not on in that time, such as a baby massage course between blocks, are looked
// for further ahead and shown with their next start date.
const REGULAR_WEEKS = 4;
const LOOKAHEAD_WEEKS = 12;
const TZ = 'Europe/London';
const LOW_SPACES = 3;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CATEGORIES = {
    'Motherhood': { page: 'leicester/fitnessclasses/motherhoodclasses', tag: 'tt-tag-motherhood' },
    'Womanhood': { page: 'leicester/fitnessclasses/womanhoodclasses', tag: 'tt-tag-womanhood' },
    'Online HIIT': { page: 'leicester/fitnessclasses/hiit', tag: 'tt-tag-hiit' },
    'Baby Massage': { page: 'leicester/babymassage/babymassage', tag: 'tt-tag-babymassage' }
};

const weekdayName = (date) => date.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'long' });
const timeLabel = (date) => date.toLocaleTimeString('en-GB', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
const sortTime = (date) => date.toLocaleTimeString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });
const shortDate = (date) => date.toLocaleDateString('en-GB', { timeZone: TZ, day: 'numeric', month: 'short' });
const DAY_MS = 24 * 60 * 60 * 1000;

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

// Every gap between sessions is two weeks, e.g. classes that alternate on Saturdays
function isAlternateWeeks(dates) {
    if (dates.length < 2) return false;
    return dates.slice(1).every((date, i) => Math.round((date - dates[i]) / DAY_MS) === 14);
}

// Collapse dated sessions into one entry per class, day and start time
function buildWeek(classes) {
    const now = new Date();
    const regularCutoff = new Date(now.getTime() + REGULAR_WEEKS * 7 * DAY_MS);
    const cutoff = new Date(now.getTime() + LOOKAHEAD_WEEKS * 7 * DAY_MS);
    const slots = new Map();

    classes
        .filter((c) => c.startAt && new Date(c.startAt) >= now && new Date(c.startAt) <= cutoff)
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
        .forEach((c) => {
            const start = new Date(c.startAt);
            const key = `${weekdayName(start)}|${sortTime(start)}|${c.title}`;
            if (!slots.has(key)) slots.set(key, { ...c, dates: [] });
            slots.get(key).dates.push(start);
        });

    slots.forEach((slot) => {
        const soonDates = slot.dates.filter((date) => date <= regularCutoff);
        slot.startsLater = soonDates.length === 0;
        slot.alternate = isAlternateWeeks(soonDates);
    });

    const week = new Map(DAYS.map((day) => [day, []]));
    slots.forEach((c) => week.get(weekdayName(new Date(c.startAt))).push(c));
    week.forEach((dayClasses) => dayClasses.sort((a, b) => sortTime(new Date(a.startAt)).localeCompare(sortTime(new Date(b.startAt)))));
    return week;
}

function renderClass(cls) {
    const start = new Date(cls.startAt);
    const end = cls.endAt ? new Date(cls.endAt) : null;
    const category = CATEGORIES[cls.category] || CATEGORIES.Motherhood;

    const item = el('li');
    const link = el('a', 'tt-class');
    link.href = category.page;

    const time = el('span', 'tt-time', timeLabel(start));
    if (end && end > start) time.textContent += ` to ${timeLabel(end)}`;
    link.appendChild(time);

    link.appendChild(el('span', 'tt-title', cls.title));
    link.appendChild(el('span', `tt-tag ${category.tag}`, cls.category));

    const venue = cls.venue || (cls.category === 'Online HIIT' ? 'Live on Zoom' : '');
    if (venue) link.appendChild(el('span', 'tt-venue', venue));

    if (cls.startsLater) {
        const label = cls.category === 'Baby Massage' ? 'Next course starts' : 'Next on';
        link.appendChild(el('span', 'tt-alternate', `${label} ${shortDate(start)}`));
    } else if (cls.alternate) {
        link.appendChild(el('span', 'tt-alternate', `Alternate weeks · next on ${shortDate(start)}`));
    }

    // Spaces for the next session (the class's first upcoming date)
    if (cls.spacesLeft === 0) {
        link.appendChild(el('span', 'tt-spaces tt-spaces-full', `Full on ${shortDate(start)}: join the waitlist`));
    } else if (cls.spacesLeft !== null && cls.spacesLeft !== undefined && cls.spacesLeft <= LOW_SPACES) {
        link.appendChild(el('span', 'tt-spaces', `Only ${cls.spacesLeft} ${cls.spacesLeft === 1 ? 'space' : 'spaces'} left on ${shortDate(start)}`));
    }

    link.appendChild(el('span', 'tt-more', 'Details & booking →'));
    item.appendChild(link);
    return item;
}

function render(classes) {
    const container = document.getElementById('ttWeek');
    const week = buildWeek(classes);
    let total = 0;

    week.forEach((dayClasses, day) => {
        if (!dayClasses.length) return;
        total += dayClasses.length;

        const section = el('section', 'tt-day');
        section.appendChild(el('h2', 'tt-day-title', day));
        const ul = el('ul', 'tt-class-list');
        dayClasses.forEach((c) => ul.appendChild(renderClass(c)));
        section.appendChild(ul);
        container.appendChild(section);
    });

    if (!total) document.getElementById('ttEmpty').hidden = false;
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
