# Working in this repository

A Jekyll blog served at `davidgarvey.blog` from Cloudflare Workers. The old GitHub Pages
site (`davegarvey.github.io`) is frozen and only redirects old links. See [README.md](README.md)
for the mechanics of publishing, post front matter, and running the site locally.

## Purpose

Each post should be worth the time of a reader arriving with no context. Judge what goes
in by that test.

Read `AGENTS.local.md` as well. If it's missing, tell Dave before going any further.

## Writing blog posts

Dave drafts posts by talking, not typing, and works through several stages before
anything lands in `_posts`:

1. **Dictated monologue.** He'll dictate a rough, spoken-style take on the topic —
   thinking aloud, backtracking, restating a point a different way. Treat this as raw
   material, not a draft: the goal is to capture his natural voice and the substance of
   his argument, not to transcribe it verbatim. Filler, false starts, and repetition
   should be cut; the phrasing and rhythm that make it sound like him should mostly
   survive. Expect it to wander: Dave thinks aloud and empties out everything on his
   mind, including tangents, side comparisons and asides that interest him more than a
   reader. Choose what earns its place; not every point in the monologue belongs in the
   post.
2. **Ask questions back.** Before drafting, raise a handful of questions on the
   substance — gaps, counterarguments, places where a concrete example would help,
   angles that would make the post more interesting. This is a real back-and-forth, not
   a formality.
3. **Draft.** Once there's enough material, write a full draft in the style below.
   Before handing it over, read it once looking only for passages that would bore a
   reader: tangents, comparisons that undercut themselves, confessions that don't
   change the advice, obvious statements and points made twice. Cut them.
4. **Revise together.** Dave reads the draft and gives feedback; expect several rounds
   of revision on both substance and phrasing.
5. **Finish.** Once he's happy, move the file into `_posts` following the naming and
   front matter conventions in [README.md](README.md). Set the filename date and the
   `date` in front matter to the actual moment of publishing — not when drafting
   started — so check the current date and time rather than reusing an earlier one.
   Make the share card and the LinkedIn image (see "Share cards" and "Assets for
   sharing" below). Do this before he shares it: some platforms, LinkedIn among them,
   can't add an image to a post once it's published.

Don't skip straight to a polished draft from the first monologue — the questioning
step is part of the value of this process, not an optional extra.

## Writing style

Aim for clear, plain, confident prose for an intelligent, informed reader. This is a
personal blog: write in the first person, recount Dave's own experiences and opinions as
his, and keep it sounding like him talking. Concretely:

- **British English throughout.** Spelling, vocabulary and idiom should all be British
  (e.g. "colour", "organise", "full stop", not their American equivalents).
- **Plain word over the pompous one.** "start" not "commence", "use" not "utilise".
  Prefer the familiar word to the far-fetched one.
- **Cut needless words and hedges.** Strip filler qualifiers ("very", "quite",
  "somewhat", "arguably") unless they're doing real work.
- **Active voice by default.** Use the passive only when the actor is genuinely
  unknown or unimportant.
- **Keep sentences clear and easy to follow.** Longer, natural sentences are fine when
  that's how Dave would say it; break up chains of subordinate clauses.
- **Assume a reader who knows the subject reasonably well.** Don't explain common
  concepts in the field (for AI posts, things like model tiers or what a "Flash" model
  is). For more niche areas, a brief explanation on first use can still be worth it.
- **Avoid the "X, not Y" construction.** Phrases like "it's a process, not a single pass",
  or "Don't do X. Do Y instead.", read as an AI tic. State the point directly. Keep a
  contrast only when it carries the argument.
- **Dry wit is fine, but substance comes first.** A light touch shouldn't dodge the
  argument.
- **Lead with the point.** Don't bury the argument in the closing paragraph.
- **Break posts up with headings.** Use them more often than The Economist would, rather
  than running long blocks of prose, but not so many that a short post reads like a report.
- **Prefer concrete specifics over generalisation.** Facts and examples beat vague
  claims.
- **Numbers:** spell out one to nine, use figures from 10 up.

This is guidance, not a checklist to tick off — don't contort a sentence to satisfy a
rule if it reads worse for it.

## Further reading

End every post with a `## Further reading` section unless there's a good case not to,
such as a post with no sources worth pointing to. It lets readers check what the post
claims and follow the subject further, and it shows the post rests on more than opinion.

- Choose a handful of sources that add something: the tools named in the post, the
  sources of facts and figures, and pieces that make the same argument well.
- Format each entry as author, linked title, publisher, date, then a short note on why
  it's worth reading, in Dave's voice. See the published posts for examples.
- Make the note say what the reader gains from the source, or why it matters. Notes that
  describe the source's job in the post, such as "The data behind the second chart" or
  "The same for Codex", tell a reader nothing; "A rough measure of when worktrees went from an obscure
  Git feature to something people search for" gives them a reason to click.
- Check every link opens and says what the note claims before adding it.

## Link posts

Some posts are a short pointer to something Dave found worth reading, watching or
listening to, with a brief reaction. They suit work that's better experienced first-hand
than rehashed, and a fuller post that only restates someone else's argument may work
better as one. See `_posts/2026-10-17-is-there-an-ai-bubble.md`.

- **Title:** a prefix for the medium, such as "Listening:", "Reading:" or "Watching:",
  then the source's full title in the blog's style (sentence case, "AI").
- **Opening paragraph:** what it is and when Dave came across it, with the source's
  title as a bold link; who made it, with roles checked against the source; and why he
  liked it. Keep it short: it's the excerpt in the feed.
- **Then a few points that resonated**, as bullets. Each has a bold heading, then what
  the source argued, attributed and paraphrased faithfully, then Dave's own view in a
  separate paragraph beginning *My take:*, ideally with something from his experience
  or a sourced figure. Don't attribute to the source anything it didn't say.
- **Keep it brief.** No conclusion, and no further reading unless a source behind one
  of the takes is worth a click on its own.
- The usual process still applies in lighter form: a question or two before drafting,
  checked facts and links, and a share card.

## Charts

Charts should make one clear point, simply and honestly. The approach is informed by
*The Economist*'s charts, but these are principles, not rules. Use judgement for each
chart.

- **Use a chart only where it earns its place**: where it shows something the text
  can't, such as timing, scale or a trend. Keep a personal post from turning into a
  report.
- **Keep it simple.** Show what's needed to make the point and little else. Secondary
  detail can appear if it matters, but should look secondary.
- **Title states the point; caption explains the chart**, including what's measured,
  units, any caveats that matter and the source. Keep captions frugal: don't add
  caveats the source line already implies, such as "these are benchmark figures".
  Keep both as HTML in the post (`<figure>`,
  `<p class="figure-title"><strong>…</strong></p>`, `<figcaption>`) rather than text in
  the image, and give the image descriptive alt text. The `<strong>` matters: feed
  readers drop the site's CSS, and without it the title looks like body text.
- **Static SVG in the post's own image folder**, using the site's palette and its own
  dark-mode colours. Check colour pairs are distinguishable for colour-blind readers.
- **One image folder per post.** Put a post's images in `assets/images/<slug>/`, where
  the slug is the post's file name without the date and extension (for example
  `assets/images/downstream-of-deepseek/`). Share cards are the exception: they stay in
  `assets/images/cards/`, where `scripts/render-cards` expects them.
- **Quiet chrome.** Light gridlines, few colours, nothing decorative.
- **Honest scales and data.** Choose the scale that shows the data fairly, and make it
  easy to read. Prefer evenly spaced axis increments. Draw data as it behaves (prices that change on set dates are steps,
  not smooth lines), avoid trend lines the data can't support, and prefer figures a
  reader can check.
- **Treat every series alike.** If one line has value labels, so do the others; place
  each line's name at the same distance from its line; align axis titles the same way as
  their tick labels.
- **Label directly where you can**, rather than relying on a legend, and keep labels
  consistent and clear of each other.

Before merging, build the site and check the chart in the post in both light and dark
mode (see `.claude/launch.json`).

## Share cards

Each post has a share card: the Open Graph image that Slack, Teams, iMessage, LinkedIn and
similar services show when someone shares a link. [README.md](README.md) covers the
mechanics (rendered PNG, fingerprinting, the metadata check). Cards are usually seen
small, beside or under the post's title, so:

- **Don't repeat the title.** The platform shows it next to the card. Text in the image is
  fine when it's part of the picture, such as labels on a gear knob, but not to restate
  the title. (X shows link cards without a headline, so a card there is only a picture.
  That's an accepted cost.)
- **Make one clear idea readable at thumbnail size.** LinkedIn shows the card about 250 px
  wide. One simple subject, high contrast, nothing small that matters. A little wit is
  welcome.
- **Choose the style for the idea.** Flat shapes in the site's palette suit most posts and
  can be drawn as SVG. A realistic image suits a post with a concrete, physical subject;
  avoid generic AI imagery (robots, glowing circuits) that looks like every other AI post.
- **Make one version.** Open Graph has no light or dark variant, so each card has its own
  solid background and must read well on both light and dark feeds.
- **Format:** 1200×630, PNG or JPEG, under 5 MB, fingerprinted like the others. Draw flat
  cards as SVG in `assets/images/cards/` and render them with `scripts/render-cards`. A
  raster card (for example from an image generator) needs converting and sizing, a
  fingerprinted name and the post's `image` block setting by hand.
- **Write alt text** that describes the picture.

## Assets for sharing

Dave shares posts on other platforms, at the moment mainly LinkedIn. Make a separate image
for each post that he'll attach to the LinkedIn post. Its job differs from the share
card's: it has to stop someone scrolling and carry the post's message on its own.

- **Make it engaging.** It can be more stylised than the share card, with a headline and
  a picture that conveys the argument. A chart is one option, but only if it carries the
  main point on its own; a chart that supports a secondary point stays in the post.
- **Keep it faithful to the post.** The headline mustn't overstate the argument, and
  labels must use the post's own terms. Include the site's address (`davidgarvey.blog`),
  because the image travels without the link.
- **Size for the platform.** LinkedIn shows portrait images large in the feed, so use
  1080×1350. Use larger type and thicker lines than anything on the blog.
- **For a chart**, make a separate version: on the site, the title, caption and source are
  HTML around the chart, so the bare image has none of them. Draw the title (in the
  site's serif), a one-line explanation, axis titles, the source and the site's address
  into the image, and use the light palette, since LinkedIn is light by default.
  `assets/images/haiku-joins-the-price-war/social-chart.svg` is an example.
- **Making the image.** Draw flat images as SVG next to the post's other images (for
  example `social.svg`) and render the PNG with `rsvg-convert`. For realistic images, write
  a prompt for Dave's image tool, then check the result closely, especially any text,
  which generators often get wrong. The PNG for upload doesn't need to be kept.
- **Write alt text** for the platform's image editor, giving the headline and describing
  the picture.
- **An attached image replaces the link preview**, so LinkedIn readers won't see the share
  card, and the link appears as plain text.
