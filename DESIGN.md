# Talent Sheet — Design System (v6.1)

**Who owns what.** Talent Sheet is the public record of equity between athletes, other public figures and the companies they back. The product should feel like **a premium athlete business database**: dark, quiet, editorial and data-rich without feeling busy. Think Linear + Bloomberg + a modern VC database. Never a sports news site, a SaaS dashboard, an analytics dashboard or a sportsbook.

This file is the single source of truth for design. If code, CLAUDE.md, PRODUCT.md or any earlier preview disagrees with this file, this file wins.

**Reference builds:** `previews/experiment-2.html` for the athlete profile (published at https://claude.ai/artifact/8ty3HnP54whm6cXKqcTXZo) and `design/Investments.html` for the Investments table page (published at https://claude.ai/artifact/KnV2RuHPYEF3R4wmTbAXBy). See section 10 for what the Investments page adds. When in doubt, match them. Earlier directions (v2 paper, v3 cards, v4 share-certificate, v5 photo-banner with glows and filter chips) are **retired**; they live only in git history and `previews/` for reference. Do not reuse their layouts.

---

## 1. Principles

- **The portfolio is the page.** Hierarchy: athlete → who they are → what businesses they're involved with. Everything else is secondary.
- **Optimise for discovery, not density.** Someone should land on an athlete and think "I didn't know they were involved with *that*", click the company, and find another athlete. Portfolio cards and the company sheet are the discovery mechanism; no recommendation widgets.
- **Quiet by default.** ~90% of the UI is dark grey, white and muted grey. Colour is for interaction and a few key facts only.
- **Defined by spacing, contrast and type, not borders or boxes.** Hairline borders, almost no shadows, small radii. Not a bubbly UI.
- **Remove before adding.** If a page looks busy, too colourful or too much like a dashboard, remove elements. If it looks empty, improve type and spacing before adding a module.
- **Never invent data.** If the record doesn't have a value (photo, team, number, verified flag, totals), leave it out. Never fake counts or ranges.

---

## 2. Colour

Dark only.

| Token | Value | Use |
|---|---|---|
| `bg` | #090C0F | Page and sidebar ground |
| `surface` | #0B1014 | Sheets, panels |
| `card` | #0D1419 | Cards, search field |
| `card-hover` | #10181E | Card hover |
| `border` | #1A252D | Default 1px border (cards, search, sheet) |
| `border-hover` | #26343D | Hovered border (neutral) |
| `rule` | #172127 | Sidebar edge, tab band top/bottom, sheet rows |
| `text` | #F1F4F6 | Primary text |
| `text-2` | #98A5AE | Secondary text |
| `muted` | #687680 | Muted labels, placeholders, categories |
| `very-muted` | #4F5D66 | Placeholder captions, notes |
| `accent` | #3DDC97 | The cool green. Links, active states, key facts (see below) |
| `accent-hover` | #6BE7B1 | Link hover |
| `accent-wash` | rgba(61,220,151,0.10) | Hovered rows in the company sheet |
| `accent-line` | rgba(61,220,151,0.30) | Card hover border |
| `nav-on` | #10231A | Active sidebar item background |
| `focus` | #8FB4FF | Keyboard focus outline only. Blue so it never reads as brand |

**Where green goes** (the "Richer" setting in the reference, which is the chosen one):
- Logo mark, active sidebar icon, active tab text and its 2px underline.
- The first hero metadata figure (the company count).
- A 5px dot before each relationship label on cards.
- Card hover: border `accent-line` and the company name turns `accent`.
- Links in the company sheet ("Also backed by" athletes, source).
- A soft green radial glow behind the athlete photo, spilling slightly into the hero. This is the only glow allowed.

**Never:** green as a large flat fill, glowing text or borders, neon, multi-hue gradients, green/red up/down pairs, blue as a brand colour.

---

## 3. Typography

**Geist** (Google Fonts, 400/500/600), falling back to Inter, then system UI. `-webkit-font-smoothing: antialiased`. No decorative or display faces, no monospace. Use weight 500 for headings; avoid heavy weights.

| Style | Size / line | Weight | Tracking | Colour | Use |
|---|---|---|---|---|---|
| Athlete name | 32px / 1.05 (26px mobile) | 500 | -0.035em | #F3F6F8 | Profile hero |
| Section heading | 18px | 500 | -0.02em | #EFF3F5 | "Investment Portfolio" |
| Tagline | 14px | 500 | -0.01em | #E7ECEF | Optional editorial line, only if written by an editor |
| Team line | 12px | 400 | 0 | #8996A0 | "Team · #number", only if in the data |
| Body / description | 11px / 1.6 | 400 | 0 | #87949D | Athlete description (max 470px) |
| Subtitle | 11px | 400 | 0 | #75828C | Under section headings |
| Nav / tabs | 11px | 400 | 0 | see components | Sidebar, profile tabs |
| Company name | 12px | 500 | 0 | #E7ECEF | Cards |
| Card description | 10px / 1.5 | 400 | 0 | #87949D | Two lines max (`line-clamp: 2`) |
| Metadata figure | 15px | 500 | -0.01em | `text` | Hero metadata |
| Metadata label | 9px, uppercase | 400 | 0.06em | `muted` | Hero metadata |
| Sport label | 10px, uppercase | 400 | 0.08em | #74828C | Above the name |
| Category | 9px | 400 | 0 | `muted` | Under company name |
| Year | 10px | 400 | 0 | #6F7C85 | Card footer |
| Relationship | 8px, uppercase | 400 | 0.08em | #7D8A93 | Card footer |

Use `tabular-nums` for figures. **Open item:** the 8–10px sizes and the dimmest greys fall below common readability guidance; raising the floor to 11px is recommended before launch but not yet approved.

---

## 4. Spacing, radius, layout

**Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40px. Avoid arbitrary values.

**Radius:** cards 8px · search 16px (pill) · sidebar active item 6px · athlete image 4px max · company logo tiles 8px. Never 20–24px radii.

**Shadows:** none. If ever unavoidable: `0 8px 30px rgba(0,0,0,0.15)`.

**Desktop (target 1440px):**
- Sidebar: 170px, fixed left, `bg`, 1px `rule` right edge, padding 24px 12px.
- Main content: max-width 1120px, centred in the remaining space, padding 24px 40px 72px. Content never stretches edge to edge.
- Key distances: page top 24px · search → hero 8px · hero ≈260px tall · hero → tabs 0 · tab band 42px · tabs → portfolio 26px · heading → subtitle 6px · subtitle → cards 20px · card gap 12px · page bottom 60–80px.

**Responsive:**
- ≤1100px: portfolio 3 columns; hero image 240px.
- ≤850px: hide the sidebar; show a 54px mobile top bar (logo left, menu icon right, 1px `rule` bottom) with a simple dropdown nav. Search goes full width. Hero stacks. Portfolio 2 columns.
- ≤600px: portfolio 1 column; main padding 16px; name 26px; image full width × 200px; hide the vehicle mark (it is already in the metadata); metadata wraps without dividers.

---

## 5. Components

**Sidebar**
- Top: the Talent Sheet mark (green stroke, 24px) beside a two-line wordmark **TALENT / SHEET.** in 10px / 600 / 0.18em tracking, #E8EDF0, with the full stop in `accent`. **Decided:** the product name is Talent Sheet; "ATHLETE PORTFOLIO" in `experiment-2.html` is superseded. The mark is a placeholder: a 22px rounded square (radius 4.5px, 1.6px stroke) holding a "T" (top bar and stem) with two faint ledger ticks at the foot. Replace it when a real logo exists.
- 42px below the logo: nav items Talent, Investments, Industries, Stories (the section is called "Talent", not "Athletes", because it covers coaches, executives and other public figures). Each 38px tall, padding 0 10px, radius 6px, 11px text, 15px line icon, 10px gap. Inactive #7F8B94; hover `text`; active background `nav-on`, text `text`, icon `accent`. No left colour bar, no bright backgrounds.

**Search**
- Top-right of the main column: 270px × 32px, `card` background, 1px `border`, radius 16px. 14px search icon. Placeholder "Search athletes, companies, industries..." at 10px in `muted`. Visually quiet.

**Athlete hero** (sits directly on the page, never inside a card)
- Grid: 300px image column + info column, 36px gap, ≈260px tall.
- Image: ~280 × 250px, `object-fit: cover`, `object-position: center top`, radius ≤4px, no border, no circular crop, no card. Soft green glow behind it (see colour). Use the athlete's real image; when none exists, a neutral rim-lit silhouette labelled "No photo on record". Never a generated likeness of a real person.
- Info column, top to bottom: sport label · name (with a 14px verified badge in #5DA9FF **only** if the data has a verified flag) · team line (only if in the data) · tagline (only if editor-written) · description · metadata row.
- Metadata row: at most three inline items separated by 1px × 28px #1C252C rules, 24px gap. No boxes, no coloured backgrounds, no giant numbers. Use only values the data supports:
  - `{n}` Companies on record (count excludes the investment vehicle).
  - Vehicle mark, e.g. 35V, "Investment vehicle", if the athlete has one.
  - `{year}–Present` "Active" only when the data dates the start (e.g. the vehicle's founding year); otherwise `{year}` "Earliest dated deal". Never imply a range the data doesn't support.
- Investment vehicle mark (if any): far right of the hero, e.g. "35V" at 32px / 500 #DCE4E8 with "THIRTY FIVE VENTURES" beneath at 7px / 0.14em #596771. Must never overpower the name.

**Profile tabs**
- Directly under the hero: Portfolio · Activity · About. 42px band with 1px `rule` top and bottom, 11px labels, 28px gap. Inactive #71808A; active `accent` text with a 2px `accent` underline. No pills, no rounded backgrounds. Portfolio is selected by default; tabs without a built page stay visible but inert.

**Portfolio section**
- Heading "Investment Portfolio", subtitle "A selection of companies {athlete} has invested in, founded or partnered with."
- Grid: 4 columns, 12px gap.

**Portfolio card** (compact database record, not a dashboard tile)
- 142px tall, `card` background, 1px `border`, radius 8px, padding 15px. The whole card is a button.
- Top: 32px logo tile (radius 8px) beside company name (12px) and category (9px). Logo always **beside** the name, never stacked above it.
- Middle: one-sentence description, 10px, two lines max.
- Bottom row: year on the left ("Undisclosed" when unknown, never a dash); relationship label on the right with a 5px green dot.
- Hover (150ms ease): background `card-hover`, border `accent-line`, company name `accent`. No lift, no shadow, no glow.

**Relationship labels** — derived from the Airtable `Deal Type`:
| Deal Type | Label |
|---|---|
| Capital Investment, Equity | INVESTED |
| Franchise Ownership | OWNED |
| Brand Ambassador, Brand Ambassador/Equity | PARTNERED |
| Executive Stake | FOUNDED when the athlete founded it (e.g. SpringHill), otherwise EXECUTIVE |

**Company sheet** (opens when a card is clicked)
- Right-side panel, max 380px, `surface`, 1px `border` left edge, 24px padding, over a dark scrim. Slides in 200ms, strong ease-out; Esc and the scrim close it; focus returns to the card.
- Contents: logo + company name (18px / 500) + category; one-line description; rows for Relationship, Year, Round, Amount ("Undisclosed" in `muted` when not public) and Source (green link to the source domain); then **"Also backed by"**: other athletes on record for the company. Athletes with a profile are green links that open their profile; others are plain text.

**Company logos**
- Real logos from Logo.dev, using the Airtable `Logo URL` field (`https://img.logo.dev/{domain}?token=…`). Logos keep their own colours on their own tiles; never recolour. On load failure, fall back to initials on a light tile.
- In Claude Artifact previews, logos must be downloaded (the environment allows `img.logo.dev`) and embedded as data URIs, because previews can't load external images. The real app hotlinks.

**Icons:** line icons, ~1.5px stroke, 14–15px, `muted` at rest.

---

## 6. What a profile page contains

Exactly: athlete identity, business description, a little metadata, the portfolio. The page ends shortly after the grid; the empty space is intentional.

**Do not add:** business evolution timelines, charts, graphs, valuations, allocation breakdowns, recent activity feeds, news, featured stories, related-athlete rows, recommendations, social links, follower counts, engagement metrics, article cards, right sidebars, KPI cards, large pills or badges. Filter chips are not allowed on the profile page; the Investments page has quiet ones (section 10).

(The user previously deferred re-adding "Portfolio by category" and "Recent activity" in some new form. That stays deferred and must not be added without their approval.)

---

## 7. Voice and content

Informed, dry, a little wry. A smart friend who read the filing so you didn't have to. Facts first.

- Lead with person, then company, then deal shape.
- Name the relationship precisely (investor, franchise owner, founder, ambassador + equity, executive). Never "partnered with" in prose; PARTNERED is only a card label for ambassador deals.
- Exact numbers when public; "Undisclosed" when not. Never "a massive round", never invented totals like "80+".
- Sentence case in UI copy. No exclamation marks. Never "unlock" as marketing, "game-changer" or "empower".

---

## 8. Verification

Every deal should carry a verification status and a source.
- **Verified:** primary source (filing, company announcement, the talent's own post).
- **Reported:** credible secondary source; source link required.
- **Unverified:** internal only; never public.

The data now has a `Verification` field (Verified, Reported, Unverified) on every deal. Until each deal is reviewed by hand it is set by source domain: press-wire releases (PR Newswire, Business Wire, GlobeNewswire) and the investor's or talent's own site are Verified; any other sourced deal is Reported; a deal with no source is Unverified. Show the status as a small label with a dot (section 10), never as a badge. Unverified deals are internal only by this document's rule; the Investments preview still shows them, labelled, until the user decides whether to hide them.

---

## 9. Implementation

### CSS variables

```css
:root {
  color-scheme: dark;
  --bg: #090C0F; --surface: #0B1014; --card: #0D1419; --card-hover: #10181E;
  --border: #1A252D; --border-hover: #26343D; --rule: #172127;
  --text: #F1F4F6; --text-2: #98A5AE; --muted: #687680; --very-muted: #4F5D66;
  --accent: #3DDC97; --accent-hover: #6BE7B1;
  --accent-wash: rgba(61, 220, 151, 0.10); --accent-line: rgba(61, 220, 151, 0.30);
  --nav-on: #10231A; --focus: #8FB4FF;
  --sans: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --radius-card: 8px; --radius-search: 16px; --radius-nav: 6px; --radius-image: 4px;
  --sidebar: 170px; --content-max: 1120px;
}
```

### Tailwind (Next.js) with shadcn/ui

Map utilities to the variables rather than copying hex values:

```css
@theme {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-card: var(--card);
  --color-card-hover: var(--card-hover);
  --color-border: var(--border);
  --color-rule: var(--rule);
  --color-text: var(--text);
  --color-text-2: var(--text-2);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --font-sans: var(--sans);
}
```

Theme shadcn components (Sheet for the company sheet, Tabs, Input for search) with these tokens; don't use shadcn's default rounded, shadowed look.

### Data

Profiles render from the athlete's Airtable data (Talent, Companies, Investments). Components are reusable across athletes; never hardcode one athlete. Fields the base now has beyond the original three tables: Talent `League`, Investments `Verification`, Companies `Industries` (linked) and `Description`. Fields not yet in the base (sport, photo, team) are either added to the base or omitted; they are never invented in the UI. League, industry and description values entered so far come from public knowledge and are blank where unclear; treat them as needing review.

---

## 10. Investments page (table view)

A dense but quiet directory of every deal, company first. Same tokens as everywhere else; the differences from the profile page are below. Reference: `design/Investments.html`.

**Layout.** The v6 shell: 170px sidebar, main column `max-width: 1120px`, quiet 270 × 32px search top right (radius 16px). Then, top to bottom: page heading "Investments" (section-heading style, 18px / 500) with an 11px subtitle; a 42px tab band (same styling as the profile tabs) holding the views **Deals** and **By talent** on the left and the tools **Filters**, **Sort**, **Copy CSV** on the right as quiet 11px text buttons; a summary line with active filters; the table. No card wrapper around the table, no KPI tiles, no charts.

**Search** understands plain phrases ("owned since 2024", "nba partnered"): relationship words, league names and "since {year}" become filters when the user presses Enter; other words match company, talent, industry and round.

**Filters** open in a small panel (surface, 1px border, 8px radius, no shadow). Groups: Relationship, League, Since, Industry, Amounts. Options are 26px, 6px-radius, 1px-border text buttons; selected = `accent` text and `accent-line` border (no fill). Active filters show as quiet chips: 26px, 8px radius, 1px `border`, 10px text, with a close icon; plus "Clear all" and "Hide filters" as plain text. With filters active and the panel closed, the Filters button shows the filter count in `accent` and "{shown} of {total}" in `muted`.

**Table.** Hairline `rule` rows, no vertical dividers, no zebra. Header 9px uppercase 0.06em `muted`. Rows 56px, 11px text. Row hover and the focused or expanded row use `card-hover`; the company name turns `accent`. Columns in Deals view: Company, Industry, Relationship, Latest round, Talent, Year, Website. **Latest round is hidden when fewer than half of all deals have a round.** Athlete stake is not a column (it appears in the expanded row).
- **Company:** a "+" that rotates to "x" when open, the 32px logo tile (radius 8px) **beside** the name (12px / 500). Real Logo.dev logos; initials on a light tile on failure.
- **Relationship:** the v6 label (Invested, Owned, Partnered, Executive, Founded) at 8px uppercase with the 5px green dot. SpringHill Company is Founded.
- **Talent:** overlapping 26px circular initials avatars (fill `border` #1A252D, 8px text) for the first two people, then their names (linked green when the person has a profile page) and "+N". No photos, no generated likenesses. **League badge:** where the talent's `League` is set, a 14px circle with that league's Logo.dev logo sits at the avatar's bottom-right (offset -5px, ring in the row background). No badge when the league is blank. The By talent view uses 30px avatars with a 16px badge.
- **Unknown values:** every unknown or undisclosed value uses one style: `very-muted`. Year and amounts read "Undisclosed"; industry and round read "—".
- **Website:** the domain in `text-2` with an 11px arrow; hover turns it `accent`.

**Expanded row** (opens in place, 200ms fade, no scale or slide): compact cards, 8px radius, 1px `border`, 15px padding, 12px gap. First card: 32px logo tile beside the company name and industry, then the one-line description (10px, `#87949D`), then each person with their league and stake. Then Deal (relationship, **verification**, year, round), Round numbers (round size, valuation, confidence) and Source (green domain links). **Verification** is a small label with a dot in the same style as the relationship label: Verified = `accent` dot, Reported = `muted` dot, Unverified = `very-muted` dot. Never a filled badge.

**By talent view.** One row per person: avatar with league badge, name, deal count, companies (20px logo tiles), relationship labels, latest deal. Expanding shows one card per deal. A league filter also hides teammates outside the chosen league here.

**Keyboard.** The table is one Tab stop (roving tabindex). Up / Down move between rows; Home, End, PageUp, PageDown jump; Right opens a row, Left or Esc closes it; Enter and Space toggle. Left / Right switch the Deals and By talent tabs. "/" and Cmd-K focus search; Esc clears it. The focused row shows a 1.5px `focus` outline and the `card-hover` background. No animation on keyboard-driven actions.

**Data shown.** Company, talent, relationship, round, dates, amounts, source, verification, league, industry and description all come from the base. Nothing is computed or estimated on the page, except that a row's amounts are labelled "~" when the base marks the precision as estimated. There is no trend line, activity chart or total, because the base has no series to draw one from.
