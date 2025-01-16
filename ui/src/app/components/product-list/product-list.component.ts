import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type Product = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    image: string;
};

@Component({
    selector: 'app-product-list',
    imports: [NgFor, RouterLink],
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
