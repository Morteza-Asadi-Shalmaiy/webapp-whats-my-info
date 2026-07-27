# What's My Info

A clean, single-file web app that shows your public IP, geolocation, and system details — with a full-screen map background and a glassmorphic info panel on the top.



🔗 **Live demo:** https://morteza-asadi-shalmaiy.github.io/webapp-whats-my-info

## Features

- 🌐 **Network info** — IPv4, IPv6, ISP, ASN
- 📍 **Location** — city, region, country, timezone, and coordinates, plotted on a full-screen embedded map
- 🖥 **System info** — OS, browser, device type, screen resolution, language, pixel ratio, network type
- 📋 **Click-to-copy** — click any field to copy its value, with visual feedback
- 🌓 **Light/dark theme** — toggle, persisted via `localStorage`
- 📤 **Export as JSON** — download all detected data as a timestamped file
- 🔄 **Refresh** — re-fetch everything on demand
- ⚡ **Zero backend** — no server, no database, no accounts, no API keys

## Tech stack

- HTML5, CSS3, vanilla JavaScript (ES6) — no frameworks, no build step
- [`api.ipify.org`](https://www.ipify.org/) for IPv4
- [`api64.ipify.org`](https://www.ipify.org/) for IPv6
- [`ipwho.is`](https://ipwho.is/) for geolocation and ISP/ASN metadata
- Google Maps Embed for the background map (no API key required)

## Getting started

This is a single static HTML file — no install, no build.

```bash
git clone https://github.com/Morteza-Asadi-Shalmaiy/webapp-whats-my-info.git
cd webapp-whats-my-info
```

Then just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

> **Note:** copy-to-clipboard requires HTTPS or `localhost` — it won't work if you open `index.html` directly via `file://`.

## Known limitations

- Location is IP-based (city-level accuracy), not GPS
- IPv6 isn't available on all networks
- `navigator.connection` (network type) isn't supported in Firefox/Safari
- Mobile is currently a placeholder — a dedicated mobile layout is planned
- Map dark mode uses a CSS filter rather than a native styled map (a real dark map requires a Google Maps API key)

## Roadmap

- [ ] Custom mobile layout (<768px)
- [ ] Styled dark-mode map via Google Maps API
- [ ] Loading states and error handling UI
- [ ] "Copy all" button
- [ ] Optional connection speed test
- [ ] Accessibility pass (ARIA labels, keyboard navigation)

## Privacy

Everything runs client-side in your browser. No data is sent to or stored on any server owned by this project — requests go directly from your browser to the public IP/geolocation APIs listed above.

## Credits / inspiration

- [whoer.net](https://whoer.net/)
- [Hotspot Shield – What Is My IP](https://www.hotspotshield.com/what-is-my-ip/)
- [whatismyipaddress.com](https://whatismyipaddress.com/)
- [UniteVPN App (Dribbble)](https://dribbble.com/shots/24523347-UniteVPN-APP-Dark-Version) — dark UI inspiration

## License

No license specified yet — consider adding one (e.g. MIT) if you want others to reuse this freely.

https://morteza-asadi-shalmaiy.github.io/webapp-whats-my-info
01 & 02- webapp-whats-my-info 

refrences :
https://whoer.net/#

https://www.hotspotshield.com/what-is-my-ip/

https://dribbble.com/shots/24523347-UniteVPN-APP-Dark-Version

https://whatismyipaddress.com/
