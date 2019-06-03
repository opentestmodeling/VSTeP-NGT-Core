import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { VSTEP_NGT_CORE_LANGUAGE_FILE_EXTENSION, VSTEP_NGT_CORE_LANGUAGE_SERVER_ID, VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME } from '../common';

@injectable()
export class VstepNgtCoreGrammarContribution implements LanguageGrammarDefinitionContribution {

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: VSTEP_NGT_CORE_LANGUAGE_SERVER_ID,
            aliases: [
                VSTEP_NGT_CORE_LANGUAGE_SERVER_NAME, VSTEP_NGT_CORE_LANGUAGE_SERVER_ID
            ],
            extensions: [
                VSTEP_NGT_CORE_LANGUAGE_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/sm'
            ]
        });
        monaco.languages.setLanguageConfiguration(VSTEP_NGT_CORE_LANGUAGE_SERVER_ID, this.configuration);

        const vstepNgtCoreGrammar = require('../../data/vstep-ngt-core.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.sm', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: vstepNgtCoreGrammar,
                };
            }
        });
        registry.mapLanguageIdToTextmateGrammar(VSTEP_NGT_CORE_LANGUAGE_SERVER_ID, 'source.sm');
    }

    protected configuration: monaco.languages.LanguageConfiguration = {
        'comments': {
            'lineComment': '//',
            'blockComment': ['/*', '*/']
        },
        'brackets': [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        'autoClosingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'", 'notIn': ['string', 'comment'] },
            { 'open': '"', 'close': '"', 'notIn': ['string'] },
            { 'open': '/**', 'close': ' */', 'notIn': ['string'] }
        ],
        'surroundingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'" },
            { 'open': '"', 'close': '"' },
            { 'open': '`', 'close': '`' }
        ],
        'folding': {
            'markers': {
                'start': new RegExp('^\\s*//\\s*#?region\\b'),
                'end': new RegExp('^\\s*//\\s*#?endregion\\b')
            }
        }
    };
}

