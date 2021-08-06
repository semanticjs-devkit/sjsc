import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { readFile, writeFile } from "fs-extra";
import SJSConfig from "../models/SJSConfig";
import { ExecService } from "../services/exec";

export default abstract class SJSCCommand extends Command {
  protected exec: ExecService = new ExecService();

  protected async execute(command: string) {
    return await this.exec.Execute(command, this.log);
  }
  
  protected async readSJSConfig(): Promise<SJSConfig> {
    var sjsCfgBuf = await readFile('.sjs.config.json');

    var sjsCfg = <SJSConfig>JSON.parse(sjsCfgBuf.toString());
    
    return sjsCfg;
  }
  
  protected async writeSJSConfig(sjsCfg: SJSConfig): Promise<void> {
    await writeFile(".sjs.config.json", JSON.stringify(sjsCfg));
  }
}
