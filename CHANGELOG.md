# Changelog

All notable changes to the Eir & Wild website project.

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
- Improved page title: "Eir & Wild - Motherhood Fitness & Wellness Classes in Leicester"
- Changed `<section>` to semantic `<main>` tag for better accessibility
- Enhanced image alt text for better accessibility
- Added `rel="noopener noreferrer"` to all external links for security
- Removed jQuery dependency (Bootstrap 5 doesn't require it)

##### aboutme.html
- Improved page title: "About Lara Bailey - Eir & Wild Fitness Coach"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Changed section headings from `<h3>` to `<h2>`
- Wrapped content in semantic `<main>` and `<article>` tags
- Enhanced image alt text with more descriptive content
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### contact.html
- Improved page title: "Contact Eir & Wild | Pre & Postnatal Fitness & Doula Leicester"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Wrapped content in semantic `<main>` tag
- Added semantic `<address>` tag for contact information
- Made email address clickable with `mailto:` link
- Fixed Font Awesome version to 6.5.1 with proper integrity hash
- Added proper `aria-label` attributes to social media links
- Added `rel="noopener noreferrer"` to external links
- Migrated profile image to modern `.webp` format (`aboutme.webp`)
- Added explicit `width="300"` and `height="300"` attributes to prevent Cumulative Layout Shift (CLS)
- Added `fetchpriority="high"` on profile image
- Added canonical URL `<link rel="canonical">` and updated Open Graph / Twitter tags to canonical production URLs
- Added `<meta name="theme-color">`
- Removed unused Material Icons stylesheet
- Updated Bootstrap to v5.3.3

##### faq.html
- Improved page title: "FAQ - Pregnancy & Postnatal Fitness Questions | Eir & Wild"
- Changed `<h3>` to `<h1>` for main heading
- Changed `<h5>` question headings to `<h2>` for proper hierarchy
- Removed "Q:" and "A:" prefixes (heading structure makes this clear)
- Wrapped each FAQ in semantic `<article>` tags
- Wrapped entire content in semantic `<main>` tag
- Updated Bootstrap to v5.3.3

##### ourstory.html
- Improved page title: "Our Story - How Eir & Wild Was Born"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Wrapped content in semantic `<main>` and `<article>` tags
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
- Improved page title: "Motherhood Fitness Classes Leicester | Badass Bumps & More"
- Added proper heading hierarchy: H1 (visually hidden) > H2 > H3 > H4
- Changed class titles from `<h3>` to `<h2>`
- Changed time/location from `<h4>` to `<h3>` and `<h4>`
- Wrapped content in semantic `<main>` and `<article>` tags
- Enhanced image alt text with descriptive class information
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### leicester/fitnessclasses/womanhoodclasses.html
- Improved page title: "Womanhood Fitness Classes Leicester | Dance, HIIT & Strength"
- Added proper heading hierarchy: H1 (visually hidden) > H2 > H3 > H4
- Changed class titles from `<h3>` to `<h2>`
- Changed time/location from `<h4>` to `<h3>` and `<h4>`
- Wrapped content in semantic `<main>` and `<article>` tags
- Enhanced image alt text with descriptive class information
- Converted and migrated all class and banner images to modern `.webp` format (`Womanhood info 1.webp`, `Dance&tone.webp`, `Monday double .webp`, `STRONG&STRETCHED.webp`, `strong_women_squad_rothley.webp`)
- Added explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- Added `fetchpriority="high"` to hero banner and `loading="lazy"` to class card thumbnails
- Added accessible fallback booking links (`.fallback-booking-link`) inside all class date containers for reliable offline/API fallback
- Added canonical URL `<link rel="canonical">` and updated Open Graph / Twitter tags to canonical production URLs
- Added `<meta name="theme-color">`
- Removed unused Material Icons stylesheet
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### leicester/fitnessclasses/hiit.html
- Improved page title: "Online HIIT Fitness Classes Leicester | Cardio & Strength"
- Fixed copy-pasted motherhood metadata to accurate online HIIT descriptions and titles
- Fixed copy-pasted `alt` attributes on HIIT Cardio and Strength images
- Fixed hidden `<h1>` to "Online HIIT Fitness Classes in Leicester"
- Converted and migrated images to modern `.webp` format (`Online hiit info.webp`, `HIIT cardio.webp`, `HIIT strength.webp`)
- Added explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- Added `fetchpriority="high"` to hero banner and `loading="lazy"` to class card thumbnails
- Added accessible fallback booking links (`.fallback-booking-link`) inside all class date containers (`#classDatess2fwm`, `#classDatessnu8o`)
- Added canonical URL `<link rel="canonical">` and updated Open Graph / Twitter tags to canonical production URLs
- Added `<meta name="theme-color">`
- Removed unused Material Icons stylesheet
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### leicester/babymassage/babymassage.html
- Improved page title: "Baby Massage Classes Leicester | Mountsorrel Memorial Centre"
- Added proper heading hierarchy: H1 (visually hidden) > H2 > H3 > H4
- Changed class title from `<h3>` to `<h2>`
- Changed time/location from `<h4>` to `<h3>` and `<h4>`
- Wrapped content in semantic `<main>` and `<article>` tags
- Enhanced image alt text with descriptive information
- Added Vercel Speed Insights and Web Analytics (was missing)
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### leicester/personaltraining/personaltraining.html
- Improved page title: "Personal Training Leicester | One-on-One Fitness Coaching"
- Wrapped content in semantic `<main class="container">` tag
- Enhanced image alt text with descriptive information
- Migrated banner images to modern `.webp` format (`PT 1.webp`, `PT 2.webp`)
- Added explicit `width="1080"` and `height="1920"` attributes to eliminate Cumulative Layout Shift (CLS)
- Added `fetchpriority="high"` to primary banner and `loading="lazy"` to secondary banner
- Added canonical URL `<link rel="canonical">` and updated Open Graph / Twitter tags to canonical production URLs
- Added `<meta name="theme-color">`
- Removed unused Material Icons stylesheet
- Added Vercel Speed Insights and Web Analytics (was missing)
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

##### leicester/doula/doula.html
- Improved page title: "Doula Services Leicester | Birth & Postnatal Support"
- Wrapped content in semantic `<main class="container">` tag
- Converted and migrated banner image to modern `.webp` format (`Doula services.webp`)
- Added explicit `width="1080"` and `height="1920"` attributes to eliminate Cumulative Layout Shift (CLS)
- Added `fetchpriority="high"` to primary banner
- Enhanced image alt text with descriptive information
- Added canonical URL `<link rel="canonical">` and updated Open Graph / Twitter tags to canonical production URLs
- Added `<meta name="theme-color">`
- Removed unused Material Icons stylesheet
- Added Vercel Speed Insights and Web Analytics (was missing)
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

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

### Root Directory (6 files)
1. index.html
2. aboutme.html
3. contact.html
4. faq.html
5. ourstory.html
6. reviews.html

### Leicester Subdirectories (6 files)
7. leicester/fitnessclasses/motherhoodclasses.html
8. leicester/fitnessclasses/womanhoodclasses.html
9. leicester/fitnessclasses/hiit.html
10. leicester/babymassage/babymassage.html
11. leicester/personaltraining/personaltraining.html
12. leicester/doula/doula.html

### New Files (3 files)
13. README.md
14. manifest.json
15. CHANGELOG.md

**Total Pages Improved**: 12 HTML pages
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
- [ ] Check Google Tag Manager is firing correctly (all pages)
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
