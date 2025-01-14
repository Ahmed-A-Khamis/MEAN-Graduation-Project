import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgFor } from '@angular/common';

type Product = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    imageUrl: string;
};

@Component({
    selector: 'app-product-list',
    imports: [NgFor],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductListComponent {
    products: Product[] = [];
    constructor(private http: HttpClient) {}
    ngOnInit() {
        this.http
            .get('http://localhost:3124/api/products')
            .subscribe((data) => {
                this.products = data as Product[];
            });
    }
}
