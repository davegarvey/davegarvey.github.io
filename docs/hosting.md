# Hosting

The blog is served at `https://davidgarvey.blog` from Cloudflare Workers. The old address, `https://davegarvey.github.io`, is a GitHub Pages site that is no longer deployed. Its last deployment, on 13 October 2026, redirects the pages that existed there to the same paths on the new domain, sends any other path to the new home page, and keeps serving the old share cards and a frozen Atom feed whose last entry tells subscribers to move to `https://davidgarvey.blog/feed.xml`.

## How it is built

`sh scripts/build-cloudflare` builds `_site`, stabilises the feed and checks the share metadata. The Worker serves `_site` through its `ASSETS` binding; only `/feed.xml` runs through Worker code first. The Worker returns the static feed response unchanged, then reports its status and the original reader user agent to Aro in the background. Reporting failures never affect feed delivery. `wrangler.jsonc` sets trailing-slash routing, the custom 404 page and the `davidgarvey.blog` Custom Domain. The `workers.dev` address is turned off.

## How it is deployed

`.github/workflows/cloudflare.yml` builds and validates every pull request and every push to `main`, and deploys to Cloudflare only from `main`. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

Feed reporting uses the existing Aro site ID (`qpnguzsvbiru`). Create or rotate its feed-ingestion credential in Aro's site settings, then add it as the `ARO_INGESTION_KEY` secret on the `davidgarvey-blog` Worker in the Cloudflare dashboard (or with `npx wrangler secret put ARO_INGESTION_KEY`). The credential is shown only once by Aro; never put it in this repository or a GitHub Actions secret. The static feed continues to work if the credential is absent or reporting is unavailable, but Aro will not record feed activity until the Worker secret is set.

To deploy to Cloudflare by hand, run `npx wrangler login` and then `npm run deploy` after building. Never put credentials in source or in chat.

## Validation

Use Ruby 3.3.12 (`~/.rbenv/versions/3.3.12`) and a UTF-8 locale (`LANG=en_GB.UTF-8`); without one, Ruby misreads the built pages.

```sh
sh scripts/build-cloudflare
bundle exec ruby scripts/check-site
npm run deploy:check
```

All three run offline. `check-site` checks that every page has a canonical link on the new domain and the analytics script, that the feed's entry IDs keep their original form, and that the sitemap and robots file use the new domain.

## Constraints

- **Keep the feed's entry IDs on `github.io`.** `scripts/stabilise-feed` rewrites them to the original values, without a trailing slash, so subscribers who moved from the old feed don't see every post again. Article links in the feed use the new domain.
- **Keep old share-card PNGs.** Cached link previews on LinkedIn and elsewhere still point to them.
- **Don't delete the GitHub Pages deployment**, the Cloudflare Worker, the zone or its DNS records. Old links and the old feed depend on the GitHub Pages deployment, and nothing rebuilds it.
- **Keep the old Search Console property** and its verification alongside the `davidgarvey.blog` one.

## Limits of the redirects

GitHub Pages can't send HTTP 301s, so each old page returns 200 with a canonical link, an immediate meta refresh and a JavaScript `location.replace`. The JavaScript keeps the query string and fragment; the meta refresh and the fallback link drop them. Google's Change of Address tool expects server redirects and may reject this setup.

## Rollback

Roll back a bad Cloudflare deployment through the Cloudflare dashboard, and disable the Cloudflare workflow in GitHub Actions if needed. To deploy to GitHub Pages again, restore `.github/workflows/pages.yml` and `scripts/build-legacy` from before they were removed (`git log --diff-filter=D -- scripts/build-legacy` finds the commit).
