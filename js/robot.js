/* ==========================================================================
   ROBOT CHARACTER SYSTEM
   Reusable SVG robot + robotic dog with a clean state machine.
   States: idle, greeting, listening, thinking, speaking, excited,
           explaining, transitioning, returning, waving, goodbye.
   ========================================================================== */

"use strict";

/* ---------- Eye expression SVG fragments (faceplate coords ~ 60..140 x, 58..96 y) ---------- */
const EYE_VARIANTS = {
  happy: `
    <path class="eye" d="M74,78 Q82,66 90,78" />
    <path class="eye" d="M110,78 Q118,66 126,78" />`,
  thinking: `
    <circle class="eye eye-ring" cx="82" cy="74" r="8" />
    <circle class="eye eye-ring" cx="118" cy="74" r="8" />
    <g class="think-spinner"><circle class="eye-dot" cx="82" cy="74" r="3"/><circle class="eye-dot" cx="118" cy="74" r="3"/></g>`,
  wink: `
    <path class="eye" d="M74,76 Q82,66 90,76" />
    <line class="eye" x1="110" y1="74" x2="126" y2="74" />`,
  surprised: `
    <circle class="eye eye-fill" cx="82" cy="74" r="9" />
    <circle class="eye eye-fill" cx="118" cy="74" r="9" />`,
  talking: `
    <path class="eye" d="M74,74 Q82,70 90,74" />
    <path class="eye" d="M110,74 Q118,70 126,74" />
    <rect class="mouth mouth-talking" x="92" y="88" width="16" height="5" rx="2.5" />`,
  sad: `
    <path class="eye" d="M74,72 Q82,80 90,72" />
    <path class="eye" d="M110,72 Q118,80 126,72" />`,
  listening: `
    <circle class="eye eye-fill" cx="82" cy="74" r="5" />
    <circle class="eye eye-fill" cx="118" cy="74" r="5" />`,
  neutral: `
    <path class="eye" d="M74,76 Q82,68 90,76" />
    <path class="eye" d="M110,76 Q118,68 126,76" />`
};

/* ---------- Robot SVG ---------- */
function robotSVG(idSuffix) {
  const s = idSuffix || "main";
  return `
  <svg class="robot-svg" viewBox="0 0 200 270" role="img" aria-label="Devansh's AI agent robot">
    <defs>
      <radialGradient id="metal-${s}" cx="35%" cy="25%" r="80%">
        <stop offset="0%" stop-color="#e8f4ff"/><stop offset="45%" stop-color="#a9c3d9"/><stop offset="100%" stop-color="#5f7a93"/>
      </radialGradient>
      <linearGradient id="body-${s}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#dfeaf5"/><stop offset="55%" stop-color="#9db4c9"/><stop offset="100%" stop-color="#61798f"/>
      </linearGradient>
      <radialGradient id="face-${s}" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="#0d1622"/><stop offset="100%" stop-color="#04070c"/>
      </radialGradient>
      <filter id="glow-${s}" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- hover base -->
    <g class="r-hoverbase">
      <ellipse class="hover-glow" cx="100" cy="252" rx="46" ry="10"/>
      <ellipse class="hover-ring" cx="100" cy="252" rx="30" ry="6"/>
    </g>

    <!-- torso -->
    <g class="r-torso">
      <rect x="62" y="150" width="76" height="70" rx="20" fill="url(#body-${s})" stroke="#3a4f63" stroke-width="2"/>
      <rect x="74" y="164" width="52" height="34" rx="10" fill="#0a1119" stroke="#203247" stroke-width="1.5"/>
      <text x="100" y="188" text-anchor="middle" class="chest-code" filter="url(#glow-${s})">&lt;/&gt;</text>
      <circle class="core-light" cx="100" cy="210" r="5" filter="url(#glow-${s})"/>
      <!-- arms -->
      <g class="r-arm r-arm-left">
        <rect x="44" y="158" width="16" height="44" rx="8" fill="url(#body-${s})" stroke="#3a4f63" stroke-width="2"/>
        <circle class="hand" cx="52" cy="206" r="9" />
      </g>
      <g class="r-arm r-arm-right">
        <rect x="140" y="158" width="16" height="44" rx="8" fill="url(#body-${s})" stroke="#3a4f63" stroke-width="2"/>
        <circle class="hand" cx="148" cy="206" r="9" />
      </g>
    </g>

    <!-- neck + head -->
    <g class="r-headgroup">
      <rect x="92" y="138" width="16" height="16" rx="4" fill="#5f7a93" stroke="#3a4f63" stroke-width="2"/>
      <g class="r-head">
        <!-- antenna -->
        <line class="antenna" x1="100" y1="34" x2="100" y2="12"/>
        <circle class="antenna-tip" cx="100" cy="10" r="5" filter="url(#glow-${s})"/>
        <!-- dome -->
        <path d="M52,108 a48,48 0 0 1 96,0 z" fill="url(#metal-${s})" stroke="#3a4f63" stroke-width="2"/>
        <rect x="52" y="104" width="96" height="40" rx="14" fill="url(#metal-${s})" stroke="#3a4f63" stroke-width="2"/>
        <!-- faceplate -->
        <rect x="60" y="52" width="80" height="60" rx="22" fill="url(#face-${s})" stroke="#16232f" stroke-width="2"/>
        <g class="r-eyes" filter="url(#glow-${s})">${EYE_VARIANTS.neutral}</g>
        <!-- ear lights -->
        <circle class="ear-light" cx="50" cy="88" r="6"/>
        <circle class="ear-light" cx="150" cy="88" r="6"/>
      </g>
    </g>
  </svg>`;
}

/* ---------- Dog SVG ---------- */
function dogSVG(idSuffix) {
  const s = idSuffix || "dog";
  return `
  <svg class="dog-svg" viewBox="0 0 230 170" role="img" aria-label="Robotic dog">
    <defs>
      <linearGradient id="dogbody-${s}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e6f1fb"/><stop offset="60%" stop-color="#9db4c9"/><stop offset="100%" stop-color="#5d768d"/>
      </linearGradient>
      <filter id="dogglow-${s}" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse class="dog-shadow" cx="115" cy="158" rx="70" ry="8"/>
    <g class="dog-body">
      <!-- tail -->
      <path class="dog-tail" d="M40,95 Q18,80 26,58" fill="none" stroke="#8fa9c0" stroke-width="9" stroke-linecap="round"/>
      <circle class="dog-tail-tip" cx="26" cy="56" r="5" filter="url(#dogglow-${s})"/>
      <!-- torso -->
      <rect x="55" y="80" width="110" height="52" rx="24" fill="url(#dogbody-${s})" stroke="#3a4f63" stroke-width="2"/>
      <rect x="96" y="94" width="38" height="22" rx="9" fill="#0a1119" stroke="#203247" stroke-width="1.5"/>
      <text x="115" y="110" text-anchor="middle" class="dog-code" filter="url(#dogglow-${s})">&lt;/&gt;</text>
      <!-- legs -->
      <g class="dog-leg dog-leg-fl"><rect x="66" y="126" width="13" height="30" rx="6" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/><circle cx="72" cy="158" r="7" fill="#5d768d"/></g>
      <g class="dog-leg dog-leg-fr"><rect x="92" y="126" width="13" height="30" rx="6" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/><circle cx="98" cy="158" r="7" fill="#5d768d"/></g>
      <g class="dog-leg dog-leg-bl"><rect x="128" y="126" width="13" height="30" rx="6" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/><circle cx="134" cy="158" r="7" fill="#5d768d"/></g>
      <g class="dog-leg dog-leg-br"><rect x="152" y="126" width="13" height="30" rx="6" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/><circle cx="158" cy="158" r="7" fill="#5d768d"/></g>
      <!-- head -->
      <g class="dog-head">
        <path d="M150,62 L162,26 L180,58 Z" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/>
        <path d="M196,62 L208,30 L220,60 Z" fill="#8fa9c0" stroke="#3a4f63" stroke-width="2"/>
        <circle class="dog-ear-glow" cx="168" cy="44" r="4" filter="url(#dogglow-${s})"/>
        <circle class="dog-ear-glow" cx="212" cy="48" r="4" filter="url(#dogglow-${s})"/>
        <rect x="148" y="52" width="76" height="56" rx="24" fill="url(#dogbody-${s})" stroke="#3a4f63" stroke-width="2"/>
        <rect x="158" y="60" width="56" height="34" rx="14" fill="#0a1119" stroke="#16232f" stroke-width="2"/>
        <g class="dog-eyes" filter="url(#dogglow-${s})">
          <path class="eye" d="M170,80 Q176,72 182,80"/>
          <path class="eye" d="M192,80 Q198,72 204,80"/>
        </g>
        <ellipse class="dog-nose" cx="186" cy="98" rx="7" ry="5"/>
        <rect class="dog-stick-slot" x="196" y="92" width="34" height="9" rx="4.5" transform="rotate(18 196 92)"/>
      </g>
      <!-- collar -->
      <rect x="142" y="76" width="12" height="52" rx="6" fill="#0a1119" stroke="#27E5F0" stroke-width="2"/>
    </g>
  </svg>`;
}

/* ---------- Robot controller ---------- */
class Robot {
  constructor(rootEl) {
    this.root = rootEl;
    this.root.innerHTML = robotSVG(rootEl.dataset.robotId || "main");
    this.el = this.root.querySelector(".robot-svg");
    this.eyes = this.root.querySelector(".r-eyes");
    this.state = "idle";
    this.stateClass = "";
    this.timers = [];
    this.dialogueToken = 0;
  }

  _clearTimers() { this.timers.forEach(clearTimeout); this.timers = []; }
  _later(fn, ms) { const t = setTimeout(fn, ms); this.timers.push(t); return t; }

  /* Switch the robot's behavioral state. Interruptible: new state wins. */
  setState(state, eyes) {
    this.state = state;
    if (this.stateClass) this.root.classList.remove(this.stateClass);
    this.stateClass = "r-" + state;
    this.root.classList.add(this.stateClass);
    if (eyes && EYE_VARIANTS[eyes]) this.setEyes(eyes);
    return this;
  }

  setEyes(variant) {
    if (EYE_VARIANTS[variant]) this.eyes.innerHTML = EYE_VARIANTS[variant];
    return this;
  }

  reset() {
    this._clearTimers();
    this.dialogueToken++;
    this.setState("idle", "neutral");
    return this;
  }

  /* Typewriter dialogue into a bubble element. Returns a promise that
     resolves when done OR when skip() is called. */
  say(lines, bubbleEl, opts = {}) {
    const token = ++this.dialogueToken;
    const {
      charMs = 22, linePauseMs = 650, skippable = true, eyesWhileSpeaking = "talking"
    } = opts;
    this.setState("speaking", eyesWhileSpeaking);
    const bubble = bubbleEl;
    bubble.classList.add("is-visible");
    const textEl = bubble.querySelector(".bubble-text");
    textEl.innerHTML = "";
    textEl.setAttribute("aria-live", "polite");

    let li = 0, ci = 0, cancelled = false;
    const skip = () => { cancelled = true; };

    return new Promise((resolve) => {
      const finish = () => {
        if (token !== this.dialogueToken) return; // superseded
        this.setState("idle", "happy");
        resolve({ completed: !cancelled, skipped: cancelled });
      };
      const typeLine = () => {
        if (token !== this.dialogueToken) return;
        if (cancelled) { // dump full text
          textEl.innerHTML = lines.map(escapeHtml).join("<br><br>");
          finish(); return;
        }
        if (li >= lines.length) { finish(); return; }
        const line = lines[li];
        if (ci === 0 && li > 0) textEl.innerHTML += "<br><br>";
        if (ci <= line.length) {
          const partial = lines.slice(0, li).map(escapeHtml).join("<br><br>");
          const cur = escapeHtml(line.slice(0, ci));
          textEl.innerHTML = partial + (li > 0 ? "<br><br>" : "") + cur +
            '<span class="type-caret" aria-hidden="true">▍</span>';
          ci++;
          this._later(typeLine, line.length && line[ci - 1] === "." ? charMs * 6 : charMs);
        } else {
          li++; ci = 0;
          this._later(typeLine, linePauseMs);
        }
      };
      typeLine();
      this._skipSay = skip;
    });
  }

  skipSay() { if (this._skipSay) this._skipSay(); }
  hideBubble(bubbleEl) { bubbleEl.classList.remove("is-visible"); }
}

/* ---------- Dog sequence (signature transition) ---------- */
class DogSequence {
  constructor(stageEl) {
    this.stage = stageEl;
    this.cancelled = false;
    this.timers = [];
    this.onDone = null;
  }
  _later(fn, ms) { const t = setTimeout(fn, ms); this.timers.push(t); }
  _clear() { this.timers.forEach(clearTimeout); this.timers = []; }

  /* Plays the full stick-throwing sequence. Resolves when the sequence
     finishes or is skipped. */
  play(opts = {}) {
    this.cancelled = false;
    this._done = false;
    this._clear();
    const { reduced = false, finalLine = "Alright, let's go!" } = opts;
    const stage = this.stage;
    stage.classList.add("is-active");
    stage.setAttribute("aria-hidden", "false");

    const rRobot = stage.querySelector(".stage-robot");
    const dog = stage.querySelector(".stage-dog");
    const stick = stage.querySelector(".stage-stick");
    const bubble = stage.querySelector(".stage-bubble .bubble-text");
    const skipBtn = stage.querySelector(".stage-skip");

    const finish = () => {
      if (this._done) return; // idempotent: no double-finish, no recursion
      this._done = true;
      this._clear();
      stage.classList.remove("is-active");
      stage.setAttribute("aria-hidden", "true");
      rRobot.className = "stage-robot";
      dog.className = "stage-dog";
      stick.className = "stage-stick";
      if (this.onDone) { const cb = this.onDone; this.onDone = null; cb(); }
    };
    // skip: finish now AND continue to the destination
    this._skip = () => { this.cancelled = true; finish(); };
    // cancel: stop the sequence, do NOT continue to the destination
    this._cancel = () => { this.cancelled = true; this.onDone = null; finish(); };

    const say = (text) => { bubble.innerHTML = escapeHtml(text); };

    if (reduced) {
      // Reduced motion: brief fade, straight to the line.
      say(finalLine);
      this._later(finish, 900);
      return { skip: () => this._skip() };
    }

    // Beat 1: robot turns + reaches for the stick (0–700ms)
    this._later(() => { if (!this.cancelled) { rRobot.classList.add("reach"); say("Catch this!"); } }, 100);
    // Beat 2: throw (700–1300ms)
    this._later(() => { if (!this.cancelled) { rRobot.classList.add("throw"); stick.classList.add("thrown"); } }, 750);
    // Beat 3: dog notices + runs (1300–2600ms)
    this._later(() => { if (!this.cancelled) { dog.classList.add("appear", "run"); say(""); } }, 1350);
    // Beat 4: dog grabs stick (2600–3000ms)
    this._later(() => { if (!this.cancelled) { dog.classList.add("has-stick"); stick.classList.add("caught"); say("Got it!"); } }, 2700);
    // Beat 5: dog runs back (3000–4300ms)
    this._later(() => { if (!this.cancelled) { dog.classList.add("return"); say(""); } }, 3150);
    // Beat 6: robot catches, turns to visitor (4300–5000ms)
    this._later(() => { if (!this.cancelled) { rRobot.classList.add("catch"); dog.classList.remove("run"); dog.classList.add("sit"); say(finalLine); } }, 4400);
    // Beat 7: done (5000ms)
    this._later(() => { if (!this.cancelled) finish(); }, 5300);

    return { skip: () => this._skip(), cancel: () => this._cancel() };
  }

  skip() { if (this._skip) this._skip(); }
  cancel() { if (this._cancel) this._cancel(); }
}

/* ---------- utils ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* Build the static stage DOM once */
function buildStageDOM() {
  const stage = document.createElement("div");
  stage.className = "stage";
  stage.setAttribute("aria-hidden", "true");
  stage.innerHTML = `
    <div class="stage-inner">
      <div class="stage-robot" data-robot-id="stage"></div>
      <div class="stage-dog" data-dog-id="stage"></div>
      <div class="stage-stick" aria-hidden="true"><div class="stick-shape"></div></div>
      <div class="stage-bubble speech-bubble" role="status">
        <p class="bubble-text"></p>
      </div>
      <button class="stage-skip btn btn-ghost" type="button">SKIP ANIMATION ⏭</button>
    </div>`;
  stage.querySelector(".stage-robot").innerHTML = robotSVG("stage");
  stage.querySelector(".stage-dog").innerHTML = dogSVG("stage");
  return stage;
}
