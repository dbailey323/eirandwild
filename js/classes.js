// js/classes.js

// Show how many spaces are left once a session gets down to this many
const LOW_SPACES = 3;

// Bookwhen sessions are matched to a class card by their title, so a new course or
// term appears on the right card even when Bookwhen gives it a new reference.
//   card:  the reference in the card's id on the class page (id="classDates<card>")
//   words: words that must ALL appear in the Bookwhen title (not case-sensitive)
// The first match wins, so more specific classes go first. Sessions whose title
// matches nothing here fall back to their own Bookwhen reference.
const CLASS_CARDS = [
    { card: 's8zbt', words: ['double'] },           // Monday Double
    { card: 's1pcc', words: ['dance'] },            // Dance & Tone
    { card: 'szawo', words: ['stretched'] },        // Strong & Stretched
    { card: 'smgsv', words: ['strong mummy'] },     // The Strong Mummy Movement
    { card: 'shphg', words: ['bums'] },             // Strong Mums, Bums & Tums
    { card: 'sz1aw', words: ['strong women'] },     // Strong Women Squad
    { card: 's20wr', words: ['fight', 'fierce'] },  // Fight Fierce
    { card: 's2fwm', words: ['hiit', 'cardio'] },   // HIIT Cardio
    { card: 'snu8o', words: ['hiit', 'strength'] }, // HIIT Strength
    { card: 's6a88', words: ['massage'] }           // Baby Massage & Mummy Relaxation
];

function cardFor(classInfo) {
    const title = (classInfo.title || '').toLowerCase();
    const match = CLASS_CARDS.find((c) => c.words.every((word) => title.includes(word)));
    return match ? match.card : classInfo.className;
}

// The block name from a Bookwhen title, e.g. "❄️💪The Strong Mummy Movement - Winter 2026 💪❄️"
// gives "Winter 2026". Only names with a year count, so "HIIT - STRENGTH" isn't a block.
function blockLabel(title) {
    const parts = (title || '').split(/\s[-–]\s/);
    if (parts.length < 2) return '';
    const label = parts.slice(1).join(' - ')
        .replace(/[^\p{L}\p{N}\s&/'-]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
    return /\b20\d\d\b/.test(label) ? label : '';
}

// Each card's dates are grouped by block, so a new block gets its own sub-title
const cardBlocks = new Map();

function blockFor(container, label) {
    if (!cardBlocks.has(container)) cardBlocks.set(container, new Map());
    const blocks = cardBlocks.get(container);
    if (blocks.has(label)) return blocks.get(label);

    const wrap = document.createElement('div');
    wrap.style.marginBottom = '10px';
    if (label) {
        const heading = document.createElement('p');
        heading.className = 'class-block-title';
        heading.style.fontSize = '14px';
        heading.style.fontWeight = '700';
        heading.style.color = '#000562';
        heading.style.margin = '6px 0 6px';
        heading.textContent = label;
        // Any block after the first one shown is a newly added block
        if ([...blocks.keys()].some(Boolean)) {
            const badge = document.createElement('span');
            badge.className = 'class-block-new';
            badge.textContent = 'New block';
            badge.style.display = 'inline-block';
            badge.style.marginLeft = '8px';
            badge.style.padding = '2px 8px';
            badge.style.borderRadius = '10px';
            badge.style.fontSize = '11px';
            badge.style.backgroundColor = '#FFD700';
            badge.style.color = '#000562';
            heading.appendChild(badge);
        }
        wrap.appendChild(heading);
    }
    container.appendChild(wrap);
    const block = { wrap, count: 0 };
    blocks.set(label, block);
    return block;
}

function displayClassDates(classInfo) {
    const { startAt, color, bookingPlatformUrl, eventId, spacesLeft = null } = classInfo;
    const card = cardFor(classInfo);
    // Compare actual instants; a calendar date alone keeps finished sessions bookable.
    const start = new Date(startAt);
    if (!startAt || !Number.isFinite(start.getTime()) || start.getTime() <= Date.now() || !eventId) {
        return;
    }
    const classDatesContainer = document.getElementById(`classDates${card}`);
    
    if (!classDatesContainer) {  
        return; // Exit if the container element doesn't exist
    }

    // Courses (e.g. baby massage) only show the first date of each course, since booking it books the whole course
    const firstOnly = classDatesContainer.dataset.firstOnly === 'true';
    const block = blockFor(classDatesContainer, blockLabel(classInfo.title));
    if (firstOnly && block.count > 0) {
        return;
    }
    block.count++;
    
    // Remove fallback booking link if present before inserting dynamic dates
    const fallbackLink = classDatesContainer.querySelector('.fallback-booking-link');
    if (fallbackLink) {
        fallbackLink.remove();
    }

    const formattedDate = start.toLocaleDateString("en-GB", {
        timeZone: "Europe/London",
        month: "short",
        day: "numeric"
    });
    // Keep Bookwhen's exact ID, including its own date and time reference.
    const link = `${bookingPlatformUrl}#focus=${eventId}`;

    // Create link element
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', link);
    linkElement.setAttribute('target', '_blank');
    linkElement.setAttribute('rel', 'noopener noreferrer');
    linkElement.innerHTML = `${formattedDate}`;  
    linkElement.style.backgroundColor = color;
    linkElement.style.color = '#FFD700';

    // Spaces note shown in small text under the date button
    let note = null;
    if (spacesLeft === 0) {
        // Bookwhen offers a waiting list on full sessions, so the link stays
        linkElement.style.backgroundColor = '#c8102e';
        linkElement.style.color = '#ffffff';
        linkElement.setAttribute('aria-label', `${formattedDate}: fully booked, join the waiting list`);
        note = { text: 'Fully booked', color: '#c8102e' };
    } else if (spacesLeft !== null && spacesLeft <= LOW_SPACES) {
        const spaces = `${spacesLeft} ${spacesLeft === 1 ? 'space' : 'spaces'} left`;
        linkElement.setAttribute('aria-label', `${formattedDate}: ${spaces}`);
        note = { text: spaces, color: '#c8102e' };
    }

    // Wrap the button and its note so the note sits directly beneath it
    const slot = document.createElement('span');
    slot.style.display = 'inline-flex';
    slot.style.flexDirection = 'column';
    slot.style.alignItems = 'center';
    slot.style.verticalAlign = 'top';
    slot.style.marginRight = '10px';
    linkElement.style.marginRight = '0';
    slot.appendChild(linkElement);

    if (note) {
        const noteElement = document.createElement('span');
        noteElement.textContent = note.text;
        noteElement.setAttribute('aria-hidden', 'true');
        noteElement.style.color = note.color;
        noteElement.style.fontSize = '12px';
        noteElement.style.fontWeight = '700';
        noteElement.style.marginTop = '4px';
        slot.appendChild(noteElement);
    }

    block.wrap.appendChild(slot);
}

// Cards for classes that have finished (e.g. data-hide-after="2026-12-17T00:00:00Z")
// are taken off the page once that time has passed
function hideFinishedClasses() {
    if (!document.querySelectorAll) return;
    document.querySelectorAll('[data-hide-after]').forEach((element) => {
        const hideAfter = Date.parse(element.dataset.hideAfter);
        if (Number.isFinite(hideAfter) && Date.now() >= hideAfter) element.remove();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    hideFinishedClasses();
    // Fetch directly from the secure Vercel Serverless Function
    return fetch('/api/classes')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Course cards show the earliest valid upcoming event, regardless of API order.
            data.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
                .forEach(displayClassDates);
        })
        .catch(error => console.error('Error fetching class data:', error));
});
