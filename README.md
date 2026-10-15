# Talent Sheet

Athlete-investment tracker: venture/equity investments, franchise ownership,
and executive stakes held by athletes and other public figures.

See [CLAUDE.md](CLAUDE.md) for project state and design decisions.

## Data rules

Only ownership and capital are public. Fee-based deals (endorsements,
sponsorships, "partnerships" without equity) live in the private
`endorsements` table. Full classification rules:
[docs/data-rules.md](docs/data-rules.md).
