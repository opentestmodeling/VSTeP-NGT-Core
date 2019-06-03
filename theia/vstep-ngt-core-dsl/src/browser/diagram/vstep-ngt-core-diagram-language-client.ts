import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "@pizzafactory/sprotty-theia";
import { VstepNgtCoreLanguageClientContribution } from "../vstep-ngt-core-dsl-language-client-contribution";

@injectable()
export class VstepNgtCoreDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(VstepNgtCoreLanguageClientContribution) languageClientContribution: VstepNgtCoreLanguageClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {
        super(languageClientContribution, editorManager)
    }
}
