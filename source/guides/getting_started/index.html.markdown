# Getting started

## BoxCI Overview

BoxCI is a command line tool that aims to ease the process of standardizing
virtual development & continuous integration environments and the workflows
that surround them. It can be thought of as having the following components:

- **Configuration Management** - provides a structure/framework around
  defining and managing the configuration of its development & continuous
  integration environments. It uses [Puppet](http://puppetlabs.com/), a well
  known configuration management tool to aid in this task.
- **Virtual Machine Management** - defines an interface for managing your
  BoxCI development and continuous integration nodes in the cloud. It uses
  [Vagrant](http://vagrantup.com), a well know virtual machine management
  tool, behind the scenes to handle most of this functionality.
- **Continous Integration Build Support** - includes a framework for defining
  the continuous integration build process that should be used when you want
  to run your test suite in a cloud node. This can be extremely useful if you
  want to offload the work of a build onto a cloud node instead of your local
  dev laptop, or if your organization has an internal cloud and restrictions
  on exposing code to public services.

BoxCI allows you to completely customize & standardize your development &
continuos integration environment. This is extremely useful for bootstrapping
new developers to a project because they don't have to worry about getting all
the external dependencies and initial setup working on their machine. Instead
they can just use BoxCI to spin up the development environment & to run the
projects automated test suite in the cloud.

You can easily get going with BoxCI by following the steps below.

## Step One: Installation

The first step is to install BoxCI so that you can use it. This can easily be
done with the following:

```shell
# Vagrant & VirtualBox must also be installed for BoxCI to function properly.
gem install boxci
```

## Step Two: Initialize Project

The second step to getting setup with BoxCI is to initialize your chosen
project as a BoxCI project. An example of initializing a Ruby project can be
seen below.

```shell
# in the root of the project
boxci init ruby
```

The above command will initialize the project as a BoxCI project for the
specified supported language by creating a starter `.boxci.yml` file at the
root of the project. It will also generate default user configs in `~/.boxci`
for the user running it.

Further details on `boxci init` can be found in the [Command Line
Interface](/references/command_line_interface#boxci-init) Reference.

## Step Three: Inspect & Update `.boxci.yml`

The above command will have generated a `.boxci.yml` in the root of the
project with content roughly as follows: 

```yaml
language: ruby
rbenv:
  - "2.1.0"
# uncomment this line if your project needs to run something other than `rake`:
# script: bundle exec rspec spec
```

The `.boxci.yml` is the project configuration file. It defines aspects of the
[Build Configuration](/references/build_configuration) and the [The CI
Environment](/references/ci_environment) and should be managed by your
source control mechanism.

If we look at the default we can see it specifies the `language: ruby` based
on the supported language we specified in `boxci init ruby` and that it
specifies a list of ruby versions to test against.

```yaml
rbenv:
  - "2.1.0"
```

Beyond that there is a comment that assumes your project has a `Rakefile`
with a default rake task that will run your automated test suite. If you don't,
and want to customize it, you can do so by doing as the comment says and
uncommenting and modifying the `# script: bundle exec rspec spec` line.

Once edited your `.boxci.yml` might look something like the following:

```yaml
language: ruby
rbenv:
  - "2.1.0"
script: bundle exec rspec spec
```

Further details on the various configuration options for the `.boxci.yml` can
be found in the [Build Configuration](/references/build_configuration) and
[The CI Environment](/references/ci_environment) references.

## Step Four: Build Initial Environment

The fourth step is actually building your initial BoxCI environment. This is
as easy as running:

```shell
boxci build
```

The above command will output something similar to the following:

```text
      create  Vagrantfile
      create  puppet
      create  puppet/manifests
      create  puppet/modules
         run  git submodule add -f git@github.com:alup/puppet-rbenv.git puppet/modules/rbenv from "."
Reactivating local git directory for submodule 'puppet/modules/rbenv'.
         run  git submodule update --init from "."
      create  puppet/manifests/main.pp
```

From the output we can see that this is doing a few different things.

1. Creating a starter Vagrantfile for the project
2. Creating a directory structure to maintain puppet manifests
   (`puppet/manifests`) & modules (`puppet/modules`)
3. Generating a starting puppet manifest (`puppet/manifests/main.pp`) and
   adding any necessary puppet modules

For Ruby projects by default it defines the configuration for an environment
that provides the versions of ruby specified in the `.boxci.yml`.  Further
details on `boxci build` can be found in the [Command Line
Interface](/references/command_line_interface#boxci-build) Reference.

## Step Five: Iterate on the Environment

Next you should iterate on your [Puppet](http://puppetlabs.com) manifests.
*Note:* This may not be needed if your project is simple, like lets say a Ruby
gem, as the default generated manifest may be sufficient.

If the project is more complex and you need to have a more complicated
environment. The basic steps to iterate on your environment configuration are
as follows:

1. Spin up your local virtual development environment using `vagrant up` from
   the root of the project. This will spin up the virtual dev environment and
   provision the configuration of it using Puppet.
2. Once it has spun up successfully and applied the provisioning you can
   `vagrant ssh` to the machine to verify that the changes were made
   correctly. Simply exit the `ssh` session once you have verified.
3. Then you can make changes to the Puppet manifests
   `puppet/manifests/main.pp` in your repository and apply them by running
   `vagrant provision`. For details on Puppet and writing manifests please
   refer to [puppetlabs.com](http://puppetlabs.com).
4. Generally you would repeat steps 2 and 3 until you get things to the state
   that you are happy with and then you can halt the virtual machine with
   `vagrant halt` or destroy it with `vagrant destroy`.
5. Generally it is thought of as good practice to `vagrant destroy` your box
   once you think you have the environment all dialed in and then do a fresh
   `vagrant up` as it will help you identify any Puppet dependency issues that
   may exist in your manifest.

## Step Six: Run your test suite

Once you have your Puppet manifests all dialed in and your `.boxci.yml`
configured the way you want. You should be ready to have BoxCI spin up a
virtual machine for you, provision it with your Puppet manifiests, and run
your automated test suite for you. This can be done with the following:

```shell
boxci test -v
```

*Note:* The `-v` option enables verbose output which we are having you run so
that you can get a better idea of what is going on. Further details on `boxci
test` can be found in the [Command Line
Interface](/references/command_line_interface#boxci-test) Reference.

## Step Seven: We are here to help!

For any kind of questions feel free to join our IRC channel [\#boxci on
chat.freenode.net](irc://chat.freenode.net/%23boxci). We love helping more
people use BoxCI as well as getting feedback from people on BoxCI.

You can also find more information and get help by using `boxci help`. For
more details on `boxci help` please refer to the [Command Line
Interface](/references/command_line_interface#boxci-help)
reference.
