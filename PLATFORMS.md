# Outside Platforms Used: ClearpathUI Website

Every outside service, tool and content source used to build or run www.clearpathui.com.
Update this file whenever a platform is added, changed or removed.

Last updated: 2026-11-21 (site launched)

## Summary

| Platform | What it does for the site | Plan / cost | Account | Status |
|---|---|---|---|---|
| Base44 | Stores quote requests (your lead list) | Free | Your Base44 account | Live |
| Web3Forms | Emails each quote request to info@clearpathui.com | Free | Key created with info@clearpathui.com | Live, verified 2026-11-21 |
| Unsplash | 7 stock photos | Free (Unsplash License) | None needed | Linked from Unsplash; save local copies before launch |
| Square | Online payments (Make a payment page) | Square's processing fees per payment | Your Square account | Live link added 2026-11-22 |
| Google Search Console | Gets the site into Google search and shows search performance | Free | Your Google account | Verified 2026-11-22 (domain property) |
| Google Fonts | Website fonts | Free | None needed | Live |
| GoDaddy | Domain name and DNS for clearpathui.com | Your existing plan | Your GoDaddy account | Points to Netlify (`www` record still to update) |
| Microsoft 365 (through GoDaddy) | info@clearpathui.com mailbox | Your existing plan | Your Microsoft 365 / GoDaddy account | Live |
| GitHub | Stores the website code and its history | Free | Clearpathpages | Private repo, `main` branch |
| Netlify | Hosts the website, deploys automatically from GitHub, free HTTPS | Free (Starter) | Your Netlify account (GitHub login) | Live at https://www.clearpathui.com since 2026-11-21 |

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

### Square (online payments)
- **Used for:** the "Make a payment" page (`pay.html`), linked from every page's footer. Clients enter the amount from their invoice or quote on Square's secure checkout; card details never touch this site.
- **Payment link:** https://square.link/u/Lofytb1T (customer enters the amount). Checkout shows the business as "ClearpathUI.com".
- **Where in the code:** `SQUARE_PAYMENT_URL` near the bottom of `pay.html`. The button only accepts square.link / square.site / squareup.com addresses; anything else shows a call-or-email message instead.
- **Retired:** an earlier test link (`square.link/u/3iP1cghY`) charged a fixed $1.00 and was not used. You can delete it in Square.
- **Cost:** Square charges a processing fee per payment; see your Square account for current rates.

### Google Search Console (search visibility)
- **Used for:** telling Google about the site, submitting the sitemap, and seeing which searches show ClearpathUI.
- **Property:** `clearpathui.com` as a Domain property (covers www, non-www, http and https).
- **Verification:** TXT record `google-site-verification=...` at GoDaddy, added 2026-11-22. Don't delete it, or Search Console loses access.
- **Sitemap:** https://www.clearpathui.com/sitemap.xml (also listed in robots.txt).
- **Google Business Profile:** not used. Google's guidelines require in-person contact with customers, and ClearpathUI is fully remote. Revisit if in-person meetings are ever offered.

### Google Fonts
- **Used for:** Bricolage Grotesque (headings), Instrument Serif italic (accent words), Inter (body text).
- **Where in the code:** font link in the `<head>` of `index.html` and `quote.html`.
- **License:** free, open-source fonts.

### GoDaddy (domain and DNS)
- **Used for:** owning clearpathui.com and its DNS records. Nameservers stay at GoDaddy (ns25/ns26.domaincontrol.com).
- **TXT records:** two for Microsoft 365 email (`v=spf1 ...` and `NETORGFT21331223.onmicrosoft.com`) plus Google's `google-site-verification` for Search Console. Never edit the email ones.
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
- **Domain setup:** `www.clearpathui.com` is the primary address; `clearpathui.com` and all `http://` links redirect to `https://www.clearpathui.com`.
- **HTTPS:** Let's Encrypt certificate for clearpathui.com and www.clearpathui.com, issued 2026-11-21, renewed automatically by Netlify.
- **Launch check (2026-11-21):** pages, photos, 404 page, hidden docs and a live quote test (saved to Base44 and emailed via Web3Forms) all passed.
- **Note:** Netlify shows a small "Powered by Netlify" badge on the site; it comes from Netlify, not the site code.
- **GoDaddy DNS records for Netlify:** `A @ 75.2.60.5` (Netlify load balancer, done) and `CNAME www incredible-clafoutis-375d89.netlify.app` (to do: as of launch it still points to `@`, which works but isn't Netlify's recommended setup).
- **Netlify site:** incredible-clafoutis-375d89 (https://incredible-clafoutis-375d89.netlify.app), owned by your Netlify account (GitHub login), deploys from `main`. First deploy 2026-11-21.

## Used during design only (not part of the live site)

| Platform | Use |
|---|---|
| expertoenseo.online | Style reference for layout, blue colors and photo style. Nothing was copied from it. |
| Unsplash search | Finding the stock photos above. |
| Google Chrome (on this computer) | Exporting the business card to print-ready PDF and PNG. Card files are in `print/`, kept off GitHub and the website. |
| Python's built-in web server | Previewing the site on this computer (`python -m http.server 4174`). |
| Claude Code (Anthropic) | AI assistant that built and tested the site. |
