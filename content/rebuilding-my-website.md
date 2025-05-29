+++
title = "Rebuilding my website; or a slightly post technical person shaves some yaks."
date = 2025-05-27
draft = true
[taxonomies]
tags = ["zola", "web development", "hosting", "netlify", "vibe coding"]
+++

{% postlead() %}
As a technologist I've had an unloved, underutilised website for years. Since it was time to rebuild, I figured it was the perfect time to learn some "new" web technologies.

{% end %}

{{ postimage(src="/yakshaving.png", alt="Yak Shaving") }}

I had a few objectives in mind:
1. My previous site was built off a fairly obscure static site generator called "toto"; I could have started a wordpress site, but I wanted to try something new.
2. I wanted to play around with this vibe coding thing.
3. In the past I've hosted on a servie like Github Pages, and wanted to try something else.

Ultimately I learned a bunch, but possibly should have just used wordpress or ghost to achieve a similar outcome just as quickly.

<!-- more -->

## Tech Foundations

Recently I've been playing with Go, so initially I was testing [Hugo](https://gohugo.io/). It's a well-built and quite popular static site generator - similar to Jekyll (and toto). But something about the way it operated didn't sit right with me.

I experimented with [11ty](https://www.11ty.dev/) (pronounced "Eleventy"), and like Hugo I thought it was just on the wrong side of complex for what I wanted. I didn't enjoy choosing between CommonJS vs ECMAScript modules - and it guided me down a path of picking a starter framework all of which were featureful but didn't allow me to explore the problem space in a way that I wanted.

So. I landed on the Rust-based [Zola](https://www.getzola.org/). It's a single binary, opinionated but simple.

## Vibe coding

I used Zed + Claude to vibe my way to a blog design that I liked. This let me focus on building the features that the blog would need in Zola, but still have something that I would enjoy looking at.

![vibe design](/vibe-design.jpg)

## Netlify for hosting

Github pages is fantastic for static site hosting, but I have some ideas for this site that might need a bit more than just a static back-end. So I started to explore some alternatives. Cloudflare Pages looked interesting, but seems to be in the process of being migrated to Workers? I'd heard good things about [Netlify](https://www.netlify.com/), so decided to give it a go.

I'm pretty sure I'll be able to add a function down the road, which will help me with some of the integrations I'm looking to build.

## TLDR

I changed my blogging platform to a Netlify + Zola stack, and vibe coded the design 👍
