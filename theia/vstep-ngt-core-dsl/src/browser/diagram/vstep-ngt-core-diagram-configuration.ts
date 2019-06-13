import { Container, injectable } from "inversify";
import { configureCommand, configureModelElement, KeyTool, TYPES } from '@pizzafactory/sprotty-theia';
import { CodeActionPalettePopupProvider, CodeActionProvider, CompletionLabelEditor, 
    DeleteWithWorkspaceEditCommand, DiagramConfiguration, EditDiagramLocker, IRootPopupModelProvider, 
    LSTheiaDiagramServer, LSTheiaDiagramServerProvider, PaletteButton, PaletteMouseListener, 
    RenameLabelEditor, TheiaDiagramServer, TheiaKeyTool, WorkspaceEditCommand } from "@pizzafactory/sprotty-theia";
import { createStateDiagramContainer } from '@opentestmodeling/vstep-ngt-core-sprotty/lib/di.config';
import { PaletteButtonView } from '@opentestmodeling/vstep-ngt-core-sprotty/lib/html-views';
import { VstepNgtCoreDiagramServer } from "./vstep-ngt-core-diagram-server";

export const VSTEP_NGT_CORE_DIAGRAM_TYPE = 'vstep-ngt-core-diagram';

@injectable()
export class VstepNgtCoreDiagramConfiguration implements DiagramConfiguration {
    diagramType = VSTEP_NGT_CORE_DIAGRAM_TYPE;

    createContainer(widgetId: string): Container {
        const container = createStateDiagramContainer(widgetId);
        container.bind(VstepNgtCoreDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(VstepNgtCoreDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(VstepNgtCoreDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.bind(EditDiagramLocker).toSelf().inSingletonScope();
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>((context: any) => {
            return () => {
                return new Promise<LSTheiaDiagramServer>((resolve) => {
                    resolve(context.container.get(LSTheiaDiagramServer));
                });
            };
        });
        container.bind(CodeActionProvider).toSelf().inSingletonScope();
        container.bind(IRootPopupModelProvider).to(CodeActionPalettePopupProvider).inSingletonScope();
        container.bind(PaletteMouseListener).toSelf().inSingletonScope();
        container.rebind(TYPES.PopupMouseListener).to(PaletteMouseListener);
        configureModelElement(container, 'button:create', PaletteButton, PaletteButtonView);
        
        configureCommand(container, DeleteWithWorkspaceEditCommand);
        configureCommand(container, WorkspaceEditCommand);

        container.bind(CompletionLabelEditor).toSelf().inSingletonScope();
        container.bind(RenameLabelEditor).toSelf().inSingletonScope();

        return container;
    }
}
