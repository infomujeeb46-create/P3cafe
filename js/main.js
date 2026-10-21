(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- Header state + mobile menu ---------- */
  var header = $(".site-header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var menuBtn = $("#menuBtn"), nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Language (EN / AR) ---------- */
  var en = {}; // cache of original English strings, keyed by "type:key"
  var langBtn = $("#langToggle");
  var targets = $$("[data-i18n], [data-i18n-alt], [data-i18n-aria], [data-i18n-title]");

  targets.forEach(function (el) {
    if (el.dataset.i18n) en["t:" + el.dataset.i18n] = el.innerHTML;
    if (el.dataset.i18nAlt) en["a:" + el.dataset.i18nAlt] = el.getAttribute("alt");
    if (el.dataset.i18nAria) en["r:" + el.dataset.i18nAria] = el.getAttribute("aria-label");
    if (el.dataset.i18nTitle) en["i:" + el.dataset.i18nTitle] = el.getAttribute("title");
  });

  function applyLang(lang) {
    var ar = lang === "ar", dict = window.P3_AR || {};
    root.lang = ar ? "ar" : "en";
    root.dir = ar ? "rtl" : "ltr";
    var pick = function (kind, key) { return ar && dict[key] != null ? dict[key] : en[kind + ":" + key]; };

    targets.forEach(function (el) {
      var d = el.dataset, v;
      if (d.i18n && (v = pick("t", d.i18n)) != null) el.innerHTML = v;
      if (d.i18nAlt && (v = pick("a", d.i18nAlt)) != null) el.setAttribute("alt", v);
      if (d.i18nAria && (v = pick("r", d.i18nAria)) != null) el.setAttribute("aria-label", v);
      if (d.i18nTitle && (v = pick("i", d.i18nTitle)) != null) el.setAttribute("title", v);
    });

    langBtn.textContent = ar ? "EN" : "عربي";
    langBtn.setAttribute("aria-label", ar ? "Switch language to English" : "التبديل إلى العربية");
    document.title = ar ? "P3 Coffee Shop — المربع، الرياض" : "P3 Coffee Shop — Al Murabba, Riyadh";
    store.set("p3-lang", lang);
  }

  langBtn.addEventListener("click", function () { applyLang(root.lang === "ar" ? "en" : "ar"); });
  if (store.get("p3-lang") === "ar") applyLang("ar");

  /* ---------- Lightbox ---------- */
  var box = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  var shots = $$("#galleryGrid button");
  var current = 0;

  function show(i) {
    current = (i + shots.length) % shots.length;
    var img = $("img", shots[current]);
    lbImg.src = shots[current].dataset.full;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  }
  shots.forEach(function (b, i) {
    b.addEventListener("click", function () {
      show(i);
      if (typeof box.showModal === "function") box.showModal(); else box.setAttribute("open", "");
    });
  });
  var close = function () { if (box.open) box.close(); };
  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", function () { show(current - 1); });
  $("#lbNext").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); }); // backdrop click
  box.addEventListener("keydown", function (e) {
    var rtl = root.dir === "rtl";
    if (e.key === "ArrowRight") show(current + (rtl ? -1 : 1));
    if (e.key === "ArrowLeft") show(current + (rtl ? 1 : -1));
  });

  /* ---------- Footer year ---------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
