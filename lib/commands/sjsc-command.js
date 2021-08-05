"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const exec_1 = require("../services/exec");
class SJSCCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.exec = new exec_1.ExecService();
    }
    async execute(command) {
        return await this.exec.Execute(command, this.log);
    }
}
exports.default = SJSCCommand;
