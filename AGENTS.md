# Working in this repository

A Jekyll blog for GitHub Pages (`davegarvey.github.io`). See [README.md](README.md) for
the mechanics of publishing, post front matter, and running the site locally.

## Purpose

Each post should be worth the time of a reader arriving with no context. Judge what goes
in by that test.

If `AGENTS.local.md` exists, read it as well. It holds instructions that are kept out of
the repository.

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
- Check every link opens and says what the note claims before adding it.

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
  `<p class="figure-title">`, `<figcaption>`) rather than text in the image, and give
  the image descriptive alt text.
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

Each post has a share card: the image LinkedIn, Slack and similar services show when
someone shares a link. [README.md](README.md) covers the mechanics (SVG source, rendered
PNG, fingerprinting, the metadata check). Cards are usually seen small, in a feed, so:

- **Keep the visual style consistent.** Same dark background (`#181a18`), the title in
  the site's serif at the top left, and one simple graphic in the lower half, drawn in the
  site's palette from plain shapes. Look at the existing cards in `assets/images/cards/`
  before making a new one.
- **Keep text to a minimum.** The title is usually the only text. Make it large enough to
  read at feed size. If a title is long, reduce the font size slightly and keep it on one
  line.
- **Let the graphic carry the interest.** It should make one point about the post, or
  give a sense of it at a glance. A little wit is welcome but not required.
- **Make one version.** Open Graph has no light or dark variant, and cards never appear
  on the site, so each card has its own solid background and must read well on both light
  and dark feeds.
- **Write alt text** that describes the graphic and gives the title.
