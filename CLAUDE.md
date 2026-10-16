# Talent Sheet

Athlete-investment tracker: a database + eventual app for venture/equity
investments, franchise ownership stakes, brand-ambassador equity deals, and
executive stakes held by athletes and other public figures.

## Deploying (read this first)

The live site is `https://talent-sheet-investments.vercel.app`. Vercel is
connected to this GitHub repo and its **production branch is `main`**.

- **Always commit and push your changes to `main`**, in every session, regardless
  of the session's auto-assigned branch name. A push to `main` deploys the site
  automatically; no Vercel access is needed.
- The site is a static page: `index.html` at the repo root (copy kept at
  `artifacts/investments-table.html`), with `vercel.json` disabling any build step.
- The Claude Artifact "Investments Table"
  (`https://claude.ai/artifact/KnV2RuHPYEF3R4wmTbAXBy`) is the editable source;
  after changing it, copy the page to `index.html` and push to `main`.
- Company founders live in `public.company_founders` (company_id, name, title Founder/Co-founder, source_url; public read). Only add a founder when a source explicitly calls them a founder/co-founder; keep the supporting URL. `refresh_data.py` embeds them as `DATA.fnd` and company pages show a "Founders" row (a founder who is also talent links to their profile).
- Companies have an `hq` column in Supabase (`companies.hq`), filled for ~200 of 674;
  the page embeds it as `DATA.hq`.

## Refreshing the live page (data + photos)

`index.html` embeds its data; it is regenerated from Supabase (public read via the anon key):

- `python3 scripts/refresh_data.py` rebuilds `DATA` (deals, industries, bios, domains), `DATA.hq`, `ADDED`, `LEAGUE`, and copies the page to `artifacts/investments-table.html`. Rules baked in: only sports figures are shown (talent categories Athlete / Coach / Executive, plus Magnus Carlsen; entertainers etc. stay in Supabase), palmares.vc, pitchbook.com and bookingagentinfo.com sources are never shown (find the underlying press release/brand/trade source and store that instead), industries `Sports Equipment`→`Sports Tech` and `Clean Energy`→`Energy`.
- Routes (hash router in `index.html`): Deals at `/deals`; `#industries` industries explore grid and `#industry=<Name>` industry page (companies, most active talent, link to Deals filtered by industry); `#talent` talent explore gallery (sidebar "Talent": league filter, sort, search via the top box); `#talent=<Name>` talent profile (avatar, name, league, portfolio cards); `#deal=<Name>/<Company>` deal page; `#company=<Name>`; `#companies`, `#news`, `#faq`. Every talent name on the site links to their profile. Profiles end with "Similar talent" (shared companies, industry mix, league) and company pages with "Similar companies" (industry overlap, shared talent); both are computed client-side in `similarTalent` / `similarCompanies`. Profiles are built from the embedded `DATA.rows`, so they update on `refresh_data.py` like everything else.
- `python3 scripts/fetch_logos.py [domain ...]` fills gaps in `LOGOS` (domain -> data URI) from Google's favicon service, falling back to the site's `apple-touch-icon.png`; companies with no `website_url` get no logo (they show the generated mark), so fill `companies.website_url` first.
- News page (`#news`, nav item "News"): stories live in `data/news.json` (title, outlet, url, img, date, talent, company); thumbnails are 480x270 WebP crops of each article's `og:image` saved under `assets/news/`. `python3 scripts/build_news.py` embeds them into `index.html` as `const NEWS=`. Add stories by deal (search `<talent> <company>`), keep outlets diverse (max ~2 per outlet and per company), prefer dated pieces from the last year, and skip bookingagentinfo.com. Many outlets 403 scripted fetches; use another outlet's coverage rather than a blank thumbnail.
- Verification: brand-ambassador deals where the athlete is repeatedly in a brand's ads/news or has a signature product are `Verified`, not `Reported`; cite the brand's own release/page as a `Primary` source where one exists.
- `python3 scripts/publish_avatars.py` rebuilds `DATA.img` and `DATA.credits` (photo credits shown on the FAQ page) from `talent.image_*`.
- `scripts/avatar.py` crops/resizes a photo to a 512px square WebP on a pale lavender background (for transparent cutouts) and uploads it to the public `talent-avatars` bucket through the `store-avatar` edge function (security note: that function accepts uploads from anyone holding the public anon key; delete it when not needed).
- Photo sources, best first: club/league sites (NFL clubs, MLB `img.mlbstatic.com`, NHL `assets.nhle.com/mugs`, NBA `cdn.nba.com/headshots/nba/latest/1040x760/<id>.png`, MLS profile pages), then ESPN headshots (`a.espncdn.com/i/headshots/...`), then Wikimedia Commons (open licenses only; license + credit stored in `image_license`/`image_credit`). Wikimedia rate-limits aggressively: pace requests and batch license lookups.
- Teams live in `teams` / `talent_teams` (not shown on the site yet). Only link a current team when verified against a live roster.
- nba.com, wnba.com, arsenal.com, manutd.com, mancity.com, fcbayern.com block headless browsers (403).
- `execute_sql` calls containing `DELETE` have been timing out in this environment; updates and inserts work.

## Live site design system (index.html)

This is what the deployed site actually uses. The artifact notes further down
(lime accent, Bricolage Grotesque, Violet Sans) describe the earlier design
canvas and are **not** the live look.

- **Type (since 2026-10-16):** **Instrument Sans** for all UI text and
  **Geist Mono** for numerals, counts, table column labels, pager text and
  meta lines (the `.num` class, `th`, `.count b`). Both load from one Google
  Fonts `<link>` in `index.html`; tokens are `--sans` and `--mono`. Table
  column labels are 11px uppercase mono. Before this the site used Geist.
  Chosen from a side-by-side of nine sets for a tech-forward feel; Geist,
  Satoshi, DM Sans + DM Mono, Clash Grotesk + Figtree, Hanken Grotesk,
  Bricolage Grotesque, Sora and Space Grotesk were the others tried. Don't
  put mono on running sentences (for example the word "deals" in "500+ deals").
- **Color:** dark by default, light via `prefers-color-scheme` or
  `[data-theme]`. Mint accent (`#3DDC97` dark, `#0C9A5E` light), page `#090C0F`
  dark / `#F5F7F6` light. Deal-type colors: `--c-inv` Investment, `--c-own`
  Ownership, `--c-par` Partnership, `--c-exe` Executive, `--c-fou` Founded.
  The tokens live in the `:root` blocks of `index.html` and are mirrored in
  `styles/theme.css`; keep the two in sync.
- **Layout:** 170px fixed sidebar (logo, nav, subscribe card, theme toggle),
  quiet search top-right, page heading, then content. Deals and Companies show
  their filter bar and table inside one rounded `.panel` surface: count on the
  left ("500+ deals", never the exact total for now), Filters and Sort on the
  right, tinted column header row, hairline rows, sticky headers at 1280px and
  wider. Talent, Industries and similar lists use the `.tgrid` card grid.
- **Components:** company-name links in expanded deal cards open the company
  page; every industry label links to `#industry=<Name>`; talent profiles show
  the league chip plus a neutral chip for any fund they run or belong to
  (Executive or Founded role at a "Venture & Private Equity" company); the top
  search shows a suggestions dropdown (talent, companies, industries) with
  keyboard support.
- **Effects, kept very quiet:** a liquid-metal logo mark (Paper Shaders;
  source `assets/js/metal-logo.src.js`, bundled to `assets/js/metal-logo.js`,
  falls back to the original SVG if WebGL fails) and a faint stepped film-grain
  overlay. The sidebar subscribe card is visual only for now; the plan is to
  link it to a Substack.
- **Not done on purpose:** no glow or gradient behind the page, no stacked
  logo-above-name card layout.

## Current state

**There is no app scaffold in this repo yet** — no `package.json`, no
Next.js/Tailwind config, nothing runnable. What exists today is:

1. A real Airtable base that holds the actual data (see **Data source**).
2. A live, interactive UI mockup built as a Claude Artifact (see **Live
   preview**) — this is where all visual design/UX decisions have actually
   been made and validated so far.
3. A growing pile of **stashed** React/Next.js components (see **Stashed
   components**) copied in from other sources for later reuse. These are
   inert — nothing imports them, nothing builds — until the app is
   scaffolded.

When scaffolding the real app, the artifact is the source of truth for
layout/colors/fonts/copy, and the stashed components are candidate
building blocks (several have missing peer files/deps — noted below).

## Live preview (Claude Artifact)

`https://claude.ai/artifact/XHvgLJzvyGTDWCVNuXAsmp` — "Talent Sheet UI
Polish Preview," a Design-canvas artifact (`.dc.html` boards, `canvas.json`
manifest). Private; only visible to people it's been shared with.

Boards:
- **`Main.dc.html`** — dashboard demo (fictional data): deal cards grid,
  tabbed filter (All/Equity/Brand deals/Franchise), save/menu interactions.
- **`Profile.dc.html`** — Kevin Durant athlete profile page, built against
  real Airtable data/shape. Tabs: Overview, Portfolio, Timeline, News.
- **`FAQ.dc.html`** — standalone FAQ accordion section, copy written for
  Talent Sheet specifically (see content below).

### Design decisions baked into the artifact

- **Color palette** — pixel-sampled from a competitor site
  (cheaperinference.com) via Python/Pillow against user-provided
  screenshots (the live site wasn't fetchable from the sandbox):
  - Accent (lime-green): `#9ae230`
  - Page background: `#05080a`
  - Pure black accents: `#000000`
  - Card surface: `#0d1613`
  - Secondary surface: `#101915`
  - This palette is the artifact's only. It superseded the earlier lime
    exploration in `styles/theme.css`, and that file now holds the live
    site's mint tokens instead (see "Live site design system").
- **Fonts (artifact only; the live site uses Instrument Sans + Geist Mono, see above)** — settled after several iterations (Space Grotesk/IBM Plex →
  Figtree → Violet Sans only → current):
  - Headings: **Bricolage Grotesque** (Google Fonts, full weight range).
  - Body: **Violet Sans** (OFL-licensed, cloned from
    `github.com/violetoffice/violet_sans`, stashed at
    `assets/fonts/violet-sans/`). Only a Regular (400) weight exists —
    `font-weight: 400` must be forced everywhere it's used or browsers
    fake-bold it.
- **Card layout** — company logo sits **beside** the name/headline
  (horizontal), not stacked above it. A HeroUI-inspired stacked
  (logo-on-top) layout was tried and explicitly reverted per user
  feedback — do not reintroduce the stacked variant.
- **Company logos** — real logos are wired via Logo.dev URLs
  (`https://img.logo.dev/{domain}?token=...&fallback=404`), generated by a
  rebuilt Airtable formula field (`Logo URL`, field id `fldV48cQyHEL6K8Ry`
  on `Companies`). Whether these hotlinked images actually render inside
  the artifact's sandboxed iframe has not been confirmed by the user.
  `onLogoError`/`failedLogos` state in `Profile.dc.html` falls back to a
  grey-globe placeholder on load failure (same pattern as the stashed
  `CompanyLogo` component).
- **Profile page content** (latest revision — 5 explicit removals/changes):
  1. Removed the hero stats row (companies tracked / deal types /
     investing since).
  2. Removed the "Athlete. Investor. Builder." tagline and bio paragraph.
  3. Removed the dedicated "Thirty Five Ventures" fund tab; replaced with
     a lightweight "Associated companies: …" line in the hero.
  4. Removed the Overview tab's right sidebar ("Portfolio by category" +
     "Recent activity") — **deferred, not abandoned**; user wants these
     re-added later in some new form. Overview now uses the same
     full-width 4-column grid as the Portfolio tab.
  5. Thirty Five Ventures (`v35`) is excluded from all portfolio/timeline/
     news listings — it's flagged `associated: true` in the `allCompanies`
     data and filtered out of the `rawCompanies` list that feeds every
     other view.
- **FAQ copy** (on `FAQ.dc.html`, styled after a Fundable.com reference
  screenshot but reworded for this project): who uses Talent Sheet, where
  the data comes from, how fresh it is, what counts as an "investment,"
  and that sport/industry coverage has no boundary.

### Artifact-platform constraints learned along the way

- `.dc.html` Design Components use a small React-class-like runtime
  (`class Component extends DCLogic`, `this.state`/`this.setState`),
  `{{hole}}` interpolation (dotted paths only, no expressions), and
  `<sc-if>`/`<sc-for>` control flow — not real JSX/React.
- Images must normally be uploaded as artifact blob assets (`/_blob/<id>`)
  or loaded via a Google Fonts `css2` link; arbitrary external image
  hotlinking (e.g. Logo.dev, Wikipedia) isn't a documented-supported path,
  though it's wired in as an experiment for company logos.
- The sandbox's network egress is allowlist-only: `registry.npmjs.org`,
  PyPI, and `github.com`/`raw.githubusercontent.com`/`api.github.com`
  (via `add_repo` + `git clone`) are reachable; general sites (Google,
  Wikipedia, logo.dev, jsdelivr, unpkg, Airtable's own web app,
  competitor sites) are not. This is why fonts came from a GitHub clone
  and colors came from pixel-sampling user screenshots rather than
  fetching the live competitor site.

## Data source

Real Airtable base: `appAXXfdCTRzc2PuA`.

Tables:
- **`Talent`** (`tblwM9JBGOubeavKA`) — athletes/public figures.
- **`Companies`** (`tbl2Y410YVkNjRVGw`) — includes the `Logo URL` formula
  field described above.
- **`Investments`** (`tblKid9dFDGw079xt`) — junction table linking Talent
  ↔ Companies with deal details (junction-table pattern with formula-based
  Name field and cross-table link mirroring — see the `collate` skill
  below for the exact schema rules).

Two separate skills (not stored in this repo — installed as plugin
skills) drive the Airtable workflow:
- **`research`** — finds and verifies candidate athlete-investment deals
  from public sources (news search, Sportico transactions roundups,
  X/Twitter, LinkedIn).
- **`collate`** — enters verified deals into the base, enforcing its
  junction-table/formula/mirroring schema rules.
Use `research` before `collate` when adding new deals.

## Stashed components

All under `components/`, `assets/`, `lib/`, `styles/` — copied in for
future reuse, not wired into anything yet:

| Path | Source | Notes |
|---|---|---|
| `components/motion/bouncy-accordion.tsx` | beui.dev | Uses `motion/react`; self-contained. |
| `components/demos/bounce-sidebar-demo.tsx` | beui.dev (usage snippet) | References `@/components/ui/bounce-sidebar`, whose source was **never provided** — demo alone won't run. |
| `components/transitions/modal.tsx` | transitions.dev | Self-contained, no missing deps, auto-injects its own CSS. |
| `components/demos/avatar-demo.tsx` | shadcn (extended) | References `@/components/ui/avatar`, not stashed. |
| `components/demos/heroui-avatar-group-demo.tsx` | `@heroui/react` v3 | Verified against the real installed package (`npm install @heroui/react@3.2.6`) before stashing. |
| `components/demos/heroui-card-link-demo.tsx` | `@heroui/react` v3 | Same verification; compound `Card.Header`/`Card.Title`/`Link.Icon` API confirmed real. |
| `components/demos/heroui-card-with-avatar-demo.tsx` | `@heroui/react` v3 | Same. Needs React 19+, Tailwind v4, no provider wrapper. |
| `components/ui/sidebar.tsx` | shadcn-style, pasted by user | Real, complete (~700 lines). Depends on 6 files not yet stashed: `hooks/use-mobile`, `components/ui/{button,input,separator,sheet,skeleton,tooltip}`; also needs `class-variance-authority`/`react-aria-components`; imports `cn` from a bare `"cn"` package that **doesn't match** this repo's own `@/lib/utils` export — reconcile when wiring up. |
| `components/ui/company-logo.tsx` | hand-written for this project | `onError` → grey-globe fallback; mirrors the `onLogoError` pattern used in `Profile.dc.html`. |
| `components/demos/pixel-perfect/claude-sidebar.tsx` | `vansh-nagar/pixel-perfect` registry | Recreation of Claude.ai's own collapsing sidebar; built on the same `@/components/ui/sidebar` primitives already stashed above — the strongest pairing in this list. |
| `components/demos/pixel-perfect/glass-button.tsx` | `vansh-nagar/pixel-perfect` | Self-contained (`cn` only). |
| `components/demos/pixel-perfect/shiny-button.tsx` | `vansh-nagar/pixel-perfect` | Needs `components/ui/button.tsx`, not yet stashed. |
| `components/demos/pixel-perfect/premium-button.tsx` | `vansh-nagar/pixel-perfect` | Self-contained (`cn` only). |
| `components/demos/pixel-perfect/center-split-reveal.tsx` | `vansh-nagar/pixel-perfect` | GSAP-based mask reveal; needs the `gsap` package added when scaffolded. Candidate for polishing the investment-detail popover. |
| `assets/fonts/violet-sans/` | `github.com/violetoffice/violet_sans` | `VioletSans-Regular.{woff2,ttf}` + `OFL.txt`. Regular weight only — see font note above. |
| `lib/utils.ts` | shadcn convention | `cn()` via `clsx` + `tailwind-merge`. Current canonical `cn` for this repo. |
| `lib/ease.ts` | beui.dev (placeholder) | beui's exact easing export wasn't fetchable (network-blocked) when stashed; `EASE_OUT = [0.23, 1, 0.32, 1]` is a standard strong-ease-out curve used as a stand-in, matching the `better-ui`/`emil-design-eng` skills' recommendation. Swap in the real value if it differs. |
| `styles/theme.css` | live site tokens | Current: mirrors the `:root` token blocks in `index.html` (dark, light, `--sans`, `--mono`). Replaced the old lime exploration. |

## Skills installed in this repo

- **`better-ui`** (`.agents/skills/better-ui`, from `jakubkrehel/skills`) —
  UI polish: concentric border radius, optical alignment, surface depth,
  contextual icons, hit areas.
- **`emil-design-eng`** (`.agents/skills/emil-design-eng`, from
  `emilkowalski/skills`) — Emil Kowalski's philosophy on UI polish,
  component design, and animation decisions.
- Both are symlinked under `.claude/skills/` and tracked in
  `skills-lock.json` with source hashes.

## Open items

- No Next.js/Tailwind scaffold exists — every stashed component is inert
  until one is created (or the user asks for one; offered multiple times,
  not yet requested).
- Missing peer files if/when wiring up `components/ui/sidebar.tsx`:
  `hooks/use-mobile`, `components/ui/{button,input,separator,sheet,skeleton,tooltip}`,
  plus resolving the `cn` import mismatch (`"cn"` package vs. this repo's
  `@/lib/utils`).
- `components/demos/bounce-sidebar-demo.tsx` needs its underlying
  `bounce-sidebar.tsx` source, never provided.
- `components/demos/avatar-demo.tsx` needs `components/ui/avatar.tsx`,
  never provided.
- `shiny-button.tsx` needs `components/ui/button.tsx`; `center-split-reveal.tsx`
  needs the `gsap` package.
- Unconfirmed: whether hotlinked Logo.dev images actually render inside
  the artifact's sandboxed iframe.
- Deferred by user, to revisit: re-add "Portfolio by category" and
  "Recent activity" panels to the Profile Overview tab in some new form.
