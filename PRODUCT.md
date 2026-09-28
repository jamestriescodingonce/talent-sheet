# Product

<!-- impeccable:product-schema 1 -->

> Written from existing project material (CLAUDE.md, DESIGN.md, the FAQ copy
> and the Airtable schema). The user delegated design decisions ("at your
> discretion") instead of sitting an interview, so every section below is
> inferred and open to correction.

## Platform

web

## Stack
Delegated: static HTML/CSS previews for now (published as Claude Artifacts). The eventual app is planned as Next.js + Tailwind + shadcn/ui; no scaffold exists yet.

## Users
- Agents and reps tracking their clients' business portfolios.
- Brands scouting athletes for cap-table or ambassador-equity deals.
- Athletes and business managers benchmarking terms against peers.
- Journalists and researchers following athlete investing.

They arrive looking up one person or one company and want to see, quickly and credibly, who holds what.

## Product Purpose
Talent Sheet is the public record of equity between athletes, other public figures and the companies they back: a searchable directory plus a newsletter. Success is being the place people cite when they need to know whether a public figure really owns part of a company.

## Positioning
Every deal carries its relationship type (investor, franchise owner, ambassador + equity, executive stake, advisor, fund founder), a verification status and a source. Most coverage of athlete investing is hype listicles; Talent Sheet is the record, with receipts.

## Operating Context
Data lives in an Airtable base (Talent, Companies, Investments junction table). Deals are found by the `research` skill from news, Sportico roundups, X and LinkedIn, then entered by `collate`. No sport or industry boundary.

## Capabilities and Constraints
- Profiles per talent, company pages, directory search and filters (planned).
- Gating: amounts, dates, rounds and sources may be gated behind an intake form for visitors.
- Company logos come from Logo.dev in the real app; they cannot load inside Claude Artifact previews.
- Undecided: the newsletter's format and cadence; account model.

## Brand Commitments
- Name: Talent Sheet. Wordmark with a full stop as the signature detail.
- Voice: informed, dry, a little wry. Facts first. Sentence case, no exclamation marks, no "game-changer" or "empower".
- Never reads as a sportsbook or trading app (no green/red up/down, no hype).
- Dark mode first; a cool green accent (user decision, this session).

## Evidence on Hand
- Real deal data for Kevin Durant (8 companies plus Thirty Five Ventures), all from secondary sources, so all "Reported".
- No licensed talent photos yet. No company logo files in the repo. No testimonials, customer names or traffic numbers: do not invent them.

## Product Principles
1. Trust is the product: every claim shows how it is known.
2. Precise over impressive: exact numbers or "Undisclosed", never vague superlatives.
3. The person first, then the company, then the deal shape.
4. Readable at a glance, credible on inspection.
