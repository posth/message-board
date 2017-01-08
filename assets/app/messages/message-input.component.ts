import { Component } from '@angular/core';

@Component({
    selector: 'message-input',
    templateUrl: 'message-input.component.html'
})
export class MessageInputComponent {
    constructor() { }

    onSave(value: string) {
        console.log(value);
    }
}