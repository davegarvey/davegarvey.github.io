# David Garvey’s Weblog — source

A small Jekyll blog for GitHub Pages. Posts are Markdown, the site has no JavaScript or external font dependencies, and GitHub Actions builds and publishes it.

## Publish

1. In the repository settings, open **Pages** and set **Build and deployment → Source** to **GitHub Actions**.
2. Push this repository to `main`. The workflow builds pull requests for review and deploys changes from `main`.

This repository is named `davegarvey.github.io`, so it is configured as a user site at `https://davegarvey.github.io/`. If you use a custom domain, update `url` in `_config.yml` and add the domain's `CNAME` file at the repository root.

## Write a post

Create a file in `_posts` with this format:

```text
YYYY-MM-DD-short-title.md
```

Start it with front matter:

```yaml
---
layout: post
title: A clear, descriptive title
date: 2026-09-23 09:00:00 +0200
description: A short summary for search and social previews.
tags:
  - notes
  - ideas
---

Write the opening paragraph here. It appears as the preview in the RSS feed.

<!--more-->

Continue the post here. Markdown headings, lists, links, and code blocks are supported.
```

The date at the start of the filename determines the post's date and URL. Tags are optional and appear as plain text under the post title; use a small, consistent set of lowercase tags. Posts dated in the future stay unpublished until their date.

An unpublished example is in [`_drafts/first-post.md`](_drafts/first-post.md). Copy it into `_posts` and replace its sample title and content to publish your first note.

## Share previews

Links to the site show as a card on LinkedIn, Slack, Facebook, X and similar services. Titles, descriptions and canonical URLs come from `jekyll-seo-tag`, which reads each post's `title` and `description`, so write a real description.

Every post has its own card in [`assets/images/cards/`](assets/images/cards): an SVG source named after the post's slug, and a 1200×630 PNG rendered from it. The PNG is what the page metadata points to, because LinkedIn and others do not accept SVG.

Preview services cache `og:image` by URL, so an image that changes under the same URL can keep showing a stale or low-resolution copy. The PNGs therefore carry a hash of their contents in the file name, such as `becoming-a-dictator-6629ddef.png`. Render the cards with:

```sh
brew install librsvg
scripts/render-cards
```

The script renders every card, renames each PNG after its hash, removes the old copies and updates `image.path` in the matching post and the fallback path in `_config.yml`. A card that has not changed keeps its name. A post needs an `image` block in its front matter once:

```yaml
image:
  path: /assets/images/cards/short-title-0a1b2c3d.png
  width: 1200
  height: 630
  alt: A plain description of the graphic and the title.
```

Pages without their own `image` use the generic card, [`assets/images/social-card.svg`](assets/images/social-card.svg), set as a default in `_config.yml`.

After building, `bundle exec ruby scripts/check-share-metadata` checks every page for the metadata these services need: the Open Graph basics, an absolute HTTPS `og:image` that exists in the built site, is a PNG or JPEG of at least 1200×630 under 5 MB with matching width and height, alt text, a fingerprinted file name and `twitter:card` set to `summary_large_image`. The Actions build runs it, so a stale or missing card fails the build.

Refresh a page's preview with LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) after publishing.

## Run locally

The Ruby version is pinned in [`.ruby-version`](.ruby-version) to match the Actions workflow. With [rbenv](https://github.com/rbenv/rbenv) on macOS:

```sh
brew install rbenv ruby-build
rbenv install
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --drafts
```

Open `http://localhost:4000`. `--drafts` includes posts from `_drafts`. If the build fails with `Invalid US-ASCII character`, your shell has no UTF-8 locale; set `LANG=en_GB.UTF-8`. The Gemfile uses the GitHub Pages gem so the local Jekyll version and plugins match the Pages environment.

Commit the generated `Gemfile.lock` when you add or update dependencies so local and Actions builds stay in sync.

## Update the site details

Edit the title, author, description, canonical URL, and timezone in [`_config.yml`](_config.yml). The About page lives in [`about.md`](about.md), and the design is in [`assets/css/main.css`](assets/css/main.css). The site follows the reader's system light or dark setting.
