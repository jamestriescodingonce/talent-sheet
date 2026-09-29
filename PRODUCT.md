# Product

<!-- impeccable:product-schema 1 -->

> Users, positioning and evidence were confirmed by the user in the init
> round (2026-09-28). Other sections are inferred from project material
> (CLAUDE.md, the FAQ copy, the Airtable schema) and open to correction.

## Platform

web

## Stack
Delegated: static HTML/CSS previews for now (published as Claude Artifacts). The eventual app is planned as Next.js + Tailwind + shadcn/ui; no scaffold exists yet.

## Users
Confirmed primary audiences for talent profiles:
- **Fans and the general public**: curious which companies their favourite athletes back. They browse, skim and share.
- **Industry pros**: agents, brands and investors researching deals and relationships. They need precision and sources.

Secondary (not the profile's design target): journalists and researchers, athletes and business managers.

They arrive looking up one person or one company and want to see, quickly and credibly, who holds what.

## Product Purpose
Talent Sheet is the public record of equity between athletes, other public figures and the companies they back: a searchable directory plus a newsletter. Success is being the place people cite when they need to know whether a public figure really owns part of a company.

## Positioning
Confirmed: Talent Sheet should win on all four of these at once:
1. **Verified, sourced data.** Every deal carries its relationship type, a verification status and a source.
2. **Most complete coverage.** Every sport and every kind of relationship (investor, franchise owner, ambassador + equity, executive stake, advisor, fund founder), not just famous VC checks.
3. **Editorial voice.** A newsletter and a dry, smart writing style people actually read.
4. **Looks the best.** The most polished, premium-feeling product in the space.

## Operating Context
Data lives in an Airtable base (Talent, Companies, Investments junction table). Deals are found by the `research` skill from news, Sportico roundups, X and LinkedIn, then entered by `collate`. No sport or industry boundary.

## Capabilities and Constraints
- Profiles per talent, company pages, directory search and filters (planned).
- Gating: amounts, dates, rounds and sources may be gated behind an intake form for visitors.
- Company logos come from Logo.dev. The real app hotlinks them; Claude Artifact previews must download and embed them (this environment allows `img.logo.dev`).
- Undecided: the newsletter's format and cadence; account model.

## Brand Commitments
- Name: Talent Sheet. Wordmark with a full stop as the signature detail.
- Voice: informed, dry, a little wry. Facts first. Sentence case, no exclamation marks, no "game-changer" or "empower".
- Never reads as a sportsbook or trading app (no green/red up/down, no hype).
- Dark mode first; a cool green accent (user decision).
- Profile layout follows `previews/experiment-2.html` as recorded in DESIGN.md v6 (quiet dark database layout, portfolio-first, cool green accent). User decision; binding for profile work. The earlier photo-banner/filter-chip reference (v5) is retired.

## Evidence on Hand
- Real deal data for Kevin Durant (8 companies plus Thirty Five Ventures), all from secondary sources, so all "Reported".
- Confirmed: no licensed talent photos yet (placeholder silhouette). Company logos are available from Logo.dev. No testimonials, customer names or traffic numbers: do not invent them.

## Product Principles
1. Trust is the product: every claim shows how it is known.
2. Precise over impressive: exact numbers or "Undisclosed", never vague superlatives.
3. The person first, then the company, then the deal shape.
4. Readable at a glance, credible on inspection.
