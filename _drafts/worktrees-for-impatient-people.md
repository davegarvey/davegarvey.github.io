---
layout: post
title: Worktrees for impatient people
date: 2026-10-13 09:00:00 +0200
description: Waiting on a slow agent, I started running several at once, each in its own Git worktree. Worktrees have become the way to run agents in parallel on your own machine. Here's how I set them up and what they cost.
tags:
  - how-i-ai
  - llms
  - tools
---

Have you ever found yourself waiting for an agent?

I have, many times, and it's happening more often. Not long ago, agents couldn't do much on their own, so they handed back control quickly. Now they can work through a whole task by themselves, and that can take a long time. To fill the wait, I started running several at once. But keep that up and sooner or later you'll find the agents interfering with each other's work. Fortunately, there's an answer: Git worktrees.

<!--more-->

## Agents work for longer

Agents can now take on far bigger jobs than they could a couple of years ago. METR, a research group that evaluates AI models, measures this as a time horizon: the length of task, judged by how long it takes a skilled person, that an agent completes half the time. In May 2024, the leading model managed tasks of about seven minutes. By February 2026, it was about 12 hours.

<figure>
  <p class="figure-title">Agents can now take on tasks that last hours</p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/agent-time-horizons.svg' | relative_url }}" alt="Step chart of the length of task the leading AI model can complete half the time, from January 2024 to February 2026, in hours. It rises from 7 minutes for GPT-4o in May 2024 to 1 hour for Claude 3.7 Sonnet in February 2025, 3.4 hours for GPT-5 in August 2025 and 12 hours for Claude Opus 4.6 in February 2026.">
  <figcaption>Length of task, in hours a skilled person would take, that the leading model completes 50% of the time. Central estimates. Source: METR, Time Horizon 1.1.</figcaption>
</figure>

So now that agents can take on long tasks, can you sit back and relax while they work? You can. Or you can get on with the next task, and that's where the trouble begins.

## Early squabbles

My first attempts at wrangling several agents at once ended in conflict: not between me and the agents, but between the agents themselves. I've been writing software for years, usually on projects with plenty of other people, but my own machine was always mine alone. In this agentic coding era, it can be like a team sharing one keyboard, all changing things at once.

One agent's edits would get tangled up with another's, and when I tried to open a PR for one piece of work, the others' uncommitted changes got in the way. Eventually, I asked the agent how to stop them treading on each other, and it suggested Git worktrees.

## One worktree per agent

As the ancient proverb goes: give four agents one checkout and they'll squabble all day. Give each its own worktree and they'll work in peace.

A Git worktree is a second working directory for the same repository, with its own branch and files but shared history. Give each agent its own, and its changes stay out of the others' way until you merge them.

I add a `.worktrees` directory to each project, tell Git to ignore it, and add a rule to `AGENTS.md` telling agents to make each change in a new worktree inside that directory. Doing it this way keeps things consistent across all the coding tools I use, so I leave the built-in worktree option in Claude Code and Codex turned off.

## Worktrees took off with agents

Worktrees have been in Git since 2015, but I'd never come across them until I started coding with agents. I don't seem to be the only one: interest in them has exploded since agents took off. Searches nearly tripled in the week the Codex app launched with built-in worktrees.

<figure>
  <p class="figure-title">Searches for worktrees took off with coding agents</p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/worktrees-search-interest.svg' | relative_url }}" alt="Line chart of weekly Google search interest in worktrees, January 2024 to September 2026. Interest is close to zero until late May 2025, when Claude Code became generally available, then rises slowly. It doubles in the week Cursor 2.0 launched parallel agents at the end of October 2025, and nearly triples in the week the Codex app launched with built-in worktrees in February 2026. It peaks in late May 2026, then falls, with a second rise in September.">
  <figcaption>Weekly worldwide Google search interest in "worktrees"; 100 is the peak week. Source: Google Trends, retrieved 8 October 2026.</figcaption>
</figure>

With worktrees now built into Claude Code and Codex, I expect them to become the norm. It's hard to see why you wouldn't use them.

## What worktrees don't solve

Worktrees stop agents editing each other's files, but there are still a few things to watch out for:

- **Shared resources are the main problem.** Anything outside the repository is still shared, and that's where agents working at the same time can break each other's work. For example, if the worktrees share a local database and one agent changes its schema, it may break the others'. If a piece of work will change something shared, give its worktree its own copy. If it only touches code, there's nothing to worry about.
- **Merge conflicts still happen.** Agents that change the same code produce PRs that conflict, as people's do. Agents are usually good at resolving them, but it helps to keep each piece of work small and tightly scoped. It's tempting to keep a session going as you discover more to do; it's better to close it off and start a new one.
- **Ignored files don't come with a new worktree.** A fresh worktree has no `.env` and no installed dependencies. Add copying the config and installing dependencies to the `AGENTS.md` rule, and the agent will set up each worktree for you.

## The cost: switching context

There's a cost to all this, and it falls on you. Once worktrees have removed the technical barriers, the limit is your own ability, and appetite, to switch context: reading each agent's response, deciding what it should do next, then moving on to the next. Run too many and their responses start to stack up.

Running your own army of agents might sound exciting, but someone still has to manage it. I'd recommend it, as long as you're happy to be that manager.

## Further reading

- METR, [Task-completion time horizons of frontier AI models](https://metr.org/time-horizons/). The data behind the first chart, with every model METR has measured and how it measures them.
- Google Trends, [worktrees](https://trends.google.com/trends/explore?date=today%205-y&q=worktrees). The search data behind the second chart, which you can extend or compare with other terms.
- Git, [git-worktree](https://git-scm.com/docs/git-worktree). The reference for creating, listing and removing worktrees.
- Anthropic, [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees). How Claude Code's built-in option creates worktrees, where it puts them, and how it stops a session editing the main checkout.
- OpenAI, [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees). The same for Codex, including how to change where its worktrees go.
- [AGENTS.md](https://agents.md/). The open format for a file of instructions that coding agents read, and where I keep my worktree rule.
