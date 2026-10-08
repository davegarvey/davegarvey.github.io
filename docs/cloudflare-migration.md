# Cloudflare Pages migration

## Architecture and current state

One repository builds two outputs. Cloudflare Git integration builds the complete blog from `main`; GitHub Actions builds the same site, validates metadata, generates and checks the legacy output, then deploys GitHub Pages. Pull requests run the same local checks. Ruby remains 3.3.12, Jekyll 3.10 and dependencies remain locked.

The canonical configuration is `https://davidgarvey.blog`. Before cutover, GitHub Actions rebuilds with `_config.github.yml`, retaining the full original site and old canonical domain. `LEGACY_REDIRECTS_ENABLED=true` switches only GitHub's output to redirects. Leave that variable unset until Cloudflare is live. The workflow checks all published new pages before uploading the redirect artifact; if Cloudflare hasn't finished deploying the same content yet, it fails safely. Rerun GitHub Actions after Cloudflare finishes. This deliberately favours keeping the previous working GitHub deployment over publishing premature redirects.

Repository work alone does not create the Cloudflare project or change DNS. Local tests are not proof of a public cutover.

## 1. Prepare Cloudflare

1. Workers & Pages → Create application → Pages → Import an existing Git repository. Authorise only the required repository, `davegarvey/davegarvey.github.io`.
2. Set production branch `main`, root directory the repository root, build command `sh scripts/build-cloudflare`, output directory `_site`.
3. Use build image v3. Set `RUBY_VERSION=3.3.12` and `JEKYLL_ENV=production` for production and preview. `.ruby-version` also pins Ruby. Keep the Gemfile and lockfile. The script builds, preserves feed IDs and runs share-metadata validation; a failed check stops deployment.
4. Enable a preview build for `codex/cloudflare-pages-migration` before merging. Check the complete blog, article images, feed and analytics script at its preview URL. Canonical metadata intentionally points to the new domain. Restrict previews with Cloudflare Access if they should not be indexed.
5. Confirm the Cloudflare build actually installs the locked bundle and succeeds. Native support is documented, but a local build does not verify Cloudflare's build. If its Ruby installation fails, first examine the build log and Ruby override; don't upgrade Jekyll speculatively. An Actions/direct-upload fallback would need separate Cloudflare credentials and implementation.

[Cloudflare build image](https://developers.cloudflare.com/pages/configuration/build-image/) and [Jekyll setup](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/).

## 2. Activate and verify the domain

1. Merge the preparation PR only after the preview works. Confirm production has built `main`. GitHub still serves the complete original site.
2. In the Pages project → Custom domains → Set up a domain, add `davidgarvey.blog`. Use Cloudflare's guided DNS setup in the existing zone; wait for domain activation and the HTTPS certificate. Add the domain through Pages, rather than merely creating a CNAME. Do not point GitHub Pages at this domain.
3. Check `https://davidgarvey.blog/`, `/about/`, `/privacy/`, all article paths listed below, `/feed.xml`, `/sitemap.xml`, `/robots.txt` and a card image. Confirm full articles and canonical/OG/image URLs on the new domain. Confirm the browser still loads the existing Aro script; if Aro restricts allowed origins, update its existing site registration separately and verify collection.
4. Run `bundle exec ruby scripts/check-live-migration` after a canonical local build. It requires full pages at their exact URLs, matching article text and an Atom feed. It never enables deployment itself.

Actual published article paths at implementation:

- `/2026/09/24/becoming-a-dictator/`
- `/2026/09/26/downstream-of-deepseek/`
- `/2026/10/05/in-my-own-words/`
- `/2026/10/08/haiku-joins-the-price-war/`

[Custom domain setup](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## 3. Configure permanent host redirects

After apex HTTPS works, create an account Bulk Redirect list and rule:

| Source | Target | Status |
| --- | --- | --- |
| `www.davidgarvey.blog` | `https://davidgarvey.blog` | 301 |
| `<actual-project>.pages.dev` | `https://davidgarvey.blog` | 301 |

Enable preserve query string, subpath matching and preserve path suffix. For `www`, create a proxied A record to `192.0.2.1` as Cloudflare documents. Ensure its certificate is active. For pages.dev, use the actual project hostname; leave include-subdomains off to retain branch previews. Enable HTTPS redirection for the zone if HTTP is not already redirected. Do not enable an apex-to-www rule.

Check headers for `https://www.davidgarvey.blog/about/?migration=test` and the equivalent pages.dev URL: expect 301 and `Location: https://davidgarvey.blog/about/?migration=test`. Verify both HTTP and HTTPS. Host redirects belong in Cloudflare's dashboard, because Pages `_redirects` does not support domain-level source rules.

[www redirect](https://developers.cloudflare.com/pages/how-to/www-redirect/) and [pages.dev redirect](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/).

## 4. Enable legacy deployment

Only after steps 2 and 3 pass:

1. GitHub repository Settings → Secrets and variables → Actions → Variables → New repository variable: `LEGACY_REDIRECTS_ENABLED` = `true`.
2. Actions → Build and deploy → Run workflow → `main`. Keep GitHub Settings → Pages → Source as GitHub Actions, and leave its custom domain empty.
3. Confirm the deployment succeeds. Visit the old homepage, About, Privacy and every old article URL in a browser. Confirm immediate navigation to the same path on the new domain. Test `?migration=test#main-content` on an article: JavaScript preserves both; without JavaScript, meta refresh and the fallback link still reach the article but omit the query/fragment.
4. Fetch the old feed: it must be Atom XML, with new-domain article links and old-domain IDs. Fetch an old card URL, for example `/assets/images/cards/haiku-joins-the-price-war-95a4f4f1.png`: expect the original PNG. Check social metadata in an old article's HTML; it retains title, description and accessible old-host image URLs.

GitHub's redirects are HTML responses with status 200, not HTTP 301. The 404 page redirects to `/404.html`; it cannot recover arbitrary unknown URLs. Existing LinkedIn caches are outside our control. Assets present in the repository are retained; previously deleted historical fingerprints cannot be recovered by the generator. The card renderer now keeps previous PNGs automatically, so future card updates retain their published URLs.

## Feed identifiers and testing

Both outputs come from the same feed. `scripts/stabilise-feed` keeps the original feed ID and entry IDs, including their existing lack of trailing slash. Article links and images use the new domain. The old feed changes only its self link. This minimises reader duplication; individual reader behaviour cannot be guaranteed.

Local validation:

```sh
sh scripts/build-cloudflare
bundle exec ruby scripts/build-legacy
bundle exec ruby scripts/check-migration
```

Checks cover actual generated HTML routes, fallback links, canonical URLs, immediate refresh, query/fragment script, absence of article containers in legacy pages, retained asset hashes, preview images, synchronised entries, stable IDs, new article links, sitemap, robots and the Aro script. Repeat after adding posts; routes are discovered automatically. GitHub also tests the preparatory full-site build and metadata before uploading it.

## Search Console

Add the Domain property `davidgarvey.blog` in Google Search Console. Copy its verification TXT record into Cloudflare DNS; retain the old property's verification. After cutover, submit `https://davidgarvey.blog/sitemap.xml` in the new property. Inspect the new homepage and several articles, checking Google's selected canonical and indexing over time. Keep the old property to monitor old URLs and crawling. Sitemap submission needs Dave's explicit approval if performed by an agent.

Google's Change of Address tool expects server redirects and may reject GitHub's HTML redirects. Attempt it only after cutover and if its checks accept the setup; do not claim the move has been registered if they fail. Canonicals, redirects and the new sitemap still provide migration signals. Keep GitHub Pages and the old feed indefinitely.

[Google Change of Address documentation](https://support.google.com/webmasters/answer/9370220).

## Rollback

Set `LEGACY_REDIRECTS_ENABLED=false` and rerun the GitHub workflow: it publishes the full blog with old-domain metadata again. This does not depend on Cloudflare availability. Disable the Cloudflare Bulk Redirect rule separately if required. Keep the new site serving while investigating whenever possible. Cloudflare offers previous-deployment rollback; avoid deleting the project, zone or original GitHub deployment.
