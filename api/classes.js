export default async function handler(req, res) {
    const API_KEY = process.env.BOOKWHEN_API_KEY;
    
    if (!API_KEY) {
        return res.status(500).json({ error: "Missing BOOKWHEN_API_KEY environment variable" });
    }

    const authHeader = "Basic " + Buffer.from(`${API_KEY}:`).toString("base64");

    try {
        const response = await fetch("https://api.bookwhen.com/v2/events?page[size]=50", {
            headers: { Authorization: authHeader }
        });
        
        if (!response.ok) throw new Error(`Bookwhen API error: ${response.statusText}`);
        
        const json = await response.json();
        const rawEvents = json.data || [];

        const upcoming = rawEvents
            .filter((e) => !e.attributes?.cancelled_at)
            .sort((a, b) => new Date(a.attributes.start_at) - new Date(b.attributes.start_at));

        const classData = upcoming.map((e) => {
            const startDate = e.attributes.start_at ? e.attributes.start_at.split("T")[0] : null;
            const timeSuffix = e.attributes.start_at
                ? new Date(e.attributes.start_at)
                    .toLocaleTimeString("en-GB", { hour12: false })
                    .replace(/:/g, "")
                : "000000";

            // CORRECTED: Split 'ev-s65gq-20261014103000' and grab the middle identifier ('s65gq')
            const parsedClassName = e.id.split('-')[1] || e.id; 

            // CORRECTED: Fix the booking URL to point to the actual booking page, not the API endpoint
            const bookingUrl = e.links?.self
                ? e.links.self.replace("api.bookwhen.com/v2/events", "bookwhen.com/eirandwild/e")
                : "https://bookwhen.com/eirandwild";

            return {
                className: parsedClassName,
                startDate,
                numWeeks: 1, 
                timeSuffix,
                skippedWeeks: [],
                color: "#000562",
                bookingPlatformUrl: bookingUrl
            };
        });

        res.status(200).json(classData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching class data" });
    }
}
