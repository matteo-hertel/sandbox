wc-bundler
==========

Bundle together Web Component

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/wc-bundler.svg)](https://npmjs.org/package/wc-bundler)
[![Codecov](https://codecov.io/gh/matteo-hertel/wc-bundler/branch/master/graph/badge.svg)](https://codecov.io/gh/matteo-hertel/wc-bundler)
[![Downloads/week](https://img.shields.io/npm/dw/wc-bundler.svg)](https://npmjs.org/package/wc-bundler)
[![License](https://img.shields.io/npm/l/wc-bundler.svg)](https://github.com/matteo-hertel/wc-bundler/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wc-bundler
$ wc-bundler COMMAND
running command...
$ wc-bundler (-v|--version|version)
wc-bundler/0.0.0 darwin-x64 node-v10.13.0
$ wc-bundler --help [COMMAND]
USAGE
  $ wc-bundler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wc-bundler hello [FILE]`](#wc-bundler-hello-file)
* [`wc-bundler help [COMMAND]`](#wc-bundler-help-command)

## `wc-bundler hello [FILE]`

describe the command here

```
USAGE
  $ wc-bundler hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ wc-bundler hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/matteo-hertel/wc-bundler/blob/v0.0.0/src/commands/hello.ts)_

## `wc-bundler help [COMMAND]`

display help for wc-bundler

```
USAGE
  $ wc-bundler help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
