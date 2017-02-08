import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private _authService: AuthService) { }

    onSubmit() {
        //grabbing user from the template
        const user = new User(
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.password,
            this.myForm.value.email,
        );

        //passing the user to the service
        this._authService.signup(user)
            .subscribe(
            data => console.log(data),
            error => console.log(error)
            );

        //reseting the form once the user is done
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required
            ]),
            password: new FormControl(null, Validators.required)
        });
    }


}