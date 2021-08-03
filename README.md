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
@semanticjs/sjsc/0.0.0 win32-x64 node-v14.15.3
$ sjsc --help [COMMAND]
USAGE
  $ sjsc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sjsc hello [FILE]`](#sjsc-hello-file)
* [`sjsc help [COMMAND]`](#sjsc-help-command)

## `sjsc hello [FILE]`

describe the command here

```
USAGE
  $ sjsc hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ sjsc hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/semanticjs-devkit/sjsc/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
