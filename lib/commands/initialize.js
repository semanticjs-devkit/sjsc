"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs_extra_1 = require("fs-extra");
const sjsc_command_1 = require("./sjsc-command");
class Initialize extends sjsc_command_1.default {
    async run() {
        const { args, flags } = this.parse(Initialize);
        this.log(JSON.stringify(args));
        await this.execute("npm init -y");
        await this.execute("npm i typescript ts-node @types/node --save-dev");
        await this.execute("npm i jest @types/jest ts-jest --save-dev");
        await this.execute("npm i concurrently --save-dev");
        await this.execute("npm i @semanticjs/common@latest --save");
        //  Not running this, adding tsconfig.json manually
        // res = await this.execute("npx tsc --init");
        await fs_extra_1.ensureDir("src");
        await fs_extra_1.ensureFile(`src/${args.repository}.ts`);
        await fs_extra_1.ensureDir("testing/unit");
        await fs_extra_1.ensureDir("testing/e2e");
        await this.inintializeGitIgnore();
        await this.inintializeJestConfig();
        await this.inintializeTsConfig();
        await this.inintializeTsConfigCJS();
        await this.inintializeTsConfigES();
        await this.configurePackageJson(args);
        //  TODO: Setup .semanticjs.config.json
        await this.execute("npm i");
    }
    async configurePackageJson(args) {
        const pkgJsonStr = await fs_extra_1.readFile("package.json");
        const pkgJson = Object.assign(Object.assign({}, JSON.parse(pkgJsonStr.toString())), { name: `@${args.organization}/${args.repository}`, version: "0.0.0", main: "./packages/cjs/common.js", module: "./packages/es/common.js", files: [
                "packages/"
            ] });
        pkgJson.scripts = Object.assign(Object.assign({}, pkgJson.scripts), { "build": "concurrently \"npm run build:es\" \"npm run build:cjs\"", "build:es": "tsc -p tsconfig.es.json", "build:cjs": "tsc -p tsconfig.cjs.json", "deploy": "npm version patch && npm run deploy:all", "deploy:all": "npm publish ./packages --access public", "prepublishOnly": "npm run build", "test": "jest", "test:coverage": "jest --coverage", "watch": "npm run watch:es", "watch:es": "tsc -p tsconfig.es.json -w", "watch:cjs": "tsc -p tsconfig.cjs.json -w" });
        await fs_extra_1.writeFile("package.json", JSON.stringify(pkgJson, null, 2));
    }
    async inintializeGitIgnore() {
        const gitignore = `
# Dependencies
/node_modules

# Build Packages
/packages
    `;
        await fs_extra_1.writeFile(".gitignore", gitignore);
    }
    async inintializeJestConfig() {
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
        await fs_extra_1.writeFile("jest.config.js", jestConfig);
    }
    async inintializeTsConfig() {
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
        await fs_extra_1.writeFile("tsconfig.json", tsconfig);
    }
    async inintializeTsConfigCJS() {
        const tsconfig = `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",    
    "outDir": "./packages/cjs"
  }
}      
    `;
        await fs_extra_1.writeFile("tsconfig.cjs.json", tsconfig);
    }
    async inintializeTsConfigES() {
        const tsconfig = `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "es2020",
    "outDir": "./packages/es"
  }
}
    `;
        await fs_extra_1.writeFile("tsconfig.es.json", tsconfig);
    }
}
exports.default = Initialize;
Initialize.aliases = ["init"];
Initialize.description = "Initialize a new SemanticJS project.";
Initialize.flags = {
    help: command_1.flags.help({ char: "h" }),
};
Initialize.args = [{ name: "organization" }, { name: "repository" }];
