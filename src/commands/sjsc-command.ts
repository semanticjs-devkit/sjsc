import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { ExecService } from "../services/exec";

export default abstract class SJSCCommand extends Command {
  protected exec: ExecService = new ExecService();

  protected async execute(command: string) {
    return await this.exec.Execute(command, this.log);
  }
}
