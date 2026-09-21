# TokenGate.com: Business Concept and Phase-Wise Build Prompt

## 1. The idea

**TokenGate.com is the independent hub for token gating.** Token gating means granting access to a community, product, event or piece of content only to wallets that hold a specific token, NFT or credential. The site has two parts:

1. **An audience engine.** It captures searches around token gating with a tool directory, comparisons, free calculators, guides and videos. Revenue comes from AdSense, YouTube, affiliates and sponsorships.
2. **A lead engine.** It turns brands, creators and DAOs into project leads through a free "Token-Gating Blueprint". Those leads are then sold as referrals to agencies or vendors, or delivered as services.

### Why this concept wins for this domain
| Option | Search demand | Revenue per visitor | Fit with the "TokenGate" name | Verdict |
|---|---|---|---|---|
| **Token-gating hub + brand lead gen** | High commercial intent ("best token gating tools", "Collab.Land vs Guild", "Shopify token gating") | High: B2B leads worth $5k–$150k projects, plus crypto-level ad CPMs | Exact match | **Chosen** |
| Crypto news site | Very high, but saturated (CoinDesk, Decrypt) | Medium | Weak | No |
| A token-gating SaaS product | Low to start, heavy build | High, but slow | Strong | Phase 5 upsell |
| Airdrop / "token launch" portal | Spiky | Low, with reputational risk | Medium | No |

**The main problem:** pure content in crypto is brutal for SEO. The advantage here is **tools plus a lead funnel**. One closed brand project ($5k–$25k) is worth more than about 100k AdSense pageviews. Build for leads first; ads are the base layer.

### Revenue model (order of expected yield)
1. Brand project leads: referral fees of 10–20%, or delivered in-house.
2. Featured directory listings and sponsored guides: $300–$3,000 each.
3. Newsletter and contest sponsorships.
4. Affiliate links on "Visit site" buttons.
5. Google AdSense (crypto and fintech CPMs) and YouTube embeds and channel revenue.
6. Donations and supporter memberships (operations, promotions, marketing, hiring, contests and prizes).
7. The domain sale or lease itself: a "Contact if interested" banner sits on every page.

## 2. Research: 27 benchmark sites and what was taken from them
The benchmark sites were Guild.xyz, Collab.Land, Unlock Protocol, Lit Protocol, thirdweb, Alchemy, Moralis, Galxe, Zealy, Layer3, Shopify (token-gating guide), Highlight, Manifold, Snapshot, DappRadar, CoinGecko, CoinMarketCap, Etherscan, Decrypt, CoinDesk, The Block, Bankless, OpenSea, Zora, Tokenproof, Gitcoin and Alchemy's DAO guide.

Patterns adopted:
- Two paths on the site: one for users and one for brands (Tokenproof, Galxe, Zealy).
- A single primary CTA repeated on every page (Guild, thirdweb).
- Qualifying B2B forms that ask for budget, timeline, use case and Telegram (CoinMarketCap, Moralis).
- A filterable directory, plus comparison and "alternatives" pages built from templates (Alchemy, DappRadar).
- Free utilities that bring people back: calculators, a rule builder and a safety check (Etherscan, CoinGecko).
- Newsletter signup inside articles and in the footer (CoinDesk).
- Social proof through a logo wall and headline stats.
- Monetization menu: featured listings, sponsored content, contests and a media kit (CoinMarketCap, Decrypt).
- Clear labeling of sponsored and affiliate content, plus a security-first approach (Etherscan, Shopify).

## 3. Phase-wise build prompt
Use each phase as a standalone prompt for an AI builder or a developer.

### Phase 1: Foundation and brand
> Build a static, dependency-free multi-page website for **TokenGate.com**, "the independent token-gating hub". It must be hostable on the GitHub Pages free plan. Requirements:
> - Dark-first theme with a light-mode toggle, a purple→teal gradient brand, the Inter font and a mobile-first responsive layout.
> - A global banner at the top of every page: "Contact, if you are interested in this website/domain name", linked to https://web.works/contact.
> - A sticky header with Directory, Compare, Tools, Learn, Videos, Contests and Support, plus a "Get a Gate Built" CTA. The footer has newsletter signup and link columns.
> - SEO on every page: title, meta description, canonical, Open Graph and JSON-LD (Organization, WebSite and SearchAction; Article on guides). Also sitemap.xml, robots.txt, llms.txt, a manifest and a 404 page.
> - A small Python build script (`build.py`) that re-wraps every page in the shared layout. Each page keeps its content between `TG-BODY` markers, so the site grows by adding one file per page.

### Phase 2: Content and SEO core
> Add the content pages:
> - **Learn hub**, with guides on What is token gating, How to token-gate Discord, Shopify token gating, Token-gated events and NFT ticketing, and a Security checklist.
> - **12 use cases**.
> - **A searchable glossary** of 40 terms.
>
> Each guide has a sticky table of contents, an in-content ad slot, a sidebar lead form and an FAQ. Target high-intent keywords such as "what is token gating", "token gate discord", "shopify token gating", "nft ticketing" and "token gating tools 2026".

### Phase 3: Directory, comparison and interactive tools
> - **Directory.** Build a directory of 28+ tools driven by a JS data file. Each entry has name, URL, category, chains, pricing, free tier, no-code or developer, integrations and description. Add search plus filters for category, chain, pricing and build type, and URL parameters such as `?q=` and `?cat=`.
> - **Comparison page.** A side-by-side table and head-to-head verdicts.
> - **Tools page.** Five browser-only tools:
>   1. A Tool Finder quiz that recommends a stack and then captures an email.
>   2. A Cost Calculator.
>   3. An AND/OR Gate Rule Builder with JSON export.
>   4. A Loyalty ROI calculator.
>   5. A wallet-request Safety Check.

### Phase 4: Lead generation (the money page)
> - **"For Brands" page.** Benefit hero, a 3-step multi-step brief (what to gate, stage, audience, budget, timeline, services, contact and consent), packages (free Blueprint, Launch, Enterprise), market lessons (Nike, Adidas, Starbucks Odyssey), an FAQ and a CTA band.
> - **Site-wide capture points:**
>   - a floating "Free Gate Strategy" button
>   - an exit-intent and 40-second popup, shown once per session and suppressed after conversion
>   - a sidebar form on every guide
>   - an email capture at the end of the Tool Finder
>   - the footer newsletter
> - **Form delivery.** All forms post to one private inbox through FormSubmit AJAX. The address is assembled at runtime from obfuscated char codes. It must never appear in the HTML, visible text or a plain `mailto:`. Links labeled "Email us" open the mail app through JS. If the AJAX call fails, the page falls back to opening the mail app.

### Phase 5: Monetization, community and operations
> - **AdSense.** Consent-gated. Slots for header, in-content, sidebar and footer stay hidden until a publisher ID is set in `assets/js/config.js`. Include an ads.txt template and an optional GA4 ID.
> - **YouTube.** A videos page driven by config, using privacy-enhanced click-to-load embeds. Entries without an ID fall back to a topic search. Add a channel subscribe CTA and a video submission form.
> - **Support page.** Donation pledges (one-time, monthly or yearly; preset or custom amount; allocation to operations, promotions, marketing, hiring, contests or the creator fund; payment method), a funding-goal progress bar, and optional PayPal, Stripe, Ko-fi, Buy Me a Coffee, GitHub Sponsors and crypto links. Each link is hidden until it is configured.
> - **Contests page.** Open contests, how-it-works steps, a rules summary, a registration form and a sponsor CTA.
> - **Careers and talent network.** Six roles and an application form.
> - **Advertise page.** Six ad products, a sponsorship inquiry form with budget and start date, and a free tool submission form with a Featured upsell.
> - **Legal.** Privacy (AdSense, cookies, GDPR/CCPA/PIPEDA), Terms and Disclaimer/affiliate disclosure.

### Phase 6: Deploy, verify and grow
> - Push to GitHub `webworksa1/tokengate-com` and publish with GitHub Pages (free plan, public repo, branch root, `.nojekyll`).
> - Verify every page for zero console errors and no horizontal overflow at 390px and 1280px. Confirm the domain banner appears on every page and the email appears nowhere.
> - After launch, work through these in order:
>   1. Point tokengate.com DNS to GitHub Pages: A records 185.199.108–111.153, plus a `CNAME` file.
>   2. Activate FormSubmit by clicking the confirmation email that arrives after the first submission.
>   3. Apply for AdSense.
>   4. Add YouTube video IDs.
>   5. Add donation links.
>   6. Publish one comparison or "alternatives" page per week (e.g. "Collab.Land alternatives", "Guild vs Collab.Land").
>   7. Sell the first Featured listings.

## 4. Growth roadmap (after launch)
- **Programmatic SEO:** "[Tool] review", "[Tool] alternatives" and "Token gating tools on [chain]" pages generated from `data.js`.
- **The Gate Weekly newsletter:** move it to Beehiiv or ConvertKit once there are 1k subscribers, and sell the sponsor slot.
- **TokenGate Pass:** a membership NFT that gates premium templates and a private Discord. The site then shows the product working on itself.
- **Partner marketplace:** vetted agencies pay per qualified lead.
- **Serverless add-on** (Cloudflare Workers or Vercel): a live NFT holder checker using the Alchemy or Helius APIs.
