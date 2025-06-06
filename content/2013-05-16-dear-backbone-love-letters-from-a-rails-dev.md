+++
title = "Dear Backbone. Love letters from a Rails dev."
date = 2013-05-16
[taxonomies]
tags = ["backbone", "javascript", "web development"]
+++

In this blog post I'm going to present a few things. Most of all I'm going to demonstrate how I would implement nice, structured front-end code in an already existing traditional Rails application. I'm going to do this using Backbone but it's probably unlike how you may have seen Backbone used before. Finally I'm also going to present the technique I use to integrate this in with your Rails application. Importantly I think that we should be adopting sensibile application defaults in addition to the defaults that Rails provides us. By adopting our own per-application defaults we can avoid writing lots of code.
<!-- more -->
## On front-end libraries/frameworks

Before I get started I'd like to state that Backbone is a library and not a framework so most comparisons between Backbone and Ember or Angular aren't really relevant. But I would like to demonstrate why I chose Backbone instead of Ember or Angular since it's such a commonly asked question.

I like Backbone because it doesn't make assumptions about how my application is built. Most importantly it doesn't assume that I suddenly have a well-tested JSON API that is suitable for a web interface.

Traditionally with Backbone, Ember or Angular you query the server and get back JSON. Then you load that JSON into a "model" which is used by the framework to render a template in memory which is then inserted into the DOM. There are a few problems here:

1. Assuming I have a good JSON API.
2. Forcing me to either abandon my Rails views and to start writing sections of my app in JST (or similar), or to maintain both.
3. It means my app doesn't work without JavaScript. My issue here is that analytics tools generally don't capture users who don't have JS enabled. It's difficult to get a sense of how large this market but I'd tend to think that it's a small but vocal minority.

## Why I use Rails

Rails is unabashedly an opinionated framework. Many of us Rails developers do what we do because (for the most part) we approve of those opinions. What led me down this path was trying to work in Ember into an existing fairly traditional Rails application. I was in the situation where suddenly I needed to either abandon my existing views or duplicate my HTML across precompiled JavaScript views.

Personally, I want to work with Rails. Rails has been developed over all these years as an amazing DSL for concatenating strings together to form HTML. I don't want JS to take over any of that responsibility. I'm happy to build JSON APIs but I think that much of the time we'll throw together a poorly thought out ad-hoc action that calls `to_json` on some model, particularly if we're retro-fitting some fancy MVC thing into our front-end.

I will be going through a simplistic and largely contrived example of how I've implemented this previously and how this works in both Backbone and Rails. I think that we're often missing a good direction on how to leverage the strengths of both JavaScript and Rails in our applications.

1. Build your applications to work with plain HTML. I think this is good practice.
2. Enhance your views with JavaScript even going so far as to use the History API to make a truly rich application.

Backbone provides my JS some structure, lets me write as little jQuery crap as I possibly can.

## The code

All the code is actually available on Github. Check it out [here](https://github.com/lengarvey/rails-3-2-intro-blog).

So lets get into it. Here's a brief description of the feature I'd like to build:

```
Feature: AJAX commenting
  In order to have a nice commenting experience
  As a troll
  I want to be able to submit comments without a page refresh
```

And here's my Rails ERB view. There's absolutely nothing special here. It's a standard form for submitting a comment.

```erb
<%= form_for [@post, Comment.new] do |f| %>
  <p>
    <%= f.label :body, "New comment" %><br/>
    <%= f.text_area :body %>
  </p>
  <p><%= f.submit "Add comment" %></p>
<% end %>
```

Now here is the Backbone "view" which I can bind to the form above.

```coffeescript
QuickBlog.Views.Comments ||= {}

class QuickBlog.Views.Comments.CreateCommentView extends Backbone.View
  events:
    "submit": "commentSubmitted"

  commentSubmitted: (e) =>
    e.preventDefault()
    @submitForm()

  url: ->
    @$el.attr('action')

  data: ->
    @$el.serialize()

  submitForm: ->
    $.post(@url(), @data(), @commentPosted)

  commentPosted: (data) =>
    @appendComment(data)
    @resetForm()

  resetForm: ->
    @$el.map ->
      @reset()

  appendComment: (comment) ->
    $('#comments').append(comment)
```

In order to bind that view to my form I only need to write: `new QuickBlog.Views.Comments.CreateCommentView({el: $('#new_comment')})`. Right now I do this in my ERB views as inline JavaScript but it would be totally fine to do it in CoffeeScript too.

This view listens and intercepts the submit event, then it posts it off using AJAX. Once that's successfully occured the `commentPosted` callback is executed with the data that is returned from the server.

Traditionally with Backbone we'd return JSON from the server, stick it in a Backbone model then there'd be a change event in the view which would update the DOM by rendering a template. BLAAAHHH so many things.

I'd rather just return a HTML snippet which gets put straight into the DOM. More code on the Backend and simpler JS. I've got two options. I could take the approach of rails-ujs which alters the Accepts HTTP Header to prefer JS. This allows us to write:

```ruby
respond_with(@comment) do |format|
  format.html { redirect_to post }
  format.js { render @comment, :partial => true }
end
```

But I'm bad at JavaScript and don't want to constantly set accept headers so that I get th right format in Rails so instead we end up with this code:

```ruby
if xhr?
  render @comment, :partial => true
else
  redirect_to post
end
```

But that code sucks. How about this instead:

```ruby
respond_with(@comment) do |format|
  format.html { redirect_to post }
end
```

That's better but we need to do a couple of things to set that up.

1. `respond_to :html, :xhr` in the controller.
2. `Mime::Type.register_alias "text/html", :xhr` to setup a new mime type in `config/initializers/mime_types.rb`
3. Then create and use a new responder. It looks like:

```ruby
class XhrResponder < ActionController::Responder
  def xhr?
    @controller.request.xhr?
  end

  # xhr is "rendered" when you request html but do so via AJAX.
  #
  def respond
    if xhr? && format == :html
      method = "to_xhr"
    else
      method = "to_#{format}"
    end
    respond_to?(method) ? send(method) : to_format
  end

  # render the appropriate partial for the resource
  #
  def to_xhr
    controller.default_render(@resource, options.merge(:partial => true))
  end
end
```

and to use it in your controller:

```ruby
  private

  def self.responder
    XhrResponder
  end
```

## Summary

I think this is a really nice way of enhancing existing traditional Rails applications with some front-end magic while at the same time doing as little of that crazy JavaScript stuff as possible.

PS: This blog post was taken from the notes I used to [give this talk](https://speakerdeck.com/lengarvey/dear-backbone-love-letters-from-a-rails-dev) at the Ruby or Rails Oceania (RORO) meetup in Sydney on May 14th 2013.
