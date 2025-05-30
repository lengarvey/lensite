+++
title = "Bundler and Gemfile"
date = "2013-01-10"
+++

With the very [recent and extremely serious Rails security vulnerability](https://groups.google.com/d/topic/rubyonrails-security/t1WFuuQyavI/discussion)
there have been more than a few people around asking how they update their Rails apps in order to be safe. Luckily Rails makes
the update process relatively easy for any simple apps. If you have a large app with a large team, you probably
shouldn't be getting basic advice from a blog on the internet anyway!
<!-- more -->
How to Update
-------------

I'll be assuming you're running Rails `3.2.x`.

1. Open your Gemfile
2. Make sure there's a line like: ```gem 'rails', '~> 3.2.0'``` in there.
3. Run: ```bundle update rails```
4. Run your test suite (you do have a test suite... right?!)
5. Deploy your code.

It's really that easy!

What is happening here
----------------------

Understanding those steps is probably just as important as actually performing them. So I'm going to break it down
for anyone reading this.

The ```Gemfile``` and ```Gemfile.lock``` are used by [bundler](http://gembundler.com/) to manage your application dependencies.
You declare your application dependencies in your ```Gemfile``` and then you run ```bundle install``` to
create the ```Gemfile.lock``` file. When your Rails application starts it reads the ```Gemfile.lock``` file so it can
figure out which gems to require. This work is done in your ```config/boot.rb``` file. You'll see something like:

```ruby
require 'rubygems'
gemfile = File.expand_path('../../../../Gemfile', __FILE__)

if File.exist?(gemfile)
  ENV['BUNDLE_GEMFILE'] = gemfile
  require 'bundler'
  Bundler.setup
end

$:.unshift File.expand_path('../../../../lib', __FILE__)
```
Source: https://github.com/rails/rails/blob/3-2-stable/railties/lib/rails/generators/rails/plugin_new/templates/rails/boot.rb

The ```Bundler.setup``` message requires the gems in your ```Gemfile```.

What is the Gemfile.lock then?
------------------------------

The ```Gemfile.lock``` file is created by bundler (normally when you run ```bundle install```. This file contains
a snapshot of all the gems (and their dependencies) used by your application. This means that if you share your application
with someone else, when they run `bundle install` bundler will skip the dependency calculation process and simply
install the Gems specified in the `Gemfile.lock`. *You should always commit both the `Gemfile` and `Gemfile.lock` to your
source control system (you should be using git).

The bundler website has some great information on this and other topics. I'd recommend starting with: http://gembundler.com/rationale.html
