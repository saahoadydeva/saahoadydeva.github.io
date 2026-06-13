# KIRA.DEV — Cyberpunk Anime Portfolio

A full anime-cyberpunk themed personal portfolio website.

## Structure
```
portfolio/
├── index.html          → Landing page with glitch hero + stats
├── about.html          → Character profile, timeline, interests
├── projects.html       → Project showcase with category filter
├── skills.html         → Skill bars, tech icons, certifications
├── gallery.html        → Masonry gallery with lightbox
├── contact.html        → Contact form + communication channels
│
├── assets/
│   ├── css/
│   │   ├── style.css       → Core layout, nav, buttons, cursor
│   │   ├── animations.css  → Glitch, pulse, float, typing effects
│   │   └── cyberpunk.css   → Themed components (cards, bars, HUD)
│   ├── js/
│   │   ├── main.js         → Cursor, nav, fade-in, typing effect
│   │   ├── particles.js    → Canvas particle + connection system
│   │   └── transitions.js  → Page slide transitions
│   ├── images/             → Add your images here
│   └── audio/              → Optional ambient audio
```

## Customizing

### Change your name/info
Edit `index.html` hero section and replace:
- `ARJUN SHARMA` → your name
- The tagline in `data-type="..."` attribute
- Stats numbers
- `KIRA.DEV` in nav → your domain

### Add your profile photo
Place `profile.jpg` in `assets/images/` and in `about.html` replace:
```html
<div class="profile-avatar-placeholder">AS</div>
```
with:
```html
<img class="profile-avatar" src="assets/images/profile.jpg" alt="Your Name" />
```

### Add project images
Replace `project-card-img-placeholder` divs with:
```html
<img class="project-card-img" src="assets/images/your-project.jpg" alt="Project Name" />
```

### Add gallery images
Replace `gallery-placeholder-art` divs with actual `<img>` tags.

### Color theming
All theme colors are CSS variables in `style.css`:
```css
--neon-cyan: #00f5ff;     /* Primary accent */
--neon-magenta: #ff00aa;  /* Secondary accent */
--neon-yellow: #ffee00;   /* Highlight */
--neon-green: #39ff14;    /* Status / success */
--dark-bg: #050810;       /* Page background */
```

### Contact form
The form now supports backend email delivery through a Cloudflare Pages function using the Brevo email API.

To deploy to Cloudflare Pages:
1. Add the following environment variables to your Pages project:
   - `BREVO_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
2. Deploy the site to Cloudflare Pages.

For local development, you can still use the Node server if you want. To run locally:
```bash
npm install
npm start
```
Then open `http://localhost:3000`.

If you want to use local Node only, keep `server.js` and the older SMTP workflow; otherwise Cloudflare Pages will use the function in `functions/api/contact.js`.

## Features
- ✅ Custom neon cursor with lag effect
- ✅ Canvas particle system with connections
- ✅ Glitch text animation on hero name
- ✅ Typing effect with cursor blink
- ✅ Scroll-triggered fade-in animations
- ✅ Animated skill bars (fill on scroll)
- ✅ Project category filter
- ✅ Gallery with masonry layout + lightbox
- ✅ Page transition overlay
- ✅ Nav auto-hide on scroll
- ✅ Mobile responsive + hamburger menu
- ✅ Reduced motion respected
- ✅ Scanline CRT overlay
- ✅ Grid background in hero
