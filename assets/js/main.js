/* TokenGate.com — core interactions */
(function () {
  "use strict";
  var C = window.TG_CONFIG || {};
  if (C.adsenseClient) document.documentElement.classList.add("ads-on");
  /* ---- shared footer, lead modal & cookie bar (injected to keep pages light) ---- */
  var CHROME = "<footer class=\"site-footer\">\n  <div class=\"container\">\n    <div class=\"footer-grid\">\n      <div>\n        <a class=\"logo\" href=\"index.html\"><span class=\"logo-mark\">⛩</span><span>Token<span class=\"grad-text\">Gate</span></span></a>\n        <p class=\"muted\" style=\"margin-top:12px\">The independent hub for token gating — guides, tool directory, calculators and done-for-you token-gated experiences for brands, creators and communities.</p>\n        <form class=\"newsletter\" data-form=\"Newsletter signup\" data-success=\"You're in! Watch your inbox for The Gate Weekly.\">\n          <label class=\"sr-only\" for=\"nl-email\">Email</label>\n          <input id=\"nl-email\" type=\"email\" name=\"email\" placeholder=\"you@company.com\" required>\n          <input type=\"hidden\" name=\"list\" value=\"The Gate Weekly\">\n          <button class=\"btn btn-primary\" type=\"submit\">Subscribe</button>\n        </form>\n        <p class=\"form-note\" style=\"margin-top:8px\">The Gate Weekly: new tools, playbooks & contests. No spam.</p>\n      </div>\n      <div><h4>Explore</h4><ul>\n        <li><a href=\"directory.html\">Tool Directory</a></li><li><a href=\"compare.html\">Compare Tools</a></li>\n        <li><a href=\"tools.html\">Free Tools</a></li><li><a href=\"use-cases.html\">Use Cases</a></li><li><a href=\"videos.html\">Videos</a></li></ul></div>\n      <div><h4>Learn</h4><ul>\n        <li><a href=\"what-is-token-gating.html\">What is Token Gating?</a></li><li><a href=\"discord-token-gating.html\">Discord Guide</a></li>\n        <li><a href=\"shopify-token-gating.html\">Shopify Guide</a></li><li><a href=\"token-gated-events.html\">Events Guide</a></li>\n        <li><a href=\"token-gating-security.html\">Security</a></li><li><a href=\"glossary.html\">Glossary</a></li></ul></div>\n      <div><h4>Work with us</h4><ul>\n        <li><a href=\"for-brands.html\">For Brands</a></li><li><a href=\"advertise.html\">Advertise / List a Tool</a></li>\n        <li><a href=\"contests.html\">Contests & Prizes</a></li><li><a href=\"careers.html\">Careers & Talent</a></li><li><a href=\"support.html\">Support Us</a></li></ul></div>\n      <div><h4>Company</h4><ul>\n        <li><a href=\"about.html\">About</a></li><li><a href=\"contact.html\">Contact</a></li>\n        <li><a href=\"privacy.html\">Privacy</a></li><li><a href=\"terms.html\">Terms</a></li><li><a href=\"disclaimer.html\">Disclaimer</a></li></ul></div>\n    </div>\n    <div class=\"footer-bottom\">\n      <span>© <span data-year></span> TokenGate.com · Not financial advice. Some links may be affiliate or sponsored and are labeled.</span>\n      <span><a href=\"https://web.works/contact\" target=\"_blank\" rel=\"noopener\">This domain may be available →</a></span>\n    </div>\n  </div>\n</footer>\n\n<a class=\"btn btn-primary float-cta\" href=\"for-brands.html#brief\">🚀 Free Gate Strategy</a>\n\n<div class=\"modal\" id=\"leadModal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"lmTitle\">\n  <div class=\"modal-box\">\n    <button class=\"modal-close\" data-close aria-label=\"Close\">×</button>\n    <span class=\"eyebrow\">Free · 48-hour turnaround</span>\n    <h2 id=\"lmTitle\" style=\"font-size:1.6rem\">Get your token-gating blueprint</h2>\n    <p class=\"muted\">Tell us what you want to gate. We'll send a tailored tool stack, rollout plan and cost estimate — free.</p>\n    <form class=\"form\" data-form=\"Popup lead — blueprint request\" data-success=\"Got it! Your blueprint is on the way within 48 hours.\">\n      <input name=\"name\" placeholder=\"Your name\" required>\n      <input type=\"email\" name=\"email\" placeholder=\"Work email\" required>\n      <select name=\"goal\" required>\n        <option value=\"\">What do you want to gate?</option>\n        <option>Discord / Telegram community</option><option>Online store / products</option>\n        <option>Events / ticketing</option><option>Content / courses</option><option>Loyalty program</option><option>Something else</option>\n      </select>\n      <button class=\"btn btn-primary btn-block\" type=\"submit\">Send me the blueprint</button>\n      <p class=\"form-note\">We reply privately. No spam, unsubscribe anytime.</p>\n    </form>\n  </div>\n</div>\n\n<div class=\"cookie\" id=\"cookie\" role=\"region\" aria-label=\"Cookie consent\">\n  <p style=\"margin:0 0 10px\">We use cookies for analytics and ads (Google AdSense) to keep TokenGate free. See our <a href=\"privacy.html\">Privacy Policy</a>.</p>\n  <button class=\"btn btn-primary btn-sm\" data-consent=\"all\">Accept</button>\n  <button class=\"btn btn-ghost btn-sm\" data-consent=\"essential\">Essential only</button>\n</div>";
  var slot = document.getElementById("tg-chrome");
  if (slot) slot.outerHTML = CHROME;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- private inbox (never rendered as text) ---- */
  var _k = [116,118,106,53,115,112,104,116,110,71,56,104,122,114,121,118,126,105,108,126];
  function inbox() { return _k.map(function (n) { return String.fromCharCode(n - 7); }).reverse().join(""); }
  window.TG = window.TG || {};
  TG.mail = function (subject, body) {
    window.location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(subject || "TokenGate inquiry") + (body ? "&body=" + encodeURIComponent(body) : "");
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-mail]");
    if (a) { e.preventDefault(); TG.mail(a.getAttribute("data-mail") || "TokenGate inquiry"); }
  });

  /* ---- theme ---- */
  var saved = store.get("tg-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  var tt = $("#themeToggle");
  if (tt) tt.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cur); store.set("tg-theme", cur);
    tt.textContent = cur === "light" ? "☾" : "☀";
  });
  if (tt && saved === "light") tt.textContent = "☾";

  /* ---- nav ---- */
  var mt = $("#menuToggle"), nl = $(".nav-links");
  if (mt && nl) mt.addEventListener("click", function () { nl.classList.toggle("open"); mt.setAttribute("aria-expanded", nl.classList.contains("open")); });
  var path = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(function (a) { if (a.getAttribute("href") === path) a.classList.add("active"); });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- forms: every submission goes privately to the owner inbox ---- */
  function endpoint() { return "https://formsubmit.co/ajax/" + inbox(); }
  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) {
      if (data[k]) data[k] += ", " + v; else data[k] = v;
    });
    return data;
  }
  function msg(form, ok, text) {
    var m = $(".form-msg", form) || (function () { var d = document.createElement("div"); d.className = "form-msg"; form.appendChild(d); return d; })();
    m.className = "form-msg " + (ok ? "ok" : "err"); m.textContent = text;
    m.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  TG.submit = function (form, extra) {
    var data = collect(form);
    if (data._honey) return Promise.resolve(); // bot
    delete data._honey;
    Object.keys(extra || {}).forEach(function (k) { data[k] = extra[k]; });
    var type = form.getAttribute("data-form") || "Inquiry";
    data._subject = "TokenGate.com — " + type;
    data._template = "table";
    data._captcha = "false";
    data["Form"] = type;
    data["Page"] = location.href;
    data["Submitted"] = new Date().toISOString();
    var btn = $("[type=submit]", form); var label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    return fetch(endpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === "false") throw new Error("fail"); return j; }); })
      .then(function () {
        msg(form, true, form.getAttribute("data-success") || "Thanks! Your submission was received — we'll be in touch shortly.");
        form.reset(); $$(".chip.active", form).forEach(function (c) { c.classList.remove("active"); });
        if (window.gtag) gtag("event", "generate_lead", { form: type });
        store.set("tg-lead", "1");
      })
      .catch(function () {
        msg(form, false, "Couldn't send automatically. Opening your email app instead…");
        var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
        setTimeout(function () { TG.mail(data._subject, body); }, 900);
      })
      .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
  };
  $$("form[data-form]").forEach(function (f) {
    if (!$(".hp", f)) { var h = document.createElement("input"); h.type = "text"; h.name = "_honey"; h.className = "hp"; h.tabIndex = -1; h.autocomplete = "off"; f.appendChild(h); }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      TG.submit(f);
    });
  });

  /* ---- chips (single or multi) -> hidden input ---- */
  $$(".chips[data-name]").forEach(function (g) {
    var multi = g.hasAttribute("data-multi");
    var hidden = document.createElement("input"); hidden.type = "hidden"; hidden.name = g.getAttribute("data-name");
    g.parentNode.insertBefore(hidden, g.nextSibling);
    g.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return; e.preventDefault();
      if (!multi) $$(".chip", g).forEach(function (x) { if (x !== c) x.classList.remove("active"); });
      c.classList.toggle("active");
      hidden.value = $$(".chip.active", g).map(function (x) { return x.getAttribute("data-v") || x.textContent.trim(); }).join(", ");
      g.dispatchEvent(new CustomEvent("chipchange", { detail: hidden.value, bubbles: true }));
    });
  });

  /* ---- multi-step forms ---- */
  $$("[data-steps]").forEach(function (f) {
    var steps = $$(".step", f), bar = $(".steps-bar", f), i = 0;
    function show(n) {
      steps.forEach(function (s, k) { s.classList.toggle("active", k === n); });
      if (bar) $$("span", bar).forEach(function (s, k) { s.classList.toggle("done", k <= n); });
      i = n;
    }
    f.addEventListener("click", function (e) {
      if (e.target.closest("[data-next]")) {
        e.preventDefault();
        var req = $$("[required]", steps[i]).filter(function (x) { return !x.checkValidity(); });
        if (req.length) { req[0].reportValidity(); return; }
        show(Math.min(i + 1, steps.length - 1));
      }
      if (e.target.closest("[data-prev]")) { e.preventDefault(); show(Math.max(i - 1, 0)); }
    });
    show(0);
  });

  /* ---- lead modal: exit intent (desktop) or 40s dwell, once per session ---- */
  var modal = $("#leadModal");
  function openModal() { if (!modal || store.sget("tg-modal") || store.get("tg-lead")) return; modal.classList.add("open"); store.sset("tg-modal", "1"); }
  if (modal) {
    $$("[data-close]", modal).forEach(function (b) { b.addEventListener("click", function () { modal.classList.remove("open"); }); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("open"); });
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget && e.clientY < 8) openModal(); });
    setTimeout(openModal, 40000);
  }
  $$("[data-open-lead]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); if (modal) modal.classList.add("open"); }); });

  /* ---- cookie consent ---- */
  var ck = $("#cookie");
  if (ck && !store.get("tg-consent")) ck.classList.add("show");
  $$("[data-consent]", ck || document).forEach(function (b) {
    b.addEventListener("click", function () { store.set("tg-consent", b.getAttribute("data-consent")); ck.classList.remove("show"); loadAds(); });
  });

  /* ---- AdSense ---- */
  function loadAds() {
    if (!C.adsenseClient || TG._ads) return; TG._ads = true;
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + C.adsenseClient;
    document.head.appendChild(s);
    $$(".ad-slot").forEach(function (slot) {
      var key = slot.getAttribute("data-slot") || "inContent";
      var inner = $(".ad-inner", slot); slot.classList.add("has-ads");
      inner.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + C.adsenseClient + '"' +
        (C.adSlots && C.adSlots[key] ? ' data-ad-slot="' + C.adSlots[key] + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }
  if (store.get("tg-consent")) loadAds();

  /* ---- GA4 ---- */
  if (C.ga4) {
    var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + C.ga4; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", C.ga4);
  }

  /* ---- YouTube (privacy-enhanced, click to load) ---- */
  TG.renderVideos = function (el, limit) {
    if (!el) return;
    var vids = (C.videos || []).slice(0, limit || 99);
    el.innerHTML = vids.map(function (v) {
      var href = v.id ? "https://www.youtube.com/watch?v=" + v.id : "https://www.youtube.com/results?search_query=" + encodeURIComponent(v.topic || v.title);
      var thumb = v.id ? ' style="background:url(https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg) center/cover"' : "";
      return '<div class="video-card"><div class="video-thumb" data-yt="' + (v.id || "") + '" data-href="' + href + '"' + thumb + ' role="button" aria-label="Play ' + v.title + '">▶</div>' +
        '<div class="body"><span class="tag purple">' + (v.cat || "Video") + '</span><h3 style="margin-top:8px">' + v.title + '</h3>' +
        '<a href="' + href + '" target="_blank" rel="noopener">Watch on YouTube →</a></div></div>';
    }).join("");
  };
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".video-thumb"); if (!t) return;
    var id = t.getAttribute("data-yt");
    if (!id) { window.open(t.getAttribute("data-href"), "_blank", "noopener"); return; }
    t.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>';
  });
  $$("[data-videos]").forEach(function (el) { TG.renderVideos(el, parseInt(el.getAttribute("data-videos"), 10) || 0); });

  /* ---- reveal on scroll ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });

  /* ---- hero gate demo ---- */
  var gd = $("#gateDemo");
  if (gd) {
    var btn = $("button", gd);
    btn.addEventListener("click", function () {
      var unlocked = gd.classList.toggle("unlocked");
      $(".gate-lock", gd).textContent = unlocked ? "🔓" : "🔒";
      $(".gate-status", gd).textContent = unlocked ? "✅ Holder verified — access granted" : "Hold 1 × Member Pass to unlock";
      btn.textContent = unlocked ? "Lock again" : "Simulate wallet check";
    });
  }
})();
