import {ChildProcess, exec} from 'child_process';

export class ExecService {
  public async Execute(command: string, log: Function) {
    log(command);

    var child = exec(command);
    
    child?.stdout?.on('data', (data) => {
        log(data);
    });

    child?.stderr?.on('data', (data) => {
      log(data);
    });

    child.on('close', (code) => {
      log(`Completed with code: ${code}`);
    });

    return this.promiseFromChildProcess(child);
  }
  
  protected promiseFromChildProcess(child: ChildProcess) {
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);

        child.addListener("exit", resolve);
    });
  }
}
