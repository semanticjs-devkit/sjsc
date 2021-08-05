import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { ExecService } from "../services/exec";
import { copy, ensureDir, ensureFile, readFile, writeFile } from "fs-extra";
import SJSCCommand from "./sjsc-command";

export default class Initialize extends SJSCCommand {
  static aliases = ["init"];

  static description = "Initialize a new SemanticJS project.";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  };

  static args = [{ name: "organization" }, { name: "repository" }];

  public async run() {
    const { args, flags } = this.parse(Initialize);

    this.log(JSON.stringify(args));

    await this.execute("npm init -y");

    await this.execute("npm i typescript ts-node @types/node --save-dev");

    await this.execute("npm i jest @types/jest ts-jest --save-dev");

    await this.execute("npm i concurrently --save-dev");

    //  Not running this, adding tsconfig.json manually
    // res = await this.execute("npx tsc --init");

    await ensureDir("src");

    await ensureFile(`src/${args.repository}.ts`);

    await ensureDir("testing/unit");

    await ensureDir("testing/e2e");

    await this.inintializeGitIgnore();

    await this.inintializeJestConfig();

    await this.inintializeTsConfig();

    await this.inintializeTsConfigCJS();

    await this.inintializeTsConfigES();

    await this.configurePackageJson(args);

    //  TODO: Setup .semanticjs.config.json

    await this.execute("npm i");
  }

  protected async configurePackageJson(args: { [name: string]: any }) {
    const pkgJsonStr = await readFile("package.json", "utf-8");

    const pkgJson = {
      ...JSON.parse(pkgJsonStr),
      name: `@${args.organization}/${args.repository}`,
      version: "0.0.0",
      main: "./packages/cjs/common.js",
      module: "./packages/es/common.js",
      files: [
        "packages/"
      ],
    };

    pkgJson.scripts = {
      ...pkgJson.scripts,
      "build": "concurrently \"npm run build:es\" \"npm run build:cjs\"",
      "build:es": "tsc -p tsconfig.es.json",
      "build:cjs": "tsc -p tsconfig.cjs.json",
      "deploy": "npm version patch && npm run deploy:all",
      "deploy:all": "npm publish ./packages --access public",
      "prepublishOnly": "npm run build",
      "test": "jest",
      "test:coverage": "jest --coverage",
      "watch": "npm run watch:es",
      "watch:es": "tsc -p tsconfig.es.json -w",
      "watch:cjs": "tsc -p tsconfig.cjs.json -w"
    };

    await writeFile("package.json", JSON.stringify(pkgJson, null, 2));
  }

  protected async inintializeGitIgnore() {
    const gitignore = `
# Dependencies
/node_modules

# Build Packages
/packages
    `;

    await writeFile(".gitignore", gitignore);
  }

  protected async inintializeJestConfig() {
    const jestConfig = `
module.exports = {
  roots: ["<rootDir>/testing/unit"],
  testMatch: [
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
    `;

    await writeFile("jest.config.js", jestConfig);
  }

  protected async inintializeTsConfig() {
    const tsconfig = `
{
  "compilerOptions": {
    "target": "es2017",
    "module": "es2020",
    "outDir": "./packages",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["./src"]
}    
    `;

    await writeFile("tsconfig.json", tsconfig);
  }

  protected async inintializeTsConfigCJS() {
    const tsconfig = `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",    
    "outDir": "./packages/cjs"
  }
}      
    `;

    await writeFile("tsconfig.cjs.json", tsconfig);
  }

  protected async inintializeTsConfigES() {
    const tsconfig = `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "es2020",
    "outDir": "./packages/es"
  }
}
    `;

    await writeFile("tsconfig.es.json", tsconfig);
  }
}
