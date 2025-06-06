+++
title = "Deleting you Softly"
date = "2012-12-11"
+++

A tale of woe
-------------

You're building a great new app and the product manager/business person says:

> Hey we're going to need to be able to delete things, and then restore things that get deleted

You say:

> Sure no problem, I'll just include this gem that lets me soft delete and make a few code changes to my models

You've already made a huge mistake, the damage is done just take your hands off the keyboard.
<!-- more -->
What's the issue?
-----------------
The problem is that your database (and therefore ActiveRecord) is the
source of all truth within your application. You've just made that truth inconsistent and more
difficult to define, truth becomes truthish and much pain ensues.

I could leave this blog post there, but I think some justification is in order. First I need
to explain what I mean by "soft delete" and explain roughly how that's implemented. Hopefully
you'll soon agree with me that it's generally a bad idea.

Soft Delete
-----------
Soft delete is a process where instead of deleting records in your database you simply flag
them as deleted. In Rails this might mean you use [permanent_records](http://github.com/JackDanger/permanent_records)
which lets you use a `deleted_at` timestamp field in your models to mark the record as "deleted".
Also you'll end up defining a default scope which filters out all those "deleted" records:

```ruby
default_scope where(:deleted_at => nil)
```

What [permanent_records](http://github.com/JackDanger/permanent_records) does is overrides the standard
`destroy` and `destroy_all` methods and instead just marks this records with the time they were
"deleted". It's smart enough to follow dependencies such as `has_many` and so on.

The Problem Revealed
--------------------
There are a few issues:

1. If you destroy an object that isn't soft deleted, but has dependant objects that are
soft-deletable then the parent object is actually deleted, while the child objects are only soft
deleted. You can't revive them or work with this like normal objects in this case.

2. Admin panels where you can view soft deleted objects by using `unscoped` become problematic,
  business people begin to abuse the deletion functionality.

3. If you're viewing a "deleted" record (for example in the Admin panel) none of the
associations will work because they'll revert to using the `default_scope` of the association.

Ultimately the problem is that you're not letting your database manage truth. The database itself
is fantastic at enforcing Foreign Key constraints and it's something that I think Rails
developers aren't particularly good at.

Partial Solutions
-----------------
* Make sure you are extremely disciplined about setting up your `dependant_destroy` declarations
in your models. This is a remarkably easy trap to fall into, and takes constant developer awareness
in order to avoid. A different strategy is to use `after_destroy` (or `before_destroy`) callbacks to flag dependant
records as deleted.

```ruby
after_destroy :clean_up_your_mess
```

* Train your business and administration staff to not think that deleting and restoring is a
good tactic to try. This isn't a computer to be turned off then turned back on again in a futile
effort to fix the issue. Because of caching bugs it can be easy to get into the situation where
non-technical staff think that the record needs to be deleted and restored before it works properly (don't laugh).
And because of `timestamps` on many models this deletion and restoration will actually cause
a cache miss if you're using fragment caching like you should be!

* There is soem horribly awful code you can put into your Rails application which will fix
the scoped -> unscoped association issue.

```ruby
class ActiveRecord::Associations::Association
  def scoped
    if owner.is_permanent? && owner.deleted_at?
      association_scope
    else
      target_scope.merge(association_scope)
    end
  end
end
```

Note: this code will need to be changed in Rails 4 where scoped has been deprecated in favour of scope.

Complete Solution
-----------------
**Don't use soft delete**

More helpfully, don't use soft delete and propose an alternative solution when this requirement comes up.
It's a common requirement to never actually "delete" anything from the database, so argue in favour of never
deleting something. It's better for your business if you keep all that valuable data.

If you do need to delete something, simply serialize it to json and keep a record of it. I've thought of
creating a `deleted_things` table where I can throw all the things that get deleted. This way it's not
impossible to revive an object, but it is sufficiently difficult that you won't want to do it regularly.
