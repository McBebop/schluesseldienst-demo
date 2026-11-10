/* =========================================================================
   Schlüsseldienst Template – Logik
   Hier muss normalerweise nichts geändert werden (Inhalte: config.js).
   ========================================================================= */
(function () {
  "use strict";

  var doc = document;
  function each(nodes, fn) { Array.prototype.forEach.call(nodes, fn); }

  /* ---------- Icons (SVG-Sprite) ---------- */
  var ICONS = {
    phone: '<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>',
    chat: '<path d="M12 3C6.48 3 2 6.92 2 11.75c0 2.43 1.13 4.62 2.96 6.2L4 22l4.53-2.27c1.08.3 2.24.47 3.47.47 5.52 0 10-3.92 10-8.75S17.52 3 12 3zm-4 7.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>',
    key: '<path d="M12.65 10A6 6 0 001 12a6 6 0 0011.65 2H17v4h4v-4h2v-4H12.65zM7 14a2 2 0 110-4 2 2 0 010 4z"/>',
    check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    close: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
    arrow: '<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>',
    pin: '<path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>',
    clock: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
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
  doc.body.insertAdjacentHTML("afterbegin", sprite + "</svg>");

  function icon(name, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var s = doc.createElementNS(ns, "svg");
    s.setAttribute("aria-hidden", "true");
    if (cls) s.setAttribute("class", cls);
    var u = doc.createElementNS(ns, "use");
    u.setAttribute("href", "#i-" + (ICONS[name] ? name : "key"));
    s.appendChild(u);
    return s;
  }

  /* ---------- Konfiguration laden ---------- */
  var C = JSON.parse(JSON.stringify(window.SITE_CONFIG || {}));
  C.adresse = C.adresse || {};
  C.demo = C.demo || {};
  C.fair = C.fair || {};
  C.jahr = String(new Date().getFullYear());

  /* ---------- Demo-Modus: Personalisierung per Link ----------
     Beispiel: index.html?name=Schlüsseldienst%20Weber&tel=06221123456&stadt=Heidelberg
     Parameter: name, tel, wa, stadt, min, gebiet (Komma-Liste), farbe (Hex ohne #)

     Sicherheit: Vorschau-Links wirken nur, solange die Seite auf „noindex" steht
     (also nie auf einer veröffentlichten Kundenseite) und demo.aktiv nicht false ist.
     So kann niemand auf einer echten Kundenseite per Link Name oder Nummer austauschen. */
  var robots = doc.querySelector('meta[name="robots"]');
  var demoErlaubt = C.demo.aktiv !== false && !!robots && /noindex/i.test(robots.getAttribute("content") || "");
  var q = new URLSearchParams(demoErlaubt ? location.search : "");
  function param(k) { var v = q.get(k); return v ? v.trim().slice(0, 80) : ""; }
  var istVorschau = !!(param("name") || param("tel") || param("stadt"));

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
  var farbeLink = param("farbe").replace("#", "");
  var farbeAusLink = /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(farbeLink);
  if (farbeAusLink) C.farbe = "#" + farbeLink;

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
  function el(tag, cls, text) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* Nummern ohne Leerzeichen (z. B. aus Vorschau-Links) lesbar gruppieren:
     06221123456 → 06221 123456. Bereits formatierte Nummern bleiben unverändert. */
  function prettyTel(n) {
    var s = String(n || "").trim();
    if (!/^(\+49|0049|0)\d{6,}$/.test(s)) return s;
    var d = s.replace(/^(\+49|0049)/, "0");
    var m = /^0(1[67]\d|15\d\d|800|900|700|180\d|32)/.exec(d) ||                      // Mobil- und Servicenummern
            /^0(30|40|69|89)/.exec(d) ||                                              // Berlin, Hamburg, Frankfurt, München
            /^0(20[12389]|21[24]|228|234|335|34[05]|3[5-9]5|906|[2-9][1-9]1)/.exec(d); // Großstädte mit kurzer Vorwahl
    var len = m ? m[0].length : 5;
    return d.slice(0, len) + " " + d.slice(len);
  }
  C.telefon = prettyTel(C.telefon);

  /* ---------- Farben: aus der Akzentfarbe alle Abstufungen berechnen ---------- */
  function hexRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function lum(c) {
    var a = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function kontrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function mix(a, b, t) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }); }
  function rgb(c) { return "rgb(" + c.join(",") + ")"; }

  var root = doc.documentElement.style;
  if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(C.farbe || "")) {
    var WEISS = [255, 255, 255], DUNKEL = [17, 24, 39], NACHT = [6, 10, 19];
    var ac = hexRgb(C.farbe), hi = ac, lo = ac, i;
    for (i = 0; i < 12 && kontrast(hi, NACHT) < 5; i++) hi = mix(hi, WEISS, 0.15);   // als Text auf Dunkel
    for (i = 0; i < 16 && kontrast(lo, WEISS) < 5; i++) lo = mix(lo, [0, 0, 0], 0.1); // als Text auf Weiß
    root.setProperty("--accent", rgb(ac));
    root.setProperty("--accent-rgb", ac.join(","));
    root.setProperty("--accent-hi", rgb(hi));
    root.setProperty("--accent-lo", rgb(lo));
    root.setProperty("--accent-2", rgb(mix(hi, WEISS, 0.45)));
    // Textfarbe auf der Akzentfarbe: aus config.js – bei Farbe per Link automatisch (hell/dunkel)
    if (C.farbeText && !farbeAusLink) root.setProperty("--accent-ink", C.farbeText);
    else root.setProperty("--accent-ink", rgb(kontrast(ac, DUNKEL) >= kontrast(ac, WEISS) ? DUNKEL : WEISS));
  }

  /* ---------- Texte einsetzen ---------- */
  each(doc.querySelectorAll("[data-bind]"), function (n) {
    var v = get(C, n.getAttribute("data-bind"));
    if (v != null && v !== "") n.textContent = v;
  });
  each(doc.querySelectorAll("[data-if]"), function (n) {
    var v = get(C, n.getAttribute("data-if"));
    if (!v) n.hidden = true;
  });
  each(doc.querySelectorAll("[data-hosting]"), function (n) {
    n.hidden = n.getAttribute("data-hosting") !== (C.hosting || "github");
  });

  /* ---------- Links ---------- */
  var waNr = waNumber(C.whatsapp);
  function waLink(text) { return "https://wa.me/" + waNr + (text ? "?text=" + encodeURIComponent(text) : ""); }
  var gruss = C.anfrageText || "Hallo, ich brauche einen Schlüsseldienst.";

  each(doc.querySelectorAll('[data-href="tel"]'), function (a) { a.href = telHref(C.telefon); });
  each(doc.querySelectorAll('[data-href="wa"]'), function (a) {
    if (waNr) a.href = waLink(C.whatsappText); else a.hidden = true;   // ohne WhatsApp-Nummer: Buttons ausblenden
  });
  each(doc.querySelectorAll('[data-href="mail"]'), function (a) { a.href = "mailto:" + (C.email || ""); });
  each(doc.querySelectorAll('[data-href="google"]'), function (a) {
    if (C.googleBewertungenUrl) { a.href = C.googleBewertungenUrl; a.hidden = false; }
  });
  // Demo-Parameter auf Impressum/Datenschutz/Startseite mitnehmen
  if (demoErlaubt && location.search) {
    each(doc.querySelectorAll("a[data-keep]"), function (a) {
      var u = new URL(a.getAttribute("href"), location.href);
      u.search = location.search;
      a.href = u.toString();
    });
  }

  /* ---------- Listen ---------- */
  function list(name, fn) {
    var box = doc.querySelector('[data-list="' + name + '"]');
    var items = get(C, name) || [];
    if (!box) return 0;
    box.textContent = "";
    items.forEach(function (it) { box.appendChild(fn(it)); });
    return items.length;
  }
  function punkt(name) {
    return function (t) {
      var li = el("li");
      li.appendChild(icon(name));
      li.appendChild(el("span", null, t));
      return li;
    };
  }

  list("vorteile", punkt("check"));

  list("leistungen", function (it) {
    var c = el("article", "card svc");
    var ic = el("div", "card__icon");
    ic.appendChild(icon(it.icon));
    c.appendChild(ic);
    c.appendChild(el("h3", null, it.titel));
    c.appendChild(el("p", null, it.text));
    // Direkt-Link: WhatsApp-Nachricht mit der gewählten Leistung (ohne WhatsApp: Anruf)
    var a = el("a", "svc__go", waNr ? "Per WhatsApp anfragen" : "Jetzt anrufen");
    if (waNr) {
      a.href = waLink(gruss + "\nEs geht um: " + it.titel + "\nMein Standort: ");
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = telHref(C.telefon);
    }
    a.appendChild(icon("arrow"));
    c.appendChild(a);
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

  // Fair-Check: nur zeigen, wenn die eigene Spalte gefüllt ist
  list("fair.unserioes", punkt("close"));
  var fairSec = doc.getElementById("fair");
  if (list("fair.wir", punkt("check")) && fairSec) fairSec.hidden = false;

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
  var revSec = doc.getElementById("bewertungen");
  if (revSec && nReviews) revSec.hidden = false;

  /* ---------- Vorschau-Streifen (nur bei personalisierten Demo-Links) ---------- */
  if (istVorschau) {
    var demobar = doc.getElementById("demobar");
    if (demobar && C.demo.streifen !== false) {
      demobar.hidden = false;
      var von = doc.getElementById("demobar-von");
      if (von && C.demo.anbieter) von.textContent = " · erstellt von " + C.demo.anbieter;
      var anbieterNr = waNumber(C.demo.whatsapp), demoBtn = doc.getElementById("demobar-btn");
      if (anbieterNr && demoBtn) {
        demoBtn.href = "https://wa.me/" + anbieterNr + "?text=" +
          encodeURIComponent("Hallo, ich habe die Vorschau für " + C.firma + " gesehen und möchte mehr erfahren.");
        demoBtn.hidden = false;
      }
    }
    // Hinweis auf Impressum/Datenschutz: Angaben sind in der Vorschau Platzhalter
    each(doc.querySelectorAll("[data-demo-note]"), function (n) { n.hidden = false; });
  }

  /* ---------- Live-Uhr & voraussichtliche Ankunft ----------
     Rechnet „anfahrtMinuten" (z. B. „20–30") in eine Uhrzeit um, auf 5 Minuten gerundet. */
  function zwei(n) { return (n < 10 ? "0" : "") + n; }
  function uhr(d) { return zwei(d.getHours()) + ":" + zwei(d.getMinutes()); }
  function rund5(ms) { var s = 5 * 60000; return new Date(Math.ceil(ms / s) * s); }
  var spanne = (function () {
    var m = String(C.anfahrtMinuten || "").match(/\d+/g);
    if (!m) return null;
    var a = +m[0], b = +(m[1] || m[0]);
    if (!(a > 0) || a > 180 || b > 180) return null;
    return [Math.min(a, b), Math.max(a, b)];
  })();
  var clocks = doc.querySelectorAll("[data-clock]");
  var etas = doc.querySelectorAll("[data-eta]");
  var etaBox = doc.getElementById("eta");
  function tick() {
    var now = new Date();
    each(clocks, function (n) { n.textContent = uhr(now) + " Uhr"; n.hidden = false; });
    if (spanne && etas.length) {
      var a = rund5(now.getTime() + spanne[0] * 60000), b = rund5(now.getTime() + spanne[1] * 60000);
      var t = uhr(a) + (b > a ? "–" + uhr(b) : "") + " Uhr";
      each(etas, function (n) { n.textContent = t; });
      if (etaBox) etaBox.hidden = false;
    }
  }
  if (clocks.length || etas.length) { tick(); setInterval(tick, 20000); }

  /* ---------- Schnellanfrage: fertige WhatsApp-Nachricht zusammenstellen ----------
     Der Standort wird nur nach Antippen und Zustimmung im Browser abgefragt, bleibt auf
     dem Gerät und landet erst in der Nachricht, die der Kunde selbst in WhatsApp abschickt. */
  var quick = doc.getElementById("anfrage");
  if (quick && !waNr) { quick.hidden = true; doc.body.className += " no-quick"; }
  if (quick && waNr) (function () {
    var wahl = { was: "", ort: null };
    var preview = doc.getElementById("quick-preview");
    var send = doc.getElementById("quick-send");
    var pick = quick.querySelector('[data-list="situationen"]');
    var locBtn = doc.getElementById("loc-btn");
    var locTxt = locBtn ? locBtn.querySelector("span") : null;
    var hint = doc.getElementById("loc-hint");

    function zeile(label, wert, leer) {
      var z = el("span", "bubble__line", label);
      if (wert) z.appendChild(el("b", null, wert));
      else if (leer) z.appendChild(el("i", null, leer));
      return z;
    }
    function render() {
      var lines = [gruss];
      if (wahl.was) lines.push("Was ist passiert: " + wahl.was);
      lines.push("Mein Standort: " + (wahl.ort ? wahl.ort.url : ""));
      send.href = waLink(lines.join("\n"));
      if (!preview) return;
      preview.textContent = "";
      preview.appendChild(zeile(gruss));
      if (wahl.was) preview.appendChild(zeile("Was ist passiert: ", wahl.was));
      preview.appendChild(zeile("Mein Standort: ", wahl.ort ? wahl.ort.url.replace("https://", "") : "", "noch offen"));
    }

    // Schritt 1: Situation wählen
    var n = list("situationen", function (t) {
      var b = el("button", "pick__btn", t);
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      return b;
    });
    if (!n) { doc.getElementById("quick-was").hidden = true; quick.className += " quick--single"; }
    else pick.addEventListener("click", function (ev) {
      var b = ev.target;
      if (!b || b.className.indexOf("pick__btn") < 0) return;
      var an = b.getAttribute("aria-pressed") !== "true";
      each(pick.children, function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", an ? "true" : "false");
      wahl.was = an ? b.textContent : "";
      render();
    });

    // Schritt 2: Standort anhängen (optional)
    var ios = /iP(hone|ad|od)/.test(navigator.userAgent) ||
              (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);   // iPad im Desktop-Modus
    function setLoc(state, text) {
      locBtn.className = "locbtn" + (state ? " is-" + state : "");
      locBtn.disabled = state === "busy";
      locTxt.textContent = state === "busy" ? "Standort wird ermittelt …" :
                           state === "ok" ? "Standort angehängt" : "Meinen Standort anhängen";
      hint.textContent = text || "";
    }
    function ortGefunden(pos) {
      var c = pos.coords, acc = Math.round(c.accuracy || 0);
      wahl.ort = { url: "https://maps.google.com/?q=" + c.latitude.toFixed(5) + "," + c.longitude.toFixed(5) };
      setLoc("ok", (acc && acc < 1000 ? "Auf ca. " + Math.max(10, Math.round(acc / 10) * 10) + " m genau. " :
                    acc ? "Standort ist ungenau – bitte Adresse dazuschreiben. " : "") + "Antippen zum Entfernen.");
      render();
    }
    function ortFehler(err) {
      var gesperrt = err && err.code === 1;
      var wa = ios ? "„+“ → „Standort“" : "„+“ bzw. Büroklammer → „Standort“";
      setLoc("", gesperrt ?
        (ios ? "Der Standort ist gesperrt (iPhone: Einstellungen → Datenschutz & Sicherheit → Ortungsdienste → Safari-Websites). "
             : "Standortfreigabe nicht erlaubt. ") + "Oder direkt in WhatsApp senden: " + wa + "." :
        "Standort gerade nicht verfügbar. Schreiben Sie die Adresse dazu oder senden Sie den Standort direkt in WhatsApp (" + wa + ").");
    }
    var ortLauf = 0;
    if (locBtn) {
      if (!("geolocation" in navigator) || window.isSecureContext === false) {
        locBtn.hidden = true;
        hint.textContent = "Ihren Standort können Sie gleich direkt in WhatsApp senden.";
      } else locBtn.addEventListener("click", function () {
        if (wahl.ort) { wahl.ort = null; setLoc(""); render(); return; }   // erneut antippen = wieder entfernen
        var id = ++ortLauf, geo = navigator.geolocation;
        // Nur der gerade laufende Versuch darf etwas eintragen – verspätete Antworten werden ignoriert
        function laeuft() { return id === ortLauf && locBtn.disabled; }
        function ok(pos) { if (laeuft()) ortGefunden(pos); }
        function fehler(err) { if (laeuft()) ortFehler(err); }
        setLoc("busy", "Falls Ihr Browser fragt: bitte „Erlauben“ antippen.");
        setTimeout(function () { fehler({ code: 3 }); }, 40000);   // falls der Browser gar nicht antwortet
        geo.getCurrentPosition(ok, function (err) {
          if (!laeuft()) return;
          if (err && err.code === 1) return fehler(err);            // gesperrt: nochmal fragen hilft nicht
          // Zeitüberschreitung oder kein GPS (z. B. drinnen): noch einmal ohne GPS-Genauigkeit versuchen
          geo.getCurrentPosition(ok, fehler, { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 });
        }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
      });
    }
    render();
  })();

  /* ---------- Titel, Meta, strukturierte Daten (Google) ---------- */
  var pageName = doc.body.getAttribute("data-page");
  doc.title = (pageName ? pageName + " – " : "") + C.firma + " | 24h Schlüsseldienst " + C.stadt;
  var desc = doc.querySelector('meta[name="description"]');
  if (desc && !pageName) {
    desc.setAttribute("content", "24h Schlüsseldienst in " + C.stadt + ": Türöffnung zum Festpreis, in ca. " +
      C.anfahrtMinuten + " Min. vor Ort. Jetzt anrufen: " + C.telefon);
  }
  if (!pageName && !istVorschau) {
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
    var s = doc.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    doc.head.appendChild(s);
  }

  /* ---------- Kontaktleiste unten: erscheint, sobald die Hero-Buttons weg sind ---------- */
  var bar = doc.querySelector(".actionbar");
  var heroCta = doc.getElementById("hero-cta");
  if (bar) {
    if (!waNr) bar.className += " actionbar--single";
    if (heroCta && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var e = entries[0];
        bar.classList.toggle("is-visible", !e.isIntersecting && e.boundingClientRect.top < 0);
      }, { threshold: 0 }).observe(heroCta);
    } else {
      bar.classList.add("is-visible");
    }
  }

  /* ---------- Kopfleiste: Schatten, sobald gescrollt wird ---------- */
  var topbar = doc.querySelector(".topbar");
  if (topbar) {
    var onScroll = function () { topbar.classList.toggle("is-stuck", (window.pageYOffset || 0) > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Sanftes Einblenden beim Scrollen ----------
     Nur Elemente unterhalb des sichtbaren Bereichs werden versteckt – nichts flackert,
     und ohne IntersectionObserver oder bei „Bewegung reduzieren" bleibt alles sichtbar. */
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !ruhig) {
    var vh = window.innerHeight || doc.documentElement.clientHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target;
        io.unobserve(t);
        t.classList.add("in");
        setTimeout(function () { t.classList.remove("reveal", "in"); t.style.transitionDelay = ""; }, 1100);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    each(doc.querySelectorAll(".sec__head, .grid > *, .split__txt, .receipt, .versus__col, .steps > li, .radar, .area__txt, .faq details, .final .wrap"), function (n) {
      if (n.getBoundingClientRect().top < vh) return;
      var idx = Array.prototype.indexOf.call(n.parentNode.children, n);
      n.classList.add("reveal");
      n.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
      io.observe(n);
    });
  }
})();
