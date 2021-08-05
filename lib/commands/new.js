"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs_extra_1 = require("fs-extra");
class New extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(New);
        if (args.block === "class") {
            this.newClassTemplate(args.name, flags.path, flags.export);
        }
    }
    async newClassTemplate(name, path, shouldExport) {
        const template = `
export default class ${name} {
  //  Fields
  protected example?: boolean;

  //  Properties
  public Example: string;

  //  Constructors
  constructor() {
    this.Example = "Hello World";
  }

  //  API Methods
  public ChangeExample(example: string): void {
    this.Example = example;
  }

  //  Helpers
  protected toggleExample() {
    this.example = !this.example;
  }
}
    `;
        await fs_extra_1.ensureDir(`src${path}`);
        await fs_extra_1.writeFile(`src${path}/${name}.ts`, template);
        if (shouldExport) {
            //  TODO:  setup module export
            console.log("should export");
        }
    }
}
exports.default = New;
New.aliases = ["n"];
New.description = "Used to create new blocks of the SemanticJS framework.";
New.flags = {
    help: command_1.flags.help({ char: "h" }),
    export: command_1.flags.boolean({
        char: "e",
        default: true,
        description: "When flagged, sets up the module export for the new class.",
    }),
    path: command_1.flags.string({
        char: "p",
        default: "",
        description: "The path within src to include the file (should start with '/').",
    }),
};
New.args = [{ name: "block" }, { name: "name" }];
