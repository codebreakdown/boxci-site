# Configuring your build

### What This Guide Covers

This guide covers build environment and configuration topics common to all
projects managed with BoxCI, regardless of the technology. We recommend you
start with the [Getting Started](/doc/getting_started.html) guide and read
this guide completely before moving on to any of the more targeted guides.

## .boxci.yml file: what it is and how it works

BoxCI uses `.boxci.yml` file in the root of your repository to learn about
your project and how you want your builds to be executed. Your `.boxci.yml`
can be extremely minimalistic or have a lot of customization in it. A few
examples of the types of information your `.boxci.yml` file may contain:

- What programming language your project uses
- What commands or scripts you want to be executed before each build, maybe to
  install your projects dependencies
- What commands are used to run your test suites and produce any artifacts

and a ton more.

At a minimum, BoxCI needs to know what language and therefore builder to use
for your project: ruby, java, or something else. For everything else there are
reasonable defaults.

## Build Lifecycle

By default the worker performs the build as follows:

1. Prepare project archive, spin up virtual machine, and deliver project
   archive
2. Extract project archive and `cd` to project root
3. Run `before_install` commands
  - Use this to prepare the system to install prerequisites or dependencies
  - e.g. `sudo apt-get update`
4. Run `install` commands
  - Use this to install any prerequisites or dependencies necessary to run
  your build
5. Run `before_script` commands
  - Use this to prepare your build for testing
  - e.g. copy database configurations, environment variables, etc.
6. Run `script` commands
  - Default is specific to the project language
  - All commands must exit with code 0 on success. Anything else is considered
  failure.
7. Run `after_success` or `after_failure` commands
8. Run `after_script` commands

The `before_install`, `install`, and `before_script` commands **will**
short-circuit the build if they **exit with a non-zero value**.

The `script` commands will **not** short-circuit the build process if they
fail. The reason for this is that when you are running your entire test suite
and one of your high level acceptance tests fails, it can be extremely
valuable to also see any of your isolated tests that fail as it is likely they
are related.

The `after_success`, `after_failure`, and `after_script` commands will **not**
short-circuit the build process if they fail.

The outcome of any of these commands (except `after_success`, `after_failure`,
or `after_script`) indicates whether or not this build has failed or passed.
The standard Unix **exit code of "0" means the build passed; everything else
is treated as failure.**

Test result is exposed to `BOXCI_TEST_RESULT`, which you can use in
`after_script` commands.

With the exception of steps 1 & 2 from the above build cycle, and a few
language based build steps, all of the above steps can be tweaked with
`.boxci.yml`.

### BoxCI Preserves No State Between Builds

BoxCI spins up a fresh virtual machine each build to make sure no state is
shared across builds. If you modify your CI environment during a build by
adding files, installing things, etc. Those changes will not persist on the
next build.

## Define custom build lifecycle commands

### Overview

BoxCI runs all commands over SSH in isolated virtual machines.

### script

You can specify the main build command to run instead of the default

```yaml
script: "./run-tests.sh"
```

The script can be an executable; it doesn't have to be `make`. The only
requirement for the script is that it **should use an exit code 0 on success,
anything else is considered build failure**. It should also either output any
important information to the console so that results can be viewed (in real
time!).

This setting supports multiple lines as follows:

```yaml
script:
  - bundle exec rspec spec
  - bundle exec cucumber
```

### before\_script, after\_script

You can also define scripts to be run before and after the main script:

```yaml
before_script: some_command
after_script: some_other_command
```

Similar to `script` both these settings support multiple lines as follows:

```yaml
before_script:
  - before_command
  - another_before_command
after_script:
  - after_command
  - another_after_command
```

These settings can be extremely useful for doing things like setting up a
database for the test suite, etc.

### install

If your project uses non-standard dependency management tools or you have some
other special situation you can add additional dependency installation
commands using the `install` option:

```yaml
install: ant install-deps
```

As with other scripts, `install` command can be anything but has to exit 0
status in order to be considered successful. Also note, it supports multiple
lines as follows:

```yaml
install:
  - ant install-deps
  - some other dependency install
```

### before\_install

You can also define scripts to be run before the dependency installation
(`install`):

```yaml
before_install:
  - before_command
  - another_before_command
```

`before_install` could be used to update git repository submodules, update
package system caches, etc.

## Choose runtime versions

One of the key features of BoxCI is the ease of running your test suite
against multiple runtimes and versions. Since there is no way for BoxCI to
magically know what runtimes and versions to test against, you must specify
them in your `.boxci.yml` file. The options used for this varies depending on
languages.

This feature is extremely valuable when you are testing libraries, command
line tools, or anything that would potentially be running in/against a number
of different environments.

Here are some examples for various languages:

### Ruby

Currently BoxCI supports Ruby versions using
[rbenv](https://github.com/sstephenson/rbenv). To test against multiple Ruby
versions you would do the following:

```yaml
rbenv:
  - 2.1.1
  - 2.1.0
  - 1.9.3-p327
```
