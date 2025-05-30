+++
title = "Mongo, Beautiful Persistency"
author = "Leonard Garvey"
date = "2011-03-12"
+++

I've got a long background working with traditional, medium to large scale database backed systems.
I've worked with many different types of databases, PostgreSQL, mysql, Firebird/Interbase, SQL Server (a few different versions).
This means I really get the whole relational database thing.

So because of this it may be a surprise that I really, really hate working with databases.
Well, that's not entirely true, I really hate working with databases on projects where the requirements aren't well defined.
This includes all my own personal projects since I often start with an idea and move straight into the prototyping phase.
Afterwards I end up being frustrated by how annoying it is to change anything in a database (migrations are awful) and usually end up giving up in frustration (and laziness) before I get anywhere.
<!-- more -->
Introducing noSQL
-----------------
NoSQL databases are a group of databases that aren't relational.
They might be graph oriented (like [Neo4J](http://neo4j.org/)), object-based (like [Intersystems Cache](http://www.intersystems.com/cache/) ) or Document based.
I became extremely intrigued by document based database systems because they seemed an excellent direct map to stuff you would display on a web-page.
This blog post, for instance, is one document.
The system metaphor of a document perfectly maps to the blog post you are viewing which means that understanding a document database at a conceptual level is very easy.

I started looking at a couple of Document oriented databases: CouchDB and MongoDB.
This type of database stores everything into documents which are just collections of key/value pairs.
For example here is a very simple document:

```ruby
{  "_id" : ObjectId("4d7a1bd99674334026000001"),
   "title" : "First Post",
   "text" : "Welcome..."
   "date" : "Fri Mar 11 2011 16:00:52 GMT+0000 (UTC)",
   "author" : "Leonard Garvey",
   "author_image_url" : "https://graph.facebook.com/734122989/picture",
   "tags" : [ "welcome", " sinatra", " mongo", " mongomapper" ]
}
```
This is straight out of this blog's database for the [previous (and first)](/2011/03/11/the-first-post/) post.

The awesome thing about a document is that it maps right into an object in code, and that when you want to add a new field you just add it. You don't need data migrations or to do any server maintenance. A collection of my Articles over time will have different keys. For example I will probably add a key for defining what status the Article is ("pending", "published", "removed", "draft") etc. This is fantastic for development since it means you can get core functionality into the system without worrying about getting every feature in there.

Eventually I've chosen to go with MongoDB because it offers a much better querying language than CouchDB. Plus the geospatial indexing and sharding look amazing for any apps that need to do map based queries or need to handle heavy loads. CouchDB does offer a fantastic restful interface and is definitely worth checking out too.

So, why is this article titled: "Beautiful Persistency"?

Introducing MongoMapper
-----------------------
[MongoMapper](http://mongomapper.com) is a Object to Document Mapper for Ruby. It's crazy easy to use:

1. Declare your Model:

```ruby
class Article
  include MongoMapper::Document

  key :title, String
  key :text, String
  key :date, Time
  key :author, String # id of user
  key :author_image_url, String
  key :tags, Array
end
```

2. Use your model

```ruby
  @article = Article.new
  @article.title = params[:title]
  @article.text = params[:text]
  @article.date = Time.now
  @article.author = @logged_in.name
  @article.author_image_url = @logged_in.image
  @article.tags = params[:tags].split(',')
  @article.save
```

3. Drink beer! Because that's it!

This is beautiful persistency. It's persistency you barely even have to think about because it just works. It's clean and lovely and nice and I'll be writing about it a lot more often.
