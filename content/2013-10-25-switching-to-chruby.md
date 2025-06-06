+++
title = "Switching to chruby"
date = 2013-10-25
[taxonomies]
tags = ["chruby", "ruby", "shell scripting"]
+++

## About chruby

[chruby](http://github.com/postmodern/chruby) is a set of very minimal shell scripts which change the current ruby. It replaces rbenv, rvm and has some advantages over both:

1. It doesn't do anything with cd
2. No shims (no more `rbenv rehash`)
3. Totally minimalist. It's [97 lines of shell script.](https://github.com/postmodern/chruby/blob/master/share/chruby/chruby.sh)
<!-- more -->
## Switching from rbenv

Switching from rbenv was easy. I just did:

    brew install chruby
    brew install ruby-install

I could have kept using my current rubies, but I wanted a completely clean start so switched to ruby-install too.

Replaced rbenv specific config in my `~/.zshenv` with:

    source /usr/local/share/chruby/chruby.sh
    source /usr/local/share/chruby/auto.sh

The second line is important. It enables support for `.ruby-version` file automatic switching.

## Enabling gemsets

There was still one feature I was missing. Since I'm a consultant and have many different projects in my development environment I like to use gemsets to keep things nice and isolated. I could use [chgems](https://github.com/postmodern/chgems) but I didn't like how I was forced to remember to switch in and out of the "gem chroot" every time I was changing in and out of projects.

So with some inspiration from the `auto.sh` script I created: [chruby_gemsets](https://github.com/lengarvey/chruby_gemsets). It's a simple script which changes your `GEM_HOME`, `GEM_PATH` and `PATH` variables if there is a `.gemset` file present.
