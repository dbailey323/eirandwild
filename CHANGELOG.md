# Changelog

All notable changes to the Eir & Wild website project.

## October 2026: site redesign

### Changed
- **New design on every page**, keeping the same URLs, page titles and descriptions: sticky navy header with dropdown menus, shared footer, one stylesheet (`css/site.css`) and inline SVG icons. Bootstrap and Font Awesome are no longer used.
- **Homepage** rebuilt around Lara: hero with her photo, "find your class" paths, a live "coming up" list from Bookwhen, why Eir & Wild, meet Lara, venues and FAQs.
- **Class pages** show each class's day, time, venue, dates and spaces left live from Bookwhen, with a Bookwhen link as a fallback.
- **Classes are matched to Bookwhen by name** (`js/class-config.js`), so a new course or term appears automatically even when Bookwhen gives it a new reference.
- **Logo** redrawn as a crisp SVG; cut-out photos now have transparent backgrounds.
- FAQ page now has a page title, and its structured data matches the visible answers.

### Removed
- Per-page stylesheets, `js/nav.js`, `js/classes.js`, `js/timetable.js`, and class poster images that had days and times baked in.

## October 2026

### Removed
- **Google Tag Manager** (`GTM-5SXDV4CQ`) from all pages: the container had no tags, so it only added a request. Analytics is covered by cookieless Vercel Web Analytics and Speed Insights, so no cookie consent banner is needed.

## [Unreleased] - February 2026 Website Improvements

### Added
- **README.md**: Comprehensive project documentation including:
  - Project structure overview
  - Local development setup instructions
  - Build process documentation
  - Deployment information
  - Technologies used listing
  - Browser support details
  - Performance and SEO information
  
- **manifest.json**: Progressive Web App (PWA) support
  - Enables "Add to Home Screen" on mobile devices
  - Configured app icons and theme colors
  - Improves mobile user experience

- **CHANGELOG.md**: This file to track all changes

- **Google Tag Manager**: Analytics integration across all pages (11 total pages)
  - Tracking code in `<head>`
  - Noscript fallback in `<body>`

- **Enhanced Meta Tags** (all 11 pages):
  - Open Graph tags for Facebook/LinkedIn sharing
  - Twitter Card tags for Twitter sharing
  - Improved descriptions for SEO
  - Proper canonical URLs

- **PWA Manifest Link**: Added to all HTML pages

- **Vercel Analytics**: Added to Leicester subdirectory pages that were missing it

### Changed

#### Root Directory Pages

##### index.html
- Deployed Smart Hybrid studio portal layout organizing Lara's custom artwork cards into 3 intuitive categories (Group Fitness & Movement, 1:1 Coaching & Maternal Care, About & Community)
- Added top Trust & Location bar featuring Mountsorrel & Rothley, Leicestershire location and Google 5.0 Star Rating link
- Added dynamic Announcement Banner linking directly to upcoming course registrations
- Added discrete floating WhatsApp quick-chat button in the bottom-right corner
- Upgraded cards into responsive 2-column and 3-column desktop grids while retaining the full-width single-column feed on mobile
- Included Schema.org HealthClub structured data and updated Open Graph / Twitter tags
- Removed jQuery dependency and updated Bootstrap to v5.3.3

##### aboutme.html
- Rebuilt UI to match the new brand design system with Moon Time hero typography and gold accents
- Structured content into an accessible 2-column experience grid (Fitness Career, Pre/Postnatal, Supporting Motherhood, Empathy & Inclusivity)
- Framed high-resolution portrait (`Me wings.webp`) in an elevated portrait card
- Added interactive bottom CTA card with direct WhatsApp, Email, and class exploring buttons
- Added Font Awesome 6.5.1 for action icons
- Updated Bootstrap to v5.3.3

##### contact.html
- Rebuilt UI into a modern, 2-column contact portal
- Left column: Lara's portrait in an accent-bordered avatar, warm welcome note, and interactive social media channels
- Right column: Clean contact cards for WhatsApp direct chat, direct email, and Mountsorrel/Rothley venue locations
- Added bottom FAQ quick-reference cross-link card
- Added Font Awesome 6.5.1 and updated Bootstrap to v5.3.3

##### faq.html
- Rebuilt UI from a plain vertical list into an organized, categorized FAQ knowledge base
- Added brand Hero card with Moon Time typography and supportive lead paragraph
- Grouped 12 questions into 3 distinct logical categories (Pregnancy & Prenatal, Postnatal Recovery & Little Ones, Baby Massage & Doula Support)
- Added interactive "Still Have Questions?" CTA card with direct WhatsApp and Email contact buttons
- Preserved Schema.org FAQPage structured data and updated Bootstrap to v5.3.3

##### ourstory.html
- Rebuilt UI into an elevated storytelling layout matching the brand aesthetic
- Added brand Hero card featuring the white emblem logo and the core tagline: "Awaken your power. Nurture your journey."
- Structured values into a 2-column grid covering the Norse Goddess origins of Eir, the untamed spirit of Wild, and our Zero Body Judgment ethos
- Added interactive bottom CTA card with direct WhatsApp, Email, and class exploration buttons
- Updated Bootstrap to v5.3.3

##### reviews.html
- Improved page title: "Client Reviews & Testimonials | Eir & Wild Leicester"
- Added Google Tag Manager tracking scripts (`GTM-5SXDV4CQ`) in `<head>` and `<body>` (was missing)
- Added semantic `<main class="container">` container and visually hidden `<h1>` for accessibility and SEO
- Added Open Graph and Twitter Card social meta tags with `Reviews.webp` preview image
- Added canonical URL `<link rel="canonical" href="https://www.eirandwild.co.uk/reviews">`
- Added `<meta name="theme-color">`
- Added PWA `<link rel="manifest" href="manifest.json">`
- Removed unused Material Icons stylesheet
- Moved deferred script tags to the end of the `<body>`

#### Leicester Subdirectory Pages

##### leicester/fitnessclasses/motherhoodclasses.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/motherhood.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and high-resolution featured photograph (`Motherhood.webp`)
- Transcribed all 4 motherhood class offerings (The Strong Mummy Movement, Strong Women Squad, Strong Mums Bums & Tums, Mummy Me Time) into a responsive 2x2 grid
- Created 3 informational cards for course details (When to join, What classes are like, Venues & Free parking)
- Added dedicated Mummy Me Time schedule card (`Mummy me time.webp` thumbnail) alongside Strong Mummy Movement, Strong Women Squad, and Bums & Tums
- Integrated live Bookwhen schedule cards with accessible fallback booking links
- Added direct interactive WhatsApp enquiry and Email consultation action buttons
- Enhanced SEO heading hierarchy (H1 > H2 > H3 > H4) and crawlable keywords for Leicester pre/postnatal fitness
- Added Font Awesome 6.5.1 for crisp action and icon accents
- Added canonical URL `<link rel="canonical" href="https://www.eirandwild.co.uk/leicester/fitnessclasses/motherhoodclasses">`
- Added `<meta name="theme-color" content="#8b7355">`
- Updated Open Graph and Twitter tags to point to canonical production URLs and `.webp` assets
- Added Vercel Speed Insights and Web Analytics

##### leicester/fitnessclasses/womanhoodclasses.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/womanhood.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and high-resolution featured photograph (`Womanhood.webp`)
- Transcribed all 3 womanhood class offerings (Dance & Tone, Strong & Stretched, Monday Double bundle) into a responsive 3-column card grid
- Preserved and enhanced live Bookwhen schedule cards for Dance & Tone, Monday Double, Strong & Stretched, and Strong Women Squad
- Added direct interactive WhatsApp enquiry and Email consultation action buttons
- Enhanced SEO heading hierarchy (H1 > H2 > H3 > H4) and crawlable keywords for Leicester women's fitness
- Added Font Awesome 6.5.1 for crisp action and icon accents
- Added canonical URL `<link rel="canonical" href="https://www.eirandwild.co.uk/leicester/fitnessclasses/womanhoodclasses">`
- Added `<meta name="theme-color" content="#8b7355">`
- Updated Open Graph and Twitter tags to point to canonical production URLs and `.webp` assets
- Added Vercel Speed Insights and Web Analytics

##### leicester/fitnessclasses/hiit.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/hiit.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and high-resolution featured photograph (`Online hiit.webp`)
- Transcribed all online HIIT offerings (HIIT Cardio, HIIT Strength, and household screen guidelines) into a responsive 3-column card grid
- Integrated live Bookwhen Zoom schedule cards with accessible fallback booking links
- Added direct interactive WhatsApp enquiry and Email consultation action buttons
- Enhanced SEO heading hierarchy (H1 > H2 > H3 > H4) and crawlable keywords for online HIIT fitness
- Added Font Awesome 6.5.1 for crisp action and icon accents
- Added canonical URL `<link rel="canonical" href="https://www.eirandwild.co.uk/leicester/fitnessclasses/hiit">`
- Added `<meta name="theme-color" content="#8b7355">`
- Updated Open Graph and Twitter tags to point to canonical production URLs and `.webp` assets
- Added Vercel Speed Insights and Web Analytics

##### leicester/babymassage/babymassage.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/babymassage.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and high-resolution featured imagery (`Baby Massage.webp`)
- Transcribed all 4 core baby massage benefits (Bonding, Natural Pain Relief, Brain Stimulation, Relaxation & Sleep) into an accessible responsive 2x2 grid
- Created 3 informational cards for course details (When to join, What to bring, Venue & Free parking)
- Enhanced live Bookwhen schedule integration card with dual-term fallback booking links
- Added direct interactive WhatsApp enquiry and Email consultation action buttons
- Enhanced SEO heading hierarchy (H1 > H2 > H3 > H4) and crawlable keywords for Leicester baby massage
- Added Font Awesome 6.5.1 for crisp action and icon accents
- Added canonical URL `<link rel="canonical">` and production Open Graph / Twitter tags
- Added `<meta name="theme-color">`
- Added Vercel Speed Insights and Web Analytics

##### leicester/personaltraining/personaltraining.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/pt.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and a 3-photo showcase gallery
- Transcribed all 8 core PT membership benefits into a responsive 2-column checklist
- Created side-by-side interactive pricing cards for 45-minute (£95/mo) and 60-minute (£110/mo) memberships
- Added direct interactive WhatsApp enquiry and Email consultation buttons
- Enhanced SEO heading hierarchy (H1 > H2 > H3) and crawlable keywords for Leicester personal training
- Added Font Awesome 6.5.1 for crisp action and feature icons
- Added canonical URL `<link rel="canonical">` and production Open Graph / Twitter tags
- Added `<meta name="theme-color">`
- Added Vercel Speed Insights and Web Analytics

##### leicester/doula/doula.html
- Rebuilt entire page from static image graphics into fully responsive, SEO-crawlable semantic HTML
- Added dedicated scoped stylesheet `css/doula.css` with responsive layout and brand palette
- Added rich Hero card featuring Moon Time typography and featured doula support imagery (`Doula.webp`)
- Transcribed postnatal doula support inclusions into an accessible 4-point care checklist (birth debriefing, newborn care, light household help, feeding support)
- Created transparent pricing card displaying £30/hour rate with direct WhatsApp enquiry CTA
- Added compassionate, dedicated card for birth doula status transparency
- Added interactive direct enquiry card with WhatsApp, Email, and Contact page CTAs
- Corrected typographical error from original image graphic ("extremely limite" -> "extremely limited")
- Added Font Awesome 6.5.1 for action and checkmark icons
- Added canonical URL `<link rel="canonical">` and production Open Graph / Twitter tags
- Added `<meta name="theme-color">`
- Added Vercel Speed Insights and Web Analytics

### Removed

#### index.html
- Duplicate Bootstrap CSS link (was loading twice)
- jQuery dependency (not needed with Bootstrap 5)
- Old Bootstrap v5.0.0-beta2 script (replaced with v5.3.3)

#### All Pages (11 total)
- Bootstrap v5.0.0-beta2 scripts replaced with v5.3.3
- Inconsistent Bootstrap versions across pages

### Fixed

- **Bootstrap Version Consistency**: All 11 pages now use Bootstrap 5.3.3
- **Font Awesome Loading**: Proper version (6.5.1) with integrity hashes
- **Heading Hierarchy**: All pages now follow proper H1 > H2 > H3 > H4 structure
- **Semantic HTML**: Using `<main>`, `<article>`, `<address>` appropriately
- **Link Security**: External links now include `rel="noopener noreferrer"`
- **Missing Analytics**: Added Vercel analytics to Leicester pages that were missing it

### Security

- Added Content Security Policy meta tag (index.html)
- Added `rel="noopener noreferrer"` to all external links
- Updated all dependencies to latest stable versions (Bootstrap 5.3.3)

### Desktop Responsiveness Improvements

- **Infographic Banners (`css/classes.css`)**: Preserved full natural scaling (`max-width: 100%; height: auto;`) across all banner containers without artificial desktop height/width limits, ensuring all embedded text, timetables, and infographic copy remain large, sharp, and easy to read on both desktop and mobile.
- **Class Cards Desktop Alignment (`css/classes.css`)**: Left-aligned class card text, titles, locations, and booking buttons next to thumbnails on screens >= 768px, with `max-width: 1000px` card container constraints and enhanced button hover feedback.
- **Navbar Layout & Micro-interactions (`css/nav.css`)**: Added polished background styling (`#ffffff` with subtle border and shadow), responsive link padding across desktop resolutions, smooth hover transitions with gold accent, and a styled dropdown container for the mobile collapse menu.
- **Homepage Responsive Grid (`index.html` & `css/home.css`)**: Upgraded homepage navigation cards into an engaging 2-column responsive grid on desktop and tablet screens while preserving the full-width single-column feed on mobile. Removed the 600px limitation so images fill the screen naturally with generous, balanced proportions instead of collapsing into a narrow central strip. Purged over 150 lines of obsolete `<section>` countdown rules.

### Performance

- Removed duplicate CSS loading
- Removed unnecessary jQuery dependency
- All scripts use `defer` or are placed at end of body
- Vercel Speed Insights and Analytics enabled on all pages

### SEO Improvements

- Enhanced page titles with keywords and location (Leicester)
- Added Open Graph meta tags for social media sharing (all 11 pages)
- Added Twitter Card meta tags (all 11 pages)
- Improved meta descriptions across all pages
- Better heading hierarchy for search engine crawling
- Semantic HTML5 elements for better content structure
- Location-specific keywords in titles and descriptions

### Accessibility Improvements

- Proper heading hierarchy (H1 > H2 > H3 > H4)
- Enhanced alt text on images with descriptive content
- Semantic HTML elements (`<main>`, `<article>`, `<address>`)
- ARIA labels on social media links (contact page)
- Better link descriptions
- Visually hidden H1 headings on pages with banner images

## Complete List of Updated Files

### Root Directory (7 files)
1. index.html
2. aboutme.html
3. contact.html
4. faq.html
5. ourstory.html
6. reviews.html
7. 404.html

### Leicester Subdirectories (6 files)
8. leicester/fitnessclasses/motherhoodclasses.html
9. leicester/fitnessclasses/womanhoodclasses.html
10. leicester/fitnessclasses/hiit.html
11. leicester/babymassage/babymassage.html
12. leicester/personaltraining/personaltraining.html
13. leicester/doula/doula.html

### New Files (4 files)
14. 404.html
15. README.md
16. manifest.json
17. CHANGELOG.md

**Total Pages Improved**: 13 HTML pages (12 site pages + 404.html)
**Total Files Added**: 3 new documentation files
**Total Commits**: 7 commits

## Rollback Information

**Original Branch**: `main`
**Last Main Commit**: `b5531a4f4a76546ddd78773e9fe8603e870e89d8`
**Feature Branch**: `feature/website-improvements-feb-2026`
**Latest Feature Commit**: `4cad9c9383f9ac2e05d032c71103f970654e197c`

To rollback these changes:
```bash
# Delete the feature branch
git branch -D feature/website-improvements-feb-2026

# Or reset main to previous commit (if already merged)
git reset --hard b5531a4f4a76546ddd78773e9fe8603e870e89d8
```

## Testing Checklist

### Functionality
- [ ] Test all 11 pages load correctly
- [ ] Verify Bootstrap components work (navigation, etc.)
- [ ] Check responsive design on mobile devices
- [ ] Test all internal links work correctly
- [ ] Test external links open in new tabs
- [ ] Verify class schedule dynamically loads (js/classes.js)

### SEO & Meta Tags
- [ ] Validate HTML with W3C validator (all 11 pages)
- [ ] Verify social media share previews (Open Graph)
- [ ] Test Twitter Card previews
- [ ] Check page titles display correctly in browser tabs
- [ ] Verify meta descriptions are appropriate length

### Analytics & Performance
- [ ] Verify Vercel Analytics working (all pages)
- [ ] Verify Vercel Speed Insights working (all pages)
- [ ] Test page load speeds

### PWA & Mobile
- [ ] Test PWA "Add to Home Screen" on mobile
- [ ] Verify manifest.json loads correctly
- [ ] Test app icons display properly
- [ ] Check mobile responsiveness

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Commit History

1. `027e664` - Improve index.html - Remove duplicates, add meta tags, semantic HTML
2. `61647da` - Add comprehensive README documentation
3. `5270a6e` - Add PWA manifest for installable web app
4. `bb29561` - Improve aboutme.html and contact.html
5. `ae8240a` - Improve faq.html and ourstory.html
6. `7b9de3c` - Improve Leicester fitness class pages (3 files)
7. `4cad9c9` - Improve personal training and doula pages
8. `208aff1` - Add CHANGELOG documenting all improvements (updated)

## Notes

- All changes maintain backward compatibility
- No breaking changes to existing functionality
- All original content preserved
- Design and styling unchanged
- Only HTML structure and meta tags modified
- JavaScript functionality remains unchanged
- CSS stylesheets not modified
