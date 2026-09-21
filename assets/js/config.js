/* TokenGate.com — site configuration. Edit this file to switch on monetization. */
window.TG_CONFIG = {
  siteName: "TokenGate",
  domain: "tokengate.com",

  /* Google AdSense — paste your publisher id (e.g. "ca-pub-1234567890123456") and slot ids.
     Leave blank and ad slots stay hidden. Also update /ads.txt. */
  adsenseClient: "",
  adSlots: { header: "", inContent: "", sidebar: "", footer: "" },

  /* Google Analytics 4 measurement id, e.g. "G-XXXXXXX" (optional) */
  ga4: "",

  /* YouTube — your channel URL and video ids to embed on /videos.html and guides.
     Any entry without an id links to a YouTube search for its topic instead. */
  youtubeChannel: "",
  videos: [
    { id: "", title: "What is token gating? Explained in 5 minutes", topic: "what is token gating", cat: "Basics" },
    { id: "", title: "How to token-gate a Discord server (step by step)", topic: "token gate discord server collab.land guild", cat: "Communities" },
    { id: "", title: "Token-gated Shopify store setup", topic: "shopify token gating tutorial", cat: "Commerce" },
    { id: "", title: "Unlock Protocol memberships tutorial", topic: "unlock protocol membership tutorial", cat: "Memberships" },
    { id: "", title: "NFT ticketing & token-gated events", topic: "nft ticketing token gated events", cat: "Events" },
    { id: "", title: "Lit Protocol access control for developers", topic: "lit protocol access control conditions tutorial", cat: "Developers" },
    { id: "", title: "Web3 loyalty programs that actually work", topic: "web3 loyalty program nft brand", cat: "Brands" },
    { id: "", title: "Wallet safety: approvals, phishing and revokes", topic: "revoke token approvals wallet safety", cat: "Security" },
    { id: "", title: "Guild.xyz roles & requirements walkthrough", topic: "guild.xyz tutorial roles", cat: "Communities" }
  ],

  /* Donations / support — paste any links you use. Empty values are hidden automatically.
     Pledges submitted through the on-site form reach the site owner privately. */
  donate: {
    paypal: "",        // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    stripe: "",        // Stripe Payment Link
    buymeacoffee: "",  // https://buymeacoffee.com/yourname
    kofi: "",          // https://ko-fi.com/yourname
    github: "",        // https://github.com/sponsors/yourname
    eth: "",           // 0x... public receiving address (EVM)
    btc: "",
    sol: ""
  },
  fundingGoal: { label: "2026 operations, contests & creator fund", goal: 25000, raised: 0 },

  /* Affiliate links for directory "Visit" buttons — e.g. { "Guild.xyz": "https://guild.xyz/?ref=you" } */
  affiliates: {}
};
