# Eir & Wild Website

> Pre- and postnatal fitness, baby massage, and doula services in Leicestershire

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://www.eirandwild.co.uk)
[![Clean URLs](https://img.shields.io/badge/URLs-Clean-blue)](https://www.eirandwild.co.uk)
[![Bootstrap 5.3.3](https://img.shields.io/badge/Bootstrap-5.3.3-purple)](https://getbootstrap.com)
[![WebP](https://img.shields.io/badge/Images-WebP%20Optimized-green)](https://www.eirandwild.co.uk)

## About

**Eir & Wild** offers specialized fitness, wellness, baby massage, and doula services tailored for women and mothers in Leicestershire (Mountsorrel, Rothley, and surrounding areas):
- **Motherhood Fitness Classes**: *The Strong Mummy Movement*, *Strong Women Squad*, *Strong Mums, Bums & Tums*, and *Mummy Me Time*.
- **Womanhood Fitness Classes**: *Dance & Tone*, *Strong & Stretched*, and *Monday Double* bundle.
- **Online HIIT Classes**: Live 30-minute cardio and strength workouts streamed on Zoom.
- **Baby Massage & Mummy Relaxation**: 4-week bonding, colic relief, and relaxation courses.
- **Personal Training**: 1-to-1 tailored pre/postnatal and female strength coaching (45-min & 60-min memberships).
- **Postnatal Doula Services**: Compassionate fourth-trimester care, newborn support, and birth debriefing.

Production URL: [www.eirandwild.co.uk](https://www.eirandwild.co.uk)

---

## Project Structure

```
eirandwild/
├── index.html                   # Homepage (Linktree-style responsive card grid)
├── aboutme.html                 # About Lara Bailey (Career, specialism, ethos)
├── ourstory.html                # Eir & Wild story & goddess philosophy
├── contact.html                 # Contact channels, WhatsApp, email & venues
├── faq.html                     # Categorized FAQ knowledge base (with Schema.org)
├── reviews.html                 # Google Reviews widget & testimonials
├── 404.html                     # Custom branded 404 error page
├── manifest.json                # PWA manifest
├── robots.txt                   # Web crawler directives
├── sitemap.xml                  # SEO XML sitemap with clean URLs
├── vercel.json                  # Vercel configuration (cleanUrls: true)
├── package.json                 # Node metadata and dependencies
│
├── api/                         # Vercel Serverless Functions
│   └── classes.js               # Fetches and filters real-time Bookwhen API events
│
├── leicester/                   # Service & Location-specific pages
│   ├── fitnessclasses/          # Fitness class pages
│   │   ├── motherhoodclasses.html # Pre/postnatal classes & schedule
│   │   ├── womanhoodclasses.html  # Women's dance, strength & stretch classes
│   │   └── hiit.html              # Online HIIT classes via Zoom
│   ├── babymassage/             # Baby massage course details & booking
│   │   └── babymassage.html
│   ├── personaltraining/        # 1:1 PT memberships, benefits & pricing
│   │   └── personaltraining.html
│   └── doula/                   # Postnatal doula support & hourly pricing
│       └── doula.html
│
├── css/                         # Modular scoped stylesheets
│   ├── global.css               # Site-wide base rules
│   ├── home.css                 # Homepage responsive grid layout
│   ├── classes.css              # Shared class card and button styling
│   ├── motherhood.css           # Motherhood classes scoped styling
│   ├── womanhood.css            # Womanhood classes scoped styling
│   ├── hiit.css                 # Online HIIT classes scoped styling
│   ├── babymassage.css          # Baby massage & mummy relaxation styling
│   ├── pt.css                   # Personal training memberships & pricing styling
│   ├── doula.css                # Doula services & care checklist styling
│   ├── about.css                # About & Story page styles
│   ├── contact.css              # Contact page 2-column portal styles
│   ├── faq.css                  # FAQ categorized layout & cards
│   ├── nav.css                  # Responsive dynamic navbar styles
│   └── coming-soon.css          # Maintenance/placeholder styles
│
├── js/                          # Client-side JavaScript
│   ├── nav.js                   # Dynamic multi-level navbar injector
│   └── classes.js               # Fetches /api/classes & renders Bookwhen booking buttons
│
├── images/                      # Optimized image assets (.webp preferred)
└── fonts/                       # Custom typography ('Moon Time' TTF)
```

---

## Technologies Used

- **HTML5**: Semantic, accessible markup across all 13 pages (`<main>`, `<article>`, `<header>`, `<address>`).
- **CSS3**: Scoped stylesheets utilizing CSS Grid, Flexbox, custom `@font-face` (*Moon Time*), and Google Fonts (*Montserrat*).
- **Bootstrap 5.3.3**: Modern UI grid framework (CDN, pure JavaScript, zero jQuery).
- **Font Awesome 6.5.1**: Scalable vector icons for actions, contact methods, and checkmarks.
- **WebP Optimization**: All photography and thumbnails compressed and sized with explicit `width`, `height`, `fetchpriority="high"`, and `loading="lazy"`.
- **Bookwhen API**: Vercel Serverless Function (`/api/classes.js`) fetching real-time schedule dates with client-side rendering and static fallback CTAs.
- **Analytics & Speed**: Vercel Speed Insights and Vercel Web Analytics (both cookieless).
- **SEO & PWA**: Clean URLs, Open Graph, Twitter Cards, Schema.org (`LocalBusiness`, `FAQPage`), and `manifest.json`.

---

## Local Development

### Prerequisites
- **Node.js**: v18+ recommended
- **npm**: Package manager

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dbailey323/eirandwild.git
   cd eirandwild
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run a local static server**:
   ```bash
   # Using npx serve
   npx serve .

   # Or using Python 3
   python -m http.server 8000
   ```
   Open `http://localhost:8000` (or the port indicated) in your browser.

4. **Testing with Serverless Functions (`/api/classes`)**:
   To test the live Bookwhen schedule integration locally, use the Vercel CLI with your API key:
   ```bash
   # Create a .env.local file:
   # BOOKWHEN_API_KEY=your_key_here

   npx vercel dev
   ```

5. **Build Verification**:
   ```bash
   npm run build
   ```

---

## Deployment & Hosting

The site is continuously deployed on [Vercel](https://vercel.com) from the `main` branch.

- **Production Domain**: [https://www.eirandwild.co.uk](https://www.eirandwild.co.uk)
- **Vercel Preview URL**: [https://eirandwild.vercel.app](https://eirandwild.vercel.app)
- **Configuration (`vercel.json`)**: Configured with `"cleanUrls": true` for clean routing without `.html` extensions.

---

## Key Features & Architectural Highlights

### 1. 100% Semantic HTML (No Text Trapped in Images)
Every single page that previously used static infographic banners (`personaltraining.html`, `doula.html`, `babymassage.html`, `motherhoodclasses.html`, `womanhoodclasses.html`, `hiit.html`) has been rebuilt with semantic HTML text, responsive cards, and clean typography. All offerings, benefits, and pricing are **100% crawlable by Google**.

### 2. Layout Stability & Performance (Zero Layout Shift)
- All `<img>` tags specify exact native `width` and `height` attributes matching their aspect ratio to eliminate Cumulative Layout Shift (CLS).
- Above-the-fold hero images use `fetchpriority="high"`, while below-the-fold cards and thumbnails use `loading="lazy"`.
- Migrated legacy PNGs and JPEGs to modern `.webp` format.

### 3. Dynamic Bookwhen Booking with Resilient Fallbacks
- Class cards feature containers named `#classDates{classId}`.
- Each container includes an accessible fallback link (`.fallback-booking-link`) pointing to the Bookwhen schedule (`https://bookwhen.com/eirandwild-motherhood` or `https://bookwhen.com/eirandwild-womanhood`).
- When live events load via `js/classes.js`, fallback links are automatically replaced with specific date buttons. If the API is offline or dates have passed, users still have an accessible way to book.

### 4. Responsiveness for Mobile & Desktop
- **Mobile First**: Clean, large touch-friendly thumbnails and centered vertical card stacks.
- **Desktop Enhanced**: Side-by-side card layouts with fixed thumbnail columns (`min-width: 270px`), generous details columns with `flex-wrap: nowrap`, and responsive grids on `index.html`.
- **Global Navbar**: Responsive link padding and hover transitions ensuring all 11 navigation items fit smoothly across 13" laptops through 4K displays.

---

## Recent Improvements (February – October 2026)

- ✅ **Complete Semantic HTML Rebuild**: Converted all static image banners across 6 class/service pages into accessible, crawlable HTML text.
- ✅ **WebP Asset Migration**: Converted all images (`Baby massage info`, `Doula services`, `PT`, `Dance & Tone`, `Monday double`, `HIIT`, `homepageheader`) to WebP using Sharp.
- ✅ **Clean URLs Sitewide**: Standardized canonical links and Open Graph tags without `.html` across all 12 pages.
- ✅ **Full Sitemap Coverage**: Updated `sitemap.xml` with clean URLs, current timestamps, and the missing online HIIT class page.
- ✅ **Desktop Responsiveness Polish**: Eliminated card text squashing, constrained desktop containers, and upgraded homepage into a responsive 2-column grid.
- ✅ **Interactive Action CTAs**: Added high-converting direct WhatsApp enquiry and pre-filled email buttons across all pages.
- ✅ **Brand UI Elevation**: Upgraded `aboutme.html`, `ourstory.html`, `contact.html`, and `faq.html` with Moon Time gold headings, navy cards, and structured layouts.
- ✅ **Custom 404 Page**: Added branded `404.html` with navigation and analytics.
- ✅ **Bootstrap 5.3.3 & Font Awesome 6.5.1**: Modernized UI dependencies with pure JavaScript and zero jQuery.

---

## Contact & Social Media

- **Website**: [www.eirandwild.co.uk](https://www.eirandwild.co.uk)
- **Email**: [hello@eirandwild.co.uk](mailto:hello@eirandwild.co.uk)
- **WhatsApp**: [+44 7885 899947](https://wa.me/447885899947)
- **Facebook**: [@EirandWildWellness](https://www.facebook.com/EirandWildWellness)
- **Instagram**: [@eirandwildwellness](https://www.instagram.com/eirandwildwellness/)
- **TikTok**: [@eirandwildwellness](https://www.tiktok.com/@eirandwildwellness)

---

*Built with ❤️ for mothers and women in Leicestershire.*
