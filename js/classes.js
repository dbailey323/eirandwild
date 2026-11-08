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
    { card: 's2fwm', words: ['hiit', 'cardio'] },   // HIIT Cardio
    { card: 'snu8o', words: ['hiit', 'strength'] }, // HIIT Strength
    { card: 's6a88', words: ['massage'] }           // Baby Massage & Mummy Relaxation
];

function cardFor(classInfo) {
    const title = (classInfo.title || '').toLowerCase();
    const match = CLASS_CARDS.find((c) => c.words.every((word) => title.includes(word)));
    return match ? match.card : classInfo.className;
}

function isUpcomingClass(classInfo) {
    const start = new Date(classInfo.startAt);
    return Boolean(classInfo.startAt && classInfo.eventId)
        && Number.isFinite(start.getTime()) && start.getTime() > Date.now();
}

function venueLabel(address) {
    if (/mountsorrel memorial centre/i.test(address)) return 'Mountsorrel Memorial Centre';
    if (/rothley centre/i.test(address)) return 'The Rothley Centre';
    const firstLine = address.split(/[\n,]/)[0].trim();
    return firstLine.length <= 60 ? firstLine : 'Class venue';
}

function displayClassSchedules(classes) {
    const upcoming = classes.filter(isUpcomingClass)
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
    document.querySelectorAll('[data-class-schedule]').forEach(heading => {
        const card = heading.dataset.classSchedule;
        const next = upcoming.find(classInfo => cardFor(classInfo) === card);
        const venueHeading = document.querySelector(`[data-class-venue="${card}"]`);
        if (!next) {
            heading.textContent = 'Check Bookwhen for upcoming dates and times';
            if (venueHeading) {
                venueHeading.textContent = '';
                venueHeading.hidden = true;
            }
            return;
        }

        const start = new Date(next.startAt);
        const weekday = start.toLocaleDateString('en-GB', {
            timeZone: 'Europe/London', weekday: 'short'
        });
        const date = start.toLocaleDateString('en-GB', {
            timeZone: 'Europe/London', day: 'numeric', month: 'short'
        });
        const time = start.toLocaleTimeString('en-GB', {
            timeZone: 'Europe/London', hour: 'numeric', minute: '2-digit', hour12: true
        }).replace(/\s/g, '').toLowerCase();
        heading.textContent = `Next class: ${weekday} ${date} · ${time}`;
        if (venueHeading) {
            const address = (next.venue || '').trim();
            venueHeading.textContent = next.category === 'Online HIIT' ? 'Live on Zoom' : (address ? venueLabel(address) : '');
            venueHeading.hidden = !venueHeading.textContent;
            if (address && next.category !== 'Online HIIT') {
                const mapLink = document.createElement('a');
                mapLink.className = 'booking-map';
                mapLink.textContent = 'View map';
                mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                mapLink.target = '_blank';
                mapLink.rel = 'noopener noreferrer';
                mapLink.setAttribute('aria-label', `View map for ${venueLabel(address)}`);
                venueHeading.appendChild(mapLink);
            }
        }
    });
}

function displayClassDates(classInfo) {
    const { startAt, color, bookingPlatformUrl, eventId, spacesLeft = null } = classInfo;
    const card = cardFor(classInfo);
    // Compare actual instants; a calendar date alone keeps finished sessions bookable.
    const start = new Date(startAt);
    if (!isUpcomingClass(classInfo)) {
        return;
    }
    const classDatesContainer = document.getElementById(`classDates${card}`);
    
    if (!classDatesContainer) {  
        return; // Exit if the container element doesn't exist
    }

    // Courses (e.g. baby massage) only show the first upcoming date, since booking it books the whole course
    const firstOnly = classDatesContainer.dataset.firstOnly === 'true';
    if (firstOnly && classDatesContainer.querySelector('a:not(.fallback-booking-link)')) {
        return;
    }
    
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
        linkElement.style.backgroundColor = '#8a8fa8';
        linkElement.style.color = '#ffffff';
        linkElement.setAttribute('aria-label', `${formattedDate}: fully booked, join the waiting list`);
        note = { text: 'Fully booked', color: '#666666' };
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
    slot.style.marginRight = '0';
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

    classDatesContainer.appendChild(slot);
}

document.addEventListener('DOMContentLoaded', function () {
    // Fetch directly from the secure Vercel Serverless Function
    return fetch('/api/classes')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayClassSchedules(data);
            // Course cards show the earliest valid upcoming event, regardless of API order.
            data.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
                .forEach(displayClassDates);
        })
        .catch(error => console.error('Error fetching class data:', error));
});
