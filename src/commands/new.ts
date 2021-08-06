import { flags } from "@oclif/command";
import { StringUtils } from "@semanticjs/common";
import { ensureDir, readFile, writeFile } from "fs-extra";
import SJSCCommand from "./sjsc-command";

export default class New extends SJSCCommand {
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
export class ${name} {
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
      this.addClassToModule(name, path);
    }

    //  TODO:  setup JEST tests for class in testing/unit
  }

  protected async addClassToModule(name: string, path: string) {
    const moduleBuf = await readFile(`src/index.ts`);

    const moduleLines = await StringUtils.ReadLines(moduleBuf);

    for (const ml of moduleLines) {
      console.log(ml);
    }

    const importLines = moduleLines.filter((ml) => ml.startsWith("import"));

    importLines.push(`import { ${name} } from '.${path}/${name}'`);

    // const exportedStr = exportLine?.length == 0 ? '{}' : <string>exportLine?.substring(0, exportLine.length - 1).replace('export ', '');

    const exports: string[] = [];

    importLines.forEach(il => {
      const fromParts = il.split('from');

      const braceParts = fromParts[0].split('{');

      const closeBraceParts = braceParts[1].split('}');

      const className = closeBraceParts[0].trim();

      exports.push(className);
    });

    const moduleStrParts = [];
    
    importLines.forEach(il => moduleStrParts.push(`${il}`));

    moduleStrParts.push('');

    moduleStrParts.push(`export { ${exports.join(',')} };`);

    await writeFile('src/index.ts', moduleStrParts.join('\n'));
  }
}
