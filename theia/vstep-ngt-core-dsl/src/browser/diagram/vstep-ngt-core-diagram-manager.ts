import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { inject, injectable } from 'inversify';
import { DiagramManager, LSTheiaSprottyConnector, TheiaFileSaver, TheiaSprottyConnector } from '@pizzafactory/sprotty-theia';
import { VSTEP_NGT_CORE_DIAGRAM_TYPE } from './vstep-ngt-core-diagram-configuration';
import { VstepNgtCoreDiagramLanguageClient } from './vstep-ngt-core-diagram-language-client';

@injectable()
export class VstepNgtCoreDiagramManager extends DiagramManager {

    readonly diagramType = VSTEP_NGT_CORE_DIAGRAM_TYPE;
    readonly iconClass = 'fa fa-sitemap';

    _diagramConnector: TheiaSprottyConnector;

    constructor(@inject(VstepNgtCoreDiagramLanguageClient) diagramLanguageClient: VstepNgtCoreDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService) {
        super();
        this._diagramConnector = new LSTheiaSprottyConnector({diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this});
    }

    get diagramConnector() {
        return this._diagramConnector;
    }

    get label() {
        return 'State machine diagram';
    }
}
