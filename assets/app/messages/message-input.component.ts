import { Component } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'message-input',
    templateUrl: 'message-input.component.html'
})
export class MessageInputComponent {

    constructor(private _messageService: MessageService) { }

    onSave(value: string) {
        const message = new Message(value, 'Marc');
        this._messageService.addMessage(message);
    }
}