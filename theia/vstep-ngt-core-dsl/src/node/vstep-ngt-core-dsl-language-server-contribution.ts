import { isWindows } from '@theia/core/lib/common/os';
import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { injectable } from 'inversify';
import * as net from 'net';
import { join, resolve } from 'path';
import { createSocketConnection } from 'vscode-ws-jsonrpc/lib/server';
import { VSTEP_NGT_CORE_LANGUAGE_SERVER_ID, VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME } from '../common';

const EXECUTABLE_NAME = isWindows ? 'vstep-ngt-core-language-server.bat' : 'vstep-ngt-core-language-server';
const EXECUTABLE_PATH = resolve(join(__dirname, '..', '..', 'build', 'vstep-ngt-core-language-server', 'bin', EXECUTABLE_NAME));

@injectable()
export class VstepNgtCoreLanguageServerContribution extends BaseLanguageServerContribution {

    readonly id = VSTEP_NGT_CORE_LANGUAGE_SERVER_ID;
    readonly name = VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME;

    getPort(): number | undefined {
        let arg = process.argv.filter(arg => arg.startsWith('--VSTEP_NGT_CORE_LSP='))[0];
        if (!arg) {
            return undefined;
        } else {
            return Number.parseInt(arg.substring('--VSTEP_NGT_CORE_LSP='.length), 10);
        }
    }

    start(clientConnection: IConnection): void {
        let socketPort = this.getPort();
        if (socketPort) {
            const socket = new net.Socket();
            socket.connect(socketPort);
            const serverConnection = createSocketConnection(socket, socket, () => {
                socket.destroy();
            });
            this.forward(clientConnection, serverConnection);
        } else {
            const args: string[] = [];
            const serverConnection = this.createProcessStreamConnection(EXECUTABLE_PATH, args);
            this.forward(clientConnection, serverConnection);
        }
    }
}
