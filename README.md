# TokenGate.com

The independent token-gating hub. It combines a tool directory, comparisons, free calculators, guides, videos, a lead-generation funnel for brands, donations, contests and careers.

Live (GitHub Pages): https://webworksa1.github.io/tokengate-com/

## Structure
```
*.html               pages (content between TG-BODY markers, metadata in TG-META)
build.py             re-wraps pages in the shared layout and regenerates sitemap.xml
assets/css/style.css design system
assets/js/config.js  monetization switches: AdSense, GA4, YouTube videos, donation links, funding goal
assets/js/data.js    directory dataset (add a tool = add one object)
assets/js/main.js    forms, private email routing, modal, theme, ads, videos
docs/BUILD-PROMPT.md business concept + phase-wise build prompt
```

## Edit and rebuild
```
python3 build.py      # re-wraps every root *.html page and regenerates sitemap.xml
git add -A && git commit -m "update" && git push
```

## Adding a page
Copy any page (e.g. `learn.html`), edit the JSON inside `<!--TG-META ...-->` and the content between `<!--TG-BODY-->` and `<!--/TG-BODY-->`, then run `python3 build.py`. Guides can use `{{SIDEBAR}}` to get the table of contents and lead-capture sidebar added automatically.

## Go-live checklist
1. **Forms.** The first submission triggers a FormSubmit activation email to the owner inbox. Click "Activate" once, and after that every form is delivered.
2. **AdSense.** Set `adsenseClient` and the slot IDs in `assets/js/config.js`, then update `ads.txt`.
3. **YouTube.** Add video IDs and `youtubeChannel` in `config.js`.
4. **Donations.** Paste PayPal, Stripe, Ko-fi or crypto links in `config.js`. Anything left empty stays hidden.
5. **Custom domain.** Add a `CNAME` file containing `tokengate.com`. At the DNS provider, create A records to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153. Then turn on Enforce HTTPS under Settings → Pages.

## Privacy note
The contact email is never written in plain text. It is assembled at runtime inside `main.js` and only used for form delivery and "Email us" links.
