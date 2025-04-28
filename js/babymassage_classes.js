function displayClassDates(className, startDate, numWeeks, timeSuffix, skippedWeeks = [], color) {
    const classDatesContainer = document.getElementById(`classDates${className}`);
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
        const formattedDate = currentDate.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
        const linkDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
        const link = `https://bookwhen.com/fitnesswithlara#focus=ev-${className}-${linkDate}${timeSuffix}`;

        // Create link element
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', link);
        linkElement.setAttribute('target', '_blank');
        linkElement.innerHTML = `<small>${formattedDate}</small>`;
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
