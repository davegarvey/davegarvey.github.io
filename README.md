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

Links to the site show as a card on LinkedIn, Slack and similar services. Titles, descriptions and canonical URLs come from `jekyll-seo-tag`, which reads each post's `title` and `description`, so write a real description.

Every post has its own card in [`assets/images/cards/`](assets/images/cards), named after the post's slug. Each is an SVG source plus a 1200×630 PNG rendered from it, because LinkedIn does not accept SVG. Render both the cards and the generic fallback with:

```sh
brew install librsvg
scripts/render-cards
```

Then point the post at its PNG in the front matter:

```yaml
image:
  path: /assets/images/cards/short-title.png
  width: 1200
  height: 630
  alt: A plain description of the graphic and the title.
```

Pages without their own `image` use [`assets/images/social-card.png`](assets/images/social-card.png), set as a default in `_config.yml`. See [`AGENTS.md`](AGENTS.md) for how the cards are designed.

LinkedIn caches previews. After publishing, or after changing a post's metadata, refresh it with the [Post Inspector](https://www.linkedin.com/post-inspector/).

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
