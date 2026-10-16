/* ==========================================================================
   CMD CHATBOT — floating terminal-style portfolio assistant.
   Predefined interactive guide (NOT an LLM): 9 options -> summary ->
   Explore in Detail / Choose Another Option. Vanilla JS, local content.
   State is preserved when navigating: exploring minimizes the panel,
   reopening restores the last viewed option.
   ========================================================================== */

"use strict";

const CHATBOT_OPTIONS = [
  { key: "about",        label: "About Me",              icon: "👤" },
  { key: "skills",       label: "Skills & Technologies", icon: "🧰" },
  { key: "experience",   label: "Work Experience",       icon: "💼" },
  { key: "projects",     label: "Projects",              icon: "🛠️" },
  { key: "research",     label: "Research & Publications", icon: "🔬" },
  { key: "education",    label: "Education",             icon: "🎓" },
  { key: "achievements", label: "Achievements",          icon: "🏆" },
  { key: "resume",       label: "Resume",                icon: "📄" },
  { key: "contact",      label: "Contact",               icon: "✉️" }
];

const RESUME_SUMMARY = "M.S. Artificial Intelligence, UTSA (May 2026, GPA 3.93) — AI Engineer specializing in LLMs, RAG systems, semantic search, and machine learning. ACM SIGCSE 2026 publication. Grab the one-page PDF:";

const Chatbot = {
  fab: null, panel: null, body: null,
  isOpen: false,
  view: "menu",       // 'menu' | 'option'
  optionKey: null,
  onExplore: null,    // (key) => void, injected by app.js
  onHome: null,       // () => void, injected by app.js
  lastFocus: null,

  init(handlers) {
    this.onExplore = handlers.onExplore || (() => {});
    this.onHome = handlers.onHome || (() => {});
    this.fab = document.getElementById("chatbot-fab");
    this.panel = document.getElementById("chatbot-panel");
    this.body = document.getElementById("chatbot-body");

    this.fab.addEventListener("click", () => this.toggle());
    document.getElementById("chatbot-close").addEventListener("click", () => this.close());
    document.getElementById("chatbot-min").addEventListener("click", () => this.minimize());
    document.getElementById("chatbot-home").addEventListener("click", () => {
      this.onHome();
      this.showMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen &&
          !document.getElementById("modal-backdrop").classList.contains("is-open")) {
        this.close();
      }
    });

    this.renderMenu();
  },

  toggle() { this.isOpen ? this.close() : this.open(); },

  open() {
    this.lastFocus = document.activeElement;
    this.isOpen = true;
    this.panel.hidden = false;
    this.fab.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => this.panel.classList.add("is-open"));
    // restore last state
    if (this.view === "option" && this.optionKey) this.renderOption(this.optionKey);
    else this.renderMenu();
    const first = this.panel.querySelector("button");
    if (first) first.focus();
  },

  close() {
    this.isOpen = false;
    this.panel.classList.remove("is-open");
    this.fab.setAttribute("aria-expanded", "false");
    setTimeout(() => { if (!this.isOpen) this.panel.hidden = true; }, 250);
    if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus();
  },

  minimize() { this.close(); }, // minimized == closed but state preserved

  showMenu() {
    this.view = "menu";
    this.optionKey = null;
    this.renderMenu();
  },

  renderMenu() {
    this.body.innerHTML = `
      <p class="chatbot-greet">Hey, I'm Devansh's agent in compact mode. Pick a topic — I'll brief you, then walk you in.</p>
      <div class="chatbot-options" role="list">
        ${CHATBOT_OPTIONS.map((o, i) => `
          <button type="button" class="chatbot-opt" role="listitem" data-opt="${o.key}">
            <span class="co-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="co-icon" aria-hidden="true">${o.icon}</span>
            <span class="co-label">${o.label}</span>
            <span class="co-arrow" aria-hidden="true">→</span>
          </button>`).join("")}
      </div>
      <p class="chatbot-hint">terminal tip: the <span class="mono">help</span> command below does the same</p>`;
    this.body.querySelectorAll("[data-opt]").forEach(btn => {
      btn.addEventListener("click", () => this.selectOption(btn.dataset.opt));
    });
  },

  selectOption(key) {
    this.view = "option";
    this.optionKey = key;
    this.renderOption(key);
  },

  summaryFor(key) {
    if (key === "resume") return RESUME_SUMMARY;
    return PORTFOLIO.scripts.sectionSummaries[key] || "";
  },

  introFor(key) {
    if (key === "resume") return "The one-pager. Everything below, condensed.";
    return PORTFOLIO.scripts.sectionIntros[key] || "";
  },

  renderOption(key) {
    const opt = CHATBOT_OPTIONS.find(o => o.key === key);
    const label = opt ? opt.label : key;
    const intro = this.introFor(key);
    const summary = this.summaryFor(key);
    const isResume = key === "resume";
    this.body.innerHTML = `
      <button type="button" class="chatbot-back" id="chatbot-back">← Back to Menu</button>
      <p class="chatbot-kicker">// ${escapeHtml(label.toUpperCase())}</p>
      ${intro ? `<p class="chatbot-intro">${escapeHtml(intro)}</p>` : ""}
      <p class="chatbot-summary">${escapeHtml(summary)}</p>
      ${isResume ? `<a class="btn btn-sm btn-primary" href="${PORTFOLIO.identity.resumeFile}" download style="margin-bottom:.8rem">⬇ DOWNLOAD RESUME (PDF)</a>` : ""}
      <div class="chatbot-actions">
        <button type="button" class="btn btn-sm btn-primary" id="chatbot-explore">${isResume ? "⬇ DOWNLOAD RESUME" : "EXPLORE IN DETAIL →"}</button>
        <button type="button" class="btn btn-sm" id="chatbot-another">CHOOSE ANOTHER OPTION</button>
      </div>`;
    this.body.querySelector("#chatbot-back").addEventListener("click", () => this.showMenu());
    this.body.querySelector("#chatbot-another").addEventListener("click", () => this.showMenu());
    this.body.querySelector("#chatbot-explore").addEventListener("click", () => {
      if (isResume) {
        const a = document.createElement("a");
        a.href = PORTFOLIO.identity.resumeFile;
        a.download = "Devansh_Shah_Resume.pdf";
        document.body.appendChild(a); a.click(); a.remove();
      } else {
        this.minimize(); // keep state; main view navigates behind
        this.onExplore(key);
      }
    });
    const back = this.body.querySelector("#chatbot-back");
    if (back) back.focus();
  }
};
