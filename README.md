@semanticjs/sjsc
================

The SemanticJS CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@semanticjs/sjsc.svg)](https://npmjs.org/package/@semanticjs/sjsc)
[![Downloads/week](https://img.shields.io/npm/dw/@semanticjs/sjsc.svg)](https://npmjs.org/package/@semanticjs/sjsc)
[![License](https://img.shields.io/npm/l/@semanticjs/sjsc.svg)](https://github.com/semanticjs-devkit/sjsc/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @semanticjs/sjsc
$ sjsc COMMAND
running command...
$ sjsc (-v|--version|version)
@semanticjs/sjsc/0.0.1 win32-x64 node-v14.15.3
$ sjsc --help [COMMAND]
USAGE
  $ sjsc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sjsc help [COMMAND]`](#sjsc-help-command)
* [`sjsc initialize [ORGANIZATION] [REPOSITORY]`](#sjsc-initialize-organization-repository)
* [`sjsc new [FILE]`](#sjsc-new-file)
* [`sjsc sjsc-command`](#sjsc-sjsc-command)

## `sjsc help [COMMAND]`

display help for sjsc

```
USAGE
  $ sjsc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `sjsc initialize [ORGANIZATION] [REPOSITORY]`

Initialize a new SemanticJS project.

```
USAGE
  $ sjsc initialize [ORGANIZATION] [REPOSITORY]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ sjsc init
```

_See code: [src/commands/initialize.ts](https://github.com/semanticjs-devkit/sjsc/blob/v0.0.1/src/commands/initialize.ts)_

## `sjsc new [FILE]`

describe the command here

```
USAGE
  $ sjsc new [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/new.ts](https://github.com/semanticjs-devkit/sjsc/blob/v0.0.1/src/commands/new.ts)_

## `sjsc sjsc-command`

```
USAGE
  $ sjsc sjsc-command
```

_See code: [src/commands/sjsc-command.ts](https://github.com/semanticjs-devkit/sjsc/blob/v0.0.1/src/commands/sjsc-command.ts)_
<!-- commandsstop -->
