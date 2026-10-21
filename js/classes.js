// js/classes.js

// Show how many spaces are left once a session gets down to this many
const LOW_SPACES = 3;

function displayClassDates(className, startDate, numWeeks, timeSuffix, skippedWeeks = [], color, bookingPlatformUrl, eventId, spacesLeft = null) {
    const classDatesContainer = document.getElementById(`classDates${className}`);
    
    if (!classDatesContainer) {  
        return; // Exit if the container element doesn't exist
    }

    // Courses (e.g. baby massage) only show the first upcoming date, since booking it books the whole course
    const firstOnly = classDatesContainer.dataset.firstOnly === 'true';
    if (firstOnly && classDatesContainer.querySelector('a:not(.fallback-booking-link)')) {
        return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create a 'tomorrow' date for comparison
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < numWeeks; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + (i * 7));
        
        // Check if the week should be skipped or if the date has passed (including today)
        if (!skippedWeeks.includes(i + 1) && currentDate >= today) {
            // Remove fallback booking link if present before inserting dynamic dates
            const fallbackLink = classDatesContainer.querySelector('.fallback-booking-link');
            if (fallbackLink) {
                fallbackLink.remove();
            }

            const formattedDate = currentDate.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
            const linkDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
            // Prefer the exact Bookwhen event ID so the link is unaffected by server timezone
            const focusId = eventId || `ev-${className}-${linkDate}${timeSuffix}`;
            const link = `${bookingPlatformUrl}#focus=${focusId}`;
            
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

            classDatesContainer.appendChild(slot);

            if (firstOnly) {
                return;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Fetch directly from the secure Vercel Serverless Function
    fetch('/api/classes')
        .then(response => response.json())
        .then(data => {
            data.forEach(classInfo => {
                displayClassDates(
                    classInfo.className, 
                    classInfo.startDate, 
                    classInfo.numWeeks, 
                    classInfo.timeSuffix, 
                    classInfo.skippedWeeks, 
                    classInfo.color, 
                    classInfo.bookingPlatformUrl,
                    classInfo.eventId,
                    classInfo.spacesLeft ?? null
                );
            });
        })
        .catch(error => console.error('Error fetching class data:', error));
});
