import { Command, flags } from "@oclif/command";
import { ensureDir, writeFile } from "fs-extra";

export default class New extends Command {
  static aliases = ["n"];

  static description = "Used to create new blocks of the SemanticJS framework.";

  static flags = {
    help: flags.help({ char: "h" }),
    export: flags.boolean({
      char: "e",
      default: true,
      description: "When flagged, sets up the module export for the new class.",
    }),
    path: flags.string({
      char: "p",
      default: "",
      description:
        "The path within src to include the file (should start with '/').",
    }),
  };

  static args = [{ name: "block" }, { name: "name" }];

  public async run() {
    const { args, flags } = this.parse(New);

    if (args.block === "class") {
      this.newClassTemplate(
        <string>args.name,
        <string>flags.path,
        <boolean>flags.export
      );
    }
  }

  protected async newClassTemplate(
    name: string,
    path: string,
    shouldExport: boolean
  ) {
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

    await ensureDir(`src${path}`);

    await writeFile(`src${path}/${name}.ts`, template);

    if (shouldExport) {
      //  TODO:  setup module export
      console.log("should export");
    }
  }
}
