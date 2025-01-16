import { CommonModule, NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    NgModel,
    NgModelGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

type Product = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    imageUrl: string;
};

@Component({
    selector: 'app-product-form',
    imports: [ReactiveFormsModule, CommonModule, FormsModule],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
    productForm: FormGroup;
    constructor() {
        this.productForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            quantity: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
            image: new FormControl('', [Validators.required]),
        });
    }
    submit(event: Event) {
        event.preventDefault();
        confirm('Are you sure you want to submit?');
        console.log(this.productForm);
    }
    reset(event: Event) {
        confirm('Are you sure you want to discard?');
        console.log('Form reset');
    }
}
