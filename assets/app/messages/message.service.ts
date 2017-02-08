import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Message } from './message.model';

@Injectable()
export class MessageService {

    //private to make it scoped only within this class
    private messages: Message[] = [];

    messageIsEdit = new EventEmitter<Message>();

    constructor(private _http: Http) { }

    addMessage(message: Message) {
        this.messages.push(message);

        //convert the message into a JSON object
        const body = JSON.stringify(message);

        //Ensure we're sending JSON as that's what the backend is expecting - pass it as a third parameter in the http post service request
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        //This sets up the Observable and doesn't send the request
        //Someone needs to subscribe to this observable for it to send
        //it returns from the server a response as a json object, only gives you the data which is attached to the response and converts it to JSON
        return this._http.post('http://localhost:3000/message', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessage() {
        return this._http.get('http://localhost:3000/message')
            //Map needs an observable
            .map((response: Response) => {
                const messages = response.json().obj;

                let transformedMessages: Message[] = [];

                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message.id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        //Emit the message passed to this method
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        //To Do
    }


    //deleting the message passed as a parameter from the messages array at the index of the message passed
    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}