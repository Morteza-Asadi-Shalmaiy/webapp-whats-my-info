# 🧾 Project Handoff Document — webapp-whats-my-info v2.0

---

## 🔹 Essential Context

### Project Purpose

A **professional, desktop-first web application** that displays user's public IP, geolocation, network details, and system information with a **full-screen interactive map background** and a **glassmorphic modal overlay** for data display.

---

### Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6)
* **APIs:**
  * `api.ipify.org` (IPv4)
  * `api64.ipify.org` (IPv6)
  * `ipwho.is` (IP metadata & geolocation)
* **Maps:** Google Maps Embed (free, no API key)
* **Target Platform:** Modern desktop browsers (Chrome, Edge, Firefox)
* **Mobile:** Placeholder only (custom mobile version planned for later)

*No backend, no database, no authentication required.*

---

### File Structure

```
webapp-whats-my-info/
└── index.html      # Single-file app (HTML + CSS + JS inline)
```

**Single HTML file architecture** - all styles and scripts embedded for portability.

---

### Credentials / Config Values

* ❌ No API keys required
* ❌ No secrets or tokens
* 🌐 All APIs are public, rate-limited, anonymous
* 🗺️ Google Maps Embed used without authentication

---

## 🔹 Technical Details

### Core Data Structures

All data stored in a single JavaScript object:

```javascript
const appData = {
  // Network
  ipv4: "83.172.159.181",
  ipv6: "2001:0db8:85a3::8a2e:0370:7334",
  isp: "Edis GmbH",
  asn: "AS9009",
  
  // Location
  city: "Copenhagen",
  region: "Capital Region",
  country: "Denmark",
  countryCode: "DK",
  latitude: 55.6761,
  longitude: 12.5683,
  timezone: "Europe/Copenhagen",
  
  // System
  os: "Windows",
  browser: "Chrome",
  device: "PC",
  screen: "1920×1080",
  language: "en-US",
  pixelRatio: 1,
  networkType: "4g"
};
```

---

### Key Functions (Grouped by Purpose)

#### 🌐 Network & IP Detection

```javascript
// Fetch IPv4
async function fetchIPv4()
// API: https://api.ipify.org?format=json
// Updates: #ipv4-display, appData.ipv4

// Fetch IPv6
async function fetchIPv6()
// API: https://api64.ipify.org?format=json
// Updates: #ipv6, appData.ipv6
```

---

#### 📍 Geolocation & Metadata

```javascript
async function fetchIPMetadata()
// API: https://ipwho.is/
// Updates: location, ISP, ASN, timezone, coordinates
// Also updates map URL with coordinates
```

---

#### 🖥 System Detection

```javascript
function detectOS()        // Returns: Windows, macOS, Linux, Android, iOS
function detectBrowser()   // Returns: Chrome, Firefox, Edge, Safari
function detectDevice()    // Returns: PC, Tablet, Mobile

function populateSystemInfo()
// Calls above + updates DOM with screen, language, pixel ratio, network type
```

---

#### 🎨 UI Interactions

```javascript
// Theme toggle
themeToggle.addEventListener('click', () => {...})
// Switches between light/dark, persists to localStorage

// Click-to-copy
document.querySelectorAll('.info-item').forEach(item => {...})
// Any info value can be clicked to copy to clipboard

// Modal control
infoToggle → opens #info-drawer + #info-backdrop
infoDrawerClose / infoBackdrop click → closes modal

// Refresh data
refreshBtn → re-runs init() to reload all data with spin animation
```

---

#### 📤 Export

```javascript
exportBtn.addEventListener('click', () => {...})
// Downloads appData as JSON file: my-info-{timestamp}.json
```

---

### Architecture Flow

```
[ Page Load ]
     ↓
[ init() executes ]
     ↓
[ Parallel API calls ]
   ├─ fetchIPv4()
   ├─ fetchIPv6()
   └─ fetchIPMetadata() ──→ Updates map URL
     ↓
[ populateSystemInfo() ]
     ↓
[ Auto-open info drawer ]
     ↓
[ User interactions enabled ]
   ├─ Click to copy
   ├─ Theme toggle
   ├─ Export JSON
   └─ Refresh data
```

---

### Database Schema

❌ Not applicable — fully client-side application.

---

## 🔹 Development Status

### ✅ Completed Features

* **v1.0 → v2.0 Complete Redesign:**
  * Full-screen Google Maps background with zoom to hide watermarks
  * Glassmorphic centered modal overlay for data display
  * Auto-open modal on first load
  * Click-to-copy on all data fields (no separate copy buttons)
  * Visual feedback on copy (green highlight + toast notification)
  * Improved dark mode with CSS filter for map
  * Prominent "Details" button (pill-shaped, blue, with text)
  * Refresh button to reload all data
  * Theme toggle (light/dark with localStorage persistence)
  * Export as JSON functionality
  * Mobile redirect (placeholder for future custom mobile version)
  
* **Data Collection:**
  * IPv4 & IPv6 detection
  * ISP, ASN, City, Region, Country
  * Latitude/Longitude (IP-based)
  * Timezone detection
  * OS, Browser, Device type
  * Screen resolution, language, pixel ratio, network type

---

### 🐛 Recent Bug Fixes

* **Issue:** Top control buttons (theme, export) not clickable when modal open
  * **Fix:** Adjusted z-index hierarchy: controls (6) > drawer (5) > backdrop (4)

* **Issue:** Double background (off-white square behind white modal)
  * **Fix:** Removed `.card` wrapper div inside `#info-drawer`, single glass effect only

* **Issue:** Map watermarks visible
  * **Fix:** Applied CSS zoom/crop with `transform: scale(1.15)` + negative positioning

* **Issue:** Modal sliding from bottom looked unpolished
  * **Fix:** Changed to center modal with fade + scale animation

* **Issue:** Users confused about which button opens info
  * **Fix:** Made info button pill-shaped with "Details" text and blue accent color

---

### ⚠️ Known Issues / Limitations

* **Map watermarks:** CSS hack crops them but violates Google Maps ToS
* **Location accuracy:** IP-based, typically city-level (not GPS)
* **IPv6 availability:** Not all networks support IPv6
* **Browser API support:**
  * `navigator.connection` not available in Firefox/Safari
  * Clipboard API requires HTTPS
* **Mobile experience:** Currently just a placeholder message
* **Map dark mode:** CSS filter inverts colors but not perfect (true dark mode requires API key)
* **Map interaction:** Zoomed/cropped map makes some controls less accessible
* **Rate limits:** APIs may throttle frequent refreshes

---

### 🚀 Next Tasks (Priority Order)

1. **Build custom mobile version** (separate layout for <768px)
2. **Implement Google Maps API with styled dark mode** (requires free API key)
3. **Add loading states** (spinners while fetching data)
4. **Add error handling UI** (what to show if APIs fail)
5. **Add IPv6 expand/compress toggle** (was in v1.0, removed in redesign)
6. **Add "Copy All" button** (export all data to clipboard at once)
7. **Add connection speed test** (optional feature)
8. **Improve accessibility** (ARIA labels, keyboard navigation)
9. **Add analytics/tracking** (optional, privacy-respecting)
10. **Consider Electron wrapper** for desktop app version

---

## 🔹 Critical Notes

### Platform-Specific Requirements

* **HTTPS required** for:
  * Clipboard API (copy functionality)
  * Geolocation API (if added)
  * Service Workers (if added)
* **CORS limitations:**
  * Cannot fetch from arbitrary domains
  * APIs used are CORS-enabled
* **Iframe restrictions:**
  * Cannot style/modify map inside iframe
  * Cannot extract elements from iframe to page
  * Map controls are fixed by Google

---

### Common Gotchas

1. **Theme not persisting?**
   * Check `localStorage.getItem('theme')` in console
   * Ensure `body` has `data-theme` attribute, not `html`

2. **Copy not working?**
   * Must be served over HTTPS (or localhost)
   * Check browser clipboard permissions

3. **Map not loading?**
   * Check browser console for CORS/CSP errors
   * Verify coordinates are valid numbers
   * Google Maps embed may be blocked by ad blockers

4. **Dark mode looks weird?**
   * CSS filter values in `[data-theme="dark"] #map-background`
   * Current values: `invert(0.9) hue-rotate(180deg) brightness(0.9) contrast(1.1)`
   * Adjust to taste

5. **Modal not centered?**
   * Check `#info-drawer` has `transform: translate(-50%, -50%)`
   * Verify `top: 50%; left: 50%;`

6. **APIs returning stale data?**
   * Hard refresh (Ctrl+Shift+R)
   * APIs may cache based on IP

7. **"Not available" showing for data?**
   * Check API response in Network tab
   * Verify API endpoints haven't changed
   * Some data (IPv6, network type) genuinely unavailable on some systems

---

### Debug Checklist

When something breaks:

* ❑ Open browser DevTools (F12)
* ❑ Check Console for JavaScript errors
* ❑ Check Network tab for failed API calls
* ❑ Verify `appData` object in console: `console.log(appData)`
* ❑ Test in incognito mode (rules out extension conflicts)
* ❑ Hard refresh to clear cache (Ctrl+Shift+R)
* ❑ Test on different browser
* ❑ Verify served over HTTPS or localhost
* ❑ Check if ad blocker is interfering
* ❑ Validate HTML (W3C validator)

---

### CSS Architecture Notes

**Z-index hierarchy:**
```
6 - .top-controls (always clickable)
5 - #info-drawer (modal content)
4 - #info-backdrop (dark overlay)
2 - (removed map masks)
1 - #map-background (iframe)
```

**Color scheme:**
```css
Light mode:
--glass-bg: rgba(255, 255, 255, 0.85)
--accent: #0078d4
--text-primary: #1a1a1a

Dark mode:
--glass-bg: rgba(30, 30, 30, 0.85)
--accent: #60cdff
--text-primary: #ffffff
```

**Responsive breakpoint:**
* Desktop: `min-width: 769px`
* Mobile: `max-width: 768px`

---

### API Rate Limits

* **api.ipify.org:** ~1000 requests/day per IP (soft limit)
* **ipwho.is:** 10,000 requests/month free tier
* **Google Maps Embed:** No hard limit, but excessive use may trigger abuse detection

**Best practice:** Don't refresh more than once per minute.

---

### Performance Notes

* Map iframe is heavy (~2-3MB load)
* Consider lazy loading map on slower connections
* All APIs are async/await, non-blocking
* No external CSS/JS libraries = fast load time

---

## 🧠 Code Snippets for Quick Reference

### Add new info field:

```html
<!-- In #info-drawer -->
<div class="info-item" data-value="new-field">
    <div class="info-label">New Field</div>
    <div class="info-value" id="new-field">Loading...</div>
</div>
```

```javascript
// In appropriate function
document.getElementById('new-field').textContent = value;
appData.newField = value;
```

---

### Change map provider:

```javascript
// In fetchIPMetadata(), replace:
const mapUrl = `https://www.google.com/maps?q=${data.latitude},${data.longitude}&output=embed&z=13`;

// With OpenStreetMap:
const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude-0.1},${data.latitude-0.1},${data.longitude+0.1},${data.latitude+0.1}&layer=mapnik&marker=${data.latitude},${data.longitude}`;
```

---

### Adjust map zoom level:

```css
#map-background {
    transform: scale(1.15); /* Change 1.15 to 1.2, 1.3, etc. */
    top: -10%; /* Adjust negative % to match scale */
    left: -10%;
    width: 120%; /* Adjust to match scale */
    height: 120%;
}
```

---

### Customize dark mode filter:

```css
[data-theme="dark"] #map-background {
    filter: invert(X) hue-rotate(Ydeg) brightness(Z) contrast(A) saturate(B);
}
/* Play with values:
   X: 0.9-0.95
   Y: 180-190
   Z: 0.7-0.9
   A: 1.1-1.3
   B: 0.6-1.0 */
```

---

## 📋 Session Resume Checklist

Before continuing development:

* ❑ Review "Next Tasks" section for priorities
* ❑ Check "Known Issues" for current limitations
* ❑ Test current build in browser
* ❑ Verify all APIs still working
* ❑ Check if any API endpoints changed
* ❑ Review latest browser compatibility
* ❑ Test dark mode appearance
* ❑ Verify mobile placeholder displays correctly

---

**End of Handoff Document**

*Last updated: Current session*
*Version: 2.0 (Complete Redesign)*
*Status: Production-ready for desktop, mobile placeholder only*

---

🎯 **Quick Start for New Session:**
1. Open `index.html` in browser
2. Test info modal, theme toggle, copy functionality
3. Review "Next Tasks" for what to build
4. Reference "Code Snippets" section for common edits
