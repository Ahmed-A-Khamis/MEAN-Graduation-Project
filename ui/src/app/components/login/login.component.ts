import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    errorMessage: string = '';
    successMessage: string = '';
    loginForm: FormGroup;
    constructor(private auth: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('test@test.com', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('testtest', [Validators.required]),
        });
    }
    ngOnInit() {
        this.loginForm.valueChanges.subscribe((_) => {
            this.successMessage = '';
            this.errorMessage = '';
        });
    }
    login($event: Event) {
        $event.preventDefault();
        this.auth.login(this.loginForm.value).subscribe({
            next: (data) => {
                if (!data['token']) {
                    this.errorMessage = data['message'];
                    console.log('error');
                    console.log(this.errorMessage);
                    return;
                } else {
                    this.successMessage = data['message'];
                    console.log('success');
                    console.log(this.successMessage);
                    localStorage.setItem('token', data['token']);
                    setTimeout(() => {
                        this.router.navigate(['products']);
                    }, 1000);
                }
            },
            error: (error) => (this.errorMessage = error.error.message),
        });
    }
}
