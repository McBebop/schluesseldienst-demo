/* =========================================================================
   Schlüsseldienst Template – Logik
   Hier muss normalerweise nichts geändert werden (Inhalte: config.js).
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Icons (SVG-Sprite) ---------- */
  var ICONS = {
    phone: '<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>',
    chat: '<path d="M12 3C6.48 3 2 6.92 2 11.75c0 2.43 1.13 4.62 2.96 6.2L4 22l4.53-2.27c1.08.3 2.24.47 3.47.47 5.52 0 10-3.92 10-8.75S17.52 3 12 3zm-4 7.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>',
    key: '<path d="M12.65 10A6 6 0 001 12a6 6 0 0011.65 2H17v4h4v-4h2v-4H12.65zM7 14a2 2 0 110-4 2 2 0 010 4z"/>',
    check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    tuer: '<path d="M19 19V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14H3v2h18v-2h-2zm-4-6h-2v-2h2v2z"/>',
    auto: '<path d="M18.92 6.01A1.5 1.5 0 0017.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8l-2.08-5.99zM6.5 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM5 11l1.5-4.5h11L19 11H5z"/>',
    schloss: '<path d="M18 8h-1V6A5 5 0 007 6v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 9a2 2 0 110-4 2 2 0 010 4zm3.1-9H8.9V6a3.1 3.1 0 016.2 0v2z"/>',
    schutz: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 15.5L6 12l1.41-1.41 3.09 3.08 6.09-6.08L18 9l-7.5 7.5z"/>',
    tresor: '<path fill-rule="evenodd" d="M4 3h16a1 1 0 011 1v15a1 1 0 01-1 1h-1v1h-3v-1H8v1H5v-1H4a1 1 0 01-1-1V4a1 1 0 011-1zm8 4.5a4 4 0 100 8 4 4 0 000-8zm0 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>',
    einbruch: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
  Object.keys(ICONS).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>";
  });
  document.body.insertAdjacentHTML("afterbegin", sprite + "</svg>");

  function icon(name, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var s = document.createElementNS(ns, "svg");
    s.setAttribute("aria-hidden", "true");
    if (cls) s.setAttribute("class", cls);
    var u = document.createElementNS(ns, "use");
    u.setAttribute("href", "#i-" + (ICONS[name] ? name : "key"));
    s.appendChild(u);
    return s;
  }

  /* ---------- Konfiguration laden ---------- */
  var C = JSON.parse(JSON.stringify(window.SITE_CONFIG || {}));
  C.adresse = C.adresse || {};
  C.jahr = String(new Date().getFullYear());

  /* ---------- Demo-Modus: Personalisierung per Link ----------
     Beispiel: index.html?name=Schlüsseldienst%20Weber&tel=06221123456&stadt=Heidelberg
     Parameter: name, tel, wa, stadt, min, gebiet (Komma-Liste), farbe (Hex ohne #)  */
  var q = new URLSearchParams(location.search);
  function param(k) { var v = q.get(k); return v ? v.trim().slice(0, 80) : ""; }

  if (param("name"))  C.firma = param("name");
  if (param("tel"))   { C.telefon = param("tel"); C.whatsapp = param("tel"); }
  if (param("wa"))    C.whatsapp = param("wa");
  if (param("min"))   C.anfahrtMinuten = param("min");
  if (param("stadt")) {
    C.stadt = param("stadt");
    C.adresse.ort = C.stadt;
    C.einsatzgebiet = ["Alle Stadtteile von " + C.stadt, "Umland ca. 25 km"];
  }
  if (q.get("gebiet")) {
    C.einsatzgebiet = q.get("gebiet").split(",").map(function (s) { return s.trim().slice(0, 40); }).filter(Boolean).slice(0, 30);
  }
  var farbe = param("farbe").replace("#", "");
  if (/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(farbe)) C.farbe = "#" + farbe;

  /* ---------- Helfer ---------- */
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function cleanNum(n) { return String(n || "").replace(/[^\d+]/g, ""); }
  function telHref(n) { return "tel:" + cleanNum(n); }
  function waNumber(n) {
    var d = cleanNum(n);
    if (d.indexOf("+") === 0) d = d.slice(1);
    else if (d.indexOf("00") === 0) d = d.slice(2);
    else if (d.indexOf("0") === 0) d = "49" + d.slice(1); // deutsche Nummer ohne Ländervorwahl
    return d.replace(/\D/g, "");
  }
  function waHref() {
    return "https://wa.me/" + waNumber(C.whatsapp) + (C.whatsappText ? "?text=" + encodeURIComponent(C.whatsappText) : "");
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- Farben ---------- */
  var root = document.documentElement.style;
  if (C.farbe) root.setProperty("--accent", C.farbe);
  if (C.farbeText) root.setProperty("--accent-ink", C.farbeText);

  /* ---------- Texte einsetzen ---------- */
  document.querySelectorAll("[data-bind]").forEach(function (n) {
    var v = get(C, n.getAttribute("data-bind"));
    if (v != null && v !== "") n.textContent = v;
  });
  document.querySelectorAll("[data-if]").forEach(function (n) {
    var v = get(C, n.getAttribute("data-if"));
    if (!v) n.hidden = true;
  });

  document.querySelectorAll("[data-hosting]").forEach(function (n) {
    n.hidden = n.getAttribute("data-hosting") !== (C.hosting || "github");
  });

  /* ---------- Links ---------- */
  document.querySelectorAll('[data-href="tel"]').forEach(function (a) { a.href = telHref(C.telefon); });
  document.querySelectorAll('[data-href="wa"]').forEach(function (a) { a.href = waHref(); });
  document.querySelectorAll('[data-href="mail"]').forEach(function (a) { a.href = "mailto:" + (C.email || ""); });
  document.querySelectorAll('[data-href="google"]').forEach(function (a) {
    if (C.googleBewertungenUrl) { a.href = C.googleBewertungenUrl; a.hidden = false; }
  });
  // Demo-Parameter auf Impressum/Datenschutz/Startseite mitnehmen
  if (location.search) {
    document.querySelectorAll("a[data-keep]").forEach(function (a) {
      var u = new URL(a.getAttribute("href"), location.href);
      u.search = location.search;
      a.href = u.toString();
    });
  }

  /* ---------- Listen ---------- */
  function list(name, fn) {
    var box = document.querySelector('[data-list="' + name + '"]');
    var items = C[name] || [];
    if (!box) return;
    box.textContent = "";
    items.forEach(function (it) { box.appendChild(fn(it)); });
    return items.length;
  }

  list("vorteile", function (t) {
    var li = el("li");
    li.appendChild(icon("check"));
    li.appendChild(el("span", null, t));
    return li;
  });

  list("leistungen", function (it) {
    var c = el("article", "card");
    var ic = el("div", "card__icon");
    ic.appendChild(icon(it.icon));
    c.appendChild(ic);
    c.appendChild(el("h3", null, it.titel));
    c.appendChild(el("p", null, it.text));
    return c;
  });

  list("preise", function (it) {
    var row = el("div", "price");
    var left = el("span");
    left.appendChild(el("strong", null, it.leistung));
    if (it.zeit) left.appendChild(el("small", null, it.zeit));
    row.appendChild(left);
    row.appendChild(el("strong", "price__val", it.preis));
    return row;
  });

  list("einsatzgebiet", function (t) { return el("li", null, t); });

  var nReviews = list("bewertungen", function (it) {
    var c = el("article", "card review");
    var n = Math.max(0, Math.min(5, Number(it.sterne) || 5));
    var st = el("div", "stars", "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n));
    st.setAttribute("aria-label", n + " von 5 Sternen");
    c.appendChild(st);
    c.appendChild(el("p", null, it.text));
    c.appendChild(el("footer", null, "– " + it.name + (it.quelle ? " · " + it.quelle : "")));
    return c;
  });
  var revSec = document.getElementById("bewertungen");
  if (revSec && nReviews) revSec.hidden = false;

  /* ---------- Titel, Meta, strukturierte Daten (Google) ---------- */
  var pageName = document.body.getAttribute("data-page");
  document.title = (pageName ? pageName + " – " : "") + C.firma + " | 24h Schlüsseldienst " + C.stadt;
  var desc = document.querySelector('meta[name="description"]');
  if (desc && !pageName) {
    desc.setAttribute("content", "24h Schlüsseldienst in " + C.stadt + ": Türöffnung zum Festpreis, in ca. " +
      C.anfahrtMinuten + " Min. vor Ort. Jetzt anrufen: " + C.telefon);
  }
  if (!pageName) {
    var ld = {
      "@context": "https://schema.org",
      "@type": "Locksmith",
      name: C.firma,
      telephone: cleanNum(C.telefon),
      email: C.email || undefined,
      url: location.origin + location.pathname,
      address: {
        "@type": "PostalAddress",
        streetAddress: C.adresse.strasse,
        postalCode: C.adresse.plz,
        addressLocality: C.adresse.ort,
        addressCountry: "DE"
      },
      areaServed: (C.einsatzgebiet || []).concat([C.stadt]),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00", closes: "23:59"
      },
      paymentAccepted: C.zahlungsarten
    };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* ---------- Kontaktleiste unten: erscheint, sobald die Hero-Buttons weg sind ---------- */
  var bar = document.querySelector(".actionbar");
  var heroCta = document.getElementById("hero-cta");
  if (bar) {
    if (heroCta && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var e = entries[0];
        bar.classList.toggle("is-visible", !e.isIntersecting && e.boundingClientRect.top < 0);
      }, { threshold: 0 }).observe(heroCta);
    } else {
      bar.classList.add("is-visible");
    }
  }
})();
