# David Garvey’s Occasional Thoughts — source

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

## Run locally

Install Ruby 3.3 and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. The Gemfile uses the GitHub Pages gem so the local Jekyll version and plugins match the Pages environment.

Commit the generated `Gemfile.lock` when you add or update dependencies so local and Actions builds stay in sync.

## Update the site details

Edit the title, author, description, canonical URL, and timezone in [`_config.yml`](_config.yml). The About page lives in [`about.md`](about.md), and the design is in [`assets/css/main.css`](assets/css/main.css). The site follows the reader's system light or dark setting.
