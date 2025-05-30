+++
author = "Leonard Garvey"
title = "Reduceable"
date = "2011-05-18"
+++

In the last post I went through some stuff/problems with map/reduce. As a summary and to introduce a couple of other specific issues:

1. It's hard to understand.
2. It's not obvious how to do mapreduce in ruby.
3. It sucks writing javascript in your ruby app.
4. [Blogs](http://www.chrisumbel.com/article/map_reduce_mongodb_mongomapper_rails) on the internet
seem to recommend that you recalculate the map/reduce every time you need to access the data.

So I've written a gem called [Reduceable](http://github.com/lengarvey/reduceable) for mongomapper (although hopefully mongoid support is coming soon)
which should address all of the above problems.
<!-- more -->
You can find the full source for this gem at: http://github.com/lengarvey/reduceable

Here is a taste of how it works:

```ruby
require 'mongo_mapper'
require 'reduceable'

MongoMapper.database = 'my_database_name'

class BlogPost
  include MongoMapper::Document
  include Reduceable

  key :article_body, String
  key :categories, Array
  key :time_posted, Time
  key :article_length, Integer
end

# Insert some data

BlogPost.count_by(:categories).to_a.each do |x|
  puts "You have posted #{x['value']} posts from catefory #{x['_id']}"
end
BlogPost.sum_of(:article_length, :categories).to_a.each do |x|
  puts "You have written #{x['value']} characters in category #{x['_id']}"
end
```

This is a fairly contrived example, but it gives you a good idea of the direction this should be heading in.
I'm trying to abstract away the complexity of writing common map/reduce functions.
This addresses points 1, 2 and 3 above. The 4th point is handled by an ActiveRecord callback 'after\_save'
which is inserted into the BlogPost model which will invalidate the cached records and cause the count\_by
and sum\_of functions to force a recalculation of the map/reduce results.

It's definitely not perfect, but I'm hopeful I can make this into something useful.
