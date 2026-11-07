# Schlüsseldienst 24h – Website-Template

Mobil-optimierte One-Page-Website für Schlüsseldienste. Rein statisch (HTML/CSS/JS), ohne Build-Schritt, ohne Cookies, ohne externe Fonts oder Skripte. Läuft auf GitHub Pages, Cloudflare Pages oder jedem anderen Webspace.

**Features**
- Kopfleiste mit Anruf- und WhatsApp-Button, bleibt beim Scrollen oben stehen
- Kontaktleiste unten (Anrufen / WhatsApp), fährt ein, sobald die großen Buttons oben aus dem Bild gescrollt sind
- WhatsApp-Button öffnet den Chat mit vorformulierter Nachricht
- Leistungen, Festpreis-Tabelle, Ablauf, Einsatzgebiet, Bewertungen, FAQ
- Impressum und Datenschutzerklärung (Muster), automatisch mit Kundendaten befüllt
- Strukturierte Daten für Google (Locksmith, 24/7)
- **Demo-Links:** eine Seite, beliebig viele personalisierte Vorschauen per URL

## Dateien

| Datei | Zweck |
|---|---|
| `config.js` | **Alle Kundendaten** – das ist die einzige Datei, die du pro Kunde änderst |
| `index.html` | Startseite |
| `impressum.html`, `datenschutz.html` | Rechtliche Seiten |
| `style.css` | Design |
| `app.js` | Logik (Daten einsetzen, Kontaktleiste, Demo-Modus) |
| `favicon.svg` | Browser-Icon |

## 1. Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues **öffentliches** Repository anlegen, z. B. `schluesseldienst-demo`.
2. Alle Dateien aus diesem Ordner hochladen („Add file → Upload files“).
3. **Settings → Pages →** Source: „Deploy from a branch“, Branch: `main`, Ordner: `/ (root)` → Save.
4. Nach ca. 1 Minute ist die Seite erreichbar unter
   `https://DEIN-GITHUB-NAME.github.io/schluesseldienst-demo/`

## 2. Demo-Links für Kunden-Akquise

Du musst nicht für jeden Interessenten eine eigene Seite bauen. Häng einfach Parameter an den Link:

```
https://DEIN-GITHUB-NAME.github.io/schluesseldienst-demo/?name=Schlüsseldienst%20Weber&tel=06221123456&stadt=Heidelberg
```

| Parameter | Bedeutung | Beispiel |
|---|---|---|
| `name` | Firmenname | `Schlüsseldienst%20Weber` (`%20` = Leerzeichen) |
| `tel` | Telefonnummer (gilt auch für WhatsApp) | `06221123456` |
| `wa` | Abweichende WhatsApp-Nummer | `01701234567` |
| `stadt` | Stadt | `Heidelberg` |
| `gebiet` | Stadtteile, mit Komma getrennt | `Altstadt,Bergheim,Weststadt` |
| `min` | Anfahrtszeit in Minuten | `15–25` |
| `farbe` | Akzentfarbe als Hex ohne `#` (hell, nicht grün) | `facc15` |

Die Parameter bleiben auch beim Klick auf Impressum/Datenschutz erhalten. Die Demo-Seite ist per `noindex` vor Google versteckt, damit keine Seiten mit fremden Firmennamen in den Suchergebnissen landen.

> Tipp: Schick dem Kunden den Link per WhatsApp – er sieht die Seite sofort auf dem Handy mit seinem Namen und seiner Nummer.

## 3. Nach dem Verkauf: Kundenseite live schalten

1. Ordner kopieren und ein **eigenes Repo pro Kunde** anlegen (z. B. `schluesseldienst-weber`).
2. `config.js` komplett mit den echten Daten ausfüllen: Firma, Inhaber, Adresse, Nummern, Preise, Einsatzgebiet, Impressum-Angaben.
3. In `index.html`, `impressum.html` und `datenschutz.html` die Zeile
   `<meta name="robots" content="noindex, nofollow">` **löschen** (sonst findet Google die Seite nicht).
4. Hosting wählen (siehe unten) und in `config.js` `hosting` passend setzen.
5. Eigene Domain verbinden (z. B. `schluesseldienst-weber.de`).
6. Kurz testen: Anruf-Button, WhatsApp-Button, Impressum.

## 4. Hosting auf Cloudflare Pages

Da die Seite nur aus statischen Dateien besteht, ist der Umzug einfach:

1. Bei Cloudflare: **Workers & Pages → Create → Pages**.
2. Entweder **„Connect to Git“** (GitHub-Repo auswählen) – dann wird jede Änderung automatisch veröffentlicht – oder **„Upload assets“** und den Ordner per Drag & Drop hochladen.
3. Build-Einstellungen: Framework „None“, Build command **leer**, Output directory **`/`**.
4. Unter **Custom domains** die Kunden-Domain hinzufügen.
5. In `config.js`: `hosting: "cloudflare"` setzen – dann zeigt die Datenschutzerklärung automatisch den Cloudflare-Absatz statt GitHub.

Keine Pfad-Anpassungen nötig: Alle Links sind relativ und funktionieren auf beiden Hosts.

## 5. Bewertungen

`bewertungen` in `config.js` ist absichtlich leer, der Bereich wird dann ausgeblendet. Trag dort **nur echte Bewertungen** ein (z. B. aus dem Google-Profil des Kunden) und verlinke das Profil unter `googleBewertungenUrl`. Erfundene Bewertungen sind wettbewerbswidrig (UWG) und können abgemahnt werden.

## 6. Rechtliche Hinweise (wichtig)

- Impressum und Datenschutzerklärung sind **Muster** und keine Rechtsberatung. Vor dem Livegang mit den echten Angaben des Kunden prüfen bzw. mit einem Generator (z. B. eRecht24, Datenschutz-Generator.de) erstellen.
- Preise müssen Endpreise **inkl. MwSt.** sein (Preisangabenverordnung). Die Beispielpreise in `config.js` mit dem Kunden abstimmen.
- Werbeaussagen („in ca. 20–30 Min. vor Ort“, „ohne Schaden“) nur so übernehmen, wie der Kunde sie auch einhalten kann.
- Die Seite lädt keine Google Fonts und keine externen Skripte, deshalb ist kein Cookie-Banner nötig.
