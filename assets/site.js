/* Make It Land — the only runtime JS: home hero reveal (once/session) and the
   magnetic header wordmark. Both are no-ops under prefers-reduced-motion.
   The sticky blurred header is pure CSS (position:sticky + backdrop-filter). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* 0. Reduced motion: pause the looping hero video (How Institutions Behave). */
    if (reduce) {
      [].forEach.call(document.querySelectorAll("video"), function (v) {
        try { v.removeAttribute("autoplay"); v.pause(); } catch (e) {}
      });
    } else {
      /* nudge muted autoplay on browsers that need a script-initiated play() */
      [].forEach.call(document.querySelectorAll("video[autoplay]"), function (v) {
        v.muted = true;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
    }

    /* 1. Home hero reveal — play once per browser session, skip under reduced motion. */
    var hero = document.querySelector("[data-mil-hero]");
    if (hero) {
      var seen = false;
      try { seen = sessionStorage.getItem("mil-hero") === "1"; } catch (e) {}
      if (reduce || seen) {
        hero.style.animation = "none";
        hero.style.opacity = "1";
        hero.style.fontVariationSettings = "'opsz' 90, 'wght' 500";
        hero.style.letterSpacing = "-0.02em";
      } else {
        try { sessionStorage.setItem("mil-hero", "1"); } catch (e) {}
      }
    }

    /* 2. Magnetic wordmark — fine pointers only, never under reduced motion. */
    if (reduce || !(window.matchMedia && window.matchMedia("(pointer:fine)").matches)) return;
    var wm = document.querySelector("[data-mil-wordmark]");
    if (!wm) return;
    var base = wm.style.fontVariationSettings || "'opsz' 90, 'wght' 600";
    wm.style.display = "inline-block";
    wm.style.willChange = "transform";
    wm.style.transition =
      "transform 240ms cubic-bezier(0.22,1,0.36,1), font-variation-settings 240ms cubic-bezier(0.22,1,0.36,1)";
    wm.addEventListener("pointermove", function (e) {
      var r = wm.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
      var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
      wm.style.transform = "translate(" + (dx * 4).toFixed(2) + "px," + (dy * 3).toFixed(2) + "px)";
      wm.style.fontVariationSettings = "'opsz' 144, 'wght' 720";
    });
    wm.addEventListener("pointerleave", function () {
      wm.style.transform = "translate(0,0)";
      wm.style.fontVariationSettings = base;
    });
  });
})();
