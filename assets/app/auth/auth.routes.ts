import { Routes} from '@angular/router';
import { SignupComponent } from './sign-up/signup.component';
import { SigninComponent } from './sign-in/signin.component';
import { LogoutComponent } from './logout.component';

//For setting up sub-routes as a child-routes of my main app routing
export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full'},
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'logout', component: LogoutComponent}
];

