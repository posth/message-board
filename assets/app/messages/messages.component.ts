import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'messages',
    template: `
        <div class="row">
            <message-input></message-input>
        </div>
        <hr>
        <div class="row">
            <message-list></message-list>
        </div>
    `
})
export class MessagesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}