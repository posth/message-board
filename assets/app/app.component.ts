import { Component } from '@angular/core';
import { MessageListComponent } from './messages/message-list.component';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ MessageService ]
})
export class AppComponent {
    
}