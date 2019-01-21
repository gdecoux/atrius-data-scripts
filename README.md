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
* [`atrius dhm FILE`](#atrius-dhm-file)
* [`atrius help [COMMAND]`](#atrius-help-command)

## `atrius dhm FILE`

converts drone harmony file to geojson, kml, or esri

```
USAGE
  $ atrius dhm FILE

OPTIONS
  -f, --format=esri|kml|geojson  (required) [default: geojson] output format of mission.
  -h, --help                     show CLI help
  -o, --outFile=outFile          (required) [default: output] output file or directory name.
  --split                        whether to split missions into seperate files.

DESCRIPTION
  converts drone harmony file to geojson, kml, or esri
```

_See code: [src/commands/dhm.ts](https://github.com/gdecoux/atrius-data-scripts/blob/v0.0.0/src/commands/dhm.ts)_

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
