/* =========================================================================
   KUNDEN-KONFIGURATION
   Für jeden Schlüsseldienst nur DIESE Datei anpassen.
   Alle Texte, Nummern, Preise und Farben kommen von hier.
   ========================================================================= */
window.SITE_CONFIG = {
  // --- Firma ---------------------------------------------------------------
  firma: "Schlüsseldienst Muster",
  inhaber: "Max Mustermann",
  stadt: "Mannheim",

  // --- Kontakt ---------------------------------------------------------------
  telefon: "0621 123 456 78",          // wird angezeigt + für den Anruf-Button genutzt
  whatsapp: "0170 123 45 67",          // Handynummer, auf der WhatsApp läuft
  email: "info@beispiel.de",

  adresse: {
    strasse: "Musterstraße 1",
    plz: "68159",
    ort: "Mannheim"
  },

  // --- Versprechen -----------------------------------------------------------
  anfahrtMinuten: "20–30",
  heroText: "Festpreis am Telefon, bevor wir losfahren. Keine versteckten Kosten – zugefallene Türen öffnen wir meist ohne Schaden.",

  vorteile: [
    "Festpreis vorab am Telefon",
    "24/7 – auch Sonn- & Feiertags",
    "Kartenzahlung möglich",
    "Ordentliche Rechnung"
  ],

  // --- WhatsApp-Nachricht & Schnellanfrage (Kasten oben auf der Startseite) ---
  // Jeder WhatsApp-Button öffnet eine fertige Nachricht: erste Zeile = anfrageText,
  // dann (bei der Schnellanfrage) „Was ist passiert“, zuletzt der standortText.
  // Den Standort schickt der Kunde danach direkt in WhatsApp („+“ → „Standort“).
  anfrageText: "Hallo, ich brauche einen Schlüsseldienst.",
  standortText: "Meinen Standort schicke ich Ihnen gleich.",   // leer lassen = Zeile entfällt
  // Auswahl „Was ist passiert?“ – Liste leer = Auswahl ausgeblendet.
  situationen: [
    "Tür zugefallen",
    "Tür abgeschlossen",
    "Schlüssel abgebrochen",
    "Schlüssel verloren",
    "Schlüssel im Auto",
    "Schloss defekt"
  ],

  // --- Leistungen (icon: tuer | auto | schloss | schutz | tresor | einbruch) --
  leistungen: [
    { icon: "tuer",     titel: "Türöffnung",          text: "Tür zugefallen oder Schlüssel abgebrochen? Wir öffnen Wohnungs- und Haustüren schnell und schonend." },
    { icon: "auto",     titel: "Autoöffnung",         text: "Schlüssel im Auto eingeschlossen? Wir öffnen die meisten Fahrzeuge ohne Kratzer." },
    { icon: "schloss",  titel: "Schloss austauschen", text: "Schlüssel verloren oder Umzug? Neuer Schließzylinder direkt vor Ort – auch nachts." },
    { icon: "einbruch", titel: "Notdienst nach Einbruch", text: "Wir sichern Ihre Tür sofort provisorisch und tauschen beschädigte Schlösser aus." },
    { icon: "schutz",   titel: "Einbruchschutz",      text: "Beratung und Einbau von Sicherheitsbeschlägen, Querriegeln und Zusatzschlössern." },
    { icon: "tresor",   titel: "Tresoröffnung",       text: "Code vergessen oder Schloss defekt? Wir öffnen Tresore fachgerecht." }
  ],

  // --- Preise (BEISPIELWERTE – mit dem Kunden abstimmen!) --------------------
  preise: [
    { leistung: "Türöffnung (zugefallen)", zeit: "Mo–Fr 8–18 Uhr",          preis: "ab 89 €" },
    { leistung: "Türöffnung (zugefallen)", zeit: "Abends, nachts, Wochenende", preis: "ab 129 €" },
    { leistung: "Türöffnung (abgeschlossen)", zeit: "jederzeit",             preis: "ab 149 €" },
    { leistung: "Schließzylinder tauschen", zeit: "inkl. Material",          preis: "ab 59 €" }
  ],
  preisHinweis: "Alle Preise inkl. 19 % MwSt. Anfahrt im Einsatzgebiet inklusive. Den genauen Festpreis nennen wir Ihnen vor der Abfahrt am Telefon.",

  zahlungsarten: "Bar, EC-Karte und Kreditkarte",

  // --- Fair-Check (Vergleich „unseriöse Anbieter" / dieser Betrieb) ----------
  // Rechte Spalte („wir") NUR mit Aussagen füllen, die der Kunde wirklich einhält.
  // „wir" leer lassen = Bereich wird automatisch ausgeblendet.
  fair: {
    unserioes: [
      "Preis erst nach der Türöffnung",
      "Hohe Zuschläge für Anfahrt und Nachtzeit",
      "Nur Barzahlung, keine Rechnung",
      "Schloss wird unnötig aufgebohrt"
    ],
    wir: [
      "Festpreis am Telefon – vor der Abfahrt",
      "Anfahrt im Einsatzgebiet inklusive",
      "Kartenzahlung und ordentliche Rechnung",
      "Zugefallene Türen meist ohne Schaden geöffnet"
    ]
  },

  // --- Einsatzgebiet ---------------------------------------------------------
  einsatzgebiet: [
    "Innenstadt", "Neckarstadt", "Lindenhof", "Neuostheim", "Feudenheim",
    "Käfertal", "Sandhofen", "Rheinau", "Neckarau", "Ludwigshafen", "Viernheim", "Schwetzingen"
  ],

  // --- Bewertungen -----------------------------------------------------------
  // NUR echte Bewertungen eintragen (z. B. von Google), mit Erlaubnis.
  // Leer lassen = Bereich wird automatisch ausgeblendet.
  // Beispiel: { name: "Anna K.", sterne: 5, text: "...", quelle: "Google" }
  bewertungen: [],
  googleBewertungenUrl: "",   // Link zum Google-Profil (optional)

  // --- Impressum (Pflichtangaben) --------------------------------------------
  impressum: {
    rechtsform: "Einzelunternehmen",
    ustId: "",                // z. B. "DE123456789"
    handelsregister: "",      // z. B. "Amtsgericht Mannheim, HRB 12345"
    kammer: "",               // z. B. "Handwerkskammer Mannheim Rhein-Neckar-Odenwald"
    berufsbezeichnung: ""     // z. B. "Metallbauermeister, verliehen in Deutschland"
  },

  // --- Hosting (steuert den passenden Absatz in der Datenschutzerklärung) ----
  hosting: "github",          // "github" oder "cloudflare"

  // --- Design ----------------------------------------------------------------
  farbe: "#f5a524",           // Akzentfarbe (Anruf-Button, Highlights) – hell, aber NICHT grün (WhatsApp ist grün)
  farbeText: "#111827",       // Textfarbe AUF der Akzentfarbe

  // --- Demo / Vorschau-Links (nur für die Akquise) ---------------------------
  // Vorschau-Links (?name=…&tel=…&stadt=…) funktionieren nur, solange die Seite
  // auf „noindex" steht. Auf einer veröffentlichten Kundenseite sind sie automatisch aus.
  demo: {
    aktiv: true,              // false = Vorschau-Links ganz abschalten
    streifen: true,           // Streifen „Vorschau für … · noch nicht online" bei Vorschau-Links
    anbieter: "",             // dein Name / deine Firma, z. B. "Müller Webdesign" (optional)
    whatsapp: ""              // deine WhatsApp-Nummer → Knopf „Seite anfragen" im Streifen (optional)
  }
};
