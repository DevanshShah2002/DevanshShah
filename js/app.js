/* ==========================================================================
   APP — boot, intro, menu, summary flow, sections, terminal, HUD.
   State machine: STARTUP → INTRO → MENU → SUMMARY → QUESTION
                  → TRANSITION → SECTION → MENU …
   Every animated stage is skippable; reduced-motion is honored everywhere.
   ========================================================================== */

"use strict";

/* ---------------- state ---------------- */
const S = {
  currentScene: "startup",   // startup | intro | menu | summary | transition | section
  currentSection: null,
  selectedMenuItem: null,
  isIntroSkipped: false,
  isSoundEnabled: false,
  prefersReducedMotion: false,
  seenIntro: false,
  seq: null,                 // active dog sequence handle
  introTimers: []
};

const MENU = [
  { key: "about",        num: "01", title: "ABOUT ME",                  icon: "👤", desc: "The human behind the models — profile, intro, and strengths." },
  { key: "skills",       num: "02", title: "TECHNICAL SKILLS",          icon: "🧰", desc: "The real toolkit, grouped and evidence-linked. No fake percentages." },
  { key: "experience",   num: "03", title: "EXPERIENCE",                icon: "💼", desc: "Engineering in the real world — roles, dates, and impact." },
  { key: "projects",     num: "04", title: "PROJECTS",                 icon: "🛠️", desc: "Things built: Adaptive RAG, agents, fine-tuning, video AI." },
  { key: "genai",        num: "05", title: "GENERATIVE AI & AGENTIC AI",icon: "🤖", desc: "The lab view — agentic loops, retrieval systems, trade-offs." },
  { key: "research",     num: "06", title: "RESEARCH & PUBLICATIONS",  icon: "🔬", desc: "Peer-reviewed work and ongoing investigations, honestly labeled." },
  { key: "education",    num: "07", title: "EDUCATION",                 icon: "🎓", desc: "The foundation — verified degrees and certifications." },
  { key: "achievements", num: "08", title: "ACHIEVEMENTS",              icon: "🏆", desc: "Signal over noise — only numbers that come with receipts." },
  { key: "contact",      num: "09", title: "CONTACT",                   icon: "✉️", desc: "Let's build something intelligent — links, email, resume." }
];
const SECTION_BY_KEY = Object.fromEntries(MENU.map(m => [m.key, m]));

/* ---------------- tiny sound engine (off by default) ---------------- */
const Sound = {
  ctx: null,
  ensure() {
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* no audio */ } }
    return this.ctx;
  },
  tone(freq, ms, type = "sine", gain = 0.05) {
    if (!S.isSoundEnabled) return;
    const ctx = this.ensure(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + ms / 1000);
  },
  click() { this.tone(660, 70, "triangle", 0.04); },
  chime() { this.tone(523, 140, "sine", 0.05); setTimeout(() => this.tone(784, 180, "sine", 0.05), 110); },
  success() { this.tone(587, 100, "sine", 0.05); setTimeout(() => this.tone(880, 160, "sine", 0.05), 90); }
};

/* ---------------- dom refs ---------------- */
const $ = (id) => document.getElementById(id);
const els = {};
function cacheEls() {
  ["boot-screen","boot-body","hud","skip-intro","app","hero-screen","robot-platform","robot-mount",
   "hero-bubble","bubble-skip","menu-grid","menu-head-suffix","summary-panel","summary-kicker",
   "summary-body","explore-ask","btn-explore","btn-summary-only","btn-back-menu",
   "section-screen","section-eyebrow","section-title","section-sub","section-body","section-robot",
   "btn-section-back","btn-replay-intro","term-log","term-input",
   "modal-backdrop","modal-kicker","modal-title","modal-body","modal-close"
  ].forEach(id => els[id] = $(id));
}

/* ---------------- prefs ---------------- */
function loadPrefs() {
  try {
    S.isSoundEnabled = localStorage.getItem("dshah_sound") === "1";
    const m = localStorage.getItem("dshah_motion");
    S.prefersReducedMotion = m ? m === "reduced"
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    S.seenIntro = localStorage.getItem("dshah_seen_intro") === "1";
  } catch (e) { /* storage unavailable */ }
  if (S.prefersReducedMotion) document.documentElement.classList.add("reduced-motion");
}
function savePref(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

/* ---------------- robots ---------------- */
let heroRobot = null, sectionRobot = null, stage = null, dogSeq = null;

function initRobots() {
  heroRobot = new Robot(els["robot-mount"]);
  sectionRobot = new Robot(els["section-robot"]);
  stage = buildStageDOM();
  document.body.appendChild(stage);
  dogSeq = new DogSequence(stage);
  stage.querySelector(".stage-skip").addEventListener("click", () => dogSeq.skip());
}

/* ---------------- boot ---------------- */
const BOOT_LINES = [
  ["[INITIALIZING PERSONAL AI INTERFACE...]", ""],
  ["[LOADING <span class='tag'>DEVANSH.SHAH</span> PROFILE...]", ""],
  ["[CONNECTING TO AI WORKSPACE...]", ""],
  ["[<span class='tag'>✓</span> PERSONAL AGENT ONLINE]", "ok"]
];

function runBoot(done) {
  const body = els["boot-body"];
  body.innerHTML = "";
  if (S.prefersReducedMotion) { done(); return; }
  let i = 0;
  const bar = document.createElement("div");
  bar.className = "boot-bar"; bar.innerHTML = "<span></span>";
  const step = () => {
    if (i < BOOT_LINES.length) {
      const [html, cls] = BOOT_LINES[i];
      const div = document.createElement("div");
      div.className = "boot-line " + cls;
      div.innerHTML = html;
      body.appendChild(div);
      requestAnimationFrame(() => div.classList.add("show"));
      bar.firstChild.style.width = ((i + 1) / (BOOT_LINES.length + 1) * 100) + "%";
      i++;
      S.introTimers.push(setTimeout(step, 340));
    } else {
      body.appendChild(bar);
      bar.firstChild.style.transition = "width .3s ease";
      bar.firstChild.style.width = "100%";
      Sound.chime();
      S.introTimers.push(setTimeout(done, 420));
    }
  };
  step();
}

/* ---------------- intro ---------------- */
function clearIntroTimers() { S.introTimers.forEach(clearTimeout); S.introTimers = []; }

function startIntro() {
  S.currentScene = "intro";
  S.isIntroSkipped = false;
  clearIntroTimers();
  heroRobot.reset();
  els["skip-intro"].classList.add("is-visible");
  els["menu-grid"].innerHTML = "";
  hideSummary();
  heroRobot.hideBubble(els["hero-bubble"]);

  const platform = els["robot-platform"];
  const finishIntro = () => {
    if (S.isIntroSkipped) return;
    S.isIntroSkipped = true;
    clearIntroTimers();
    heroRobot.skipSay();
    const portal = platform.querySelector(".portal");
    if (portal) portal.remove();
    heroRobot.setState("idle", "happy");
    els["skip-intro"].classList.remove("is-visible");
    showMenu();
    savePref("dshah_seen_intro", "1");
    S.seenIntro = true;
  };
  S.finishIntro = finishIntro;

  if (S.prefersReducedMotion) {
    heroRobot.setState("idle", "happy");
    els["hero-bubble"].querySelector(".bubble-text").innerHTML =
      escapeHtml(PORTFOLIO.scripts.intro.join(" "));
    els["hero-bubble"].classList.add("is-visible");
    finishIntro();
    return;
  }

  // portal + entrance
  const portal = document.createElement("div");
  portal.className = "portal"; portal.setAttribute("aria-hidden", "true");
  platform.appendChild(portal);
  els["robot-mount"].classList.add("robot-enter");
  heroRobot.setState("greeting", "happy");
  Sound.chime();

  S.introTimers.push(setTimeout(() => {
    if (S.isIntroSkipped) return;
    const p = platform.querySelector(".portal"); if (p) p.remove();
    heroRobot.say(PORTFOLIO.scripts.intro, els["hero-bubble"], { charMs: 20 })
      .then(() => { if (!S.isIntroSkipped) finishIntro(); });
  }, 1500));
}

function skipIntroNow() { if (S.currentScene === "intro" && S.finishIntro) S.finishIntro(); }

/* ---------------- menu ---------------- */
function showMenu() {
  S.currentScene = "menu";
  S.selectedMenuItem = null;
  const grid = els["menu-grid"];
  grid.innerHTML = "";
  MENU.forEach((m, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "menu-card"; b.setAttribute("role", "listitem");
    b.dataset.key = m.key;
    b.innerHTML = `
      <span class="mnum">${m.num} /</span>
      <span class="mtitle"><span class="mico" aria-hidden="true">${m.icon}</span>${m.title}</span>
      <p class="mdesc">${m.desc}</p>
      <span class="mgo">SELECT MODULE →</span>`;
    b.addEventListener("click", () => selectModule(m.key));
    grid.appendChild(b);
    if (!S.prefersReducedMotion) {
      setTimeout(() => b.classList.add("is-in"), 90 * i);
    } else { b.classList.add("is-in"); }
  });
  // keep the invite line visible in the bubble
  const bt = els["hero-bubble"].querySelector(".bubble-text");
  bt.innerHTML = escapeHtml("What would you like to explore? Pick a module — I'll brief you first.");
  els["hero-bubble"].classList.add("is-visible");
  heroRobot.setState("idle", "happy");
  scrollToTop();
}

/* ---------------- summary → question flow ---------------- */
function hideSummary() {
  els["summary-panel"].classList.remove("is-visible");
  els["btn-explore"].style.display = "";
  els["btn-summary-only"].style.display = "";
  els["explore-ask"].textContent = PORTFOLIO.scripts.askExplore;
}

function selectModule(key) {
  const m = SECTION_BY_KEY[key];
  if (!m) return;
  Sound.click();
  S.selectedMenuItem = key;
  S.currentScene = "summary";
  heroRobot.setState("explaining", "happy");
  document.querySelectorAll(".menu-card").forEach(c =>
    c.style.borderColor = c.dataset.key === key ? "var(--cyan)" : "");

  const introLine = PORTFOLIO.scripts.sectionIntros[key] || "";
  const summary = PORTFOLIO.scripts.sectionSummaries[key] || "";
  heroRobot.say([introLine], els["hero-bubble"], { charMs: 18 }).then(() => {
    if (S.selectedMenuItem !== key) return; // user moved on
    heroRobot.setState("listening", "listening");
    els["summary-kicker"].textContent = `// MODULE BRIEF — ${m.num} ${m.title}`;
    els["summary-body"].textContent = summary;
    els["explore-ask"].textContent = PORTFOLIO.scripts.askExplore;
    els["summary-panel"].classList.add("is-visible");
    els["summary-panel"].scrollIntoView({ behavior: S.prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
  });
}

function onExploreYes() {
  const key = S.selectedMenuItem;
  if (!key) return;
  Sound.success();
  S.currentScene = "transition";
  hideSummary();
  heroRobot.hideBubble(els["hero-bubble"]);
  heroRobot.setState("excited", "excited");

  dogSeq.onDone = () => openSection(key);
  const handle = dogSeq.play({
    reduced: S.prefersReducedMotion,
    finalLine: PORTFOLIO.scripts.letsGo
  });
  S.seq = handle;
}

function onSummaryOnly() {
  Sound.click();
  heroRobot.setState("idle", "happy");
  heroRobot.say(["Summary's all yours. Pick another module anytime — or take the full tour when you're ready."],
    els["hero-bubble"], { charMs: 16 });
  els["explore-ask"].textContent = "— summary kept above. Choose another module anytime.";
  els["btn-explore"].style.display = "none";
  els["btn-summary-only"].style.display = "none";
}

function onBackToMenu() {
  Sound.click();
  cancelSeq();
  S.selectedMenuItem = null;
  hideSummary();
  heroRobot.setState("returning", "happy");
  setTimeout(() => showMenu(), S.prefersReducedMotion ? 0 : 500);
}

/* ---------------- internal navigation (History API) ----------------
   Views: home (#/) · section (#/section/<key>) · case (#/case/<id>).
   Forward navigation pushes; in-app back controls replace (no dupes);
   popstate routes without pushing. Every detail view has a return path. */
let navSeq = 0;
let modalPushed = false;

function pushNav(view, data, hash) {
  navSeq++;
  try { history.pushState({ view, ...data, seq: navSeq }, "", hash); } catch (e) {}
}
function replaceNav(view, data, hash) {
  try { history.replaceState({ view, ...data, seq: navSeq }, "", hash); } catch (e) {}
}

function doCloseModal() {
  els["modal-backdrop"].classList.remove("is-open");
  document.body.style.overflow = "";
}

/* Cancel an in-flight dog sequence WITHOUT continuing to its destination. */
function cancelSeq() {
  const s = S.seq; S.seq = null;
  if (s && s.cancel) { try { s.cancel(); } catch (e) {} }
}

/* Render home without touching history (used by popstate + silent paths). */
function renderHome() {
  cancelSeq();
  doCloseModal();
  modalPushed = false;
  S.currentScene = "menu";
  S.currentSection = null;
  S.selectedMenuItem = null;
  hideSummary();
  els["section-screen"].classList.remove("is-active");
  els["hero-screen"].classList.add("is-active");
  showMenu();
  document.title = "Devansh Shah | AI Engineer, Generative AI & Agentic AI";
}

/* In-app "back/home" control: replace so we never stack duplicate homes. */
function navHome() {
  renderHome();
  replaceNav("home", {}, "#/");
}

function openSection(key, mode = "push") {
  const m = SECTION_BY_KEY[key];
  if (!m) return;
  cancelSeq();
  doCloseModal();
  modalPushed = false;
  S.currentSection = key;
  S.currentScene = "section";
  S.selectedMenuItem = null;
  hideSummary();
  heroRobot.hideBubble(els["hero-bubble"]);
  els["hero-screen"].classList.remove("is-active");
  els["section-screen"].classList.add("is-active");
  els["section-eyebrow"].textContent = `// MODULE ${m.num}`;
  els["section-title"].textContent = RENDERERS[key].heading;
  els["section-sub"].textContent = RENDERERS[key].sub || "";
  els["section-body"].innerHTML = "";
  RENDERERS[key].render(els["section-body"]);
  sectionRobot.reset();
  sectionRobot.setState("greeting", "happy");
  setTimeout(() => sectionRobot.setState("idle", "happy"), 2200);
  scrollToTop();
  document.title = `Devansh Shah | ${m.title}`;
  if (mode === "push") pushNav("section", { key }, "#/section/" + key);
  else if (mode === "replace") replaceNav("section", { key }, "#/section/" + key);
  termPrint(`→ opened module ${m.num} / ${m.title.toLowerCase()}`, "ok");
}

/* Kept for compatibility with existing callers: in-app back-to-menu. */
function backToMenu() { navHome(); }
function backToMenuSilent() { renderHome(); }

function parseHash() {
  const h = location.hash || "";
  let m = h.match(/^#\/section\/([a-z]+)$/);
  if (m && SECTION_BY_KEY[m[1]]) return { view: "section", key: m[1] };
  m = h.match(/^#\/case\/([a-z0-9-]+)$/i);
  if (m && PORTFOLIO.projects.items.some(p => p.id === m[1].toLowerCase()))
    return { view: "case", id: m[1].toLowerCase() };
  return null;
}

/* Deep link entry: skip the cinematic intro and establish the view.
   Safe to call mid-session too (cancels any in-flight intro first). */
function enterDeepLink(deep) {
  clearIntroTimers();
  heroRobot.skipSay();
  els["skip-intro"].classList.remove("is-visible");
  els["boot-screen"].style.display = "none";
  els["app"].hidden = false;
  els["hud"].hidden = false;
  showMenu();
  heroRobot.setState("idle", "happy");
  S.seenIntro = true;
  savePref("dshah_seen_intro", "1");
  if (deep.view === "section") openSection(deep.key, "replace");
  else { openSection("projects", "replace"); openCaseStudy(deep.id, "replace"); }
}

function routePopState(st) {
  doCloseModal();
  modalPushed = false;
  if (!st || st.view === "home" || st.view === "brief") renderHome();
  else if (st.view === "section" && SECTION_BY_KEY[st.key]) openSection(st.key, "none");
  else if (st.view === "case" && PORTFOLIO.projects.items.some(p => p.id === st.id)) {
    openSection("projects", "none");
    openCaseStudy(st.id, "none");
  }
  else renderHome();
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: S.prefersReducedMotion ? "auto" : "smooth" }); }

/* ---------------- section renderers ---------------- */
const RENDERERS = {
  about: {
    heading: PORTFOLIO.about.heading,
    sub: "Profile, in his own words — verified against the resume.",
    render(el) {
      const a = PORTFOLIO.about, id = PORTFOLIO.identity;
      el.innerHTML = `
      <div class="about-grid">
        <div>
          <div class="photo-frame">
            <img src="${a.photo}" alt="${escapeHtml(a.photoAlt)}" loading="lazy">
            <div class="scan" aria-hidden="true"></div>
          </div>
          <div class="identity-lines" aria-label="Identity summary">
            ${a.identityLines.map(([k, v]) => `<div class="irow"><span class="ikey">${k}</span><span class="ival">${escapeHtml(v)}</span></div>`).join("")}
          </div>
        </div>
        <div class="panel">
          ${a.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
          <h4 class="mono" style="color:var(--cyan);letter-spacing:.14em;font-size:.78rem;margin:1.4rem 0 .4rem">STRONGEST VERIFIED AREAS</h4>
          <ul class="strength-list">${a.strengths.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
          <div class="about-links">
            <a class="btn btn-sm" href="${id.linkedin}" target="_blank" rel="noopener">in LINKEDIN</a>
            <a class="btn btn-sm" href="${id.github}" target="_blank" rel="noopener">⌨ GITHUB</a>
            <a class="btn btn-sm btn-primary" href="${id.resumeFile}" download>⬇ DOWNLOAD RESUME</a>
          </div>
        </div>
      </div>
      <div class="panel ascii-panel">
        <h4 class="mono" style="color:var(--cyan);letter-spacing:.14em;font-size:.78rem;margin:0 0 .8rem">// DEVANSH, RENDERED IN ASCII</h4>
        <img src="assets/images/ascii-face.png" alt="ASCII art portrait of Devansh Shah" loading="lazy">
        <p style="color:var(--muted);font-size:.85rem">Try the terminal command <span class="mono" style="color:var(--green)">ascii</span> anytime. 🖥️</p>
      </div>`;
    }
  },

  skills: {
    heading: PORTFOLIO.skills.heading,
    sub: PORTFOLIO.skills.note,
    render(el) {
      const sk = PORTFOLIO.skills;
      el.innerHTML = `
        <div class="skill-search">
          <input id="skill-filter" type="search" placeholder="filter skills… (e.g. rag, python)" aria-label="Filter skills">
        </div>
        <div class="skill-cats" id="skill-cats"></div>
        <div class="skill-tip" id="skill-tip" aria-live="polite">Hover or tap a skill for context.</div>`;
      const catsEl = el.querySelector("#skill-cats");
      const tipEl = el.querySelector("#skill-tip");
      const renderCats = (filter) => {
        catsEl.innerHTML = "";
        const f = (filter || "").trim().toLowerCase();
        sk.categories.forEach(cat => {
          const skills = cat.skills.filter(s => !f || s.name.toLowerCase().includes(f) || s.context.toLowerCase().includes(f));
          if (!skills.length) return;
          const div = document.createElement("div");
          div.className = "skill-cat panel";
          div.innerHTML = `<h3><span aria-hidden="true">${cat.icon}</span> ${escapeHtml(cat.name)} <span class="count">${skills.length}</span></h3>
            <div class="chip-row"></div>`;
          const row = div.querySelector(".chip-row");
          skills.forEach(s => {
            const c = document.createElement("button");
            c.type = "button"; c.className = "chip";
            c.innerHTML = `<span class="tip">${escapeHtml(s.context)}</span>${escapeHtml(s.name)}`;
            const show = () => { tipEl.innerHTML = `<b>${escapeHtml(s.name)}</b> — ${escapeHtml(s.context)}`; };
            c.addEventListener("mouseenter", show);
            c.addEventListener("focus", show);
            c.addEventListener("click", show);
            row.appendChild(c);
          });
          catsEl.appendChild(div);
        });
        if (!catsEl.children.length) catsEl.innerHTML = `<p style="color:var(--muted)">No skills match “${escapeHtml(filter)}”.</p>`;
      };
      renderCats("");
      el.querySelector("#skill-filter").addEventListener("input", (e) => renderCats(e.target.value));
    }
  },

  experience: {
    heading: PORTFOLIO.experience.heading,
    sub: "Actual roles, actual dates, actual work. Select a node for the full brief.",
    render(el) {
      const ex = PORTFOLIO.experience;
      const ol = document.createElement("ol");
      ol.className = "timeline";
      ex.entries.forEach((e, i) => {
        const li = document.createElement("li");
        li.className = "tl-item";
        li.innerHTML = `
          <div class="tl-card">
            <div class="dates">${escapeHtml(e.dates)}</div>
            <h3>${escapeHtml(e.title)}</h3>
            <div class="org">${escapeHtml(e.org)}</div>
            <div class="loc">${escapeHtml(e.location)}</div>
            <p class="sum">${escapeHtml(e.summary)}</p>
            <button class="btn btn-sm btn-ghost tl-toggle" type="button" aria-expanded="false">+ FULL DETAILS</button>
            <div class="tl-details">
              <ul>${e.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
              <div class="stack-row">${e.stack.map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join("")}</div>
            </div>
          </div>`;
        const btn = li.querySelector(".tl-toggle");
        btn.addEventListener("click", () => {
          const open = li.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", String(open));
          btn.textContent = open ? "− COLLAPSE" : "+ FULL DETAILS";
          if (open) { sectionRobot.setState("explaining", "happy"); setTimeout(() => sectionRobot.setState("idle", "neutral"), 1800); }
          Sound.click();
        });
        ol.appendChild(li);
      });
      el.appendChild(ol);
    }
  },

  projects: {
    heading: PORTFOLIO.projects.heading,
    sub: "Every project below comes from the resume or the linked GitHub. Open a card for the engineering case study.",
    render(el) {
      const grid = document.createElement("div");
      grid.className = "proj-grid";
      PORTFOLIO.projects.items.forEach(p => {
        const card = document.createElement("article");
        card.className = "proj-card";
        const ongoing = /ongoing/i.test(p.tagline);
        card.innerHTML = `
          ${ongoing ? `<span class="proj-status">● ONGOING</span>` : ""}
          <h3>${escapeHtml(p.name)}</h3>
          <p class="tagline">${escapeHtml(p.tagline)}</p>
          <div class="stack-row">${p.stack.slice(0, 6).map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join("")}</div>
          <div class="actions">
            <button class="btn btn-sm btn-primary" type="button" data-case="${p.id}">OPEN CASE STUDY →</button>
            ${p.github ? `<a class="btn btn-sm" href="${p.github}" target="_blank" rel="noopener">⌨ GITHUB</a>` : ""}
          </div>`;
        card.querySelector("[data-case]").addEventListener("click", () => openCaseStudy(p.id));
        grid.appendChild(card);
      });
      el.appendChild(grid);
      const prov = document.createElement("p");
      prov.className = "provenance";
      prov.textContent = "Provenance: project names, stacks, and results are taken from the uploaded resume. The '+81% vs oracle baseline' figure for Adaptive RAG is reported from the project notes, not a published source.";
      el.appendChild(prov);
    }
  },

  genai: {
    heading: PORTFOLIO.genai.heading,
    sub: PORTFOLIO.genai.intro,
    render(el) {
      const g = PORTFOLIO.genai;
      const grid = document.createElement("div");
      grid.className = "lab-grid";
      g.systems.forEach(sys => {
        const card = document.createElement("article");
        card.className = "lab-card";
        card.innerHTML = `
          <h3>${escapeHtml(sys.name)}</h3>
          <div class="based">BASED ON · ${escapeHtml(sys.basedOn).toUpperCase()}</div>
          <p>${escapeHtml(sys.description)}</p>
          <div class="loop-flow" aria-label="System loop">
            ${sys.loop.map((n, i) => `<span class="loop-node${/\?/.test(n) ? " decision" : ""}">${escapeHtml(n)}</span>`).join("")}
          </div>`;
        grid.appendChild(card);
      });
      el.appendChild(grid);
      const t = document.createElement("div");
      t.className = "panel"; t.style.marginTop = "1.2rem";
      t.innerHTML = `
        <h4 class="mono" style="color:var(--cyan);letter-spacing:.14em;font-size:.78rem;margin:0 0 .4rem">// ENGINEERING TRADE-OFFS</h4>
        <table class="trade-table"><thead><tr><th>TRADE-OFF</th><th>HOW DEVANSH HANDLED IT</th></tr></thead>
        <tbody>${g.tradeoffs.map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join("")}</tbody></table>
        <p class="provenance">These diagrams are educational representations of real systems — not live models.</p>`;
      el.appendChild(t);
    }
  },

  research: {
    heading: PORTFOLIO.research.heading,
    sub: "Published means published. Ongoing means ongoing.",
    render(el) {
      const r = PORTFOLIO.research;
      r.publications.forEach(p => {
        const card = document.createElement("article");
        card.className = "pub-card";
        card.innerHTML = `
          <div class="venue">${escapeHtml(p.venue)}<span class="status-pill">${escapeHtml(p.status).toUpperCase()}</span></div>
          <h3>${escapeHtml(p.title)}</h3>
          <div class="authors">${escapeHtml(p.authors)} (${escapeHtml(p.year)})</div>
          <dl class="pub-meta">
            <dt>RESEARCH Q</dt><dd>${escapeHtml(p.question)}</dd>
            <dt>METHOD</dt><dd>${escapeHtml(p.methodology)}</dd>
            <dt>FINDINGS</dt><dd>${escapeHtml(p.findings)}</dd>
          </dl>`;
        el.appendChild(card);
      });
      const h = document.createElement("h4");
      h.className = "mono"; h.style.cssText = "color:var(--yellow);letter-spacing:.14em;font-size:.78rem;margin:1.6rem 0 .8rem";
      h.textContent = "// ONGOING (UNPUBLISHED)";
      el.appendChild(h);
      r.ongoing.forEach(o => {
        const card = document.createElement("article");
        card.className = "pub-card";
        card.innerHTML = `
          <div class="venue" style="color:var(--yellow)">${escapeHtml(o.status)}<span class="status-pill ongoing">NOT PUBLISHED</span></div>
          <h3>${escapeHtml(o.title)}</h3>
          <p style="font-size:.93rem">${escapeHtml(o.description)}</p>
          ${o.link ? `<a class="btn btn-sm" href="${o.link}" target="_blank" rel="noopener">⌨ REPO</a>` : ""}`;
        el.appendChild(card);
      });
    }
  },

  education: {
    heading: PORTFOLIO.education.heading,
    sub: "Verified degrees, real dates. Nothing invented.",
    render(el) {
      PORTFOLIO.education.entries.forEach(e => {
        const card = document.createElement("article");
        card.className = "edu-card";
        card.innerHTML = `
          <div class="dates">${escapeHtml(e.dates)}</div>
          <h3>${escapeHtml(e.degree)}</h3>
          <div class="school">${escapeHtml(e.school)}</div>
          ${e.details.length ? `<ul>${e.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>` : ""}`;
        el.appendChild(card);
      });
      const c = document.createElement("div");
      c.className = "panel"; c.style.marginTop = "1.2rem";
      c.innerHTML = `<h4 class="mono" style="color:var(--cyan);letter-spacing:.14em;font-size:.78rem;margin:0 0 .6rem">// CERTIFICATIONS</h4>
        <div class="cert-row">${PORTFOLIO.education.certifications.map(x => `<span class="cert">✓ ${escapeHtml(x)}</span>`).join("")}</div>`;
      el.appendChild(c);
    }
  },

  achievements: {
    heading: PORTFOLIO.achievements.heading,
    sub: "Large numbers, small print included.",
    render(el) {
      const grid = document.createElement("div");
      grid.className = "ach-grid";
      PORTFOLIO.achievements.items.forEach(a => {
        const card = document.createElement("div");
        card.className = "ach-card";
        card.innerHTML = `<div class="metric">${escapeHtml(a.metric)}</div>
          <div class="alabel">${escapeHtml(a.label)}</div>
          <p class="acontext">${escapeHtml(a.context)}</p>`;
        grid.appendChild(card);
      });
      el.appendChild(grid);
      const l = document.createElement("div");
      l.className = "panel"; l.style.marginTop = "1.2rem";
      l.innerHTML = `<h4 class="mono" style="color:var(--cyan);letter-spacing:.14em;font-size:.78rem;margin:0 0 .6rem">// LEADERSHIP & SERVICE</h4>
        <ul class="strength-list">${PORTFOLIO.achievements.leadership.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
      el.appendChild(l);
    }
  },

  contact: {
    heading: PORTFOLIO.contact.heading,
    sub: "",
    render(el) {
      const c = PORTFOLIO.contact, id = PORTFOLIO.identity;
      el.innerHTML = `
      <div class="contact-center">
        <div class="mini-robot" id="contact-robot" data-robot-id="contact" aria-hidden="true"></div>
        <p style="font-size:1.05rem">${escapeHtml(c.robotLine)}</p>
        <div class="channel-row">
          ${c.channels.map(ch => ch.download
            ? `<a class="btn btn-primary" href="${ch.url}" download>${escapeHtml(ch.label)} ⬇</a>`
            : `<a class="btn" href="${ch.url}" ${/^https/.test(ch.url) ? 'target="_blank" rel="noopener"' : ""}>${escapeHtml(ch.label)} →</a>`).join("")}
        </div>
        <p class="mono" style="color:var(--muted);font-size:.8rem">${escapeHtml(id.email)}</p>
        <p class="mono" style="color:var(--cyan);font-size:.85rem;margin-top:1.6rem">${escapeHtml(c.goodbye)} 🤖</p>
      </div>`;
      const cr = new Robot(el.querySelector("#contact-robot"));
      cr.setState("waving", "happy");
      setTimeout(() => cr.setState("idle", "happy"), 4000);
    }
  }
};

/* ---------------- case study modal ---------------- */
function openCaseStudy(id, mode = "push") {
  const p = PORTFOLIO.projects.items.find(x => x.id === id);
  if (!p || !p.caseStudy) return;
  const cs = p.caseStudy;
  els["modal-kicker"].textContent = "// CASE STUDY — ENGINEERING NOTEBOOK";
  els["modal-title"].textContent = p.name;
  els["modal-body"].innerHTML = `
    <p style="color:var(--muted)">${escapeHtml(p.tagline)}</p>
    <div class="stack-row" style="margin:.6rem 0 1rem">${p.stack.map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join("")}</div>
    <div class="cs-section"><h4>01 · PROBLEM</h4><p>${escapeHtml(p.problem)}</p></div>
    <div class="cs-section"><h4>02 · ARCHITECTURE</h4>
      <div class="arch-flow">${cs.architecture.map(([t, d]) => `<div class="arch-step"><b>${escapeHtml(t)}</b>${escapeHtml(d)}</div>`).join("")}</div>
    </div>
    <div class="cs-section"><h4>03 · MY CONTRIBUTION</h4><p>${escapeHtml(p.contribution)}</p></div>
    <div class="cs-section"><h4>04 · ENGINEERING DECISIONS</h4><ul>${cs.decisions.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul></div>
    <div class="cs-section"><h4>05 · RESULTS</h4><ul>${p.results.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul></div>
    <div class="cs-section"><h4>06 · LIMITATIONS (HONEST)</h4><ul>${cs.limitations.map(l => `<li>${escapeHtml(l)}</li>`).join("")}</ul></div>
    <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1.2rem">
      ${p.github ? `<a class="btn btn-sm btn-primary" href="${p.github}" target="_blank" rel="noopener">⌨ VIEW ON GITHUB →</a>` : ""}
      ${p.demo ? `<a class="btn btn-sm" href="${p.demo}" target="_blank" rel="noopener">▶ LIVE DEMO</a>` : ""}
    </div>
    <p class="provenance">Architecture shown is reconstructed from the resume's description — where detail was unavailable, it's marked conceptual rather than invented.</p>`;
  els["modal-backdrop"].classList.add("is-open");
  document.body.style.overflow = "hidden";
  els["modal-close"].focus();
  Sound.click();
  modalPushed = (mode === "push");
  if (mode === "push") pushNav("case", { id }, "#/case/" + id);
  else if (mode === "replace") replaceNav("case", { id }, "#/case/" + id);
}
function closeModal() {
  if (!els["modal-backdrop"].classList.contains("is-open")) return;
  // If this modal pushed a history entry, go back through history so the
  // browser Back button and the ✕ button stay consistent.
  if (modalPushed) { modalPushed = false; history.back(); return; }
  doCloseModal();
}

/* ---------------- terminal ---------------- */
function termPrint(html, cls = "") {
  const div = document.createElement("div");
  div.className = ("tline " + cls).trim();
  div.innerHTML = html;
  els["term-log"].appendChild(div);
  els["term-log"].scrollTop = els["term-log"].scrollHeight;
}
function termPrintImage(src, alt) {
  const div = document.createElement("div");
  div.className = "tline";
  const img = document.createElement("img");
  img.src = src; img.alt = alt;
  img.style.cssText = "max-width:300px;width:100%;border-radius:8px;border:1px solid var(--border);image-rendering:pixelated;margin:.4rem 0";
  div.appendChild(img);
  els["term-log"].appendChild(div);
  els["term-log"].scrollTop = els["term-log"].scrollHeight;
}

const CMD_ALIAS = {
  help: "help", menu: "menu", home: "home", about: "about", skills: "skills",
  experience: "experience", projects: "projects", genai: "genai", agentic: "genai",
  research: "research", education: "education", achievements: "achievements",
  contact: "contact", ascii: "ascii", resume: "resume", clear: "clear", cv: "resume",
  whoami: "whoami", sudo: "sudo"
};

function runCommand(raw) {
  const input = raw.trim().toLowerCase();
  if (!input) return;
  termPrint(escapeHtml(raw), "cmd");
  const cmd = CMD_ALIAS[input];
  if (!cmd) {
    termPrint(`Hmm, I don't recognize <span class="hl">${escapeHtml(input)}</span>. Try <span class="hl">help</span> to see the available destinations.`, "warn");
    return;
  }
  Sound.click();
  switch (cmd) {
    case "help":
      termPrint(TERMINAL_COMMANDS.map(c => `<span class="hl">${c.cmd.padEnd(12)}</span> ${c.desc}`).join("<br>"));
      break;
    case "menu": case "home":
      backToMenu(); termPrint("→ returning to main menu.", "ok"); break;
    case "clear":
      els["term-log"].innerHTML = ""; break;
    case "ascii":
      termPrint("rendering devansh.shah …", "ok");
      termPrintImage("assets/images/ascii-face.png", "ASCII art portrait of Devansh Shah");
      break;
    case "resume": {
      const a = document.createElement("a");
      a.href = PORTFOLIO.identity.resumeFile; a.download = "Devansh_Shah_Resume.pdf";
      document.body.appendChild(a); a.click(); a.remove();
      termPrint("→ resume download started.", "ok"); break;
    }
    case "whoami":
      termPrint("devansh.shah — ai engineer · visitor with excellent taste", "ok"); break;
    case "sudo":
      termPrint("nice try. the robot has root, and it isn't sharing. 🤖", "warn"); break;
    default:
      // section commands
      if (S.currentScene === "transition") { termPrint("hold on — the dog is mid-fetch…", "warn"); break; }
      if (S.currentScene === "intro") { skipIntroNow(); }
      backToMenuSilent();
      selectModule(cmd);
      termPrint(`→ opening brief for <span class="hl">${cmd}</span>…`, "ok");
  }
}
function backToMenuSilent() {
  closeModal();
  S.currentScene = "menu"; S.currentSection = null;
  els["section-screen"].classList.remove("is-active");
  els["hero-screen"].classList.add("is-active");
  showMenu();
}

function initTerminal() {
  termPrint(`<span class="hl">devansh.shah</span> personal AI interface v1.0 — type <span class="hl">help</span>`, "ok");
  els["term-input"].addEventListener("keydown", (e) => {
    if (e.key === "Enter") { runCommand(e.target.value); e.target.value = ""; }
    else if (e.key === "Escape") { e.target.value = ""; e.target.blur(); }
    e.stopPropagation();
  });
}

/* ---------------- HUD ---------------- */
function initHUD() {
  document.querySelectorAll("[data-hud]").forEach(btn => {
    btn.addEventListener("click", () => {
      const a = btn.dataset.hud;
      Sound.click();
      if (a === "home") { backToMenu(); }
      else if (a === "menu") { backToMenu(); }
      else if (a === "back") {
        if (els["modal-backdrop"].classList.contains("is-open")) closeModal();
        else if (S.currentScene === "section") navHome();
        // already home: nothing to do — this control never leaves the site
      }
      else if (a === "sound") {
        S.isSoundEnabled = !S.isSoundEnabled;
        btn.setAttribute("aria-pressed", String(S.isSoundEnabled));
        savePref("dshah_sound", S.isSoundEnabled ? "1" : "0");
        if (S.isSoundEnabled) Sound.chime();
      }
      else if (a === "motion") {
        S.prefersReducedMotion = !S.prefersReducedMotion;
        document.documentElement.classList.toggle("reduced-motion", S.prefersReducedMotion);
        btn.setAttribute("aria-pressed", String(S.prefersReducedMotion));
        savePref("dshah_motion", S.prefersReducedMotion ? "reduced" : "full");
        termPrint(`motion: ${S.prefersReducedMotion ? "reduced" : "full"}`, "ok");
      }
    });
  });
  const snd = document.querySelector('[data-hud="sound"]');
  const mot = document.querySelector('[data-hud="motion"]');
  if (snd) snd.setAttribute("aria-pressed", String(S.isSoundEnabled));
  if (mot) mot.setAttribute("aria-pressed", String(S.prefersReducedMotion));
}

/* ---------------- global events ---------------- */
function initGlobal() {
  els["skip-intro"].addEventListener("click", skipIntroNow);
  els["bubble-skip"].addEventListener("click", () => heroRobot.skipSay());
  els["btn-explore"].addEventListener("click", onExploreYes);
  els["btn-summary-only"].addEventListener("click", onSummaryOnly);
  els["btn-back-menu"].addEventListener("click", onBackToMenu);
  els["btn-section-back"].addEventListener("click", backToMenu);
  els["btn-replay-intro"].addEventListener("click", () => {
    navHome();
    startIntro();
  });
  els["modal-close"].addEventListener("click", closeModal);
  els["modal-backdrop"].addEventListener("click", (e) => {
    if (e.target === els["modal-backdrop"]) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (els["modal-backdrop"].classList.contains("is-open")) closeModal();
      else if (S.currentScene === "intro") skipIntroNow();
    }
  });
  // clicking the hero interaction area skips long dialogue (not inputs/buttons)
  els["hero-screen"].addEventListener("click", (e) => {
    if (S.currentScene === "intro" && !e.target.closest("button") && !e.target.closest("input") && !e.target.closest("a")) {
      heroRobot.skipSay();
    }
  });
}

/* ---------------- boot sequence ---------------- */
function init() {
  cacheEls();
  loadPrefs();
  initRobots();
  initHUD();
  initTerminal();
  initGlobal();
  Cursor.init();
  Chatbot.init({
    onExplore: (key) => openSection(key, "push"),
    onHome: () => navHome()
  });
  window.addEventListener("popstate", (e) => routePopState(e.state));

  runBoot(() => {
    els["boot-screen"].style.display = "none";
    els["app"].hidden = false;
    els["hud"].hidden = false;
    const deep = parseHash();
    if (deep) enterDeepLink(deep);
    else {
      replaceNav("home", {}, "#/");
      startIntro();
    }
  });

  // Same-document hash edits (manual hash change, external # links):
  // pushState/replaceState never fire this, so no interference with popstate.
  window.addEventListener("hashchange", () => {
    const deep = parseHash();
    if (deep && S.currentScene !== "startup") enterDeepLink(deep);
  });
}

document.addEventListener("DOMContentLoaded", init);
