/* ==========================================================================
   ATI MEC — shared behaviour
   - Injects header/footer (so every page stays in sync in the mock)
   - Mega menus, mobile drawer, site search (⌘K / Ctrl+K)
   - Hero video with animated fallback
   - Renders data-driven lists (comms, events, leaders, resources, committees)
   ========================================================================== */
(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Icons (inline SVG, 24×24 stroke) ---------- */
  const P = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="M7 4.5v15l13-7.5z"/>',
    pause: '<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="M14 10l6-6M17 4h3v3"/>',
    alert: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 8v3M12 13.5v.5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    plane: '<path d="M10.5 21l1.5-1 1.5 1v-4.5L21 18v-2l-7.5-5V5.5a1.5 1.5 0 0 0-3 0V11L3 16v2l7.5-1.5z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/>',
    megaphone: '<path d="M3 10v4h4l8 5V5L7 10z"/><path d="M19 9a4 4 0 0 1 0 6"/>',
    news: '<rect x="3" y="4" width="14" height="16" rx="2"/><path d="M17 8h3v10a2 2 0 0 1-2 2M7 8h6M7 12h6M7 16h4"/>',
    heart: '<path d="M12 20s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.5-8 11-8 11z"/>',
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2.5-4.5a1.5 1.5 0 0 1 2.5-1.5L8 14"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    landmark: '<path d="M3 21h18M5 18h14M6 18v-7M10 18v-7M14 18v-7M18 18v-7M3 9l9-6 9 6z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phoneapp: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    login: '<path d="M10 17l5-5-5-5M15 12H3M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5"/>'
  };
  const icon = (n, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || P.file}</svg>`;
  window.icon = icon;

  const fmtDate = (iso, opts = { month: "short", day: "numeric", year: "numeric" }) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);
  const initials = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const page = document.body.dataset.page;

  /* ---------- Header ---------- */
  const NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Contract 2026", href: "contract-2026.html", key: "contract" },
    { label: "Communications", href: "communications.html", key: "comms" },
    { label: "Resources", href: "resources.html", key: "resources", mega: "resources" },
    { label: "Committees", href: "committees.html", key: "committees", mega: "committees" }
  ];

  const brand = `
    <a class="brand" href="index.html" aria-label="ATI MEC home">
      <span class="brand__mark">${icon("plane")}</span>
      <span class="brand__text"><span class="brand__title">ATI Pilots</span><span class="brand__sub">Master Executive Council</span></span>
      <span class="brand__divider" aria-hidden="true"></span>
      <span class="brand__alpa" title="Swap in official ALPA logo">ALPA</span>
    </a>`;

  const megaResources = () => `
    <div class="mega"><div class="mega__grid">
      ${S.resources.map((g) => `
        <div class="mega__group"><h4>${g.group}</h4>
          ${g.items.map((i) => `<a class="mega__link" href="${i.href || "resources.html"}">${icon(i.icon)}${i.title}</a>`).join("")}
        </div>`).join("")}
    </div>
    <div class="mega__foot"><span>Some resources require ALPA member login.</span><a class="link-arrow" href="resources.html">All resources ${icon("arrow")}</a></div></div>`;

  const megaCommittees = () => {
    const groups = [...new Set(S.committees.map((c) => c.group))];
    return `
    <div class="mega mega--right" style="width:min(900px,92vw)"><div class="mega__grid" style="grid-template-columns:repeat(4,1fr)">
      ${groups.map((g) => `
        <div class="mega__group"><h4>${g.replace(" & ", " &amp; ")}</h4>
          ${S.committees.filter((c) => c.group === g).map((c) => `<a class="mega__link" href="committees.html#${slug(c.name)}">${c.name}</a>`).join("")}
        </div>`).join("")}
    </div>
    <div class="mega__foot"><span>Want to get involved? Every committee needs volunteers.</span><a class="link-arrow" href="committees.html#volunteer">Volunteer ${icon("arrow")}</a></div></div>`;
  };

  const headerEl = $("#site-header");
  if (headerEl) {
    headerEl.outerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" id="header">
      <div class="container">
        ${brand}
        <nav class="nav" aria-label="Primary">
          ${NAV.map((n) => `
            <div class="nav__item">
              <a class="nav__link" href="${n.href}" ${n.key === page ? 'aria-current="page"' : ""} ${n.mega ? 'aria-haspopup="true"' : ""}>${n.label}${n.mega ? icon("chevron") : ""}</a>
              ${n.mega === "resources" ? megaResources() : n.mega === "committees" ? megaCommittees() : ""}
            </div>`).join("")}
        </nav>
        <div class="header-actions">
          <button class="icon-btn" data-open-search aria-label="Search (Ctrl+K)">${icon("search")}</button>
          <a class="btn btn--primary btn--sm" href="#" title="ALPA member sign-in">${icon("login")} Member Login</a>
          <button class="icon-btn menu-toggle" data-open-drawer aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
        </div>
      </div>
    </header>

    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__scrim" data-close-drawer></div>
      <div class="drawer__panel" role="dialog" aria-label="Menu">
        <div class="drawer__top">${brand}<button class="icon-btn" data-close-drawer aria-label="Close menu">${icon("close")}</button></div>
        <nav class="drawer__nav">
          ${NAV.filter((n) => !n.mega).map((n) => `<a href="${n.href}">${n.label}${icon("arrow")}</a>`).join("")}
          <details><summary>Resources ${icon("chevron")}</summary><div>
            ${S.resources.flatMap((g) => g.items).map((i) => `<a href="${i.href || "resources.html"}">${i.title}</a>`).join("")}
          </div></details>
          <details><summary>Committees ${icon("chevron")}</summary><div>
            ${S.committees.map((c) => `<a href="committees.html#${slug(c.name)}">${c.name}</a>`).join("")}
          </div></details>
        </nav>
        <a class="btn btn--primary" href="#">${icon("login")} Member Login</a>
        <a class="btn btn--outline" style="margin-top:10px" href="#" data-dart>${icon("target")} Throw a DART</a>
      </div>
    </div>

    <div class="search" id="search" role="dialog" aria-label="Search the site" aria-hidden="true">
      <div class="search__box">
        <label class="search__field">${icon("search")}<span class="sr-only">Search</span>
          <input type="search" placeholder="Search committees, resources, communications…" autocomplete="off" />
          <kbd>ESC</kbd></label>
        <div class="search__results" id="search-results"></div>
      </div>
    </div>`;
  }

  /* ---------- Footer ---------- */
  const footerEl = $("#site-footer");
  if (footerEl) {
    footerEl.outerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            ${brand}
            <p>The pilots of Air Transport International, represented by the Air Line Pilots Association, International.</p>
            <div class="hotline">${icon("phone")}<div><strong>MEC Hotline</strong>Recorded updates, 24/7 · <a href="communications.html#Hotline">Listen</a></div></div>
          </div>
          <div><h4>Pilot Group</h4><ul>
            <li><a href="about.html">About the MEC</a></li>
            <li><a href="about.html#leadership">MEC Leadership</a></li>
            <li><a href="contract-2026.html">Contract 2026</a></li>
            <li><a href="committees.html">Committees</a></li>
            <li><a href="committees.html#volunteer">Volunteer</a></li>
          </ul></div>
          <div><h4>Get Help</h4><ul>
            <li><a href="#">Throw a DART</a></li>
            <li><a href="#">File a Grievance (DTS)</a></li>
            <li><a href="committees.html#cirp">CIRP</a></li>
            <li><a href="committees.html#pilot-peer-support">Pilot Peer Support</a></li>
            <li><a href="committees.html#hims">HIMS</a></li>
          </ul></div>
          <div><h4>ALPA</h4><ul>
            <li><a href="#">ALPA.org ${icon("external")}</a></li>
            <li><a href="#">Air Line Pilot Magazine</a></li>
            <li><a href="#">Member Discounts</a></li>
            <li><a href="#">ALPA App</a></li>
            <li><a href="#">Call to Action</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Air Line Pilots Association, International · ATI Master Executive Council</span>
          <nav><a href="#">Privacy Statement</a><a href="#">Terms of Use</a><a href="#">Accessibility</a></nav>
        </div>
      </div>
    </footer>`;
  }

  /* ---------- Header scroll state ---------- */
  const header = $("#header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Drawer ---------- */
  const drawer = $("#drawer");
  const setDrawer = (open) => {
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", !open);
    $("[data-open-drawer]")?.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  $$("[data-open-drawer]").forEach((b) => b.addEventListener("click", () => setDrawer(true)));
  $$("[data-close-drawer]").forEach((b) => b.addEventListener("click", () => setDrawer(false)));

  /* ---------- Search (⌘K) ---------- */
  const index = [
    ...NAV.map((n) => ({ title: n.label, sub: "Page", href: n.href, icon: "file" })),
    ...S.resources.flatMap((g) => g.items.map((i) => ({ title: i.title, sub: g.group, href: i.href || "resources.html", icon: i.icon }))),
    ...S.committees.map((c) => ({ title: c.name + (c.full ? ` — ${c.full}` : ""), sub: "Committee", href: `committees.html#${slug(c.name)}`, icon: c.icon })),
    ...S.comms.map((c) => ({ title: c.title, sub: c.type, href: "communications.html", icon: "news" }))
  ];
  const search = $("#search");
  const sInput = $("#search input");
  const sResults = $("#search-results");
  const renderSearch = () => {
    const q = sInput.value.trim().toLowerCase();
    const hits = (q ? index.filter((i) => (i.title + " " + i.sub).toLowerCase().includes(q)) : index.slice(0, 6)).slice(0, 10);
    sResults.innerHTML = hits.length
      ? hits.map((h, i) => `<a href="${h.href}" class="${i === 0 ? "is-active" : ""}">${icon(h.icon)}<span>${esc(h.title)}<small>${esc(h.sub)}</small></span></a>`).join("")
      : `<div class="search__empty">No results for “${esc(q)}”</div>`;
  };
  const setSearch = (open) => {
    search.classList.toggle("is-open", open);
    search.setAttribute("aria-hidden", !open);
    if (open) { sInput.value = ""; renderSearch(); setTimeout(() => sInput.focus(), 50); }
  };
  $$("[data-open-search]").forEach((b) => b.addEventListener("click", () => setSearch(true)));
  search.addEventListener("click", (e) => e.target === search && setSearch(false));
  sInput.addEventListener("input", renderSearch);
  sInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { const a = $(".search__results a.is-active"); if (a) location.href = a.href; }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(!search.classList.contains("is-open")); }
    if (e.key === "Escape") { setSearch(false); setDrawer(false); }
  });

  /* ---------- Shared renderers ---------- */
  const pillFor = (type) => `<span class="pill ${S.commTypes[type] ? "pill--" + S.commTypes[type] : ""}">${esc(type)}</span>`;
  const sample = (on) => (on ? ' <span class="tag-sample" title="Placeholder content">Sample</span>' : "");

  const renderTimeline = (el) => {
    const { steps, current } = S.contract;
    el.innerHTML = steps.map((s, i) => `
      <li class="timeline__step ${i < current ? "is-done" : i === current ? "is-current" : ""}">
        <span class="timeline__dot">${i < current ? icon("check") : i + 1}</span>
        <div><h4>${s.title}</h4><p>${s.text}</p></div>
      </li>`).join("");
  };
  $$("[data-timeline]").forEach(renderTimeline);

  $$("[data-leaders]").forEach((el) => {
    el.innerHTML = S.leaders.map((l) => `
      <article class="leader reveal">
        <div class="leader__photo"><span>${initials(l.name)}</span><small>Headshot</small></div>
        <div class="leader__body">
          <h3>${l.name}</h3><p class="leader__role">${l.role}</p>
          <div class="leader__contact">
            <a href="tel:${l.phone}">${icon("phone")}${l.phone}</a>
            <a href="mailto:${l.email}">${icon("mail")}${l.email}</a>
          </div>
        </div>
      </article>`).join("");
  });

  $$("[data-events]").forEach((el) => {
    el.innerHTML = S.events.map((e) => `
      <a class="event" href="#">
        <span class="event__date"><span>${fmtDate(e.date, { month: "short" })}</span><strong>${fmtDate(e.date, { day: "numeric" })}</strong></span>
        <span><h4>${e.title}${sample(e.sample)}</h4><p>${icon("clock")}${e.meta}</p></span>
      </a>`).join("");
  });

  $$("[data-calls]").forEach((el) => {
    el.innerHTML = S.calls.map((c) => `
      <a href="communications.html#All-Pilot Call"><span class="ico">${icon("play")}</span>
        <span><strong>${c.title}</strong><small>${c.length}</small></span><time>${fmtDate(c.date)}</time></a>`).join("");
  });

  /* Home: feature + list */
  const feature = $("[data-news-feature]");
  if (feature) {
    const f = S.comms.find((c) => c.featured) || S.comms[0];
    feature.innerHTML = `${pillFor(f.type)}<h3>${f.title}</h3><p>${f.excerpt}</p>
      <p style="margin-top:18px;display:flex;gap:16px;align-items:center;font-size:14px">${fmtDate(f.date)}${sample(f.sample)}<span class="link-arrow" style="color:#fff">Read update ${icon("arrow")}</span></p>`;
    $("[data-news-list]").innerHTML = S.comms.filter((c) => c !== f).slice(0, 4).map((c) => `
      <a class="news-item" href="communications.html">
        ${pillFor(c.type)}<time datetime="${c.date}">${fmtDate(c.date)}</time>
        <h4>${c.title}</h4><p>${c.excerpt}</p>
      </a>`).join("");
  }

  /* ---------- Filterable lists (resources, committees, comms) ---------- */
  function filterable({ root, items, groups, groupKey, render, empty, text }) {
    const chips = $(".chips", root);
    const input = $(".searchbox input", root);
    const out = $("[data-out]", root);
    let active = "All";
    const hash = decodeURIComponent(location.hash.slice(1));
    if (groups.includes(hash)) active = hash;
    chips.innerHTML = ["All", ...groups].map((g) => `<button class="chip" aria-pressed="${g === active}" data-g="${esc(g)}">${esc(g)}</button>`).join("");
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      const list = items.filter((i) => (active === "All" || i[groupKey] === active) && (!q || text(i).toLowerCase().includes(q)));
      out.innerHTML = list.length ? render(list, active) : `<div class="empty-state">${empty}</div>`;
      $$(".reveal", out).forEach((r) => r.classList.add("is-in"));
    };
    chips.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      active = b.dataset.g;
      $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", c === b));
      draw();
    });
    input.addEventListener("input", draw);
    draw();
  }

  const resRoot = $("[data-resources]");
  if (resRoot) {
    const items = S.resources.flatMap((g) => g.items.map((i) => ({ ...i, group: g.group })));
    filterable({
      root: resRoot, items, groupKey: "group", groups: S.resources.map((g) => g.group),
      text: (i) => i.title + " " + i.desc, empty: "No resources match that search.",
      render: (list) => S.resources.map((g) => {
        const gi = list.filter((i) => i.group === g.group);
        if (!gi.length) return "";
        return `<section class="res-group"><div class="res-group__head"><h2>${g.group}</h2><span>${gi.length} links</span></div>
          <div class="res-grid">${gi.map((i) => `
            <a class="res-card" href="${i.href || "#"}">
              <span class="res-card__icon">${icon(i.icon)}</span>
              <h3>${i.title}${i.external ? icon("external") : ""}</h3><p>${i.desc}</p>
              ${i.login ? `<span class="pill">${icon("lock")} Login</span>` : ""}
            </a>`).join("")}</div></section>`;
      }).join("")
    });
  }

  const cmteRoot = $("[data-committees]");
  if (cmteRoot) {
    filterable({
      root: cmteRoot, items: S.committees, groupKey: "group", groups: [...new Set(S.committees.map((c) => c.group))],
      text: (c) => [c.name, c.full, c.desc].join(" "), empty: "No committees match that search.",
      render: (list) => `<div class="cmte-grid">${list.map((c) => `
        <details class="cmte" id="${slug(c.name)}" data-group="${c.group}">
          <summary>
            <span class="cmte__icon">${icon(c.icon)}</span>
            <span><h3>${c.name}${c.verify ? ' <span class="tag-sample" title="Confirm this committee exists">Verify</span>' : ""}</h3><small>${c.full || c.group}</small></span>
            ${icon("chevron")}
          </summary>
          <div class="cmte__body">
            <p>${c.desc}</p>
            <div class="cmte__chair"><span class="rep__avatar">—</span><div><strong>Committee Chair</strong><br><small>Name · email placeholder</small></div></div>
            <div class="cmte__actions">
              <a class="btn btn--navy btn--sm" href="#">${icon("mail")} Contact</a>
              <a class="btn btn--outline btn--sm" href="#volunteer">Volunteer</a>
            </div>
          </div>
        </details>`).join("")}</div>`
    });
    // Open + scroll to a committee from a deep link (#hims)
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.tagName === "DETAILS") { target.open = true; setTimeout(() => target.scrollIntoView({ block: "center" }), 100); }
  }

  const commRoot = $("[data-comms]");
  if (commRoot) {
    filterable({
      root: commRoot, items: S.comms, groupKey: "type", groups: Object.keys(S.commTypes),
      text: (c) => c.title + " " + c.excerpt, empty: "Nothing here yet.",
      render: (list) => `<div class="comms-grid">${list.map((c) => `
        <a class="comm" href="#">
          <div class="comm__meta">${pillFor(c.type)}<time datetime="${c.date}">${fmtDate(c.date)}</time></div>
          <h3>${c.title}</h3><p>${c.excerpt}</p>
          <span class="link-arrow" style="font-size:14px">${c.type === "All-Pilot Call" ? "Watch recording" : "Read more"} ${icon("arrow")}</span>
        </a>`).join("")}</div>`
    });
  }

  /* ---------- Mock forms: never submit anywhere ---------- */
  $$("[data-mock-form]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    f.innerHTML = '<p style="font-weight:600">Thanks, you’re on the list. (Mock: nothing was sent.)</p>';
  }));

  /* ---------- Replace <i data-icon> placeholders ---------- */
  $$("i[data-icon]").forEach((i) => (i.outerHTML = icon(i.dataset.icon, i.className)));

  /* ---------- Hero video ---------- */
  const hero = $(".hero");
  const video = $(".hero__video");
  if (hero && video) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const toggle = $("[data-video-toggle]");
    const showVideo = () => hero.classList.add("has-video");
    video.addEventListener("loadeddata", showVideo);
    if (video.readyState >= 2) showVideo();
    if (reduce) video.removeAttribute("autoplay"), video.pause();
    const sync = () => {
      const playing = !video.paused;
      toggle.querySelector(".ico").innerHTML = icon(playing ? "pause" : "play");
      toggle.querySelector(".lbl").textContent = playing ? "Pause video" : "Play video";
    };
    toggle?.addEventListener("click", () => {
      if (!hero.classList.contains("has-video")) { hero.classList.toggle("is-paused"); return; }
      video.paused ? video.play() : video.pause();
    });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Phone mock tiles ---------- */
  $$("[data-phone]").forEach((el) => {
    const tiles = [["Settings", "clipboard"], ["My Pilot Group", "users"], ["ALPA Int'l", "megaphone"], ["Jumpseat", "plane"], ["Member Resources", "book"], ["DART", "target", 1]];
    el.innerHTML = tiles.map(([t, i, hot]) => `<div class="phone__tile ${hot ? "is-hot" : ""}">${icon(i)}${t}</div>`).join("");
  });
})();
