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

            const parsedClassName = e.id.split('-')[1] || e.id; 
            const title = (e.attributes.title || "").toLowerCase();

            // Route to the correct Bookwhen schedule page based on class name
            const isWomanhood = title.includes("dance") || title.includes("hiit") || title.includes("stretched") || title.includes("double");
            
            const bookingUrl = isWomanhood 
                ? "https://bookwhen.com/eirandwild-womanhood" 
                : "https://bookwhen.com/eirandwild-motherhood";

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
