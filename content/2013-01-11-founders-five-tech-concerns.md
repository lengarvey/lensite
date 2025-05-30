+++
title = "Founders Five Tech Concerns"
date = "2013-01-11"
[taxonomies]
tags = ["technology", "startups", "entrepreneurship"]
+++

Working in [Tank Stream Labs](http://www.tankstreamlabs.com) (a great new co-working space here in Sydney) I come
into contact with plenty of entrepreneurs looking to start their own Next Big
Thing. Sometimes they have plenty of technology experience in the founding team,
but often it's "business" people looking to start a great new
*technology*-based startup. They're eager to learn anything about creating an
online business. So rather than explaining everything to them in person, my
hope is that I can direct them to here and give everyone a nice easy list of
tech things you should have covered in your new startup.

These tips fall into a few key areas but here goes!
<!-- more -->
Owning your stuff
-----------------

1) Your code - A business is worth as much as the assets it possesses. One of
the biggest assets will be the code used to power the product. If you're going
to get a contractor/consultancy to build your product for you make sure you
still own the code. The best way of doing this is to make sure your developers
put it into a [Github](http://github.com) account that you own. It's really cheap and extremely easy
to setup.

*Ask your contractor what version control system they use. Full marks if they
use git. If they don't use version control the chances of your code being lost
increase dramatically. All good developers use some sort of version control.
Also if they don't use version control it's much harder for a different
contractor to fix any issues with your system.*

2) Your online properties - One of the next largest assets will be your domain
and web hosting. While you'll probably be guided by your developer on what the
best option here is, it's vitally important you understand exactly what you're
paying for. It's also important you understand how to move to a different
hosting solution should the need arise. If they say they host with
[AWS](http://aws.amazon.com/), [Heroku](http://heroku.com),
or a reputable hosting company like [Anchor](http://www.anchor.com.au) you're in safe hands.

*If you're able, create all accounts yourself and create secure passwords with a
tool like [1Password](https://agilebits.com/onepassword). You can then easily create accounts for your developers or
share passwords with them if required.*

3) Backup your data (and code). It's imperative you backup your data and your
code. Imagine if your website gets hacked and all the data is wiped. What is
your disaster recovery plan? At minimum get your developer to setup an automated
backup script. It's pretty easy to backup to [Amazon
S3](http://aws.amazon.com/s3/) or [Glacier](http://aws.amazon.com/glacier/). If you store
your code on [Github](http://github.com) it's pretty safe.

Choosing your Developer
-----------------------

4) Testing - How does the developer know the site works if it isn't tested? Ask
any prospective contractor what sort of testing they recommend for your system.
Make sure they have automated tests that get run every time *before* code is
deployed to your website. If they don't do this it's an indicator of bad
quality.

*Ideally your developer will mention the words "Continuous Integration" and
possibly talk about "Continuous Deployment".  If they do it's a great thing, it
means your dev can push to production multiple times a day.*

5) Community - What sort of community does the developer belong to? Believe it
or not, tech people network to. There are plenty of tech meetups in any large
city covering all types of technology from [Ruby on Rails](http://ruby.org.au/),
to [PHP](http://sydphp.org/) and [MongoDB](http://mongodb.meetup.com/).
If your developer is part of that community it's an indicator that they are
passionate about development because they spend their own time pursuing it.

*Both these are positive indicators, although many would consider no testing a
very big negative. It's completely possible to find a fantastic solitary
developer who doesn't attend community events and don't test.*

----

Do you have any other concerns that you think I could answer? Get it contact
with me, either by commenting below or tweeting me
[@lgarvey](https://twitter.com/lgarvey).
