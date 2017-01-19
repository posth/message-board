import { Routes, RouterModule } from '@angular/router';

//Component Routes
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

//Sub routes
import { AUTH_ROUTES } from './auth/auth.routes';

const APP_ROUTES: Routes = [
    // have to have a / in front of messages to make the path absolute and not concatenate it onto the current one
    //pathMatch full is that the path has to match it in full, if it's empty and there is not pathMatch, every path will default to it
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

//This registeres our routes in the angular router module
//exporting it as a constant variable, the module with our routes, so that it can be imported in the app module with the routes as a parameter
export const routing = RouterModule.forRoot(APP_ROUTES);

