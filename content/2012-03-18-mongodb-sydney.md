+++
title = "MongoDB Sydney"
date = "2012-03-18"
+++

Yesterday I attended 10gen's [first Australian MongoDB
conference](http://www.10gen.com/events/mongodb-sydney). While most of
the sessions were relatively basic it left me burning to continue
working on some MongoDB projects I've been working with lately.
The most informative session of the day was on sharding. I don't expect
to have cause to use sharding in production any time soon but I have a
better understanding of how the sharding key works to balance data
across the cluster. Certain assumptions I had previously had were
completely wrong so it's great to get those cleared up.
<!-- more -->
The biggest project I've had is experimentation with the [aggregation
framework](http://blog.mongodb.org/post/16015854270/operations-in-the-new-aggregation-framework) which is available in MongoDB 2.1 (2.2 for stable).

Installing MongoDB 2.1 on OSX
-----------------------------
If you aren't using [homebrew](https://github.com/mxcl/homebrew) you should be.
To install the current version of MongoDB it's as simple as

```sh
brew install mongodb
```

but if you want to experiment with the Aggregation Framework which won't
be stable until 2.2 you can install 2.1 with the following instructions:

1. Update the mongodb recipe with the following gist
   https://gist.github.com/2006403 :

```ruby
brew edit mongodb
```

2. Install mongodb 2.1!

```ruby
brew install mongodb
```

Still Running with MapReduce
----------------------------
Even after playing with the Agg framework I've still found that my
needs require map reduce. I'd love to use the Agg Framework since it's
meant to be more performant, it's written in C++ so doesn't block single
Javascript server thread, but I just can't figure out how!

Unfortunately I can't really share the concept since it's fairly work
related.

MapReducing
-----------
Reading on stackoverflow and the mongodb-user google group definitely
reveals that many people have issues with map reduce. I think it's
pretty simple:

1. You loop over all the documents (map)
2. You emit some stuff from those documents (emit)
3. You combine all the stuff you emit down using some function (reduce)

The most common reduce is to just add things together. One little trick
I noticed (and should have realised before) was that MongoDB provides an
Array.prototype.sum function. So in the MongoDB shell the following code
works:

```javascript
Array.sum([1,2,3,4,5])
// => returns 1+2+3+4+5 = 15!
```
