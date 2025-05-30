+++
title = "GridFS with Sinatra"
author = "Leonard Garvey"
date = "2011-03-13"
+++

One of the biggest problems that everyone creating a database-backed web application is where to store uploaded files.
Most people settle on having files stored in the filesystem with a table of paths pointing to where the files are stored.
But I bet everyone who has had to code up something like that has wished there was a good way to store files in their database along with all their other data.
<!-- more -->
Well, with MongoDB there is! It's called GridFS and it allows files of virtually any size to be stored inside the database.
Using ruby it's really easy to save files:

```ruby
# Saving string data
id = @grid.put("here's some string / binary data")

# Saving IO data and including the optional filename
image = File.open("me.jpg")
id2   = @grid.put(image, :filename => "me.jpg")
```

And super easy to access files:

```ruby
# Get the string we saved
file = @grid.get(id)

# Get the file we saved
image = @grid.get(id2)
```

Using MongoMapper
-----------------
John Nunemaker (the author of MongoMapper) has written a small library called Joint which makes it really easy to store and access files.

```ruby
class Asset
  include MongoMapper::Document
  plugin Joint # add the plugin

  attachment :file
end
```

Which we can easily integrate with Sinatra/Rack:

```ruby
# upload an asset
post '/upload' do
  asset = Asset.create(:file => params[:file][:tempfile])
  # this changes the name so that when downloading the 'proper' name is preserved
  asset.file_name = params[:file][:filename]
  asset.save
  partial :asset, :locals => {:asset => asset}
end
# access an asset
get '/assets/:id' do |id|
  asset = Asset.where(:id => id).first()
  file = asset.file

  [200, {'Content-Type' => file.content_type}, [file.read]]
end
```

Then you can simply create your partial view to return json or html to be included either in a view or accessed via ajax.
