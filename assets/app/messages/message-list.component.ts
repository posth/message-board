import { Component } from '@angular/core';
import { Message } from './message.model';

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
export class MessageListComponent {

    messages: Message[] = [
        new Message('A message', 'Marc'), 
        new Message('Message two', 'John'),
        new Message('Third message', 'Bill')
    ];

    constructor() { }

}