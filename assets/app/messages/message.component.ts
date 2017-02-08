import { Component, Input, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css']
})
export class MessageComponent   {

    @Input('message') message: Message;
    
    constructor(private _messageService: MessageService) { }

    onEdit() {
        this._messageService.editMessage(this.message);
    }

    onDelete() {
        this._messageService.deleteMessage(this.message)
        .subscribe(
            result => console.log(result)
        );
    }
}