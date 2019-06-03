/**
 * Generated using theia-extension-generator
 */

import { FrontendApplicationContribution, KeybindingContribution, OpenHandler, WidgetFactory } from '@theia/core/lib/browser';
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { ContainerModule } from "inversify";
import { DiagramConfiguration, DiagramManager, DiagramManagerProvider, LSDiagramCommandContribution,
    LSDiagramKeybindingContribution } from '@pizzafactory/sprotty-theia';
import { VstepNgtCoreDiagramConfiguration } from './diagram/vstep-ngt-core-diagram-configuration';
import { VstepNgtCoreDiagramLanguageClient } from './diagram/vstep-ngt-core-diagram-language-client';
import { VstepNgtCoreDiagramManager } from './diagram/vstep-ngt-core-diagram-manager';
import { VstepNgtCoreDslCommandContribution, VstepNgtCoreDslMenuContribution } from './vstep-ngt-core-dsl-contribution';
import { VstepNgtCoreGrammarContribution } from './vstep-ngt-core-dsl-grammar-contribution';
import { VstepNgtCoreLanguageClientContribution } from './vstep-ngt-core-dsl-language-client-contribution';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(VstepNgtCoreDslCommandContribution);
    bind(MenuContribution).to(VstepNgtCoreDslMenuContribution);

    bind(VstepNgtCoreLanguageClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(VstepNgtCoreLanguageClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(VstepNgtCoreGrammarContribution).inSingletonScope();

    bind(VstepNgtCoreDiagramLanguageClient).toSelf().inSingletonScope();
    bind(CommandContribution).to(LSDiagramCommandContribution).inSingletonScope();
    bind(KeybindingContribution).to(LSDiagramKeybindingContribution).inSingletonScope();

    bind(DiagramConfiguration).to(VstepNgtCoreDiagramConfiguration).inSingletonScope();
    bind(VstepNgtCoreDiagramManager).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(VstepNgtCoreDiagramManager);
    bind(OpenHandler).toService(VstepNgtCoreDiagramManager);
    bind(WidgetFactory).toService(VstepNgtCoreDiagramManager);
    bind(DiagramManagerProvider).toProvider<DiagramManager>((context) => {
        return () => {
            return new Promise<DiagramManager>((resolve) => {
                let diagramManager = context.container.get<VstepNgtCoreDiagramManager>(VstepNgtCoreDiagramManager);
                resolve(diagramManager);
            });
        };
    });
});
