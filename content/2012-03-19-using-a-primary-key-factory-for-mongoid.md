+++
title = "Using a Primary Key Factory for Mongoid"
date = "2012-03-19"
+++

I'm developing a joke application for a bit of fun and to fill out my
github with some more public code. So I'm creating
[Blitter](https://github.com/lengarvey/blitter) which lets me do some
playing and development with mongodb and rails using mongoid.
<!-- more -->
One of the things I wanted to support was querying of User objects by
the name of the user rather than the ```_id```. Obviously I could have
just altered the show action in ```users_controller.rb``` to query by
name:

```ruby
@user = User.find(params[:name])
```

The problem with this is it breaks the standard rails url helpers. You
get the following error: ```Mongoid::Errors::InvalidFind in
UsersController#show```. So instead what we can do is use the name of
each user as the primary key of the class!

[The mongodb ruby driver](https://github.com/mongodb/mongo-ruby-driver)
says:

> A primary key factory is a class you supply to a DB object that knows
> how to generate _id values. If you want to control _id values or even
> their types, using a PK factory lets you do so.

The problem with [Mongoid](http://mongoid.org/) is that there isn't an
easy way to use a primary key factory. No problems!

Create config/initializers/mongoid.rb and paste the following:

```ruby
class PKFactory
  def create_pk(row)
    puts "creating #{row.inspect}"
    row['_id'] = row['name']
    row
  end
end

Mongoid.configure do |config|
  puts config.inspect
  config.master = Mongo::Connection.new.db(Mongoid.database.name, :pk => PKFactory.new)
end
```
Afterwards just change your user model:

```ruby
field _id, :type => String
```

See https://gist.github.com/2072345 or the commit in blitter:
https://github.com/lengarvey/blitter/commit/4cc76b7ede518c8d112e66a49e18ad1090081af7

Super easy!
