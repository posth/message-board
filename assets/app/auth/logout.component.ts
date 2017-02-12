import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from  './auth.service';

@Component({
    selector: 'logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})
export class LogoutComponent  {

    constructor(private _authService: AuthService, private _router: Router) {

    }

    onLogout() {
        //Use the service to clear the localStorage token and id
        this._authService.logout();

        //Navigate the user back to the sign-in component
        this._router.navigate(['/auth', 'signin']);
    } 

}