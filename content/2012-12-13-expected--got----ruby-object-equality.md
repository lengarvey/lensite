+++
title = 'Expected: [] Got: [] - Ruby Object Equality'
date = '2012-12-13'
+++

Recently while working on [Airtasker](https://www.airtasker.com)
we got the following error from our (pretty extensive) Rspec test suite:
<!-- more -->
```ruby
Failures:

  1) UsersController#show with user actions gets user actions
     Failure/Error: assigns(:actions).should == actions
       expected: []
            got: [] (using ==)
     # ./spec/controllers/users_controller_spec.rb:51:in `block (4 levels) in <top (required)>'

Finished in 4.46 seconds
11 examples, 1 failure
```

The fix ended up being fairly simple, simply reverse the output which causes the test to pass.
This led to one of my collegues commenting that:

> One of the empty arrays was backwards.

### Not sure if Serious
![Not Sure if serious](http://t.qkme.me/3ooht0.jpg)

I'm fairly certain he was joking, but I wanted to know exactly what was happening.
I was able to replicate the issue in the rails console just by manually executing the test
(which is a fantastic way of understanding code)

```ruby
irb(main):018:0> a
=> []
irb(main):019:0> b
=> []
irb(main):020:0> a == b
=> false
```

It turns out that the the `a` and `b` are [`ActiveRecord::Relation`](https://github.com/rails/rails/blob/4657dba60eebc0d7cea11ffd18aa70d7a3d00e45/activerecord/lib/active_record/relation.rb)
From there it was pretty easy to figure out what was happening, the `Relation` class implements the equality
method `==` which Rspec was using. Because both objects are `Relations` it compares their sql rather than the result.
When reversing the Relation it executes the sql and compares them as an array.

### Lessons Learned
There are a few cool lessons here:

1. Ruby isn't magic, source code is pretty easy to read.
2. Try using irb or a debugger to figure out more about your particular issue.
3. In your custom objects implement the equality method, or even better include comparable and implement `<=>`
which will give you all of the comparison methods for free!
