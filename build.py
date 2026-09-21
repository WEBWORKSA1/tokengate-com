#!/usr/bin/env python3
"""TokenGate.com static site builder.
Every built page keeps its source inside it:
  <!--TG-META {"title": "...", "desc": "...", "scripts": [...], "nav": "..."}-->
  <!--TG-BODY--> ...page content... <!--/TG-BODY-->
Edit the content between the TG-BODY markers (or the TG-META JSON) of any page, or add a new
page as src/pages/<name>.html starting with <!--{"title": "...", "desc": "..."}--> followed by
the body. Use {{SIDEBAR}} in guides for the auto table-of-contents + lead sidebar.
Run:  python3 build.py   -> rewrites every page with the shared header/banner/nav + sitemap.xml.
"""
import json, re, pathlib, datetime

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src" / "pages"
SITE = "https://tokengate.com"
DOMAIN_CONTACT = "https://web.works/contact"

NAV = [
    ("directory.html", "Directory"), ("compare.html", "Compare"), ("tools.html", "Tools"),
    ("learn.html", "Learn"), ("videos.html", "Videos"), ("contests.html", "Contests"),
    ("support.html", "Support"),
]

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#0a0b14">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TokenGate">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{site}/assets/img/og.svg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script type="application/ld+json">{ld}</script>
</head>
<body>
<div class="domain-bar"><a href="{contact}" target="_blank" rel="noopener">Contact, if you are interested in this website/domain name</a></div>
<header class="site-header">
  <nav class="container nav" aria-label="Main">
    <a class="logo" href="index.html" aria-label="TokenGate home"><span class="logo-mark">⛩</span><span>Token<span class="grad-text">Gate</span></span></a>
    <ul class="nav-links">{nav}</ul>
    <div class="nav-cta">
      <button class="icon-btn" id="themeToggle" aria-label="Toggle theme">☀</button>
      <a class="btn btn-primary btn-sm" href="for-brands.html">Get a Gate Built</a>
      <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false">☰</button>
    </div>
  </nav>
</header>
<div class="ad-slot" data-slot="header"><div class="ad-inner">Advertisement</div></div>
<main id="main">
<!--TG-META {meta}-->
<!--TG-BODY-->
"""

FOOT = """<!--/TG-BODY-->
</main>
<div class="ad-slot" data-slot="footer"><div class="ad-inner">Advertisement</div></div>
<div id="tg-chrome"></div>
<script src="assets/js/config.js"></script>
{scripts}
<script src="assets/js/main.js"></script>
</body>
</html>
"""


SIDEBAR = """<aside class="aside-stack">
  <div class="toc"><b>On this page</b>{toc}</div>
  <div class="card" style="border-color:var(--brand)">
    <h3>Free gate blueprint</h3><p>Tool stack, rules, timeline & budget — in 48 hours.</p>
    <form class="form" style="margin-top:12px" data-form="Guide sidebar lead" data-success="Done! Blueprint coming within 48 hours.">
      <input type="email" name="email" placeholder="Work email" required>
      <input type="hidden" name="source_guide" value="{title}">
      <button class="btn btn-primary btn-block" type="submit">Get it free</button>
    </form>
  </div>
  <div class="ad-slot" data-slot="sidebar" style="padding:0;margin:0"><div class="ad-inner" style="min-height:250px">Advertisement</div></div>
  <div class="card"><h3>Support TokenGate</h3><p>Keep these guides free.</p><a class="btn btn-ghost btn-sm" style="margin-top:10px" href="support.html">Donate →</a></div>
</aside>"""


def sidebar(body, title):
    heads = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)
    toc = "".join('<a href="#%s">%s</a>' % (i, re.sub("<.*?>", "", t)) for i, t in heads)
    out = SIDEBAR.replace("{toc}", toc).replace("{title}", title.split(" | ")[0].replace('"', ""))
    return "<!--TG-SIDEBAR-->" + out + "<!--/TG-SIDEBAR-->"


def ld_json(meta, url):
    base = [{
        "@context": "https://schema.org", "@type": "Organization", "name": "TokenGate",
        "url": SITE, "logo": SITE + "/assets/img/favicon.svg"
    }, {
        "@context": "https://schema.org", "@type": "WebSite", "name": "TokenGate", "url": SITE,
        "potentialAction": {"@type": "SearchAction", "target": SITE + "/directory.html?q={q}", "query-input": "required name=q"}
    }]
    if meta.get("article"):
        base.append({"@context": "https://schema.org", "@type": "Article", "headline": meta["title"],
                     "description": meta["desc"], "mainEntityOfPage": url,
                     "author": {"@type": "Organization", "name": "TokenGate Editorial"},
                     "dateModified": datetime.date.today().isoformat()})
    return json.dumps(base, ensure_ascii=False)


def sources():
    """Pages come from src/pages/*.html (JSON header + body) when present,
    otherwise from the built root pages (TG-META / TG-BODY markers) - so you can
    edit a built page's body in place and simply re-run the build."""
    found = {}
    for f in sorted(ROOT.glob("*.html")):
        raw = f.read_text(encoding="utf-8")
        mm = re.search(r"<!--TG-META (\{.*?\})-->", raw, re.S)
        bb = re.search(r"<!--TG-BODY-->\n?(.*?)<!--/TG-BODY-->", raw, re.S)
        if mm and bb:
            meta = json.loads(mm.group(1))
            body = re.sub(r"<!--TG-SIDEBAR-->.*?<!--/TG-SIDEBAR-->", "{{SIDEBAR}}", bb.group(1), flags=re.S)
            found[f.name] = (meta, body)
    if SRC.exists():
        for f in sorted(SRC.glob("*.html")):
            raw = f.read_text(encoding="utf-8")
            m = re.match(r"\s*<!--(\{.*?\})-->", raw, re.S)
            found[f.name] = (json.loads(m.group(1)) if m else {}, raw[m.end():] if m else raw)
    return [(n, found[n][0], found[n][1]) for n in sorted(found)]


def build():
    pages = []
    for name, meta, body in sources():
        if "{{SIDEBAR}}" in body:
            body = body.replace("{{SIDEBAR}}", sidebar(body, meta.get("title", "")))
        url = SITE + "/" + ("" if name == "index.html" else name)
        active = meta.get("nav", name)
        nav = "".join(
            '<li><a href="{h}"{a}>{t}</a></li>'.format(h=h, t=t, a=' class="active"' if h == active else "")
            for h, t in NAV)
        scripts = "\n".join('<script src="%s"></script>' % s for s in meta.get("scripts", []))
        esc = lambda s: s.replace('"', "&quot;")
        html = HEAD.format(title=meta.get("title", "TokenGate"), desc=esc(meta.get("desc", "")), url=url,
                           site=SITE, ld=ld_json(meta, url), contact=DOMAIN_CONTACT, nav=nav, meta=json.dumps(meta, ensure_ascii=False).replace("--", "\\u002d\\u002d"))
        html += body + FOOT.replace("{contact}", DOMAIN_CONTACT).replace("{scripts}", scripts)
        (ROOT / name).write_text(html, encoding="utf-8")
        if not meta.get("noindex"):
            pages.append((name, meta.get("priority", "0.7")))
    today = datetime.date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for n, p in pages:
        loc = SITE + "/" + ("" if n == "index.html" else n)
        sm.append("  <url><loc>%s</loc><lastmod>%s</lastmod><priority>%s</priority></url>" % (loc, today, p))
    sm.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")
    print("Built %d pages" % len(pages))


if __name__ == "__main__":
    build()
