import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    selector: 'authentication',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a routerLinkActive="active" [routerLink]="['signup']">Sign up</a></li>
                    <li><a routerLinkActive="active" *ngIf='!isLoggedIn()' [routerLink]="['signin']">Sign in</a></li>
                    <li><a routerLinkActive="active" *ngIf='isLoggedIn()' [routerLink]="['logout']">Log out</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent implements OnInit {
    constructor(private _authService: AuthService) { }

    isLoggedIn() {
        //Grab the boolean if the token is present in the user's localStorage
        return this._authService.isLoggedIn();
    }

    ngOnInit() { }
}