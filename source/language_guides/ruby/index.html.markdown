# Building a Ruby Project

### What This Guide Covers

This guide covers build environment and configuration topics specific to Ruby
projects. Please make sure to read our [Getting
Started](/guides/getting_started) and general [Build
Configuration](/references/build_configuration) guides first.

## Choosing Ruby versions to test against

The starter Ruby environment on BoxCI use
[rbenv](http://github.com/sstephenson/rbenv) to provide many Ruby
implementations and versions your project can be tested against.

To specify them, use `rbenv:` key in your `.boxci.yml` file, for example:

```yaml
language: ruby
rbenv:
  - "2.1.0"
  - "1.9.3-p327"
  - "1.9.3"
  - "1.8.7"
# uncomment this line if your project needs to run something other than `rake`:
# script: bundle exec rspec spec
```

### Supported Ruby versions

At the time of writing the [rbenv](http://github.com/sstephenson/rbenv)
supported the following Ruby versions. Any of the following can be specified
as Ruby versions under the `rbenv:` key as seen in the above example.

- 1.8.6-p383
- 1.8.6-p420
- 1.8.7-p249
- 1.8.7-p302
- 1.8.7-p334
- 1.8.7-p352
- 1.8.7-p357
- 1.8.7-p358
- 1.8.7-p370
- 1.8.7-p371
- 1.8.7-p374
- 1.8.7-p375
- 1.9.1-p378
- 1.9.1-p430
- 1.9.2-p0
- 1.9.2-p180
- 1.9.2-p290
- 1.9.2-p318
- 1.9.2-p320
- 1.9.2-p326
- 1.9.3-dev
- 1.9.3-p0
- 1.9.3-p125
- 1.9.3-p194
- 1.9.3-p286
- 1.9.3-p327
- 1.9.3-p362
- 1.9.3-p374
- 1.9.3-p385
- 1.9.3-p392
- 1.9.3-p429
- 1.9.3-p448
- 1.9.3-p484
- 1.9.3-p545
- 1.9.3-preview1
- 1.9.3-rc1
- 2.0.0-dev
- 2.0.0-p0
- 2.0.0-p195
- 2.0.0-p247
- 2.0.0-p353
- 2.0.0-p451
- 2.0.0-preview1
- 2.0.0-preview2
- 2.0.0-rc1
- 2.0.0-rc2
- 2.1.0
- 2.1.0-dev
- 2.1.0-preview1
- 2.1.0-preview2
- 2.1.0-rc1
- 2.1.1
- 2.2.0-dev
- jruby-1.5.6
- jruby-1.6.3
- jruby-1.6.4
- jruby-1.6.5
- jruby-1.6.5.1
- jruby-1.6.6
- jruby-1.6.7
- jruby-1.6.7.2
- jruby-1.6.8
- jruby-1.7.0
- jruby-1.7.0-preview1
- jruby-1.7.0-preview2
- jruby-1.7.0-rc1
- jruby-1.7.0-rc2
- jruby-1.7.1
- jruby-1.7.10
- jruby-1.7.11
- jruby-1.7.2
- jruby-1.7.3
- jruby-1.7.4
- jruby-1.7.5
- jruby-1.7.6
- jruby-1.7.7
- jruby-1.7.8
- jruby-1.7.9
- jruby-9000+graal-dev
- jruby-9000-dev
- maglev-1.0.0
- maglev-1.1.0-dev
- maglev-2.0.0-dev
- mruby-1.0.0
- mruby-dev
- rbx-1.2.4
- rbx-2.0.0
- rbx-2.0.0-dev
- rbx-2.0.0-rc1
- rbx-2.1.0
- rbx-2.1.1
- rbx-2.2.0
- rbx-2.2.1
- rbx-2.2.2
- rbx-2.2.3
- rbx-2.2.4
- rbx-2.2.5
- ree-1.8.6-2009.06
- ree-1.8.7-2009.09
- ree-1.8.7-2009.10
- ree-1.8.7-2010.01
- ree-1.8.7-2010.02
- ree-1.8.7-2011.03
- ree-1.8.7-2011.12
- ree-1.8.7-2012.01
- ree-1.8.7-2012.02
- topaz-dev

## Default Test Script

BoxCI runs `rake` by default to execute your tests. Please note that **you
need to add rake to your Gemfile** (adding it to the `:test` group should be
sufficient).

## Dependency Management

### BoxCI uses Bundler

BoxCI uses [Bundler](http://bundler.io) to install your project's
dependencies.
