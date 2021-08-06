import { Command } from "@oclif/command";
import SJSConfig from "../models/SJSConfig";
import { ExecService } from "../services/exec";
export default abstract class SJSCCommand extends Command {
    protected exec: ExecService;
    protected execute(command: string): Promise<unknown>;
    protected readSJSConfig(): Promise<SJSConfig>;
    protected writeSJSConfig(sjsCfg: SJSConfig): Promise<void>;
}
