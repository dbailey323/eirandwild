// js/classes.js

function displayClassDates(className, startDate, numWeeks, timeSuffix, skippedWeeks = [], color, bookingPlatformUrl, eventId) {
    const classDatesContainer = document.getElementById(`classDates${className}`);
    
    if (!classDatesContainer) {  
        return; // Exit if the container element doesn't exist
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
            
            // Add a span for margin
            const span = document.createElement('span');
            span.style.marginRight = '10px';
            
            // Append elements to the container
            classDatesContainer.appendChild(linkElement);
            classDatesContainer.appendChild(span);
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
                    classInfo.eventId
                );
            });
        })
        .catch(error => console.error('Error fetching class data:', error));
});
