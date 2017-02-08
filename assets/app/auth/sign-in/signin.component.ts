import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from '../user.model';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;

    constructor(private _authService: AuthService, private router: Router) { }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);

        //If it works out you'll get the token here in the data 
        this._authService.signin(user)
            .subscribe(
                data => {
                    //storing the token in a local storage, which is in the browser - vanilla js object
                    //even if you close the browser window it retains the localStorage, but will invalidate after 2 hrs
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    //reroute to the main page
                    this.router.navigateByUrl('/');
                },
            error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}