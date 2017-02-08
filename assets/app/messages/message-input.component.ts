import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'message-input',
    templateUrl: 'message-input.component.html'
})
export class MessageInputComponent implements OnInit {

    //The message loaded onto the input field - if it's undefined, there will be no value on the input field
    message: Message;

    constructor(private _messageService: MessageService) { }

    //Template drive approach from angular2 to submit and manipulate forms from the forms module
    onSubmit(form: NgForm) {
        if (this.message) {
            //Editing
            this.message.content = form.value.content;
            //Clean message so it doesn't output
            this.message = null;
        } else {

            const message = new Message(form.value.content, 'Marc');

            //Chaining subscribe because the service function returns an Observable
            this._messageService.addMessage(message)
                .subscribe(
                data => console.log(data),
                error => console.error(error)
                );
        }
        form.reset();
    }

    //Clear button
    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

    ngOnInit() {
        this._messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }
}