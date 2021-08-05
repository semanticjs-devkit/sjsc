/// <reference types="node" />
import { ChildProcess } from 'child_process';
export declare class ExecService {
    Execute(command: string, log: Function): Promise<unknown>;
    protected promiseFromChildProcess(child: ChildProcess): Promise<unknown>;
}
