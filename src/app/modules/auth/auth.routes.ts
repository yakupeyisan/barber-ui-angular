import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';

export default [
    {path: '', pathMatch : 'full', redirectTo: 'sign-in'},
    {
        path     : 'sign-in',
        canActivate: [NoAuthGuard],
        component: SignInComponent,
    },
    {
        path     : 'sign-out',
        canActivate: [AuthGuard],
        component: SignOutComponent,
    },
] as Routes;
