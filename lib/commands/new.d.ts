import { flags } from "@oclif/command";
import SJSCCommand from "./sjsc-command";
export default class New extends SJSCCommand {
    static aliases: string[];
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        export: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        path: flags.IOptionFlag<string>;
    };
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
    protected newClassTemplate(name: string, path: string, shouldExport: boolean): Promise<void>;
    protected addClassToTemplate(name: string, path: string): Promise<void>;
}
