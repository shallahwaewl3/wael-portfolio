# Codenza Next.js Portfolio Website

A complete responsive Next.js portfolio/agency landing page inspired by the provided dark neon-blue design.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Edit content

All page content is in:

```bash
app/page.jsx
```

Main styles are in:

```bash
app/globals.css
```

## Replace the hero photo

The current hero visual is CSS/SVG based. To use a real person image:

1. Add your image to `public/profile.png`.
2. In `app/page.jsx`, replace `<HeroPortrait />` with:

```jsx
<img className="hero-real-photo" src="/profile.png" alt="Profile" />
```
