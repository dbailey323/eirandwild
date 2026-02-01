# Eir & Wild Website

> Fitness and wellness services for mothers in Leicester

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://eirandwild.vercel.app)

## About

Eir & Wild offers a range of fitness and wellness services designed specifically for mothers, including:
- Motherhood fitness classes
- Womanhood classes
- Baby massage
- Personal training
- Doula services
- One-off classes and workshops

Live site: [eirandwild.vercel.app](https://eirandwild.vercel.app)

## Project Structure

```
eirandwild/
├── css/                    # Stylesheets
│   ├── home.css           # Homepage styles
│   ├── about.css          # About page styles
│   ├── classes.css        # Class pages styles
│   ├── contact.css        # Contact page styles
│   ├── faq.css            # FAQ page styles
│   └── nav.css            # Navigation styles
├── js/                     # JavaScript files
│   └── fetch-bookwhen.js  # Fetches class schedules from BookWhen API
├── images/                 # Image assets
├── fonts/                  # Custom fonts
├── leicester/              # Leicester-specific content
│   ├── fitnessclasses/    # Fitness class pages
│   ├── babymassage/       # Baby massage information
│   ├── personaltraining/  # Personal training details
│   └── doula/             # Doula services
├── index.html              # Homepage
├── aboutme.html            # About page
├── ourstory.html           # Story page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── reviews.html            # Reviews page
├── sitemap.xml             # SEO sitemap
└── robots.txt              # Search engine directives
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Styling and responsive design
- **Bootstrap 5.3.3** - UI framework (no jQuery required)
- **Font Awesome 6.5.1** - Icons
- **Google Tag Manager** - Analytics
- **Vercel** - Hosting and deployment
- **BookWhen API** - Class schedule integration

## Local Development

### Prerequisites
- Node.js (for build scripts)
- A modern web browser

### Setup

1. Clone the repository:
```bash
git clone https://github.com/dbailey323/eirandwild.git
cd eirandwild
```

2. Install dependencies (if any):
```bash
npm install
```

3. Run the build script (fetches latest class data):
```bash
npm run prebuild
```

4. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

5. Visit `http://localhost:8000` in your browser

## Build Process

The build process includes:
1. **Prebuild**: Runs `js/fetch-bookwhen.js` to fetch the latest class schedules from the BookWhen API
2. **Build**: Confirms static site build completion

```bash
npm run build
```

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the `main` branch.

- **Production URL**: https://eirandwild.vercel.app
- **Platform**: Vercel
- **Auto-deploy**: Enabled on main branch

### Manual Deployment

To deploy manually:
```bash
vercel --prod
```

## Features

- ✅ Fully responsive design
- ✅ SEO optimized with meta tags and sitemap
- ✅ Social media integration (Facebook, Instagram, TikTok)
- ✅ Google Tag Manager for analytics
- ✅ Dynamic class schedule integration via BookWhen API
- ✅ Vercel Speed Insights and Web Analytics
- ✅ Content Security Policy for enhanced security
- ✅ Open Graph and Twitter Card meta tags for social sharing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Vercel Speed Insights enabled
- Optimized image loading
- Minimal JavaScript dependencies
- Bootstrap 5 (no jQuery)

## SEO

- Semantic HTML5 structure
- Descriptive meta tags
- Open Graph tags for social sharing
- XML sitemap (`sitemap.xml`)
- Robots.txt configured
- Descriptive alt text on all images

## Contributing

This is a private project. For any suggestions or issues, please contact the repository owner.

## Recent Improvements (February 2026)

- ✅ Removed duplicate Bootstrap CSS loading
- ✅ Added Font Awesome library for icons
- ✅ Improved SEO with enhanced meta tags
- ✅ Added Open Graph and Twitter Card meta tags
- ✅ Implemented Content Security Policy
- ✅ Enhanced accessibility with better alt text
- ✅ Removed jQuery dependency (Bootstrap 5 doesn't require it)
- ✅ Added security attributes to external links
- ✅ Improved page title for SEO
- ✅ Changed generic `<section>` to semantic `<main>` tag

## License

Private - All rights reserved

## Contact

For inquiries about Eir & Wild services:
- Website: [eirandwild.vercel.app](https://eirandwild.vercel.app)
- Facebook: [@EirandWildWellness](https://www.facebook.com/EirandWildWellness)
- Instagram: [@EirandWildWellness](https://www.instagram.com/EirandWildWellness/)
- TikTok: [@fitnesswithlara](https://www.tiktok.com/@fitnesswithlara)

---

**Built with ❤️ for mothers in Leicester**