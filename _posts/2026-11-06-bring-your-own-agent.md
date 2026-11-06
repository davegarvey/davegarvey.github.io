---
layout: post
title: Bring your own agent
date: 2026-11-06 10:27:33 +0100
feed_id: urn:uuid:7c8a5a26-2f02-42fe-95d3-1e8ac7509412
description: AI assistants are becoming platforms, and people want them to work with the services they use. Give their agents a way in, but keep a first-class experience of your own.
image:
  path: /assets/images/cards/bring-your-own-agent-33ff9453.png
  width: 1200
  height: 630
  alt: "A stick figure with no head walks along, carrying its own smiling orange head tucked under one arm."
tags:
  - llms
  - tools
---

For years, search engines were my front door to the internet. I'd type in a question and get a page full of links to choose from. But my behaviour has changed over the past year or two. Now I'd much rather ask an AI assistant. It gets me to the answer faster, without me trawling through the links.

My assistant has got to know me: what I've asked before, how I like answers written, what I'm working on. The more I use it, the better it gets. This is reshaping what I expect from the services I use. I want to use them from the comfort of my own agent.

<!--more-->

## The agent is becoming a platform

What started as a chatbot now works with the tools I use every day: my email, calendar and documents. OpenAI, Anthropic, Google and others are turning their assistants into platforms, helped by better models, better tooling and standards such as MCP for connecting other services.

This is evident from the growing directories of plugins and connectors listed within their platforms. When I looked this week, Claude's listed 9,546 connectors, from Slack, Atlassian and Figma to Shopify and HubSpot. ChatGPT's doesn't give a count, but it's much the same list. Most are built by the services themselves, as apps are for an app store.

So people will want their favourite agent to work with the services they use; we humans love taking the path of least resistance. A service that isn't in those directories puts friction between its users and the place they'd rather work.

## Your agent or theirs

Most software companies are working out how to add AI to their products, and many opt for the ChatGPT-style experience. I took that route with [Zumia](https://zumia.app), a tool that tailors your CV to a job. I wanted control over the model, prompt, interface and workflow, so that I could create the best user experience. The catch is that when someone arrives, Zumia's agent knows nothing about them.

Another tool I built is [Lidora](https://lidora.app), an RSS reader. Instead of adding an agent to it, I gave it an MCP server, so that people can bring their own. Their agent arrives already knowing them, and so is well placed to manage their feeds and recommend new ones.

That's what I mean by headless. The service supplies the data and the actions. The user's own agent brings the chat interface and the judgement. The downside is that you give up control of the model, prompt, interface and workflow. If Zumia were headless, an agent could skip a step in its workflow and rewrite a CV without first asking about the gaps in it. Lidora, by contrast, has no such workflow, so there's little that can go wrong.

Whether that's a price worth paying depends on how much your users rely on their own agents. At work, my agent is central to most things I do. It can work through hundreds of Jira tickets and Confluence pages and pull out what matters, which is otherwise time-consuming. A system it can't reach leaves me doing that work myself. It's like stepping back to 2024. Organisations will notice, and choose the systems that make their staff most productive. Services are already seeing the demand. PostHog, a product analytics company, says its MCP server is used as much as its own built-in agent.

## How to go headless

MCP has come up throughout this post because it's the obvious place to start. With an MCP server, a service can reach people in Claude and ChatGPT, as well as in coding agents such as Claude Code and Codex. The server offers tools, resources and prompts, and handles each user's sign-in. Since January, ChatGPT and Claude can also show a service's own interactive panels inside the chat, so in theory you needn't give up your interface entirely. I've yet to come across one.

For developers, there's a more flexible and token-efficient option: a command-line tool. In a terminal, an agent can combine it with files, scripts and other programs. In a small benchmark by Scalekit, an agent did the same tasks with far fewer tokens through GitHub's command-line tool than through its MCP server. The MCP server needed between four and 32 times as many. But the terminal is no route to the mass market.

MCP servers and command-line tools usually sit on top of an API, which most services already have. An agent could call the API directly, but MCP and command-line tools exist for a reason: they hide the API's complexity and package it for agents. If you have neither, a well-built API and an OpenAPI specification go a long way. Agents read documentation far more patiently than people do.

## Keep your head

Before you rush to get your service into every directory, remember that platforms have lured services in before, and it hasn't always ended well. News publishers put their articles inside Facebook and gave readers less reason to visit their own sites. The scheme ended in 2023, when Facebook lost interest in news. App stores made fortunes for developers, but Apple wrote the rules, even down to forbidding apps from telling users they could pay elsewhere. It took a court to change that.

Whoever owns the platform holds the power, and platforms come and go. So don't build all your value on someone else's. Keep a first-class experience of your own, and use the platforms to extend your reach and meet users where they are.

The balance depends on your users. Some will stick with your app, some will want their agent to do everything, and most will sit somewhere in between. Watch how each is used, and be ready to shift your focus as people come to rely on their AI assistants. Let them bring their own agent, but don't lose your head in the process.

## Further reading

- Ian Vanagas, [What we wish we knew about building AI agents](https://posthog.com/newsletter/building-ai-agents), PostHog, March 2026. A rare look at real usage figures from a company that built both its own agent and an MCP server, with frank advice on when each makes sense.
- MCP Core Maintainers, [MCP Apps: bringing UI capabilities to MCP clients](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/), Model Context Protocol Blog, January 2026. What a service's own interface could look like inside ChatGPT or Claude, if the idea catches on, and how it's kept safely sandboxed.
- Ravi Madabhushi, [MCP vs CLI: benchmarking AI agent cost and reliability](https://www.scalekit.com/blog/mcp-vs-cli-use), Scalekit, March 2026. A small, honest benchmark of what MCP's tool definitions cost an agent, and a fair account of when they're worth the tokens.
- Charlotte Tobitt, [Meta to end Facebook Instant Articles after seven years as drive away from news continues](https://pressgazette.co.uk/news/facebook-instant-articles-publishers/), Press Gazette, October 2022. Why the Guardian and the New York Times walked away early: they wanted readers on their own sites, where they could build a relationship with them.
- Ana Maria Constantin, [Supreme Court will hear Apple's appeal over the App Store contempt finding in Epic case](https://thenextweb.com/news/supreme-court-apple-epic-contempt-app-store-commission), The Next Web, June 2026. A clear account of the six-year fight over what Apple may charge apps that send users elsewhere to pay, which is still not settled.
