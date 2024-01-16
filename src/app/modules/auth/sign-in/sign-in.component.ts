import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { barberAnimations } from '@barber/animations';
import { BarberAlertComponent, BarberAlertType } from '@barber/components/alert';
import { AuthService } from 'app/core/services';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : barberAnimations,
    standalone   : true,
    imports      : [RouterLink, BarberAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class SignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: BarberAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
    )
    {
    }

    ngOnInit(): void
    {
        this.createLoginForm();
    }
    createLoginForm(){
        this.signInForm = this.formBuilder.group({
            userName     : ['admin@admin.com', [Validators.required, Validators.email]],
            password  : ['1234', Validators.required]
        });
    }
    signIn(): void
    {
        if ( this.signInForm.invalid )
        {
            return;
        }
        this.signInForm.disable();
        this.showAlert = false;
        this.authService.login(this.signInForm.value)
            .subscribe(
                () =>
                {
                    const redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    this.router.navigateByUrl(redirectURL);

                },
                (response) =>
                {
                    this.signInForm.enable();

                    this.signInNgForm.resetForm();

                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password',
                    };

                    this.showAlert = true;
                },
            );
    }
}
