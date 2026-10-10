# Hosting

The blog is served at `https://davidgarvey.blog` from Cloudflare Workers. The old address, `https://davegarvey.github.io`, is a GitHub Pages site that redirects every page to the same path on the new domain and keeps serving the Atom feed and old images.

## How it is built

One Jekyll build produces both sites.

- `sh scripts/build-cloudflare` builds `_site`, stabilises the feed and checks the share metadata. Cloudflare Workers Static Assets serves `_site` as it is, with no application code. `wrangler.jsonc` sets trailing-slash routing, the custom 404 page and the `davidgarvey.blog` Custom Domain. The `workers.dev` address is turned off.
- `bundle exec ruby scripts/build-legacy` turns `_site` into the GitHub Pages site in `_legacy`. It discovers pages from the build, so new posts need no redirect mapping.

## How it is deployed

Pushes to `main` run two workflows:

- `.github/workflows/cloudflare.yml` builds, validates and deploys to Cloudflare, then checks the live domain. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.
- `.github/workflows/pages.yml` builds the redirect site and deploys it to GitHub Pages. It first runs `check-live-migration`, so if Cloudflare hasn't yet deployed a new post, the GitHub deployment fails and the previous one stays live. Rerun it once Cloudflare has finished.

On pull requests, `pages.yml` builds and validates both sites without deploying.

To deploy to Cloudflare by hand, run `npx wrangler login` and then `npm run deploy` after building. Never put credentials in source or in chat.

## Validation

Use Ruby 3.3.12 (`~/.rbenv/versions/3.3.12`).

```sh
sh scripts/build-cloudflare
bundle exec ruby scripts/build-legacy
bundle exec ruby scripts/check-migration
npm run deploy:check
bundle exec ruby scripts/check-live-migration
```

The first four run offline. `check-live-migration` checks that `davidgarvey.blog` is serving every page in the local build.

## Constraints

- **Don't add a `CNAME`.** GitHub Pages must keep its `github.io` hostname to serve the redirects.
- **Keep the feed's entry IDs on `github.io`.** `scripts/stabilise-feed` rewrites them to the original values, without a trailing slash, so existing subscribers don't see every post again. Article links in the feed use the new domain.
- **Keep old share-card PNGs.** Cached link previews on LinkedIn and elsewhere still point to them, and the redirect pages point `og:image` at their `github.io` copies.
- **Don't delete the GitHub Pages deployment**, the Cloudflare Worker, the zone or its DNS records.
- **Keep the old Search Console property** and its verification alongside the `davidgarvey.blog` one.

## Limits of the redirects

GitHub Pages can't send HTTP 301s, so each old page returns 200 with a canonical link, an immediate meta refresh and a JavaScript `location.replace`. The JavaScript keeps the query string and fragment; the meta refresh and the fallback link drop them. Unknown paths go to the old `/404.html` and can't be redirected to a matching page. Google's Change of Address tool expects server redirects and may reject this setup.

## Rollback

To serve the full blog from GitHub Pages again, restore what commit `183450d` removed: `_config.github.yml` and the `jekyll build --config _config.yml,_config.github.yml` step in `pages.yml`. This doesn't depend on Cloudflare. Roll back a bad Cloudflare deployment through the Cloudflare dashboard, and disable the Cloudflare workflow in GitHub Actions if needed.
