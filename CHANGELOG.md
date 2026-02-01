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

- **Google Tag Manager**: Analytics integration across all pages
  - Tracking code in `<head>`
  - Noscript fallback in `<body>`

- **Enhanced Meta Tags** (all pages):
  - Open Graph tags for Facebook/LinkedIn sharing
  - Twitter Card tags for Twitter sharing
  - Improved descriptions for SEO
  - Proper canonical URLs

- **PWA Manifest Link**: Added to all HTML pages

### Changed

#### index.html
- Improved page title: "Eir & Wild - Motherhood Fitness & Wellness Classes in Leicester"
- Changed `<section>` to semantic `<main>` tag for better accessibility
- Enhanced image alt text for better accessibility
- Added `rel="noopener noreferrer"` to all external links for security
- Removed jQuery dependency (Bootstrap 5 doesn't require it)

#### aboutme.html
- Improved page title: "About Lara Bailey - Eir & Wild Fitness Coach"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Changed section headings from `<h3>` to `<h2>`
- Wrapped content in semantic `<main>` and `<article>` tags
- Enhanced image alt text with more descriptive content
- Updated Bootstrap to v5.3.3 (from v5.0.0-beta2)

#### contact.html
- Improved page title: "Contact Eir & Wild - Get In Touch"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Wrapped content in semantic `<main>` tag
- Added semantic `<address>` tag for contact information
- Made email address clickable with `mailto:` link
- Fixed Font Awesome version to 6.5.1 with proper integrity hash
- Added proper `aria-label` attributes to social media links
- Added `rel="noopener noreferrer"` to external links
- Updated Bootstrap to v5.3.3

#### faq.html
- Improved page title: "FAQ - Pregnancy & Postnatal Fitness Questions | Eir & Wild"
- Changed `<h3>` to `<h1>` for main heading
- Changed `<h5>` question headings to `<h2>` for proper hierarchy
- Removed "Q:" and "A:" prefixes (heading structure makes this clear)
- Wrapped each FAQ in semantic `<article>` tags
- Wrapped entire content in semantic `<main>` tag
- Updated Bootstrap to v5.3.3

#### ourstory.html
- Improved page title: "Our Story - How Eir & Wild Was Born"
- Changed `<h3>` to `<h1>` for proper heading hierarchy
- Wrapped content in semantic `<main>` and `<article>` tags
- Updated Bootstrap to v5.3.3

### Removed

#### index.html
- Duplicate Bootstrap CSS link (was loading twice)
- jQuery dependency (not needed with Bootstrap 5)
- Old Bootstrap v5.0.0-beta2 script (replaced with v5.3.3)

#### All Pages
- Bootstrap v5.0.0-beta2 scripts replaced with v5.3.3
- Inconsistent Bootstrap versions across pages

### Fixed

- **Bootstrap Version Consistency**: All pages now use Bootstrap 5.3.3
- **Font Awesome Loading**: Proper version (6.5.1) with integrity hashes
- **Heading Hierarchy**: All pages now follow proper H1 > H2 > H3 structure
- **Semantic HTML**: Using `<main>`, `<article>`, `<address>` appropriately
- **Link Security**: External links now include `rel="noopener noreferrer"`

### Security

- Added Content Security Policy meta tag (index.html)
- Added `rel="noopener noreferrer"` to all external links
- Updated all dependencies to latest stable versions

### Performance

- Removed duplicate CSS loading
- Removed unnecessary jQuery dependency
- All scripts use `defer` or are placed at end of body
- Vercel Speed Insights and Analytics remain enabled

### SEO Improvements

- Enhanced page titles with keywords and location
- Added Open Graph meta tags for social media sharing
- Added Twitter Card meta tags
- Improved meta descriptions across all pages
- Better heading hierarchy for search engine crawling
- Semantic HTML5 elements for better content structure

### Accessibility Improvements

- Proper heading hierarchy (H1 > H2 > H3)
- Enhanced alt text on images
- Semantic HTML elements (`<main>`, `<article>`, `<address>`)
- ARIA labels on social media links
- Better link descriptions

## Rollback Information

**Original Branch**: `main`
**Last Main Commit**: `b5531a4f4a76546ddd78773e9fe8603e870e89d8`
**Feature Branch**: `feature/website-improvements-feb-2026`

To rollback these changes:
```bash
# Delete the feature branch
git branch -D feature/website-improvements-feb-2026

# Or reset main to previous commit (if already merged)
git reset --hard b5531a4f4a76546ddd78773e9fe8603e870e89d8
```

## Testing Checklist

- [ ] Test all pages load correctly
- [ ] Verify Bootstrap components work (navigation, etc.)
- [ ] Check responsive design on mobile devices
- [ ] Validate HTML with W3C validator
- [ ] Test external links open in new tabs
- [ ] Verify social media share previews
- [ ] Test PWA "Add to Home Screen" on mobile
- [ ] Check Google Tag Manager is firing correctly
- [ ] Verify Vercel Analytics and Speed Insights working
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

## Notes

- All changes maintain backward compatibility
- No breaking changes to existing functionality
- All original content preserved
- Design and styling unchanged
- Only HTML structure and meta tags modified