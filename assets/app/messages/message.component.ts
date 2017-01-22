import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css']
})
export class MessageComponent   {

    @Input('message') message: Message;

    //Emitting an event from child to parent
    @Output() editClicked = new EventEmitter<string>();
    
    constructor(private _messageService: MessageService) { }

    onEdit() {
        //emitting the event through this method and you can pass data through the emit function
        this.editClicked.emit('A new value');
    }

    onDelete() {
        this._messageService.deleteMessage(this.message);
    }
}