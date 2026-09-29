# Talent Sheet — Design System (v6)

**Who owns what.** Talent Sheet is the public record of equity between athletes, other public figures and the companies they back. The product should feel like **a premium athlete business database**: dark, quiet, editorial and data-rich without feeling busy. Think Linear + Bloomberg + a modern VC database. Never a sports news site, a SaaS dashboard, an analytics dashboard or a sportsbook.

This file is the single source of truth for design. If code, CLAUDE.md, PRODUCT.md or any earlier preview disagrees with this file, this file wins.

**Reference build:** `previews/experiment-2.html` (published at https://claude.ai/artifact/8ty3HnP54whm6cXKqcTXZo). When in doubt, match it. Earlier directions (v2 paper, v3 cards, v4 share-certificate, v5 photo-banner with glows and filter chips) are **retired**; they live only in git history and `previews/` for reference. Do not reuse their layouts.

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
- Top: geometric "A" mark (green stroke) beside a two-line wordmark in 10px / 600 / 0.18em tracking, #E8EDF0. **Open decision:** the reference says "ATHLETE PORTFOLIO"; the product name is Talent Sheet. Use whichever the user confirms; until then match the reference.
- 42px below the logo: nav items Athletes, Investments, Industries, Stories. Each 38px tall, padding 0 10px, radius 6px, 11px text, 15px line icon, 10px gap. Inactive #7F8B94; hover `text`; active background `nav-on`, text `text`, icon `accent`. No left colour bar, no bright backgrounds.

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

**Relationship labels** — derived from `investments.deal_type` in Supabase:
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
- Real logos from Logo.dev, using `companies.logo_url` in Supabase (`https://img.logo.dev/{domain}?token=…`). Logos keep their own colours on their own tiles; never recolour. On load failure, fall back to initials on a light tile.
- In Claude Artifact previews, logos must be downloaded (the environment allows `img.logo.dev`) and embedded as data URIs, because previews can't load external images. The real app hotlinks.

**Icons:** line icons, ~1.5px stroke, 14–15px, `muted` at rest.

---

## 6. What a profile page contains

Exactly: athlete identity, business description, a little metadata, the portfolio. The page ends shortly after the grid; the empty space is intentional.

**Do not add:** business evolution timelines, charts, graphs, valuations, allocation breakdowns, recent activity feeds, news, featured stories, related-athlete rows, recommendations, social links, follower counts, engagement metrics, article cards, right sidebars, KPI cards, filter chips, large pills or badges.

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

The current reference doesn't show per-deal status on cards (the data has no status field yet); the company sheet always shows the source. When a status field exists, show it in the sheet and as a small label, not a badge-heavy treatment.

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

Profiles render from the athlete's Supabase data (`talent`, `companies`, `investments`). Components are reusable across athletes; never hardcode one athlete. Fields not yet in the base (sport, company category and description, photo, team, verified) are either added to the base or omitted; they are never invented in the UI.
