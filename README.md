# ClearpathUI Website

Website for [ClearpathUI](https://www.clearpathui.com): web design, website upgrades, Google Business Profile setup and basic SEO for small businesses. 100% remote.

## Pages

- `index.html`: home page
- `quote.html`: Get a Quote form
- `styles.css`, `main.js`: shared styles and scripts
- `favicon.svg`: logo mark

Static site with no build step. Preview locally:

```
python -m http.server 4174
```

Then open http://localhost:4174.

## Quote form

Each request is saved to Base44 and emailed to info@clearpathui.com through Web3Forms. See [PLATFORMS.md](PLATFORMS.md) for every outside service the site uses.
