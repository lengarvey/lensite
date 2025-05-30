+++
title = "Yosemite Ruby Dev Setup"
date = "2014-10-18"
[taxonomies]
tags = ["ruby", "dev", "setup"]
+++

On Friday the 17th of October, Apple released OSX Yosemite. Being a bit of an Apple fanboy I immediately
set about upgrading my main system (which happens to be a Hackintosh). This is a post mostly to remind
myself about how I went about it and some of the potentially interesting things I do with my setup.

![not yosemite](/kicking-horse.jpeg)
_Not Yosemite - It's Kicking Horse!_

<!-- more -->

1. ZSH
------

With Yosemite I dumped [oh-my-zsh]. I did this because I found it a little too slow with some preferences
that I didn't appreciate. I replaced it with the standard zsh and [Antigen] which is a vundle-inspired
plugin manager for zsh. You can see my setup for it in [my dotfiles].

[oh-my-zsh]: https://github.com/robbyrussell/oh-my-zsh
[Antigen]: https://github.com/zsh-users/antigen
[my dotfiles]: https://github.com/lengarvey/mydotfiles/blob/master/zshrc

2. Dotfiles
-----------

I decided to actually clean up my dotfiles and put them all into a [single repository]. Eventually I hope
to have a simple setup script, but right now you can simply clone the repo then do a few symlinks for
`gitignore`, `direnvrc`, `tmux.conf`, `vimrc`, and `zshrc`.

[single repository]: https://github.com/lengarvey/mydotfiles/blob/master/zshrc

![still not yosemite](http://i.imgur.com/t3Pk5X1.jpg)
_Nope, that's Yellowstone_

3. Global Gitignore
-------------------

I added a global `.gitignore` file to my dotfiles which can be setup with the following `.gitconfig` section

```
[core]
	excludesfile = ~/.gitignore
```

This means that I'll never accidentally commit `.DS_Store`!

4. chruby and ruby-install and direnv
-------------------------------------

I've [written previously] about [chruby] but I no longer use any type of gemset or auto-switching functionality
in chruby. Instead I use [direnv] which is a tool to setup .envrc files for specific folders. These can be used
to set environment variables for each folder or, as in my case, switch to the proper ruby.

One trick I use for this is the following snippet of code:

```sh
# use ruby [version]
use_ruby() {
  local ver=$1
  if [[ -z $ver ]] && [[ -f .ruby-version ]]; then
    ver=$(cat .ruby-version)
  fi
  if [[ -z $ver ]]; then
    echo Unknown ruby version
    exit 1
  fi
  chruby $ver
}
```

I put this into my `.direnvrc` file (inside home) and then if I want a particular `.ruby-version` I create a
project specific `.envrc` file like this:

```sh
use ruby $(cat .ruby-version)
export PATH=$PWD/bin:$PATH
```

This file causes direnv to read the `.ruby-version` file and run `chruby $ruby-version` setting up ruby correctly.
It also adds the `.bin` folder to the front of the `PATH` which means that I don't need to run `bundle exec` for
Rails applications since I'm just using the binstubs.

To assist me in creating this `.envrc` file everywhere I need it I created a really simple Antigen plugin: [chruby-direnv]

[chruby]: https://github.com/postmodern/chruby
[written previously]: http://bottledup.net/2013/10/25/switching-to-chruby/
[direnv]: http://direnv.net
[chruby-direnv]: https://github.com/lengarvey/chruby-direnv

![yosemite](http://upload.wikimedia.org/wikipedia/commons/0/06/Yosemite_USA.JPG)
_Okay, this is Yosemite_

5. Homebrew Cask
----------------

[Cask] is a cool extention to homebrew which means you can install lots of regular apps right from the command line.
Stuff like Skype, Dropbox, Chrome, Rdio and thousands of others are available simply by typing:

```sh
brew cask install <program>
```

[Cask]: http://caskroom.io

![yosemite](https://dl.dropbox.com/s/a1xztobbig58ez1/Screenshot%202014-10-18%2020.47.32.png)
_And so is this_
