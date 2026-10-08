# Cloudflare Workers migration

## Verified parallel deployment

The full blog is deployed at `https://davidgarvey.blog` and `https://davidgarvey-blog.davegarvey.workers.dev`. GitHub Pages still serves the complete original blog. All four article paths, homepage, About, Privacy and Atom feeds were checked on both domains; feed identifiers match. The new card image matches the local file, and unknown routes return 404. Apex HTTPS was verified against its public DNS address while the local resolver retained an earlier negative DNS response.

This was a local deployment of the migration branch. The PR remains open; Cloudflare automatic deployment is not enabled and repository deployment secrets are not installed. GitHub redirects are not enabled. No Search Console submission or legacy cutover has occurred.

## Architecture and staged rollout

One repository builds two outputs. Jekyll and Ruby remain unchanged. Cloudflare Workers Static Assets serves the complete `_site` output without application code. GitHub Actions validates both deployments on pull requests; a separate Cloudflare workflow publishes `main` when `CLOUDFLARE_DEPLOY_ENABLED=true` and credentials are configured.

For the parallel phase, GitHub Pages continues serving the full blog with old-domain canonicals using `_config.github.yml`. The Cloudflare site uses `https://davidgarvey.blog`. Leave `LEGACY_REDIRECTS_ENABLED` unset or false. Publishing the new domain does not enable GitHub redirects. Do not merge until review and CI pass.

## Publish the Cloudflare copy

1. Run `npm ci` and `sh scripts/build-cloudflare` using Ruby 3.3.12.
2. Authenticate locally with `npx wrangler login`; never put credentials in source.
3. Run `npm run deploy`. `wrangler.jsonc` defines `davidgarvey-blog`, static assets, trailing-slash routing and the custom 404 page. Verify the returned workers.dev URL before attaching the domain.
4. Add `routes: [{ "pattern": "davidgarvey.blog", "custom_domain": true }]` to the Wrangler configuration and deploy again, once the existing Cloudflare zone and target account have been confirmed. Wrangler's Custom Domain setup creates DNS and a certificate. Do not replace an existing conflicting DNS record without inspecting it.
5. Verify HTTPS at the apex, all article URLs, images, feed, sitemap, robots, About, Privacy and custom 404. Keep workers.dev available during this parallel phase.

[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) and [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## Automatic deployments

For GitHub Actions, add repository secrets named `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The token needs Workers Scripts Write for the deployment account and access required to maintain the custom-domain route (including zone read and Workers Routes Write for this zone). Use an existing appropriately scoped token where available. Never send the values in chat. Set repository variable `CLOUDFLARE_DEPLOY_ENABLED=true` after the secrets are installed; merge the reviewed PR and run the Cloudflare workflow on `main`.

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

## Later cutover — not part of the parallel deployment

After both sites have been reviewed, configure a permanent `www.davidgarvey.blog` redirect to the apex in Cloudflare. A Bulk Redirect can preserve query strings, match subpaths and preserve path suffixes; the documented www DNS setup uses a proxied A record to `192.0.2.1`. Verify its HTTPS certificate and a 301 Location header at an article path. The workers.dev host can be disabled after acceptance rather than exposing a second canonical copy indefinitely.

Only with cutover authorisation, set `LEGACY_REDIRECTS_ENABLED=true` and rerun the GitHub Build and deploy workflow on `main`. It checks that the apex serves the expected pages before publishing redirects. If Cloudflare has not finished deploying a new post, GitHub fails safely and retains its previous deployment; rerun after Cloudflare finishes.

Verify old homepage, About, Privacy and all article URLs redirect to the matching new paths. JavaScript preserves query and fragment; the immediate HTML refresh and visible fallback work without JavaScript but omit those suffixes. The old feed remains XML with new article links and old IDs; old asset URLs remain accessible. GitHub redirects have HTTP status 200, because github.io cannot serve arbitrary HTTP 301 responses. The 404 redirects to `/404.html` and cannot recover unknown paths. Previously deleted card files cannot be recovered by the generator. LinkedIn caches remain outside our control.

[Cloudflare www redirect setup](https://developers.cloudflare.com/pages/how-to/www-redirect/).

## Search Console — after cutover

Add Domain property `davidgarvey.blog` and its verification TXT record in Cloudflare DNS. Keep the old property and verification. After cutover submit `https://davidgarvey.blog/sitemap.xml`, inspect homepage and several articles, and monitor selected canonicals and indexing. An agent must obtain Dave's explicit approval before submitting the sitemap.

Google's Change of Address checks expect server redirects and may reject the HTML redirects. Use it only if the checks accept this setup; don't claim registration if they fail. Canonicals, redirects and the new sitemap still provide migration signals. Retain the old deployment and feed indefinitely.

[Google Change of Address](https://support.google.com/webmasters/answer/9370220).

## Rollback

Keep or set `LEGACY_REDIRECTS_ENABLED=false` and rerun the GitHub workflow to serve the full original blog. This is independent of Cloudflare availability. Disable the Cloudflare automatic-deploy variable if needed; roll back its previous deployment through Cloudflare. Avoid deleting the Worker, zone, DNS or original GitHub deployment while investigating.
