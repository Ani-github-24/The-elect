# The Elect

A Progressive Web App (PWA) built for **Challenge 2: Election Assistant** — empowering voters with accessible, offline-capable tools for voter preparation, education, and civic engagement.

---

## Chosen Vertical

**Challenge 2 — Election Assistant.**

The Elect is an interactive election readiness platform designed to help first-time and underserved voters navigate the voting process with confidence. It provides ID requirement lookup, polling location discovery, a virtual voting simulator, an AI-powered election education chatbot, and multilingual accessibility — all within an installable, offline-first Progressive Web App.

---

## Approach and Logic

### Architecture

The Elect is built on **Next.js (App Router)** with **TypeScript** and **Tailwind CSS**, following a zero-external-dependency state management philosophy.

| Layer                  | Technology                                    |
| ---------------------- | --------------------------------------------- |
| Framework              | Next.js 16 (App Router)                       |
| Language               | TypeScript                                    |
| Styling                | Tailwind CSS (WCAG AAA high-contrast theme)   |
| State Management       | React Context API (zero dependencies)         |
| Internationalization   | Custom i18n via `translations.json`           |
| Offline Support        | Service Worker with stale-while-revalidate    |
| Accessibility          | SpeechSynthesis API, keyboard navigation      |
| AI Assistant           | Google Gemini API (election education)        |
| Assistant Integration  | Android App Actions via `shortcuts.xml`       |

### Offline-First Service Worker

The custom Service Worker (`public/sw.js`) implements a **stale-while-revalidate** caching strategy:

- **translations.json and API endpoints**: Served instantly from cache, then silently refreshed in the background. Updated content appears on the next reload.
- **CSS and static JS bundles**: Cached on first load using a cache-first strategy for instant rendering.
- **Cache versioning**: Old caches are automatically purged on Service Worker activation.

### Zero-Dependency State Management

Global language state is managed entirely through React Context (`LanguageContext`), eliminating the need for Redux, Zustand, or any external state library. Language toggling between English, Spanish, and Hindi is instantaneous with no page reload.

### Security

Security headers are configured in `next.config.ts` for all routes:

- `X-Content-Type-Options: nosniff` — Prevents MIME-type sniffing
- `X-Frame-Options: DENY` — Prevents clickjacking
- `Referrer-Policy: strict-origin-when-cross-origin` — Controls referrer information
- `Permissions-Policy` — Restricts camera, microphone, and geolocation access
- API input sanitization with length limits on the `/api/chat` endpoint
- All API keys stored in `.env.local` (gitignored, never committed)

---

## How the Solution Works

### Multi-Step Virtual Voting Simulator (`/sim`)

A state-driven wizard form that walks users through a mock voting experience:

1. **Step 1** — Select a candidate from a list of mock options.
2. **Step 2** — Vote Yes/No on a City Measure (with a `?` tooltip explaining what a "Measure" is in plain language).
3. **Step 3** — Review all selections before submitting.

The entire flow is keyboard-navigable and uses semantic HTML radio inputs for accessibility.

### AI Election Education Chatbot (Google Gemini)

A floating chatbot widget available on every page, powered by the **Google Gemini API**:

- Users can ask plain-language questions about voting, elections, registration, and civic engagement.
- The AI is constrained by a system prompt to only respond to election-related topics, ensuring safe and responsible use.
- Graceful fallback messaging when no API key is configured.

### Internationalization (i18n)

All user-facing text on the landing page is sourced from `src/i18n/translations.json`. The language dropdown in the navbar dynamically switches between:

- **English (en)**
- **Spanish (es)**
- **Hindi (hi)**

Text updates are instantaneous — no page reload, no server round-trip.

### Voter Prep Dashboard (`/id-check`)

- **State Selection Dropdown**: Users select their state/region. The UI dynamically renders a list of acceptable Government IDs based on mock data for California, Texas, and New York.
- **"Remind Me" Button**: Triggers a browser `alert()` listing the required IDs for the selected state (designed as a placeholder for future push notification integration).
- **Polling Location Finder**: Accepts a mock address input and displays a "Map Loading..." placeholder ready for Google Maps API integration.

### Impact Slider ("Power of One")

An interactive range slider representing voter turnout percentage. As the slider moves, a visual bar chart dynamically updates to show how a 1% shift changes a theoretical local election outcome — illustrating the tangible impact of individual voter participation.

---

## Google Services Integration

### Google Gemini API — Election Education Chatbot

The Elect integrates the **Google Gemini API** (`gemini-2.0-flash` model) to provide a real-time, AI-powered election education assistant:

- **API Route**: `src/app/api/chat/route.ts` — A Next.js server-side API route that proxies user questions to the Gemini API with a constrained system prompt.
- **Security**: User input is sanitized (trimmed, length-limited to 500 characters). The API key is stored server-side in `.env.local` and never exposed to the client.
- **Fallback**: If no API key is configured, the chatbot displays a helpful setup message instead of crashing.

### Voice Assistant Mapping (Google Assistant)

The Elect implements **URL-based deep linking** for Google Assistant voice commands:

| Voice Command                             | Route        | Component              |
| ----------------------------------------- | ------------ | ---------------------- |
| "Hey Google, open The Elect Simulation"   | `/sim`       | Virtual Voting Sim     |
| "Hey Google, open The Elect ID Check"     | `/id-check`  | Voter Prep Dashboard   |

The intent mapping is defined in `public/shortcuts.xml`, following the Android App Actions `shortcuts.xml` schema.

### Google Maps Polling Location Integration

The Voter Prep Dashboard includes a dedicated "Find Polling Location" component with:

- A text input for address entry.
- A placeholder `<div>` designed to accept a Google Maps embed or the Google Civic Information API.
- The component is architecturally ready — swapping the placeholder for a live Google Maps embed requires only an API key.

### Text-to-Speech Accessibility

The global "Read Aloud" button in the navigation bar uses the browser's native **SpeechSynthesis API**. It selectively reads only elements marked with `data-read-aloud="true"` — targeting headings, descriptions, and instructional text while skipping buttons, labels, and navigation controls.

---

## Assumptions Made

1. **Device Speech Synthesis Support**: We assume the user's browser supports the Web Speech API (`SpeechSynthesis`). A graceful fallback alert is shown if unsupported.

2. **Initial Connectivity for Caching**: The Service Worker requires an initial online page load to populate its cache. After the first visit, the app functions fully offline.

3. **Mock Data for ID Requirements**: State-specific ID requirements use hardcoded mock data for California, Texas, and New York. In production, this would be replaced by a live API.

4. **Google Maps API Key**: The polling location map is intentionally a placeholder to avoid key exposure in a public repository.

5. **Gemini API Key**: The chatbot requires a valid Google Gemini API key in `.env.local`. Without it, the chatbot displays a setup prompt instead of crashing.

---

## Getting Started

```bash
cd the-elect
npm install
```

### Configure the Gemini API Key

1. Get a free API key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Paste your key into `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Running Tests

```bash
npx jest --verbose
```

### Building for Production

```bash
npm run build
npm start
```
