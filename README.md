# Eir & Wild Website

> Pre and postnatal fitness, womanhood classes, baby massage and doula support in Mountsorrel & Rothley, Leicestershire

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://www.eirandwild.co.uk)
[![Clean URLs](https://img.shields.io/badge/URLs-Clean-blue)](https://www.eirandwild.co.uk)
[![No framework](https://img.shields.io/badge/Static-HTML%20%2B%20CSS-purple)](https://www.eirandwild.co.uk)

## About

**Eir & Wild Wellness** is run by Lara Bailey in Mountsorrel and Rothley, Leicestershire:
- **Motherhood classes**: *The Strong Mummy Movement*, *Strong Women Squad* and *Strong Mums, Bums & Tums*.
- **Womanhood classes**: *Dance & Tone*, *Strong & Stretched* and the *Monday Double* bundle.
- **Online HIIT**: live 30-minute cardio and strength workouts on Zoom.
- **Baby Massage & Mummy Relaxation**: 4-week courses.
- **Personal Training**: 45- and 60-minute 1:1 memberships.
- **Postnatal Doula**: fourth-trimester care at home.

Production URL: [www.eirandwild.co.uk](https://www.eirandwild.co.uk)

---

## Adding or changing classes

Class dates, times, venues and spaces left all come live from Bookwhen, so most changes need nothing on the website:

| Change in Bookwhen | Website |
|---|---|
| New dates, new term, new course (even with a new reference) | Appears automatically, as long as the class keeps its name |
| Time, venue or capacity change, cancellation | Updates automatically (within about a minute) |
| A brand-new type of class | Appears on the timetable automatically. To give it its own card on a class page, add it to `js/class-config.js` and add a card with `data-class="<key>"` |
| Renaming a class | Make sure the new title still contains the words in its `match` list in `js/class-config.js` |

`js/class-config.js` is the one place that lists the classes, which page each belongs to and which Bookwhen page books it.

---

## Project structure

```
eirandwild/
├── index.html                   # Homepage
├── timetable.html               # Weekly schedule, live from Bookwhen
├── aboutme.html                 # About Lara
├── ourstory.html                # The story and meaning behind Eir & Wild
├── reviews.html                 # Google reviews (Elfsight widget)
├── faq.html                     # FAQs (with FAQPage structured data)
├── contact.html                 # WhatsApp, email, phone and venues
├── privacy.html                 # Privacy policy
├── 404.html                     # Page not found
├── leicester/
│   ├── fitnessclasses/
│   │   ├── motherhoodclasses.html
│   │   ├── womanhoodclasses.html
│   │   └── hiit.html
│   ├── babymassage/babymassage.html
│   ├── personaltraining/personaltraining.html
│   └── doula/doula.html
│
├── api/classes.js               # Vercel function: fetches events from the Bookwhen API
├── css/site.css                 # The one stylesheet for every page
├── js/
│   ├── site.js                  # Mobile menu and dropdowns
│   ├── class-config.js          # The list of classes (matched to Bookwhen by name)
│   └── live-classes.js          # Class page dates, homepage "coming up" list and timetable
├── images/                      # WebP photos; images/brand/ holds the logo mark, favicon and app icons
├── fonts/moon-time-regular.ttf  # Moon Time script font
├── manifest.json, robots.txt, sitemap.xml, vercel.json
```

Every page shares the same header, footer and stylesheet. Links use root paths (`/css/site.css`, `/leicester/...`), so preview the site from the repository root.

---

## Design

- **Brand colours**: navy `#000562`, gold `#FFD700`, teal `#7AE1D5`, bronze `#8B7355` (defined as CSS variables at the top of `css/site.css`).
- **Type**: *Moon Time* script for small headings, *Montserrat* (Google Fonts) for everything else.
- **Logo**: the triple-moon mark is an SVG (`images/brand/mark.svg`), so it stays sharp at any size.
- **Mobile first and app-like**: a bottom tab bar and slide-up menu (Popover API) on phones, page transitions (View Transitions API), prefetching (speculation rules), scroll-driven animations and swipeable card rows. Each is a progressive enhancement: older browsers get the same content without the effects, and animations switch off for people who prefer reduced motion.
- No CSS or JavaScript framework, and no icon font: icons are inline SVG. The only third-party requests are Google Fonts, the reviews widget and Vercel's cookieless analytics.

---

## Local development

```bash
# Static preview (live class data won't load without the API)
python3 -m http.server 8000

# With the Bookwhen API: add BOOKWHEN_API_KEY to .env.local, then
npx vercel dev
```

## Deployment

Deployed on [Vercel](https://vercel.com) from the `main` branch, with `"cleanUrls": true` so pages work without `.html`.

---

## Contact & social

- **Email**: [hello@eirandwild.co.uk](mailto:hello@eirandwild.co.uk)
- **WhatsApp**: [+44 7885 899947](https://wa.me/447885899947)
- **Facebook**: [@EirandWildWellness](https://www.facebook.com/EirandWildWellness)
- **Instagram**: [@eirandwildwellness](https://www.instagram.com/eirandwildwellness/)
- **TikTok**: [@eirandwildwellness](https://www.tiktok.com/@eirandwildwellness)
