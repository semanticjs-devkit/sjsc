"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecService = void 0;
const child_process_1 = require("child_process");
class ExecService {
    async Execute(command, log) {
        var _a, _b;
        log(command);
        var child = child_process_1.exec(command);
        (_a = child === null || child === void 0 ? void 0 : child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            log(data);
        });
        (_b = child === null || child === void 0 ? void 0 : child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            log(data);
        });
        child.on('close', (code) => {
            log(`Completed with code: ${code}`);
        });
        return this.promiseFromChildProcess(child);
    }
    promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }
}
exports.ExecService = ExecService;
