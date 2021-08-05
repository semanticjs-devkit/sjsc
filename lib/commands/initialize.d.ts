import SJSCCommand from "./sjsc-command";
export default class Initialize extends SJSCCommand {
    static aliases: string[];
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
    protected configurePackageJson(args: {
        [name: string]: any;
    }): Promise<void>;
    protected inintializeGitIgnore(): Promise<void>;
    protected inintializeJestConfig(): Promise<void>;
    protected inintializeTsConfig(): Promise<void>;
    protected inintializeTsConfigCJS(): Promise<void>;
    protected inintializeTsConfigES(): Promise<void>;
}
