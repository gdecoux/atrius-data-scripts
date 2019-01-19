atrius-data-scripts
===================

Commands for converting missions or geo files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/atrius-data-scripts.svg)](https://npmjs.org/package/atrius-data-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/atrius-data-scripts.svg)](https://npmjs.org/package/atrius-data-scripts)
[![License](https://img.shields.io/npm/l/atrius-data-scripts.svg)](https://github.com/gdecoux/atrius-data-scripts/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g atrius-data-scripts
$ atrius COMMAND
running command...
$ atrius (-v|--version|version)
atrius-data-scripts/0.0.0 darwin-x64 node-v10.13.0
$ atrius --help [COMMAND]
USAGE
  $ atrius COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`atrius dhm [FILE]`](#atrius-dhm-file)
* [`atrius hello [FILE]`](#atrius-hello-file)
* [`atrius help [COMMAND]`](#atrius-help-command)

## `atrius dhm [FILE]`

describe the command here

```
USAGE
  $ atrius dhm [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/dhm.ts](https://github.com/gdecoux/atrius-data-scripts/blob/v0.0.0/src/commands/dhm.ts)_

## `atrius hello [FILE]`

describe the command here

```
USAGE
  $ atrius hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ atrius hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/gdecoux/atrius-data-scripts/blob/v0.0.0/src/commands/hello.ts)_

## `atrius help [COMMAND]`

display help for atrius

```
USAGE
  $ atrius help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
