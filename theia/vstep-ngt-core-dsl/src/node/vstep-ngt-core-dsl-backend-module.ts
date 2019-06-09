import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { VstepNgtCoreLanguageServerContribution } from './vstep-ngt-core-dsl-language-server-contribution';

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(VstepNgtCoreLanguageServerContribution).inSingletonScope();
});

