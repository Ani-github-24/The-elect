# The Elect

A Progressive Web App (PWA) built for **Challenge 2: Election Assistant** — empowering voters with accessible, offline-capable tools for voter preparation, education, and civic engagement.

---

## Chosen Vertical

**Challenge 2 — Election Assistant.**

The Elect is an interactive election readiness platform designed to help first-time and underserved voters navigate the voting process with confidence. It provides ID requirement lookup, polling location discovery, a virtual voting simulator, and multilingual accessibility — all within an installable, offline-first Progressive Web App.

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
| Assistant Integration  | Android App Actions via `shortcuts.xml`       |

### Offline-First Service Worker

The custom Service Worker (`public/sw.js`) implements a **stale-while-revalidate** caching strategy:

- **translations.json and API endpoints**: Served instantly from cache, then silently refreshed in the background. Updated content appears on the next reload.
- **CSS and static JS bundles**: Cached on first load using a cache-first strategy for instant rendering.
- **Cache versioning**: Old caches are automatically purged on Service Worker activation.

### Zero-Dependency State Management

Global language state is managed entirely through React Context (`LanguageContext`), eliminating the need for Redux, Zustand, or any external state library. Language toggling between English, Spanish, and Hindi is instantaneous with no page reload.

---

## How the Solution Works

### Multi-Step Virtual Voting Simulator (`/sim`)

A state-driven wizard form that walks users through a mock voting experience:

1. **Step 1** — Select a candidate from a list of mock options.
2. **Step 2** — Vote Yes/No on a City Measure (with a `?` tooltip explaining what a "Measure" is in plain language).
3. **Step 3** — Review all selections before submitting.

The entire flow is keyboard-navigable and uses semantic HTML radio inputs for accessibility.

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

### Voice Assistant Mapping (Google Assistant)

The Elect implements **URL-based deep linking** for Google Assistant voice commands:

| Voice Command                             | Route        | Component              |
| ----------------------------------------- | ------------ | ---------------------- |
| "Hey Google, open The Elect Simulation"   | `/sim`       | Virtual Voting Sim     |
| "Hey Google, open The Elect ID Check"     | `/id-check`  | Voter Prep Dashboard   |

The intent mapping is defined in `public/shortcuts.xml`, following the Android App Actions `shortcuts.xml` schema. Each shortcut binds a `capability` (`actions.intent.OPEN_APP_FEATURE`) to a specific deep link URL.

### Google Maps Polling Location Integration

The Voter Prep Dashboard includes a dedicated "Find Polling Location" component with:

- A text input for address entry.
- A placeholder `<div>` designed to accept a Google Maps embed or the Google Civic Information API.
- The component is architecturally ready — swapping the placeholder for a live `@react-google-maps/api` embed or a `<iframe>` Google Maps embed requires only an API key and minimal code changes.

### Text-to-Speech Accessibility

The global "Read Aloud" button in the navigation bar uses the browser's native **SpeechSynthesis API**. It selectively reads only elements marked with `data-read-aloud="true"` — targeting headings, descriptions, and instructional text while skipping buttons, labels, and navigation controls.

The language hint is automatically set based on the current i18n selection (`en-US`, `es-ES`, or `hi-IN`).

---

## Assumptions Made

1. **Device Speech Synthesis Support**: We assume the user's browser supports the Web Speech API (`SpeechSynthesis`). This is available in all modern browsers (Chrome, Edge, Safari, Firefox). A graceful fallback alert is shown if unsupported.

2. **Initial Connectivity for Caching**: The Service Worker requires an initial online page load to populate its cache. After the first visit, the app functions fully offline.

3. **Mock Data for ID Requirements**: State-specific ID requirements use hardcoded mock data for California, Texas, and New York. In production, this would be replaced by a live API (e.g., Google Civic Information API).

4. **Google Maps API Key**: The polling location map is intentionally a placeholder. A valid Google Maps API key is required to activate the live map embed, which was omitted to avoid key exposure in a public repository.

5. **Android TWA for Assistant**: The `shortcuts.xml` file assumes the PWA will be wrapped in a Trusted Web Activity (TWA) for distribution on Android. The deep link URLs map to the PWA's routes and will function as-is when the app is installed via Chrome's "Add to Home Screen".

---

## Getting Started

```bash
cd voter-quest
npm install
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
