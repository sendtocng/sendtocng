# MEMORY.md - Joey's Assistant

## About Joey
- Name: Joey
- Projects: CryptoNews.global, isitAIght.io, BMW, BookMyWalks, OpenFridge.xyz
- Prefers concise responses, not robotic

## Projects

### CryptoNews.global
- Repo: https://github.com/sendtocng/sendtocng
- Static HTML site via GitHub Pages
- Articles in: `articles.js` (database), individual `.html` files for SEO
- **IMPORTANT:** GitHub Pages keeps disabling itself — may need manual re-enable
- Template: `article-template.html`
- Adding article: (1) create static HTML file, (2) add to `articles.js` with id, (3) add to `articleUrls` in `script.js`

### isitAIght.io
- In progress — "Consult with us to see if AI makes sense - free" hook

### OpenFridge.xyz
- Future project — entertainment-first food brand + AI recipe tool
- Differentiate on personality, not technology

### BMW
- Separate project — NOT part of CryptoNews repo

### BookMyWalks
- Cloudflare Workers project — separate repo

## Preferences
- Don't scan entire codebases — ask for specific files/lines
- Use subagents for research tasks
- Keep responses concise

## Cost Optimization
- MiniMax-M2.5 model in use
- Subagents should use cheaper models
- Don't accumulate long context unnecessarily
