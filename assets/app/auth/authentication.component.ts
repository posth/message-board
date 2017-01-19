import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'authentication',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a routerLinkActive="active" [routerLink]="['signup']">Sign up</a></li>
                    <li><a routerLinkActive="active" [routerLink]="['sigin']">Sign in</a></li>
                    <li><a routerLinkActive="active" [routerLink]="['logout']">Log out</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}