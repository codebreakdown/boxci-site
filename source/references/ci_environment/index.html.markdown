# The Environment

### What This Covers

This reference describes the defaults for the environment as well as the
various ways that the environment can be configured and controlled.

## Overview

BoxCI runs builds in isolated virtual machines which are configured using the
primary Puppet manifiests in `puppet/manifests/main.pp`.

This has the advantage that no state persists across builds, giving you a
clean slate and making sure your tests can run in an environment built from
scratch.

To setup the system for your build, you can modify your Puppet manifests to
initialize the state of your environment or you can use the `sudo` command to
install packages, change configurations, create users, etc.

Builds have access to any services you setup in your Puppet manifests. For
example if you setup your Puppet manifests to install, configure, and start
PostgreSQL then your build would be able to access the PostreSQL service.

## Environment OS

BoxCI virtual machines are generally based on Ubuntu 12.04 LTS. *Note:* There
are configuration options with some providers where you can change this.

## Environment common to all VM images

All VM images have the following pre-installed

### Git, etc

- Git

### Compilers & Build toolchain

- GCC 4.6.x, make, autotools

### Networking tools

- curl, wget, OpenSSL, rsync

## Starter Environments

Beyond the things common to all the VM base images, BoxCI generates a working
starter Puppet configuration based on the information found in the project's
`.boxci.yml`. This is intended to help you get your environment going as quick
as possible.

For example if your `.boxci.yml` looked as follows before you ran `boxci
build`:

```yaml
language: ruby
rbenv:
  - "2.1.0"
# uncomment this line if your project needs to run something other than `rake`:
# script: bundle exec rspec spec
```

It would generate a starter Puppet configuration that would install
[rbenv](http://github.com/sstephenson/rbenv) and Ruby version 2.1.0 via
[rbenv](http://github.com/sstephenson/rbenv).

On the other hand if your `.boxci.yml` looked as follows before you ran `boxci
build`:

```yaml
language: ruby
rbenv:
  - "2.1.0"
  - "1.9.3-p327"
# uncomment this line if your project needs to run something other than `rake`:
# script: bundle exec rspec spec
```

It would generate a starter Puppet configuration that would install
[rbenv](http://github.com/sstephenson/rbenv) and Ruby 2.1.0 and 1.9.3-p327 via
[rbenv](http://github.com/sstephenson/rbenv).

**Note:** `boxci build` is non-destructive by default. This means you can
rerun `boxci build` and if it runs into a conflict between a file it is trying
to generate and an already existing version of that file it will prompt you,
allowing you choose what to do. A few of the options it presents you with are
diff, overwrite, ignore, etc.

This is extremely useful if say, you previously ran `boxci build` with only
Ruby 2.1.0 specified in your `.boxci.yml` and now you want it to be tested
against both Ruby 2.1.0 and 1.9.3-p327.

## Customize Environments

*Environments are what you make of them.* 

The starter environments are simply intended to jump start you in the process
and potentially handle some of the simpler scenarios automatically. For the
rest of the more complicated scenarios the assumption is that you will be
customizing your Puppet manifests to configure your build environment exactly
as you need it. We covered the rough process around this in the [Getting
Started](/guides/getting_started#step-five%3A-iterate-on-the-environment)
guide.

We are contemplating supporting a services configuration concept to aid in
getting various services added to your Puppet manifests via the `boxci build`
process. However, currently you will have to manually add them to the Puppet
manifests.
