import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const VstepNgtCoreDslCommand = {
    id: 'VstepNgtCoreDsl.command',
    label: "Shows a message"
};

@injectable()
export class VstepNgtCoreDslCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(VstepNgtCoreDslCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class VstepNgtCoreDslMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: VstepNgtCoreDslCommand.id,
            label: 'Say Hello'
        });
    }
}
