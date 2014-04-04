# boxci-site

This repository houses the news and documentation site for
[BoxCI (boxci.io)](http://boxci.io).

## Contributing

1. Fork it (
   [http://github.com/reachlocal/boxci-site/fork](http://github.com/reachlocal/boxci-site/fork)
   )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## How to edit the site

This site is static site built using [middleman](http://middlemanapp.com/).
Below I provide a quick guide to the basics of contributing to this site using
[middleman](http://middlemanapp.com/). However, if you are trying to do
something that requires more knowledge please refer to the
[middleman site](http://middlemanapp.com/).

This project depends on Ruby and manages dependencies using
[bundler](http://bundler.io/). Therefore, you need to have Ruby and
[bundler](http://bundler.io/) installed and the projects dependencies
installed.

Once you have done that you should be good to go to startup
[middleman](http://middlemanapp.com/) using the following:

```shell
bundle exec middleman
```

Once you have middleman up and running you should be able to see the site in
your browser at [http://localhost:4567](http://localhost:4567).

Given you can load the site in your browser via
[http://localhost:4567](http://localhost:4567) you should be able to make
edits to the various files, or add new files and simply refresh your browser
to see the changes.

Once you have finished making your changes and verifying them in your feature
branch, go ahead and commit the changes, push the branch up, and make a pull
request.

If you want some info on the general structure of the repository please look
at the section below.

### Basic Structure

The repository is broken up into a few components outlined below.

The first group of items are layouts and partials which are used to help keep
the site "dry".

- `source/layouts` - non-standard layouts, default layout is
  `source/layout.erb`
- `source/partials` - any partials extracted to eliminate duplication

The second group of items are the various types of actual documentation
content that the site houses.

- `source/posts` - all the blog posts
- `source/docs` - root for all the documentation content
- `source/docs/guides` - all the guides
- `source/docs/references` - all the references
- `source/docs/developer_guides` - all the developer guides
- `source/docs/language_guides` - all the language specific guides

The third and final group of items are all the associated assets.

- `source/images` - all the image assets
- `source/javascripts` - all the javascript assets
- `source/stylesheets` - all the stylesheet assets

## License

All the documentation and code contained within this repository is licensed
under the MIT license.
