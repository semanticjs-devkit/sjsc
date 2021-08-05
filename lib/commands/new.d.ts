import { Command, flags } from "@oclif/command";
export default class New extends Command {
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
}
