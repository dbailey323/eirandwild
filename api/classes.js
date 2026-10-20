export default async function handler(req, res) {
    const API_KEY = process.env.BOOKWHEN_API_KEY;
    
    if (!API_KEY) {
        return res.status(500).json({ error: "Missing BOOKWHEN_API_KEY environment variable" });
    }

    const authHeader = "Basic " + Buffer.from(`${API_KEY}:`).toString("base64");

    try {
        // Bookwhen returns events in pages; follow "next" links (capped) so later sessions aren't dropped
        const rawEvents = [];
        const included = [];
        let url = "https://api.bookwhen.com/v2/events?page[size]=100&include=location";
        for (let page = 0; url && page < 10; page++) {
            const response = await fetch(url, {
                headers: { Authorization: authHeader }
            });

            if (!response.ok) throw new Error(`Bookwhen API error: ${response.statusText}`);

            const json = await response.json();
            rawEvents.push(...(json.data || []));
            included.push(...(json.included || []));
            url = json.links?.next || null;
        }

        // Venue details are sent separately in "included" when include=location is requested
        const locations = {};
        included
            .filter((item) => item.type === "location")
            .forEach((item) => { locations[item.id] = item.attributes || {}; });

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

            // Used by the timetable page to label and filter classes
            let category = isWomanhood ? "Womanhood" : "Motherhood";
            if (title.includes("hiit")) category = "Online HIIT";
            if (title.includes("massage")) category = "Baby Massage";

            const locationId = e.relationships?.location?.data?.id;
            const location = locationId ? locations[locationId] : null;
            const limit = e.attributes.attendee_limit;
            const count = e.attributes.attendee_count;

            return {
                className: parsedClassName,
                startDate,
                numWeeks: 1, 
                timeSuffix,
                skippedWeeks: [],
                eventId: e.id,
                title: e.attributes.title || "",
                startAt: e.attributes.start_at || null,
                endAt: e.attributes.end_at || null,
                category,
                venue: location?.address_text || "",
                isFull: Number.isFinite(limit) && Number.isFinite(count) && limit > 0 && count >= limit,
                color: "#000562",
                bookingPlatformUrl: bookingUrl
            };
        });

        // Cache at Vercel's edge for 5 minutes so busy pages don't hit Bookwhen on every visit
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
        res.status(200).json(classData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching class data" });
    }
}
