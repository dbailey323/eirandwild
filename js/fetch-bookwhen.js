#!/usr/bin/env node
/**
 * Fetch Bookwhen events and emit:
 *   - public/events.json  (machine-friendly)
 *   - public/events.html  (ready-to-include markup)
 *
 * Env:
 *   BOOKWHEN_API_KEY=ja7nlqw9bjic942m58pruvbcogu4
 *   BOOKWHEN_PAGE_SIZE=50  (optional)
 */

import fs from "node:fs/promises";

const API = "https://api.bookwhen.com/v2/events";
const API_KEY = process.env.BOOKWHEN_API_KEY;
const PAGE_SIZE = Number(process.env.BOOKWHEN_PAGE_SIZE || 50);

// Safety: don’t run without a key
if (!API_KEY) {
  console.error("Missing BOOKWHEN_API_KEY");
  process.exit(1);
}

// Helper: Basic Auth header
const authHeader = "Basic " + Buffer.from(`${API_KEY}:`).toString("base64");

// Helper: follow pagination
async function fetchAllEvents(url = `${API}?page[size]=${PAGE_SIZE}`) {
  const all = [];
  let next = url;
  while (next) {
    const res = await fetch(next, { headers: { Authorization: authHeader } });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Bookwhen fetch failed ${res.status}: ${body}`);
    }
    const json = await res.json();
    all.push(...(json.data || []));

    // paginate
    next = json?.links?.next || null;
  }
  return all;
}

// Fetch related: location + tickets (optional but useful)
async function fetchRelated(href) {
  const res = await fetch(href, { headers: { Authorization: authHeader } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

// Format date/time → Europe/London, short & friendly
function fmt(dtISO) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dtISO));
  } catch {
    return dtISO;
  }
}

// Escape HTML for details
function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function nl2br(s = "") {
  return esc(s).replaceAll(/\r?\n/g, "<br>");
}

function ticketPriceSummary(tickets = []) {
  // Try to show a friendly "from £X" if available
  const prices = tickets
    .map(t => t?.attributes?.price) // e.g. "10.00"
    .filter(Boolean)
    .map(Number)
    .filter(n => !Number.isNaN(n));
  if (!prices.length) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `£${min.toFixed(2)}` : `£${min.toFixed(2)}–£${max.toFixed(2)}`;
}

async function main() {
  const rawEvents = await fetchAllEvents();

  // Optionally filter/pivot here (e.g., upcoming only)
  const upcoming = rawEvents
    .filter(e => !e.attributes?.cancelled_at)
    .sort((a, b) => new Date(a.attributes.start_at) - new Date(b.attributes.start_at));

  // Enrich each event with location & tickets
  const enriched = [];
  for (const ev of upcoming) {
    const rel = ev.relationships || {};
    const links = {
      location: rel.location?.links?.related,
      tickets: rel.tickets?.links?.related,
    };

    const [locationData, ticketData] = await Promise.all([
      links.location ? fetchRelated(links.location) : Promise.resolve(null),
      links.tickets ? fetchRelated(links.tickets) : Promise.resolve(null),
    ]);

    const locationName =
      Array.isArray(locationData) && locationData[0]?.attributes?.name
        ? locationData[0].attributes.name
        : null;

    const tickets = Array.isArray(ticketData) ? ticketData : [];
    const priceSummary = ticketPriceSummary(tickets);

    enriched.push({
      id: ev.id,
      title: ev.attributes?.title || "",
      start_at: ev.attributes?.start_at || "",
      end_at: ev.attributes?.end_at || "",
      details: ev.attributes?.details || "",
      tags: ev.attributes?.tags || [],
      attendee_limit: ev.attributes?.attendee_limit ?? null,
      attendee_count: ev.attributes?.attendee_count ?? null,
      waiting_list: !!ev.attributes?.waiting_list,
      location: locationName,
      tickets: tickets.map(t => ({
        id: t.id,
        name: t.attributes?.name,
        price: t.attributes?.price ?? null,
        currency: t.attributes?.currency || "GBP",
        description: t.attributes?.description || "",
      })),
      price_summary: priceSummary,
      url: ev.links?.self || null,
    });
  }

  // Emit JSON
  await fs.mkdir("public", { recursive: true });
  await fs.writeFile("public/events.json", JSON.stringify({ updatedAt: new Date().toISOString(), events: enriched }, null, 2), "utf8");

  // Emit a ready-made HTML fragment (cards)
  const cards = enriched
    .map(e => {
      const when = `${fmt(e.start_at)} – ${fmt(e.end_at)}`;
      const tally =
        e.attendee_limit != null && e.attendee_count != null
          ? `${e.attendee_count}/${e.attendee_limit} booked`
          : "";
      const tags = e.tags.length ? `<div class="bw-tags">${e.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : "";
      const price = e.price_summary ? `<div class="bw-price">From ${e.price_summary}</div>` : "";

      return `
<article class="bw-card">
  <h3 class="bw-title">${esc(e.title)}</h3>
  <div class="bw-meta">
    <div class="bw-when">${esc(when)}</div>
    ${e.location ? `<div class="bw-location">${esc(e.location)}</div>` : ""}
    ${tally ? `<div class="bw-tally">${esc(tally)}</div>` : ""}
    ${price}
  </div>
  ${e.details ? `<p class="bw-details">${nl2br(e.details)}</p>` : ""}
  ${tags}
  ${e.url ? `<a class="bw-link" href="${e.url}" target="_blank" rel="noopener">View on Bookwhen</a>` : ""}
</article>
`.trim();
    })
    .join("\n");

  const html = `<!-- generated: ${new Date().toISOString()} -->
<section class="bw-grid">
${cards}
</section>
<style>
  .bw-grid { display:grid; gap:1rem; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); }
  .bw-card { border:1px solid #e5e7eb; border-radius:12px; padding:1rem; box-shadow: 0 1px 2px rgba(0,0,0,.04); }
  .bw-title { margin:0 0 .25rem; font-size:1.05rem; line-height:1.25; }
  .bw-meta { font-size:.9rem; color:#374151; display:grid; gap:.2rem; margin:.25rem 0 .5rem; }
  .bw-details { font-size:.9rem; color:#111827; }
  .bw-tags span { display:inline-block; font-size:.75rem; background:#f3f4f6; border-radius:999px; padding:.15rem .5rem; margin-right:.25rem; }
  .bw-link { display:inline-block; margin-top:.5rem; font-weight:600; }
</style>
`;
  await fs.writeFile("public/events.html", html, "utf8");

  console.log("Wrote public/events.json and public/events.html");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
