import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'message-input',
    templateUrl: 'message-input.component.html'
})
export class MessageInputComponent {

    constructor(private _messageService: MessageService) { }

    //Template drive approach from angular2 to submit and manipulate forms from the forms module
    onSubmit(form: NgForm) {
        const message = new Message(form.value.content, 'Marc');
        this._messageService.addMessage(message);
        form.reset();
    }
}