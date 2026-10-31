---
layout: post
title: Dear harness makers
date: 2026-10-31 10:47:05 +0100
feed_id: urn:uuid:7bf05621-b389-4ab7-945e-58c7c5b37f82
description: A short open letter to the makers of AI coding harnesses. If you take a keyboard shortcut for the whole operating system, say so, and let the user choose.
image:
  path: /assets/images/cards/dear-harness-makers-509d60aa.png
  width: 1200
  height: 630
  alt: "Two keys, Command and D, above two app windows. A faint dashed line runs to the left window, which is silent; a solid orange arrow runs to the right window, which shows an orange sound wave."
tags:
  - llms
  - tools
---

Dear harness makers,

Please take care when you claim a keyboard shortcut for the whole operating system. You may not be the only app that wants it.

<!--more-->

I [dictate]({% post_url 2026-09-24-becoming-a-dictator %}) almost everything I say to coding agents, enough that I wrote [my own dictation plugin](https://github.com/davegarvey/opencode-native-dictate) for OpenCode. In Claude, dictation starts with Cmd+D, so I set the same shortcut in Codex, to make swapping between harnesses easier. Or so I thought. I quickly discovered that Codex's shortcut works across the whole system, so when I pressed it in Claude, Codex started listening instead. Annoying.

I understand why you do it. You want to be the app people talk to, wherever they are. But plenty of us run more than one harness and want them all to behave the same way. So if a shortcut is going to work across the whole system, tell the user, and let them turn that off.

The irony is that, in trying to reduce friction, you increase it.

Yours,<br>
Dave
