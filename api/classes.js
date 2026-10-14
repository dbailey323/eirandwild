// api/classes.js
export default async function handler(req, res) {
    const API_KEY = process.env.BOOKWHEN_API_KEY;
    
    if (!API_KEY) {
        return res.status(500).json({ error: "Missing API Key" });
    }

    const authHeader = "Basic " + Buffer.from(`${API_KEY}:`).toString("base64");

    try {
        // Fetch up to 50 events (you can adjust the page size as needed)
        const response = await fetch("https://api.bookwhen.com/v2/events?page[size]=50", {
            headers: { Authorization: authHeader }
        });
        
        if (!response.ok) throw new Error("Failed to fetch from Bookwhen");
        
        const json = await response.json();
        const rawEvents = json.data || [];

        // Filter and sort upcoming events
        const upcoming = rawEvents
            .filter((e) => !e.attributes?.cancelled_at)
            .sort((a, b) => new Date(a.attributes.start_at) - new Date(b.attributes.start_at));

        // Transform into the format your frontend expects
        const classData = upcoming.map((e) => {
            const startDate = e.attributes.start_at ? e.attributes.start_at.split("T")[0] : null;
            const timeSuffix = e.attributes.start_at
                ? new Date(e.attributes.start_at)
                    .toLocaleTimeString("en-GB", { hour12: false })
                    .replace(/:/g, "")
                : "000000";

            return {
                className: e.id.slice(-4),
                startDate,
                numWeeks: 1, 
                timeSuffix,
                skippedWeeks: [],
                color: "#000562",
                bookingPlatformUrl: e.links?.self
                    ? e.links.self.replace(/\/e\/.*$/, "")
                    : "https://bookwhen.com/eirandwild",
            };
        });

        // Send the formatted data to the frontend
        res.status(200).json(classData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching class data" });
    }
}
