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
  whatsappText: "Hallo, ich brauche einen Schlüsseldienst. Mein Standort: ",
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
  farbeText: "#111827"        // Textfarbe AUF der Akzentfarbe
};
