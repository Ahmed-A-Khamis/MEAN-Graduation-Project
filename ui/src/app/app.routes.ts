import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent,
    },
    {
        path: 'products/add',
        component: ProductFormComponent,
    },
    {
        path: 'products/edit/:name',
        component: ProductFormComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
