# PRODUCT SPECIFICATION

**Bring A Traylor — Landing Page & Lead Generation**
Version 1.2 | February 2026

---

## 1. Overview

Bring A Traylor is a family-owned mechanic service operated by Reid Traylor in the Woodstock/Marietta, Georgia area. Reid offers mobile and shop-based automotive repair with a reputation for honest, no-pressure service. He also helps customers find quality used vehicles.

This spec defines a single-page landing website that serves as the digital front door for the business, converting visitors into leads via two primary paths: requesting mechanical help or requesting help finding a car.

| Attribute       | Detail                                           |
| --------------- | ------------------------------------------------ |
| Business Name   | Bring A Traylor                                  |
| Owner           | Reid Traylor                                     |
| Location        | 301 Hickory Ridge Trail, Woodstock, GA 30188     |
| Service Areas   | Woodstock, GA · Marietta, GA                     |
| Phone           | (470) 239-0020                                   |
| Email           | traylormotorsports@gmail.com                     |
| WhatsApp        | +1 (404) 904-2180                                |
| Website Domain  | bringatraylor.com                                |
| Facebook        | Bring A Traylor (Facebook Page with Messenger)   |
| Social Proof    | 100% recommended (5 reviews), $ pricing tier     |

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals

1. **Lead Generation:** Convert website visitors into qualified leads (repair requests or car-finding requests) delivered to Reid via email.
2. **Accessibility:** Provide multiple contact channels (form, WhatsApp, Messenger, phone) so customers can reach Reid however they prefer.
3. **Credibility:** Establish a professional online presence that reinforces trust and Reid's reputation for honest service.

### 2.2 Success Metrics

- Form submissions per week (target: establish baseline in first 30 days)
- CTA click-through rate
- Mobile vs. desktop usage split (expect 70%+ mobile)
- Page load time under 2 seconds

---

## 3. User Personas

- **Car owner with a problem:** Needs repair, found Reid via Facebook/Instagram or word of mouth, wants to quickly describe the issue and get a callback.
- **Car shopper on a budget:** Looking for a quality used vehicle, wants honest help without dealership pressure.

---

## 4. Information Architecture

The entire application is a single-page layout with no navigation. All sections are vertically stacked and optimized for mobile consumption.

### 4.1 Sections (Top to Bottom)

1. **Hero** — Logo, tagline, two CTA buttons ("I Need a Repair" / "Help Me Find a Car")
2. **CTA Cards** — Two cards linking to the form sections below with icons and descriptions
3. **Repair Request Form** — Issue category dropdown, name, phone, details textarea
4. **Car Finder Form** — Budget range dropdown, name, phone, preferences textarea
5. **Story Banner** — "Meet Reid & Brianda" with shop and family photos, story copy, social proof
6. **Footer** — Call/WhatsApp/Messenger buttons, logo, address, copyright

---

## 5. Feature Specifications

### 5.1 Repair Request Form

**Issue Category Options:**
- Brakes (pads, rotors, calipers)
- Electrical (alternator, starter, battery, charging)
- Check engine light / diagnostics
- Suspension & steering noise
- Cooling system (overheating, leaks, hoses)
- No-start / not running
- Other

**Fields:** Name (required), Phone (required), Issue category (required), Details (optional)

### 5.2 Car Finder Form

**Budget Range Options:**
- Under $5,000
- $5,000 – $10,000
- Over $10,000
- Not sure / flexible

**Fields:** Name (required), Phone (required), Budget range (required), Preferences (optional)

### 5.3 Form Behavior

- **On submit:** Display a confirmation message ("Thanks! Reid will be in touch soon.")
- **Email delivery:** Send to traylormotorsports@gmail.com with all form data
- **Email subject:** "New Repair Request from [Customer Name]" or "New Car Finder Request from [Customer Name]"
- **Validation:** Basic client-side validation on required fields
- **Rate limiting:** Server-side rate limiting (3 requests/minute per IP) to prevent spam
- **Success state:** Shows green confirmation card with option to submit another request
- **Error state:** Inline error message suggesting to try again or call directly

### 5.4 Contact Channels

Appear as buttons in the footer:
- **Phone:** tel: link to (470) 239-0020
- **WhatsApp:** Deep link to +1 (404) 904-2180
- **Messenger:** Link to m.me/BringATraylor

---

## 6. Design Specifications

### 6.1 Color Palette

Derived from shop brand (blue from lift/post, photography):

| Token              | Value     | Usage                        |
| ------------------ | --------- | ---------------------------- |
| `brand-blue`       | `#1e3a5f` | Primary brand, hero bg, CTAs |
| `brand-blue-light` | `#2a4f7f` | Hover states                 |
| `brand-gold`       | `#d4a843` | Accent (available)           |
| `brand-dark`       | `#1a1a1a` | Footer background            |

### 6.2 Typography

- **Headings:** Inter, sans-serif, bold/extrabold
- **Body:** Inter, regular
- **Fallback stack:** -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif

### 6.3 Layout Principles

- **Mobile-first:** Single column on mobile, two-column grids on md+ breakpoints
- **Traffic source:** Optimized for Facebook/Instagram link traffic
- **Clean/minimal:** Generous whitespace, rounded corners (xl), subtle shadows
- **Fast:** Images lazy-loaded, minimal JS bundle, target <2s on 4G
- **Approachable:** Warm, friendly tone, neighborhood feel

---

## 7. Technical Specifications

### 7.1 Stack

- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS 3.4
- **Hosting:** Vercel
- **Email:** Resend API

### 7.2 API Route: `/api/send-lead`

Vercel serverless function that handles both form types:
- Accepts POST with JSON body
- Calls Resend API (from: `onboarding@resend.dev`, reply-to: `traylormotorsports@gmail.com`)
- Returns success/error JSON response
- Rate limited: 3 requests/minute per IP

### 7.3 Environment Variables

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `RESEND_API_KEY`  | Resend API key (stored in Vercel)   |

### 7.4 File Structure

```
batraylor/
├── api/
│   └── send-lead.js              # Vercel serverless function
├── src/
│   ├── assets/
│   │   ├── logo.png              # Cropped, transparent background
│   │   ├── reid-in-shop.jpg      # Reid in shop with car lift
│   │   └── reid-brianda.jpg      # Reid and Brianda selfie
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── CTACards.jsx
│   │   ├── RepairForm.jsx
│   │   ├── CarFinderForm.jsx
│   │   ├── StoryBanner.jsx
│   │   └── Footer.jsx
│   ├── App.jsx                   # Main layout component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind directives
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .env.example
└── .gitignore
```

---

## 8. Future Features (Out of Scope for V1)

These are not included in the initial build but may be added later:

- Google Sheet lead logging
- Custom domain / DNS setup (bringatraylor.com)
- SMS via Twilio when a lead comes in
- Testimonials / review carousel
- Appointment scheduling
- SEO optimization (meta tags, structured data)
- Completed work photo gallery
- Analytics / traffic dashboards
- A/B testing on CTA copy

---

## 9. Changelog

| Version | Date       | Changes                                                                 |
| ------- | ---------- | ----------------------------------------------------------------------- |
| 1.0     | 2026-02-17 | Initial spec (.pages format)                                            |
| 1.1     | 2026-02-17 | Revised draft (.pages format)                                           |
| 1.2     | 2026-02-17 | Converted to markdown. Updated to reflect built implementation:         |
|         |            | — Entry point is `main.jsx` (not `main.js`)                             |
|         |            | — Added "Over $10,000" budget option                                    |
|         |            | — Documented actual component names and file structure                   |
|         |            | — Added rate limiting details (3 req/min per IP)                        |
|         |            | — Added form success/error state behavior                               |
|         |            | — Documented color token values and Tailwind config                     |
|         |            | — Added logo processing note (cropped, transparent PNG from JPG source) |
|         |            | — Added `vercel.json`, `.env.example`, `.gitignore` to file structure   |
