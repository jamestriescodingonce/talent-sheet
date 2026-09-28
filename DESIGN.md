# Talent Sheet — Design System (v2)

**Who owns what.** Talent Sheet is the public record of equity between athletes, other public figures and the companies they back: a directory you can search and a newsletter you actually open. It reads as a trusted record first and a great column second. Never as a sportsbook.

**In one line:** The Ringer's voice, Fidelity's restraint, and a green you could only find in a clubhouse.

This file is the single source of truth for design. If code and this file disagree, this file wins. All example names are fictional.

---

## 1. Principles

- **Paper first.** Light is the primary theme. A warm off-white ground reads as a record; black reads as an app.
- **Deep green, not neon.** `brand` is forest green; `pitch` is the clubhouse-wall green for big signature fields.
- **One lime moment.** `highlight` (#B8E986) appears only on `pitch` fields: the wordmark dot, one underline, or one figure. It's memorable because it's rare.
- **Mode-tuned greens.** `brand` has a different value per theme on purpose. Never swap them.
- **Drawn with lines, not shadows.** No shadows, gradients or glows. Hierarchy comes from ground colour and 1px hairlines.
- **Trust is the product.** Every deal shows how we know it.

Deliberately avoided: neon as a background (Robinhood, Cash App), gradients and crowns (DraftKings), pure black (Spotify), and any green/red up/down pairing (trading apps).

---

## 2. Colour

### Proportion
A typical page is ~90% `surface` / `surface-raised` / `ink`, ~8% `ink-muted` and `hairline`, ~2% `brand`. A large `pitch` field appears **at most once per page** (masthead, hero or footer).

### Tokens

| Token | Light (Paper) | Dark (Night) | Use |
|---|---|---|---|
| `surface` | #F7F6F1 | #0B120E | Page ground. Never #FFF / #000. |
| `surface-raised` | #FFFFFF | #131C17 | Cards, table body, newsletter frame. |
| `surface-sunk` | #EEEDE6 | #080D0A | Table header band, data wells, search field. |
| `surface-hover` | #F0EFE8 | #18231D | Row and card hover. |
| `hairline` | #DCDAD0 | #25332B | 1px dividers, row rules, card edges. Never the only edge of a control. |
| `control-border` | #8C897D | #607268 | Inputs, secondary buttons, outline badges (3:1). |
| `ink` | #0C1510 | #F1F0E9 | Primary text and figures. |
| `ink-muted` | #545D57 | #9CA79F | Secondary text, metadata, column labels. |
| `ink-disabled` | #A3A69F | #56615A | Disabled controls only. |
| `brand` | #0F5B38 | #5FCB92 | Links, the one primary action, verified marks, wordmark. |
| `on-brand` | #FFFFFF | #0B120E | Text/icons on a brand fill. |
| `brand-wash` | #E3EFE7 | #12261B | Selected rows, active filter chips, verified badge. Text on it: `brand`. |
| `pitch` | #0B3B27 | #12432D | Signature field: masthead, share cards, hero band, footer. |
| `on-pitch` | #F4F1E6 | #F4F1E6 | Cream text on pitch. |
| `highlight` | #B8E986 | #B8E986 | Lime. **Only on pitch.** Never on paper or surface. |
| `fresh` | #8A5300 | #F0B25A | Recency only: NEW marker, "this week" counts. One per row. |
| `fresh-wash` | #FBEBD2 | #2C2010 | NEW marker ground. |
| `negative` | #A1392B | #F08C7C | Exits, markdowns, dissolved deals. Always with a minus sign or word. |
| `focus-ring` | #2F6FDB | #8FB4FF | 2px focus outline, 2px offset. Blue so it never reads as brand or status. |
| `locked` | #EEEDE6 | #1A2520 | Gated fields for visitors who haven't done the intake form. Text: `ink-muted`. |

### Talent categories
Always a dot **plus** a word, never colour alone. Also the chart series order. Brand green is never a category, so green always means Talent Sheet.

| Token | Light | Dark | Category |
|---|---|---|---|
| `cat-athlete` | #2C5AA0 | #8DB0EE | Athlete |
| `cat-coach` | #7B3F86 | #D29BDC | Coach |
| `cat-entertainer` | #A8522B | #F0A27F | Entertainer / Celebrity |
| `cat-executive` | #1D6E73 | #6FC6CB | Executive |
| `cat-investor` | #7F6512 | #DDBF5C | Financial Investor |
| `cat-other` | #4F5B67 | #AAB6C2 | Other |

Every text pairing above passes 4.5:1 in both themes; `control-border` and `focus-ring` pass 3:1.

---

## 3. Typography

Rule of thumb: **a headline is serif, a sentence is sans, a label is mono.**

- **Newsreader** (display): the editorial voice. Headlines, names, masthead.
- **DM Sans** (sans): everything read at interface size. All numbers use `font-variant-numeric: tabular-nums`.
- **IBM Plex Mono** (mono): small uppercase labels only. Never for figures.

Load from Google Fonts: Newsreader (400, 500, 600, italic 400), DM Sans (400, 500, 600), IBM Plex Mono (500).

| Style | Font | Size / line | Weight | Notes | Use |
|---|---|---|---|---|---|
| `display` | Newsreader | 64 / 64 | 500 | -0.02em | Home hero and newsletter masthead only |
| `headline` | Newsreader | 36 / 40 | 500 | -0.01em | Page titles, profile names, story headlines |
| `deck` | Newsreader | 20 / 28 | 400 italic | | Standfirst under a headline |
| `title` | DM Sans | 18 / 24 | 600 | | Card and section titles |
| `body` | DM Sans | 16 / 26 | 400 | | Paragraphs, deal notes, newsletter body |
| `small` | DM Sans | 14 / 20 | 400 | | Metadata, table cells, captions |
| `figure` | DM Sans | 15 / 20 | 500 | tabular-nums | Round sizes, dates, counts; right-aligned in tables |
| `label` | IBM Plex Mono | 11 / 16 | 500 | uppercase, 0.08em | Column headers, tags, NEW marker, issue numbers |

---

## 4. Spacing, radius, layout

**Spacing:** `space-1` 4px (icon to label) · `space-2` 8px (inside chips) · `space-3` 12px (cell and button vertical padding) · `space-4` 16px (card padding, cell horizontal padding) · `space-6` 24px (card gutter, mobile side margin) · `space-10` 40px (between sections) · `space-16` 64px (hero and masthead).

**Radius:** `radius-sm` 3px (tags, NEW marker, inputs; nearly square, this is a ledger) · `radius-md` 8px (cards, buttons, photos, share cards) · `radius-pill` 999px (filter chips and avatar stacks only).

**Layout:**
- `content-max` 1200px for directory and table pages; `reading-max` 680px for newsletter issues, bios, articles.
- `bp-sm` 640px: below, tables collapse to stacked deal cards.
- `bp-md` 960px: below, filters move into a sheet; profile stat strip wraps.
- `row-height` 56px minimum deal row; 44px minimum tap target inside it.

---

## 5. Voice and content

Informed, dry, a little wry. A smart friend who read the filing so you didn't have to. Facts first; the joke, if any, is short and second.

- Lead with person, then company, then deal shape: "Maya Okafor joined the seed round of Tidewell as investor and brand ambassador."
- Name the relationship precisely: investor, ambassador + equity, franchise owner, executive stake, advisor, fund founder. Never "partnered with."
- Exact numbers when public; "Undisclosed" when not. Never "a massive round."
- Every deal carries a verification status and a source.
- Sentence case. No exclamation marks. Never "unlock" as marketing, "game-changer," "empower."
- Newsletter headlines may have personality; directory UI never does ("3 companies · 2 sectors").

---

## 6. Verification and gating

**Verification** (told apart by shape and word, not just hue):
- **Verified:** `brand` check + "Verified" on `brand-wash`. Primary source confirmed (filing, company announcement, the talent's own post).
- **Reported:** outline badge in `control-border` + "Reported." Credible secondary source; source link required.
- **Unverified:** dashed outline, `ink-muted`. Internal view only; never in the public directory or newsletter.

Non-public amounts render as "Undisclosed" in `ink-muted`, never a dash or zero.

**Gating:** the open layer shows name, sport, company, relationship and verification status. Amounts, dates, round details and sources are gated behind the intake form: they render as a `locked` field with a small lock icon and "Unlock" in `brand`. Never blur real numbers.

---

## 7. Components

**Button**
- Primary: `brand` fill, `on-brand` text. One per view (Subscribe, Search, Submit a deal).
- Secondary: `control-border` outline, `ink` text. Link: `brand`, underlined.
- `radius-md`, padding `space-3` × `space-4`, DM Sans 600 15px. Focus: 2px `focus-ring`, 2px offset. Disabled: `surface-sunk` + `ink-disabled`. Labels are sentence-case verbs.

**Tag**
- Talent type: `label` text + 8px dot in the matching `cat-*` colour.
- Verification: as in section 6. New: `fresh` on `fresh-wash`, only for deals added in the last 7 days, max one per row.
- Filter chip: `radius-pill`, `control-border` outline; selected = `brand-wash` ground, `brand` border and text.
- Tags use `radius-sm`. Never put a tag on a pitch field.

**Deal row** (the core of the directory)
- Columns in order: Talent (name + league/role, category dot) · Company (brand link, NEW tag if added this week) · Relationship (precise wording) · Round (`figure`, right-aligned, "Undisclosed" if not public) · Date (`figure`, month + year) · Status (verification tag).
- Header band `surface-sunk` with `label` heads; body `surface-raised`; `hairline` row rules; hover `surface-hover`; min height `row-height`.
- Below `bp-sm`: stacked card (name + company on top, relationship + round beneath, status bottom-right).
- Gated view: Round and Date render as `locked` with lock + "Unlock."
- Data: the deal record from Airtable plus a source URL for the status tag.

**Profile header**
- `label` line (talent type, league, position) above the name in `headline`; one-line `deck` in italic `ink-muted`, written by an editor, never generated.
- Stat strip: exactly three counts (DM Sans 600 tabular), labels in `ink-muted`, above a `hairline`. Counts use verified deals only.
- Photo: square, `radius-md`, `hairline` edge; `surface-sunk` placeholder when none.

**Newsletter masthead**
- `pitch` ground; wordmark in Newsreader 600 `on-pitch`; full stop in `highlight` (the only lime on the page).
- Meta bar: issue number, tagline, date in `label`, over a 1px `on-pitch` rule.

**Share card**
- 1200×630 (link previews) and 1080×1350 (Instagram, headline 80px).
- `pitch` ground, Newsreader 500 `on-pitch` headline, one key figure in `highlight` (never more), wordmark top-left, verification + source bottom-left. Typographic only, no photos.

---

## 8. Logo, icons, imagery

- **Wordmark (interim):** "Talent Sheet" in Newsreader 600. On paper: `ink` with a `brand` full stop. On pitch: `on-pitch` with a `highlight` full stop. The full stop is the brand's signature detail. Clear space = cap height.
- **Monogram** (favicon, avatars): "TS" in Newsreader 600, `on-pitch` on `pitch`, `radius-md` square.
- **Icons:** line icons, 1.5px stroke, square caps, `ink-muted` at rest, `ink` on hover. No filled icons, no emoji in product UI.
- **Photos:** cropped tight in a `radius-md` frame with a `hairline` edge.
- **Company logos:** keep their own colours on `surface-raised` tiles; never recolour.

---

## 9. Do and don't

**Do:** keep pages mostly paper · let one green thing be the loudest element · show how every deal is known · set numbers in tabular sans · separate with hairlines.

**Don't:** put lime on paper · pair green with red for up/down · use `fresh` for emphasis · put shadows on cards · recolour partner logos · use a category colour without its word.

---

## 10. Implementation

### CSS variables
Every token is a CSS variable of the same name. Themes switch with `data-theme="light"` / `data-theme="dark"` on `<html>`. Light is the default.

```css
:root, [data-theme="light"] {
  --surface: #F7F6F1; --surface-raised: #FFFFFF; --surface-sunk: #EEEDE6; --surface-hover: #F0EFE8;
  --hairline: #DCDAD0; --control-border: #8C897D;
  --ink: #0C1510; --ink-muted: #545D57; --ink-disabled: #A3A69F;
  --brand: #0F5B38; --on-brand: #FFFFFF; --brand-wash: #E3EFE7;
  --pitch: #0B3B27; --on-pitch: #F4F1E6; --highlight: #B8E986;
  --fresh: #8A5300; --fresh-wash: #FBEBD2; --negative: #A1392B;
  --focus-ring: #2F6FDB; --locked: #EEEDE6;
  --cat-athlete: #2C5AA0; --cat-coach: #7B3F86; --cat-entertainer: #A8522B;
  --cat-executive: #1D6E73; --cat-investor: #7F6512; --cat-other: #4F5B67;
}
[data-theme="dark"] {
  --surface: #0B120E; --surface-raised: #131C17; --surface-sunk: #080D0A; --surface-hover: #18231D;
  --hairline: #25332B; --control-border: #607268;
  --ink: #F1F0E9; --ink-muted: #9CA79F; --ink-disabled: #56615A;
  --brand: #5FCB92; --on-brand: #0B120E; --brand-wash: #12261B;
  --pitch: #12432D; --on-pitch: #F4F1E6; --highlight: #B8E986;
  --fresh: #F0B25A; --fresh-wash: #2C2010; --negative: #F08C7C;
  --focus-ring: #8FB4FF; --locked: #1A2520;
  --cat-athlete: #8DB0EE; --cat-coach: #D29BDC; --cat-entertainer: #F0A27F;
  --cat-executive: #6FC6CB; --cat-investor: #DDBF5C; --cat-other: #AAB6C2;
}
:root {
  --font-display: "Newsreader", Georgia, "Times New Roman", serif;
  --font-sans: "DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-10: 40px; --space-16: 64px;
  --radius-sm: 3px; --radius-md: 8px; --radius-pill: 999px;
  --content-max: 1200px; --reading-max: 680px; --row-height: 56px;
}
```

### Tailwind (Next.js)
Map utilities to the variables rather than copying hex values, so theme switching is free:

```css
@theme {
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-surface-sunk: var(--surface-sunk);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-hairline: var(--hairline);
  --color-brand: var(--brand);
  --color-brand-wash: var(--brand-wash);
  --color-pitch: var(--pitch);
  --color-highlight: var(--highlight);
  --color-fresh: var(--fresh);
  --color-negative: var(--negative);
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

Add `tabular-nums` to every table cell and figure. Breakpoints: `bp-sm` 640px, `bp-md` 960px.

### Framer (marketing site)
Create colour styles named exactly as the tokens (Surface, Ink, Brand, Pitch, Highlight…) with light and dark values, and text styles for display, headline, deck, title, body, small, figure and label. Identical names mean changes here can be mirrored in minutes.

### Email (newsletter)
Most clients ignore web fonts: Newsreader falls back to Georgia, DM Sans to Helvetica/Arial. Email is light-theme only. Build the masthead as a `pitch` table cell with live `on-pitch` text and the `highlight` full stop, not an image. Keep the body at `reading-max`.
