import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NgModel,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm: FormGroup;
    constructor() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }
    login($event: Event) {
        $event.preventDefault();
        console.log(this.loginForm.valid);
    }
}
