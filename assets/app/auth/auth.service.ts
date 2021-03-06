import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class AuthService {

    constructor(private _http: Http) { }

    signup(user: User) {

        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' })

        return this._http.post('http://localhost:3000/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {

        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' })

        return this._http.post('http://localhost:3000/user/signin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    //Authentication related methods
    logout() {
        //Deleting token and user id in the local storage -> means that you're logged out because you don't have the token anymore
        localStorage.clear();
    }

    isLoggedIn() {
        //Check if the token exists and return that boolean
        return localStorage.getItem('token') !== null;
    }
}