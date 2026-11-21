# Outside Platforms Used: ClearpathUI Website

Every outside service, tool and content source used to build or run www.clearpathui.com.
Update this file whenever a platform is added, changed or removed.

Last updated: 2026-11-21

## Summary

| Platform | What it does for the site | Plan / cost | Account | Status |
|---|---|---|---|---|
| Base44 | Stores quote requests (your lead list) | Free | Your Base44 account | Live |
| Web3Forms | Emails each quote request to info@clearpathui.com | Free | Key created with info@clearpathui.com | Live, verified 2026-11-21 |
| Unsplash | 7 stock photos | Free (Unsplash License) | None needed | Linked from Unsplash; save local copies before launch |
| Google Fonts | Website fonts | Free | None needed | Live |
| GoDaddy | Domain name and DNS for clearpathui.com | Your existing plan | Your GoDaddy account | Domain owned; site not connected yet |
| Microsoft 365 (through GoDaddy) | info@clearpathui.com mailbox | Your existing plan | Your Microsoft 365 / GoDaddy account | Live |
| GitHub | Stores the website code and its history | Free | Clearpathpages | Private repo, `main` branch |
| Netlify | Hosts the website, deploys automatically from GitHub, free HTTPS | Free (Starter) | Your Netlify account | Setting up 2026-11-21 |

## Details

### Base44 (backend for the quote form)
- **Used for:** saving every quote request so you have a list of leads with a status (new, contacted, quoted, won, closed).
- **App:** "ClearpathUI", app ID `6b01a63f4beacd839e245e55`
- **Editor (view leads here):** https://app.base44.com/apps/6b01a63f4beacd839e245e55/editor/preview
- **Data table:** `QuoteRequest`. Visitors can add records; only you (admin) can read, change or delete them.
- **Settings changed:** app published and set to "public without login" so the form can save to it. This also puts an empty starter page at https://clearpath-ui-9e245e55.base44.app.
- **Plan limits:** free plan. Workflows, backend functions and direct code editing need the paid Builder plan.
- **Where in the code:** `main.js` (`BASE44_APP_ID`, `BASE44_ENDPOINT`).

### Web3Forms (email alerts)
- **Used for:** emailing each new quote request to info@clearpathui.com. Reply goes straight to the customer.
- **Website:** https://web3forms.com
- **Access key:** in `main.js` (`WEB3FORMS_KEY`). It's meant to be public and can only send to the email it was created for.
- **Notes:** test emails with a fake `example.com` reply-to address didn't arrive; a plain test did. Use a real address when testing.
- **Why it's used:** Base44's free plan can't send email alerts.

### Unsplash (stock photos)
- **Used for:** all photos on the site.
- **License:** Unsplash License: free for commercial use, credit not required.
- **Currently:** loaded directly from Unsplash's servers. Download and save local copies in the site folder before launch.

| Where on site | Photo | Image link |
|---|---|---|
| Home: hero | Smiling small-business owner at her laptop | https://images.unsplash.com/photo-1753164597612-5e71b83fda91 |
| Home: Web design card | Website and mobile layouts on a large monitor | https://images.unsplash.com/photo-1541462608143-67571c6738dd |
| Home: Website upgrades card | Website on a laptop and a phone | https://images.unsplash.com/photo-1690192698934-e2ecab89335f |
| Home: Google Business Profile card | Google Maps on a phone | https://images.unsplash.com/photo-1548345680-f5475ea5df84 |
| Home: Basic SEO card | Google Search Console chart | https://images.unsplash.com/photo-1625296276703-3fbc924f07b5 |
| Home: Why us | Person on a video call with a tablet | https://images.unsplash.com/photo-1612831455359-970e23a1e4e9 |
| Quote page: sidebar | Business owner working at her laptop | https://images.unsplash.com/photo-1758611974712-4b19a8675d9f |

### Google Fonts
- **Used for:** Bricolage Grotesque (headings), Instrument Serif italic (accent words), Inter (body text).
- **Where in the code:** font link in the `<head>` of `index.html` and `quote.html`.
- **License:** free, open-source fonts.

### GoDaddy (domain and DNS)
- **Used for:** owning clearpathui.com and its DNS records. Nameservers stay at GoDaddy (ns25/ns26.domaincontrol.com).
- **Before Netlify:** `A @` was "Parked" (GoDaddy parking page) and `CNAME www` pointed to `@`.
- **On launch day:** change only the website records (`A` and `www`). Leave the email records (`MX`, `TXT`) alone.

### Microsoft 365 through GoDaddy (email)
- **Used for:** the info@clearpathui.com mailbox that receives the quote alerts.
- **Mail server:** `clearpathui-com.mail.protection.outlook.com`
- **Tip:** if an alert goes missing, check the quarantine at https://security.microsoft.com/quarantine.

### GitHub (code storage)
- **Used for:** storing the website files and their change history.
- **Repository:** https://github.com/Clearpathpages/clearpathui-website (private, `main` branch)
- **Account:** Clearpathpages
- **Not uploaded:** `CLAUDE.md` (local working notes), listed in `.gitignore`.
- **Note:** a private repo can't use free GitHub Pages hosting. Netlify or similar can host from a private repo.

### Netlify (website hosting)
- **Used for:** putting the site online at www.clearpathui.com. Every push to `main` on GitHub redeploys the site automatically. Free HTTPS certificate (Let's Encrypt).
- **Settings in code:** `netlify.toml` (no build step, publish the repo root, security headers, blocks public access to PLATFORMS.md / README.md, `/quote` short link). `404.html` is the not-found page.
- **Domain setup:** `www.clearpathui.com` is the primary address; `clearpathui.com` redirects to it.
- **GoDaddy DNS records for Netlify:** `A @ 75.2.60.5` (Netlify load balancer) and `CNAME www incredible-clafoutis-375d89.netlify.app`.
- **Netlify site:** incredible-clafoutis-375d89 (https://incredible-clafoutis-375d89.netlify.app), owned by your Netlify account (GitHub login), deploys from `main`. First deploy 2026-11-21.

## Used during design only (not part of the live site)

| Platform | Use |
|---|---|
| expertoenseo.online | Style reference for layout, blue colors and photo style. Nothing was copied from it. |
| Unsplash search | Finding the stock photos above. |
| Python's built-in web server | Previewing the site on this computer (`python -m http.server 4174`). |
| Claude Code (Anthropic) | AI assistant that built and tested the site. |
