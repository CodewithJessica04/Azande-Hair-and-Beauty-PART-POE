# Azande-Hair-and-Beauty-PART-POE
# Azande Hair & Beauty

Professional hair braiding studio website for **Azande Hair & Beauty** in Sandton, with selected house calls in Durban (Berea).

**Live site:** [https://azandehairandbeauty.co.za/](https://azandehairandbeauty.co.za/)

---

## Overview

Static multi-page site for a braiding salon specialising in:

- Lemonade braids, cornrows, freehand, straight-up, and pondo styles (women)
- Men’s cornrows, straight-back, box, afro, and design braids
- Studio appointments in Sandton
- House calls in Durban’s Berea area (transport fee applies)

Booking and contact flows open **WhatsApp** with a pre-filled message. Appointments are confirmed only after Azande replies.

---

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, featured styles, features, Instagram |
| Hairstyles | `hairstyles.html` | Full style list + prices (Women / Men tabs) |
| Book | `book-appointment.html` | Appointment request form → WhatsApp |
| About | `about.html` | About Azande Madlala and studio approach |
| FAQ | `faq.html` | Common questions (accordion) |
| Rules | `rules.html` | Salon policies (prep, cancel, pricing, house calls) |
| Contact | `contact.html` | Phone, WhatsApp, email, map, message form |
| 404 | `404.html` | Not-found page |

Shared assets:

- `css/style.css` — layout, theme, responsive styles
- `js/main.js` — navigation, FAQ, tabs, forms, WhatsApp helpers

Images are expected under `images/` (logo, style photos, about photo).

---

## Features

- Responsive layout (desktop / tablet / mobile)
- Gold–black–white brand theme
- Mobile hamburger navigation
- Hairstyle category tabs (Women / Men)
- FAQ accordion with keyboard support
- Booking & contact forms that open WhatsApp with structured text
- South African phone number validation (client-side)
- SEO meta tags, Open Graph, Twitter cards, JSON-LD
- Skip link and basic ARIA for accessibility
- Sticky header with scroll state

---

## Tech stack

- HTML5
- CSS3 (no preprocessor required)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter, Playfair Display)
- Material Icons
- WhatsApp Click-to-Chat (`wa.me`)

---

## Local development

1. Clone or download the repository.
2. Serve the site root with any static server, for example:

   ```bash
   # Python
   python -m http.server 8080

   # Changelog

All notable changes to the Azande Hair & Beauty website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-02

### Added
- Multi-page static website for Azande Hair & Beauty (Sandton braiding studio)
- Home page (`index.html`) with hero, featured styles, why-choose section, and Instagram CTA
- Hairstyles page (`hairstyles.html`) with Women’s and Men’s braid categories and prices
- Booking page (`book-appointment.html`) with form that opens a pre-filled WhatsApp message
- About page (`about.html`) featuring Azande Madlala and studio approach
- FAQ page (`faq.html`) with accessible accordion
- Salon Rules & Policies page (`rules.html`)
- Contact page (`contact.html`) with phone, WhatsApp, email, house-call info, and embedded map
- Custom 404 page (`404.html`)
- Shared stylesheet (`css/style.css`) — gold / black / white theme, responsive layout
- Shared behaviour script (`js/main.js`) — mobile nav, FAQ accordion, hairstyle tabs, form → WhatsApp flow, toasts, phone validation
- SEO: titles, meta descriptions, canonical URLs, Open Graph, Twitter cards, JSON-LD (BeautySalon, WebSite, WebPage, breadcrumbs)
- Accessibility: skip link, ARIA on nav/tabs/FAQ, focus styles, semantic headings
- Structured contact details: Sandton studio address, WhatsApp (+27 61 496 4840), email
- House-call support messaging for Durban (Berea) with transport fee note
- Darling product partner banner on home page

### Changed
- N/A (initial public release)

### Fixed
- N/A (initial public release)

### Security
- External links use `rel="noopener noreferrer"` where appropriate
- Form handling is client-side only (no server-side storage of personal data)

---

## [Unreleased]

### Planned
- Optional image optimisation / WebP variants for hairstyle photos
- Optional analytics (privacy-friendly)
- Optional online payment deposit flow (if required later)

- # References

Sources and standards used in building and documenting this site.

## Design & content
- Business: Azande Hair & Beauty — https://azandehairandbeauty.co.za/
- Instagram: [@azande_braids](https://www.instagram.com/azande_braids/)
- Contact: +27 61 496 4840 · azande@hairbeauty.co.za
- Studio: 2 Sandown Valley Crescent, Sandton, Gauteng, South Africa
- House calls: Berea area, Durban (transport fee applies)

## Web standards & best practice
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [Schema.org](https://schema.org/) — BeautySalon, WebSite, WebPage, BreadcrumbList, AboutPage, ContactPage
- [Open Graph protocol](https://ogp.me/)
- [Twitter / X Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) — skip links, labels, ARIA where needed
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

## Fonts & icons
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts — Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Material Icons](https://fonts.google.com/icons)

## Tools / libraries
- No framework dependency — vanilla HTML, CSS, and JavaScript
- WhatsApp Click-to-Chat: https://wa.me/

## Third-party embeds
- Google Maps embed for studio location (contact page)

   # Node (if you have npx)
   npx serve .
