"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs_extra_1 = require("fs-extra");
const exec_1 = require("../services/exec");
class SJSCCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.exec = new exec_1.ExecService();
    }
    async execute(command) {
        return await this.exec.Execute(command, this.log);
    }
    async readSJSConfig() {
        var sjsCfgBuf = await fs_extra_1.readFile('.sjs.config.json');
        var sjsCfg = JSON.parse(sjsCfgBuf.toString());
        return sjsCfg;
    }
    async writeSJSConfig(sjsCfg) {
        await fs_extra_1.writeFile(".sjs.config.json", JSON.stringify(sjsCfg));
    }
}
exports.default = SJSCCommand;
