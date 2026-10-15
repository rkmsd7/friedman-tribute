# Milton Friedman · A Life

A static tribute site tracing Milton Friedman's life from Brooklyn (1912) to San Francisco (2006) and beyond: a filterable timeline with photographs, writings, speeches and interviews, public appearances, videos, and the ideas he argued for. Published October 2026, fifty years after the announcement of his Nobel Prize.

## Run locally
```
node serve.js        # http://localhost:4175
```
No build step. Pages render from `data/*.json` (schema in `data/SCHEMA.md`).

## Edit content
Edit the JSON, not the JavaScript:
- `data/timeline.json` – eras and dated events (`media` may name an image id)
- `data/images.json` – Wikimedia Commons photographs with licences (API-verified)
- `data/videos.json` – YouTube IDs (verified via oEmbed)
- `data/writings.json`, `data/speeches.json`, `data/appearances.json`, `data/quotes.json`, `data/ideas.json`, `data/site.json`

## Sources
Nobel Foundation biographical note and lecture (1976); Collected Works of Milton Friedman (Hoover Institution); Milton and Rose D. Friedman, *Two Lucky People* (1998); Jennifer Burns, *Milton Friedman: The Last Conservative* (2023); Free To Choose Network. Text © CC BY-SA 4.0. Images retain their Commons licences; videos remain their publishers' copyright.
