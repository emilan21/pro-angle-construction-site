# Infrastructure and rollout

## Provisioning order

OpenTofu manages only the new public repository, its main-branch ruleset, two Worker custom domains, one reusable IP allow policy, and separate Access applications for the apex and `www` hostnames.

1. Export credentials as `TF_VAR_github_token` and `TF_VAR_cloudflare_api_token`; never place them in a tfvars file or command history.
2. Copy `infra/example.auto.tfvars.example` to a gitignored `infra/local.auto.tfvars` and provide the account and zone IDs.
3. From `infra/`, run `tofu init`, `tofu fmt -check`, `tofu validate`, and inspect `tofu plan`.
4. Create the GitHub repository first with `tofu apply -target=github_repository.site -target=github_repository_vulnerability_alerts.site`, push this project, and configure the `production` environment secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
5. Deploy the Worker once so the service exists. Then apply the remaining plan to attach custom domains and Access. This order avoids targeting a Worker service that has not yet been created.

Access is default-deny: only requests matching `132.147.2.73/32` satisfy the reusable allow policy. There is intentionally no service-token bypass. If the ISP address changes, update only `preview_ip_cidr`, review the plan, and apply it.

## Preview acceptance checks

From the approved address, verify the apex HTML, CSS, logo, favicon, anchors, phone and email links, and TLS. Confirm the `www` hostname redirects to the same apex path and query string. Check `X-Robots-Tag: noindex, nofollow`, the HTML robots directive, canonical URL, CSP/security headers, and `robots.txt`.

From an unrelated external address, confirm both hostnames are denied before any site asset loads. Confirm `estimates.proangleconstructionpa.com` still reaches its existing Access flow. Run current Chromium checks at 1440 × 900, 768 × 1024, and 390 × 844; also check a Safari-compatible mobile browser, keyboard traversal, visible focus, the native mobile menu, reduced motion, and long replacement content.

## Intentional public launch

Launch is a coordinated change after Kevin approves all wording and real photos:

1. Add approved project records and remove only their matching branded placeholders.
2. Build with `PUBLIC_PREVIEW_MODE=false` so the HTML robots directive becomes `index, follow`.
3. Set `PREVIEW_MODE` to `false` in `wrangler.jsonc` so the Worker stops sending `X-Robots-Tag`.
4. Replace `public/robots.txt` with `User-agent: *` and `Allow: /`, then rename `public/sitemap-production.xml.disabled` to `public/sitemap.xml` and add `Sitemap: https://proangleconstructionpa.com/sitemap.xml` to robots.txt.
5. Verify the production build and metadata in a pull request.
6. Remove only `cloudflare_zero_trust_access_application.apex`, `cloudflare_zero_trust_access_application.www`, and the now-unused public preview policy from this configuration/state. Do not edit or import any estimate-site resources.
7. Apply, deploy from protected `main`, and repeat TLS, redirect, indexing, accessibility, and content checks from inside and outside the former allowlisted network.

