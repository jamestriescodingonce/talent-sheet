# Data rules: what counts as an investment

Talent Sheet tracks **ownership and capital**, not compensation. Every deal
is classified as either an `investments` row (public) or an `endorsements`
row (private, never shown on the site).

## Goes in `investments` only if the source shows

- equity, warrants, options, or other ownership
- capital invested by the talent
- a formal role: board seat, advisory role, co-founder, executive
- franchise or team ownership

## Goes in `endorsements`

- fees, gear, bonuses, royalties, revenue share
- sponsorships and endorsements
- campaign / spokesperson work

## Rules of thumb

- "Partnership", "ambassador", and "long-term deal" decide nothing by
  themselves. Look for the evidence above.
- Explicit but unconfirmed equity mention: keep in `investments` with
  verification `Reported`.
- No equity mentioned: `endorsements`. Never a `Reported` investment "to be
  safe".
- If an endorsement later turns out to include equity: create the
  investment and keep the endorsement row linked for history.

## Implementation notes

- `public.endorsements` has RLS on, no policies, and no `anon` /
  `authenticated` privileges. It is only reachable with the service role.
- Endorsements moved out of `investments` carry
  `migrated_from_investment_id` (the original investment id).
- Pre-migration backups (private): `investments_backup_20261014` and
  `investment_sources_backup_20261014`. Do not delete them.
