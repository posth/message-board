import { Injectable } from '@angular/core';

import { Message } from './message.model';

@Injectable()
export class MessageService {

    //private to make it scoped only within this class
    private messages: Message[] = [];

    addMessage(message: Message) {
        console.log(this.messages);
        this.messages.push(message);
    }

    getMessage(): Message[] {
        return this.messages;
    }

    //deleting the message passed as a parameter from the messages array at the index of the message passed
    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}