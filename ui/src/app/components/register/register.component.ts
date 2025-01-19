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
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';
    constructor(private auth: AuthService, private router: Router) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.min(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.min(6),
            ]),
        });
    }

    ngOnInit() {
        this.registerForm.valueChanges.subscribe((_) => {
            this.successMessage = '';
            this.errorMessage = '';
        });
    }

    register($event: Event) {
        $event.preventDefault();
        if (!confirm('Are you sure you want to register?')) return;
        this.auth.signup(this.registerForm.value).subscribe({
            next: (data) => {
                console.log(data);
                this.successMessage = data.message;
                this.registerForm.reset();
                setTimeout(() => {
                    this.router.navigate(['products']);
                }, 1000);
            },
            error: (error) => (this.errorMessage = error.error.message),
        });
    }
}
