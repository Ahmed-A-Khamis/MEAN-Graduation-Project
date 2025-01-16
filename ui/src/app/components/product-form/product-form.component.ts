import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    isEdit: boolean = false;
    productForm: FormGroup;
    selectedFile: File | null = null;
    image: any = null;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {
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
            image: new FormControl(''),
        });
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params['name']) {
                this.isEdit = true;
                this.http
                    .get(`http://localhost:3124/api/products/${params['name']}`)
                    .subscribe((data: any) => {
                        this.productForm.setValue({
                            name: data['name'],
                            description: data['description'],
                            price: data['price'],
                            quantity: data['quantity'],
                            image: '',
                        });
                        this.image = data['image'];
                    });
            }
        });
    }
    onFileSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.selectedFile = file;

            const reader = new FileReader();
            reader.onload = (e) => (this.image = reader.result);
            reader.readAsDataURL(file);
        }
    }
    submit(event: Event) {
        event.preventDefault();
        if (!confirm('Are you sure you want to submit?')) return;

        const formData = new FormData();
        formData.append('name', this.productForm.value.name);
        formData.append('description', this.productForm.value.description);
        formData.append('price', this.productForm.value.price);
        formData.append('quantity', this.productForm.value.quantity);
        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        if (this.isEdit) {
            this.http
                .put(
                    `http://localhost:3124/api/products/${this.productForm.value.name}`,
                    formData
                )
                .subscribe({
                    next: (response) => {
                        console.log('Product updated successfully:', response);
                        this.productForm.reset();
                        this.selectedFile = null;
                        this.image = null;
                        this.router.navigate(['products']);
                    },
                    error: (error) => {
                        console.error('Error updating product:', error);
                    },
                });
        } else {
            this.http
                .post('http://localhost:3124/api/products', formData)
                .subscribe({
                    next: (response) => {
                        console.log('Product created successfully:', response);
                        this.productForm.reset();
                        this.selectedFile = null;
                        this.image = null;
                    },
                    error: (error) => {
                        console.error('Error creating product:', error);
                    },
                });
        }
    }
    reset(event: Event) {
        console.log(this.productForm);

        event.stopPropagation();
        event.preventDefault();
        if (!confirm('Are you sure you want to discard?')) return;
        console.log('Form reset');
    }
}
