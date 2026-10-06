# Local Content Pack Platform

Production-oriented foundation for selling the $35 24-Hour Local Content Pack.

## Included

- Next.js and TypeScript application shell
- PostgreSQL Prisma schema
- Validated order and intake schemas
- Public mobile-first order page
- Order creation and status endpoints
- Payment webhook boundary with secret verification
- Admin bearer-token API guard
- Audited order-status transitions
- Conservative fact-grounded content generator
- Unit test for locked deliverable counts
- Environment template

## Local setup

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

## Required production wiring

Configure a real payment provider and signature verification, transactional email, document storage and delivery, authenticated admin UI, rate limiting, CSRF protections where applicable, database migrations, secret management, observability, and deployment HTTPS before accepting public orders.

The content generator deliberately does not invent credentials, awards, prices, locations, guarantees, reviews, rankings, leads, or revenue outcomes.
