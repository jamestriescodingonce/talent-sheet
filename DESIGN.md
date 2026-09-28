# Talent Sheet — Design System (v5)

**Who owns what.** Talent Sheet is the public record of equity between athletes, other public figures and the companies they back: a directory you can search and a newsletter you actually open. It reads as a trusted record first and a great column second. Never as a sportsbook.

**In one line:** The Ringer's voice, Fidelity's restraint, and a green you could only find in a clubhouse.

**Visual world (v5):** dark, photo-led and premium, following the user's reference layout for profiles. The v4 "share register" certificate treatment was rejected and is retired. Reference build: `previews/profile-v5.html` (three versions of the hero treatment, pick pending).

This file is the single source of truth for design. If code and this file disagree, this file wins. All example names are fictional.

---

## 1. Principles

- **Night first.** Dark (Night) is the primary theme: a deep green-black ground, never pure black. Light (Paper) is kept as an alternate theme.
- **Cool green that pops, not neon.** In dark, `brand` is a cool, bright green. Use it generously on interactive and key elements (links, active tabs and chips, key figures, verified marks), never as a large flat fill.
- **One lime moment.** `highlight` (#B8E986) appears only on `pitch` fields: the wordmark dot, one underline, or one figure. It's memorable because it's rare.
- **Mode-tuned greens.** `brand` has a different value per theme on purpose. Never swap them.
- **Depth, lightly (loosened, medium).** Allowed: a soft green glow or gradient behind the hero, and soft shadows on cards that deepen slightly on hover with a 2px lift. Still not allowed: glowing text, glowing borders, neon fills, rainbow or multi-hue gradients, glassmorphism.
- **Trust is the product.** Every deal shows how we know it.

Deliberately avoided: neon as a background (Robinhood, Cash App), gradients and crowns (DraftKings), pure black (Spotify), and any green/red up/down pairing (trading apps).

---

## 2. Colour

### Proportion
A typical page is ~85% `surface` / `surface-raised` / `ink`, ~8% `ink-muted` and `hairline`, ~5–7% `brand` (accents plus the hero glow). A large `pitch` field appears **at most once per page** (masthead, hero or footer).

### Tokens

| Token | Light (Paper) | Dark (Night) | Use |
|---|---|---|---|
| `surface` | #F7F6F1 | #0A110D | Page ground. Never #FFF / #000. |
| `surface-raised` | #FFFFFF | #0F1813 | Cards, table body, newsletter frame. |
| `surface-sunk` | #EEEDE6 | #080D0A | Table header band, data wells, search field. |
| `surface-hover` | #F0EFE8 | #14201A | Row and card hover. |
| `hairline` | #DCDAD0 | #24332A | 1px dividers, row rules, card edges. Never the only edge of a control. |
| `control-border` | #8C897D | #607268 | Inputs, secondary buttons, outline badges (3:1). |
| `ink` | #0C1510 | #EDEBE0 | Primary text and figures. |
| `ink-muted` | #545D57 | #A3AEA6 | Secondary text, metadata, column labels. |
| `ink-disabled` | #A3A69F | #56615A | Disabled controls only. |
| `brand` | #0F5B38 | #3DDC97 | Links, the one primary action, verified marks, wordmark, active tab. |
| `on-brand` | #FFFFFF | #0B120E | Text/icons on a brand fill. |
| `brand-wash` | #E3EFE7 | #10281D | Selected rows, active filter chips, verified badge. Text on it: `brand`. |
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

One family, **Geist**, used with tight tracking at display sizes and plain at reading sizes. The reference is a clean, modern sans throughout; hierarchy comes from size and weight, not a second face. No monospace.

Load from Google Fonts: Geist (400, 500, 600, 700). All numbers use `font-variant-numeric: tabular-nums` where they line up.

| Style | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| `display` | clamp(40px, 4.6vw, 60px) / 1 | 600 | -0.035em | Profile name |
| `headline` | 22 / 28 | 600 | -0.02em | Section titles ("Investment portfolio") |
| `figure-lg` | 24 / 30 | 600 | -0.02em | Hero facts (companies, sectors, earliest deal) |
| `title` | 16 / 20 | 600 | -0.01em | Company name on a card |
| `body` | 15 / 1.55 | 400 | 0 | Paragraphs, descriptions |
| `small` | 13–14 / 1.45 | 400–500 | 0 | Sector, metadata, key/value labels, tags |
| `caption` | 11 / 16 | 500 | 0.08em, uppercase | Rare: photo credit or placeholder label only |

---

## 4. Spacing, radius, layout

**Spacing:** `space-1` 4px (icon to label) · `space-2` 8px (inside chips) · `space-3` 12px (cell and button vertical padding) · `space-4` 16px (card padding, cell horizontal padding) · `space-6` 24px (card gutter, mobile side margin) · `space-10` 40px (between sections) · `space-16` 64px (hero and masthead).

**Radius:** `radius-sm` 6px (tags, inputs, small controls) · `radius-md` 12px (cards, buttons) · `radius-lg` 16px (hero banner, large panels) · `radius-pill` 999px (filter chips and avatar stacks only).

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
- `radius-md`, padding `space-3` × `space-4`, Geist 600 15px. Focus: 2px `focus-ring`, 2px offset. Disabled: `surface-sunk` + `ink-disabled`. Labels are sentence-case verbs.

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

**Profile banner** (follows the user's reference)
- App shell: 248px left sidebar (wordmark, icon nav, newsletter card at the foot) plus a slim top bar (section links, search). Below 1000px the sidebar becomes a top strip.
- Banner: `radius` 16px, photo on the left (~44%), text on the right: league · position, name in `display`, one sentence (associated company and what they back), a row of three facts (`figure-lg`, the count in `brand`), social icons. No bio paragraph, no tagline.
- The banner carries the page's one glow: a soft green radial or gradient behind the photo. Its exact treatment is the choice between versions A (Floodlight), B (Pitch) and C (Broadcast) in `previews/profile-v5.html`.
- Photos fade into the banner on their inner edge. Placeholder: a rim-lit studio silhouette labelled "Placeholder photo", never a likeness of a real person.

**Portfolio card**
- `radius` 12px, 1px `hairline`, soft shadow; hover lifts 2px and deepens the shadow (220ms, strong ease-out). Reduced motion: no lift.
- Grid: 4 columns ≥1280px, 3 ≥1000px, 2 ≥680px, 1 below; 16px gutter.
- Logo in a 44px circle **beside** the company name and sector (never stacked). Logos keep their own colours on a light tile.
- Two-line description, then Relationship / Invested (year or "Undisclosed"), then a footer: "View details →" in `brand` and a Verified/Reported tag. View details expands in place (round, amount, source).
- Sector filter chips above the grid (`radius-pill`); "View all (n) →" link beside the section title.

**Newsletter masthead**
- `pitch` ground; wordmark in Geist 700 `on-pitch`; full stop in `highlight` (the only lime on the page).
- Meta bar: issue number, tagline, date in `label`, over a 1px `on-pitch` rule.

**Share card**
- 1200×630 (link previews) and 1080×1350 (Instagram, headline 80px).
- `pitch` ground, Geist 600 `on-pitch` headline, one key figure in `highlight` (never more), wordmark top-left, verification + source bottom-left. Typographic only, no photos.

---

## 8. Logo, icons, imagery

- **Wordmark (interim):** "Talent Sheet" in Geist 700. On paper: `ink` with a `brand` full stop. On pitch: `on-pitch` with a `highlight` full stop. The full stop is the brand's signature detail. Clear space = cap height.
- **Monogram** (favicon, avatars): "TS" in Geist 700, `on-pitch` on `pitch`, `radius-md` square.
- **Icons:** line icons, 1.5px stroke, square caps, `ink-muted` at rest, `ink` on hover. No filled icons, no emoji in product UI.
- **Photos:** cropped tight in a `radius-md` frame with a `hairline` edge. Only licensed photos of real people; otherwise the silhouette placeholder.
- **Company logos:** keep their own colours on `surface-raised` tiles; never recolour.

---

## 9. Do and don't

**Do:** keep pages mostly dark ground · let the hero be the loudest element · show how every deal is known · set numbers in tabular sans · separate with hairlines and light depth.

**Don't:** put lime on paper · pair green with red for up/down · use `fresh` for emphasis · stack heavy or coloured shadows on cards · recolour partner logos · use a category colour without its word.

---

## 10. Implementation

### CSS variables
Every token is a CSS variable of the same name. Themes switch with `data-theme="light"` / `data-theme="dark"` on `<html>`. Dark is the default.

```css
:root, [data-theme="dark"] {
  --surface: #0A110D; --surface-raised: #0F1813; --surface-sunk: #080D0A; --surface-hover: #14201A;
  --hairline: #24332A; --control-border: #607268;
  --ink: #EDEBE0; --ink-muted: #A3AEA6; --ink-disabled: #56615A;
  --brand: #3DDC97; --on-brand: #0B120E; --brand-wash: #10281D;
  --pitch: #12432D; --on-pitch: #F4F1E6; --highlight: #B8E986;
  --fresh: #F0B25A; --fresh-wash: #2C2010; --negative: #F08C7C;
  --focus-ring: #8FB4FF; --locked: #1A2520;
  --cat-athlete: #8DB0EE; --cat-coach: #D29BDC; --cat-entertainer: #F0A27F;
  --cat-executive: #6FC6CB; --cat-investor: #DDBF5C; --cat-other: #AAB6C2;
}
[data-theme="light"] {
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
:root {
  --font-sans: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-10: 40px; --space-16: 64px;
  --radius-sm: 6px; --radius-md: 12px; --radius-lg: 16px; --radius-pill: 999px;
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
  --font-sans: var(--font-sans);
}
```

Add `tabular-nums` to every table cell and figure. Breakpoints: `bp-sm` 640px, `bp-md` 960px.

### Framer (marketing site)
Create colour styles named exactly as the tokens (Surface, Ink, Brand, Pitch, Highlight…) with light and dark values, and text styles for display, headline, deck, title, body, small, figure and label. Identical names mean changes here can be mirrored in minutes.

### Email (newsletter)
Most clients ignore web fonts: Geist falls back to Helvetica/Arial. Email is light-theme only. Build the masthead as a `pitch` table cell with live `on-pitch` text and the `highlight` full stop, not an image. Keep the body at `reading-max`.
