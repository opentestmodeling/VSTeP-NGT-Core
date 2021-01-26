import { LanguageClientFactory, Languages, Workspace } from '@theia/languages/lib/browser';
import { inject, injectable, multiInject } from 'inversify';
import { DiagramLanguageClientContribution, DiagramManagerProvider } from 'sprotty-theia';
import { VSTEP_NGT_CORE_LANGUAGE_FILE_EXTENSION, VSTEP_NGT_CORE_LANGUAGE_SERVER_ID, VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME } from '../common';

@injectable()
export class VstepNgtCoreLanguageClientContribution extends DiagramLanguageClientContribution {

    readonly id = VSTEP_NGT_CORE_LANGUAGE_SERVER_ID;
    readonly name = VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
        @multiInject(DiagramManagerProvider) protected diagramManagerProviders: DiagramManagerProvider[]) {
        super(workspace, languages, languageClientFactory, diagramManagerProviders)
    }

    protected get globPatterns(): string[] {
        return [
            '**/*' + VSTEP_NGT_CORE_LANGUAGE_FILE_EXTENSION,
        ];
    }

    protected get documentSelector(): string[] {
        return [
            VSTEP_NGT_CORE_LANGUAGE_SERVER_ID
        ];
    }
}
