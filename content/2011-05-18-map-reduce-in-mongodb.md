+++
author = "Leonard Garvey"
title = "Map Reduce in MongoDB"
date = "2011-05-18"
+++

One area of MongoDB which is difficult for some people (myself included) is the map/reduce functionality.
It can be difficult to wrap your head around how it's meant to work after years and years of
training ourselves to think in relational SQL.
<!-- more -->
There are some really good resources on map/reduce. The first, of course, being the
[official documentation](http://www.mongodb.org/display/DOCS/MapReduce). This gives a reasonable
overview of map/reduce, but I still have a fair bit of trouble working it out.
It wasn't until I grokked the following concepts:

* map is a function which runs over each document that is passed to it.
This might be every document in the collection, or maybe a subset.

![Confusing Map](/images/confusing_map.gif "This map is confusing unless you know the language")

* reduce is a function which takes the output of the map function and combines them together by
the key, normally by mathematically altering the value part of the key, value pair.

The last confusing thing about map/reduce is how do you run it in ruby?! I'll answer that
in the next blog post where I introduce my new gem: [Reduceable](http://github.com/lengarvey/reduceable)
