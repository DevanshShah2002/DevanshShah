/* ==========================================================================
   CUSTOM CURSOR — finger-tap pointer with cyan ripple feedback.
   - Replaces the native cursor on fine-pointer devices (desktop/laptop).
   - Smooth follow via rAF lerp; hover glow on interactive elements.
   - Click/tap => quick finger press + expanding cyan ripple + glow.
   - Touch devices: no fake cursor, only tap ripples at touch points.
   - Respects reduced-motion: ripples become a quick fade, no scaling loop.
   - Never blocks interaction: pointer-events:none, native cursor kept on
     text inputs so typing/selection stays normal.
   ========================================================================== */

"use strict";

const HAND_SVG = `
<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
  <g stroke="#1d2f45" stroke-width="2" stroke-linejoin="round">
    <rect x="12.5" y="2.5" width="7" height="13" rx="3.5" fill="#bcd6f5"/>
    <rect x="7" y="13" width="18" height="13" rx="6.5" fill="#bcd6f5"/>
    <ellipse cx="7.5" cy="19" rx="3.4" ry="4.6" fill="#bcd6f5" transform="rotate(-24 7.5 19)"/>
  </g>
  <rect x="14.6" y="5" width="2.8" height="6" rx="1.4" fill="#e8f3ff" opacity=".8"/>
</svg>`;

const Cursor = {
  el: null,
  x: -100, y: -100, tx: -100, ty: -100,
  raf: null,
  enabled: false,
  reduced: false,
  hovering: false,

  init() {
    this.reduced = document.documentElement.classList.contains("reduced-motion") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // Tap ripples work everywhere (mouse + touch).
    document.addEventListener("pointerdown", (e) => this.tap(e), { passive: true });

    if (!finePointer) return; // touch-only: no fake cursor
    this.enabled = true;

    this.el = document.createElement("div");
    this.el.className = "custom-cursor";
    this.el.setAttribute("aria-hidden", "true");
    this.el.innerHTML = HAND_SVG;
    document.body.appendChild(this.el);
    document.body.classList.add("has-custom-cursor");

    document.addEventListener("pointermove", (e) => {
      this.tx = e.clientX; this.ty = e.clientY;
    }, { passive: true });
    document.addEventListener("pointerleave", () => {
      this.el.classList.add("is-hidden");
    });
    document.addEventListener("pointerenter", () => {
      this.el.classList.remove("is-hidden");
    });

    // Hover feedback on anything interactive. Over text fields the custom
    // cursor hides so the native text cursor works alone.
    const interactive = "a, button, input, select, textarea, .menu-card, .chip, .proj-card, .tl-toggle, .loop-node";
    document.addEventListener("mouseover", (e) => {
      const textField = e.target.closest("input, textarea, select");
      this.el.classList.toggle("is-hidden", !!textField);
      if (textField) return;
      const hit = e.target.closest(interactive);
      if (hit && !this.hovering) { this.hovering = true; this.el.classList.add("is-hover"); }
      else if (!hit && this.hovering) { this.hovering = false; this.el.classList.remove("is-hover"); }
    }, { passive: true });

    const loop = () => {
      // ease toward the pointer; snap when reduced motion
      const k = this.reduced ? 1 : 0.32;
      this.x += (this.tx - this.x) * k;
      this.y += (this.ty - this.y) * k;
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  },

  tap(e) {
    const x = e.clientX, y = e.clientY;
    if (x == null || y == null) return;

    // Finger-press on the cursor itself.
    if (this.enabled && this.el) {
      this.el.classList.remove("is-tap");
      void this.el.offsetWidth; // restart animation
      this.el.classList.add("is-tap");
      setTimeout(() => this.el.classList.remove("is-tap"), 220);
    }

    // Cyan ripple at the interaction point.
    const ripple = document.createElement("div");
    ripple.className = "tap-ripple" + (this.reduced ? " reduced" : "");
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    setTimeout(() => ripple.remove(), 900); // safety cleanup
  },

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.el) this.el.remove();
    document.body.classList.remove("has-custom-cursor");
  }
};
