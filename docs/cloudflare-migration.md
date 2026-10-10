# Cloudflare Workers migration

## Current state

The blog is served at `https://davidgarvey.blog` from Cloudflare Workers. GitHub Pages serves only redirects from `davegarvey.github.io` to the matching paths on the new domain, together with the synchronised Atom feed and the old assets. The parallel phase, in which GitHub Pages served the full blog, has ended, and the `LEGACY_REDIRECTS_ENABLED` switch that controlled it has been removed.

## Architecture

One repository builds two outputs. Jekyll and Ruby remain unchanged. Cloudflare Workers Static Assets serves the complete `_site` output without application code. `scripts/build-legacy` turns the same build into the GitHub Pages redirect site in `_legacy`. GitHub Actions validates both outputs on pull requests; on `main`, the Cloudflare workflow deploys the blog and the GitHub workflow deploys the redirects.

## Publish the Cloudflare copy

1. Run `npm ci` and `sh scripts/build-cloudflare` using Ruby 3.3.12.
2. Authenticate locally with `npx wrangler login`; never put credentials in source.
3. Run `npm run deploy`. `wrangler.jsonc` defines `davidgarvey-blog`, static assets, trailing-slash routing and the custom 404 page. Verify the returned workers.dev URL before attaching the domain.
4. Add `routes: [{ "pattern": "davidgarvey.blog", "custom_domain": true }]` to the Wrangler configuration and deploy again, once the existing Cloudflare zone and target account have been confirmed. Wrangler's Custom Domain setup creates DNS and a certificate. Do not replace an existing conflicting DNS record without inspecting it.
5. Verify HTTPS at the apex, all article URLs, images, feed, sitemap, robots, About, Privacy and custom 404.

[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) and [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## Automatic deployments

For GitHub Actions, add repository secrets named `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The token needs Workers Scripts Write for the deployment account and access required to maintain the custom-domain route (including zone read and Workers Routes Write for this zone). Use an existing appropriately scoped token where available. Never send the values in chat. After the secrets are installed, merge the reviewed PR: pushes to `main` deploy automatically. The workflow can also be run manually on `main`. Missing secrets fail with a clear message; successful uploads are followed by live-domain verification.

Cloudflare Workers Builds Git integration is an alternative if preferred: connect this repository to the existing Worker, production branch `main`, build command `sh scripts/build-cloudflare`, deploy command `npx wrangler deploy`, Ruby override `RUBY_VERSION=3.3.12`. Use only one automatic deployment system to avoid competing releases. The initial local deployment does not itself establish automatic updates.

## Validation

```sh
sh scripts/build-cloudflare
bundle exec ruby scripts/build-legacy
bundle exec ruby scripts/check-migration
npm run deploy:check
bundle exec ruby scripts/check-live-migration
```

The first four commands are offline build/deployment validation. The last requires the apex domain to serve the expected full site. Tests discover actual generated routes automatically, so future posts require no redirect mapping maintenance. Feed IDs preserve the original github.io values, including lack of trailing slash. Article links use the new domain; the legacy feed differs only in its self link. The renderer retains older card PNGs for cached social previews.

Current article paths:

- `/2026/09/24/becoming-a-dictator/`
- `/2026/09/26/downstream-of-deepseek/`
- `/2026/10/05/in-my-own-words/`
- `/2026/10/08/haiku-joins-the-price-war/`

Both full sites retain the Aro script. If its existing registration restricts allowed origins, update that registration and verify actual collection separately. No server-side analytics is added.

## Redirects

On `main`, the GitHub Build and deploy workflow checks that the apex serves the expected pages before publishing redirects. If Cloudflare has not finished deploying a new post, GitHub fails safely and retains its previous deployment; rerun after Cloudflare finishes.

The blog uses the bare domain only; `www.davidgarvey.blog` is deliberately not configured. The workers.dev host can be disabled rather than exposing a second canonical copy indefinitely.

Verify old homepage, About, Privacy and all article URLs redirect to the matching new paths. JavaScript preserves query and fragment; the immediate HTML refresh and visible fallback work without JavaScript but omit those suffixes. The old feed remains XML with new article links and old IDs; old asset URLs remain accessible. GitHub redirects have HTTP status 200, because github.io cannot serve arbitrary HTTP 301 responses. The 404 redirects to `/404.html` and cannot recover unknown paths. Previously deleted card files cannot be recovered by the generator. LinkedIn caches remain outside our control.

## Search Console

Add Domain property `davidgarvey.blog` and its verification TXT record in Cloudflare DNS. Keep the old property and verification. Submit `https://davidgarvey.blog/sitemap.xml`, inspect homepage and several articles, and monitor selected canonicals and indexing. An agent must obtain Dave's explicit approval before submitting the sitemap.

Google's Change of Address checks expect server redirects and may reject the HTML redirects. Use it only if the checks accept this setup; don't claim registration if they fail. Canonicals, redirects and the new sitemap still provide migration signals. Retain the old deployment and feed indefinitely.

[Google Change of Address](https://support.google.com/webmasters/answer/9370220).

## Rollback

To serve the full blog from GitHub Pages again, restore the parallel build from the commit that removed it: `_config.github.yml` and the `jekyll build --config _config.yml,_config.github.yml` step in `.github/workflows/pages.yml`. This is independent of Cloudflare availability. Disable the Cloudflare workflow in GitHub Actions if needed; roll back its previous deployment through Cloudflare. Avoid deleting the Worker, zone, DNS or original GitHub deployment while investigating.
