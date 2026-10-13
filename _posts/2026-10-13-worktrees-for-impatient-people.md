---
layout: post
title: Worktrees for impatient people
date: 2026-10-13 16:03:00 +0200
description: Agents can now take on jobs that would take a person hours. I fill the wait by running several at once, each in its own Git worktree. Here's how, and what it costs.
image:
  path: /assets/images/cards/worktrees-for-impatient-people-d77773ae.png
  width: 1200
  height: 630
  alt: "Three coloured branches fork from a grey main line, like Git worktrees. Two have merged back in; the third is still running. The title reads: Worktrees for impatient people."
tags:
  - how-i-ai
  - llms
  - tools
---

Have you ever found yourself waiting for an agent?

I have, and it's happening more often as agents take on bigger tasks. To fill the wait, I started running several at once, and they soon got in each other's way. Fortunately, there's an answer: Git worktrees.

<!--more-->

## Agents work for longer

Agents can now take on far bigger jobs than they could a couple of years ago. METR, a research group that evaluates AI models, measures how complex a task an agent can handle by how long the same task takes a skilled person. In May 2024, the best model could manage about seven minutes' work. By April 2026, it was up to about 17 hours'.

<figure>
  <p class="figure-title"><strong>Agents can now take on tasks that last hours</strong></p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/agent-time-horizons.svg' | relative_url }}" alt="Step chart of the length of task the leading AI model can complete half the time, from January 2024 to April 2026, in hours. It rises from 7 minutes for GPT-4o in May 2024 to 1 hour for Claude 3.7 Sonnet in February 2025, 3.4 hours for GPT-5 in August 2025, 12 hours for Claude Opus 4.6 in February 2026 and 17 hours for Claude Mythos Preview in April 2026.">
  <figcaption>Hours a skilled person would take on tasks the leading model completes half the time. Source: METR, Time Horizon 1.1.</figcaption>
</figure>

So now that you can delegate complex, long-running tasks to agents, can you sit back and relax while they do all the work? You can. Or you can hand the next task to another agent, and that's where the trouble begins.

## Early squabbles

My first attempts at wrangling several agents at once ended in conflict: not between me and the agents, but between the agents themselves. I've been writing software for years, usually alongside many other people, but my own machine was always mine alone. Now that I have coding agents, it can be like a team sharing one keyboard, all editing the same copy of the code.

One agent's edits get tangled up with another's, and when you try to open a PR for one piece of work, the others' uncommitted changes get in the way. Eventually, I asked the agent how to avoid this conflict, and it suggested Git worktrees.

## One worktree per agent

As the ancient proverb goes: give four agents one checkout and they'll squabble all day. Give each its own worktree and they'll work in peace.

A Git worktree is a second working directory for the same repository, with its own branch and files but shared history. Give each agent its own, and its changes stay out of the others' way until you merge them.

I add a `.worktrees` directory to each project, tell Git to ignore it, and add a rule to `AGENTS.md` telling agents to make each change in a new worktree inside that directory. Doing it this way keeps things consistent across all the coding tools I use.

## Worktrees took off with agents

Worktrees have been in Git since 2015, but I'd never come across them until I started coding with agents. I don't seem to be the only one: interest in them has exploded since agents took off. Searches nearly tripled in the week the Codex app launched with built-in worktrees.

<figure>
  <p class="figure-title"><strong>Searches for worktrees took off with coding agents</strong></p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/worktrees-search-interest.svg' | relative_url }}" alt="Line chart of weekly Google search interest in worktrees, January 2024 to September 2026. Interest is close to zero until late May 2025, when Claude Code became generally available, then rises slowly. It doubles in the week Cursor 2.0 launched parallel agents at the end of October 2025, and nearly triples in the week the Codex app launched with built-in worktrees in February 2026. It peaks in late May 2026, then falls, with a second rise in September.">
  <figcaption>Weekly worldwide Google search interest in "worktrees"; 100 is the peak week. Source: Google Trends, retrieved 8 October 2026.</figcaption>
</figure>

With worktrees now built into Claude Code and Codex, I expect them to become the norm. It's hard to see why you wouldn't use them.

## What worktrees don't solve

Worktrees stop agents editing each other's files, but there are still a few things to watch out for:

- **Shared resources are the main problem.** Anything outside the repository is still shared, and that's where agents working at the same time can break each other's work. For example, if the worktrees share a local database and one agent changes its schema, it may break the others'. If a piece of work will change something shared, give its worktree its own copy. If it only touches code, there's nothing to worry about.
- **Merge conflicts still happen.** Agents that change the same code produce PRs that conflict, as people's do. Agents are usually good at resolving them, but it helps to keep each piece of work small and tightly scoped. It's tempting to keep a session going as you discover more to do; it's better to close it off and start a new one.
- **Ignored files don't come with a new worktree.** A fresh worktree has no `.env` and no installed dependencies. Add copying the config and installing dependencies to the `AGENTS.md` rule, and the agent will set up each worktree for you.

## No free lunch

As you multiply what your agents get done, you also multiply the demands on yourself. Once worktrees have removed the technical barriers, the limit is your own ability, and appetite, to switch context: reading each agent's response, deciding what it should do next, then moving on to the next. Run too many and their responses start to stack up.

Having your own army of agents might sound exciting, but someone still has to manage it. I'd recommend it. Just don't be surprised when, instead of waiting for your agents, you find them waiting for you.

## Further reading

- METR, [Task-completion time horizons of frontier AI models](https://metr.org/time-horizons/), updated September 2026. The best-known measure of how much work an agent can do on its own, with METR's method and its limits.
- Google Trends, [worktrees](https://trends.google.com/trends/explore?date=today%205-y&q=worktrees), accessed 8 October 2026. A rough measure of when worktrees went from an obscure Git feature to something people search for.
- Git, [git-worktree](https://git-scm.com/docs/git-worktree), accessed 13 October 2026. The reference for creating, listing and removing worktrees.
- Anthropic, [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees), accessed 13 October 2026. How to start each Claude Code session in its own worktree, and have it tidy up when you're done.
- OpenAI, [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees), accessed 13 October 2026. The same for the Codex app, which also clears out old worktrees, keeping a snapshot in case you want one back.
- [AGENTS.md](https://agents.md/), accessed 13 October 2026. The open format for instructions to coding agents, where I keep my worktree rule.
