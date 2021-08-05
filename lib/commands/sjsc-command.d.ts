import { Command } from "@oclif/command";
import { ExecService } from "../services/exec";
export default abstract class SJSCCommand extends Command {
    protected exec: ExecService;
    protected execute(command: string): Promise<unknown>;
}
