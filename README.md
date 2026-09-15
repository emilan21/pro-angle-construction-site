# Pro Angle Construction Site

The standalone public website for Pro Angle Contracting. It is intentionally separate from the private estimate application and contains no link or route to that workspace.

## Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Run the full local quality suite with:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run deploy:dry
```

Astro produces static files in `dist/`. A small Cloudflare Worker adds security and preview indexing headers to every response and permanently redirects `www.proangleconstructionpa.com` to the apex hostname. Both `workers.dev` and preview URLs are disabled.

## Private preview

The checked-in state is preview-safe:

- HTML emits `noindex, nofollow`.
- The Worker emits `X-Robots-Tag: noindex, nofollow`.
- `robots.txt` disallows all crawling.
- OpenTofu creates separate Access applications for the apex and `www`, both using one reusable allow policy for `132.147.2.73/32`.

OpenTofu does not reference or manage `estimates.proangleconstructionpa.com`; its application and Access policy remain unchanged. See [docs/rollout.md](docs/rollout.md) for provisioning and public-launch steps.

## Content

Edit page wording in `src/pages/index.astro`. Real project records live in `src/data/projects.ts`, separately from the visible preview placeholders. Follow [docs/portfolio-photos.md](docs/portfolio-photos.md) before publishing customer project images.

