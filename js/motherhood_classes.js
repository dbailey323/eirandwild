/**
 * Displays class dates with booking links dynamically.
 * @param {string} className - The base class name used in element IDs to target where dates should be displayed.
 * @param {string} startDate - The start date of the class series in a format parseable by new Date().
 * @param {number} numWeeks - The total number of weeks in the class series.
 * @param {string} timeSuffix - A suffix for the booking link URL, often representing the class time.
 * @param {number[]} [skippedWeeks=[]] - An optional array of 1-based week numbers to skip.
 * @param {string} color - The background color for the generated booking links. This parameter seems unused in the current implementation.
 * @param {string} bookingBaseUrl - The base URL for the booking platform.
 */
function displayClassDates(className, startDate, numWeeks, timeSuffix, skippedWeeks = [], color, bookingBaseUrl) {
    // Get the container element where class dates will be displayed
    const classDatesContainer = document.getElementById(`classDates${className}`);
    if (!classDatesContainer) {
 return; // Exit if the container element is not found
    }
    // Get the container element where class dates will be displayed
    const classDatesContainer = document.getElementById(`classDates${className}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create a 'tomorrow' date for comparison
    // Note: 'tomorrow' variable is created but not currently used in the logic.

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < numWeeks; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + (i * 7));

    // Check if the week should be skipped or if the date has passed (including today)
    if (!skippedWeeks.includes(i + 1) && currentDate >= today) {
        // Format the date for display on the page
        const formattedDate = currentDate.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
        // Format the date for inclusion in the booking link URL
        const linkDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
        // Construct the full booking link using the provided base URL
        const link = `${bookingBaseUrl}#focus=ev-${className}-${linkDate}${timeSuffix}`;

        // Create link element
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', link);
        linkElement.setAttribute('target', '_blank');
        linkElement.innerHTML = `${formattedDate}`; // Changed to display just the formatted date
        linkElement.style.backgroundColor = color;
        linkElement.style.color = '#FFD700';

        // Add a span for margin
        const span = document.createElement('span'); // Used for spacing between links
        span.style.marginRight = '10px';

        // Append elements to the container
        classDatesContainer.appendChild(linkElement);
        classDatesContainer.appendChild(span);
    }
}
}

// Fetch data from the JSON file and display class dates
fetch('../js/class_data.json')
    .then(response => response.json())
    .then(data => {
        // Loop through each class object in the JSON data
        data.forEach(classData => {
            // Check if the bookingPlatformUrl property exists before calling displayClassDates
            if (classData.bookingPlatformUrl) {
                displayClassDates(classData.className, classData.startDate, classData.numWeeks, classData.timeSuffix, classData.skippedWeeks, classData.color, classData.bookingPlatformUrl);
            }
        });
    })
    .catch(error => console.error('Error fetching class data:', error)); // Log any errors during fetching
