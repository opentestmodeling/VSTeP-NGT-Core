'use strict';

import * as path from 'path';
import * as os from 'os';

import {Trace} from 'vscode-jsonrpc';
import { commands, window, workspace, ExtensionContext, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
    // The server is a locally installed in src/vstepngtcore
    let launcher = os.platform() === 'win32' ? 'java.exe' : 'java';
    let jar = context.asAbsolutePath(path.join('src', 'ide.jar'));

    let serverOptions: ServerOptions = {
        run : { command: launcher, args: [ '-jar', jar ] },
        debug: { command: launcher, args: [ '-jar', jar ], options: { env: createDebugEnv() } }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: ['vstepngtcore'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };

    // Create the language client and start the client.
    let lc = new LanguageClient('VSTeP/NGT Core Server', serverOptions, clientOptions);

    var disposable2 =commands.registerCommand("vstepngtcore.a.proxy", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || activeEditor.document.languageId !== 'vstepngtcore') {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("vstepngtcore.a", activeEditor.document.uri.toString());
        }
    })
    context.subscriptions.push(disposable2);

    // enable tracing (.Off, .Messages, Verbose)
    lc.trace = Trace.Verbose;
    let disposable = lc.start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}

function createDebugEnv() {
    return Object.assign({
        JAVA_OPTS:"-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y"
    }, process.env)
}