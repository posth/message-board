import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

import { MessageService } from './message.service';

@Component({
    selector: 'message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <!--receiving data from child will be in the $event object through custom event-->
            <message 
            [message]="message" 
            (editClicked)="message.content = $event"
            *ngFor="let message of messages"></message>
        </div>
    `
})
export class MessageListComponent implements OnInit {

    messages: Message[];

    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this.messages = this._messageService.getMessage();
    }


}