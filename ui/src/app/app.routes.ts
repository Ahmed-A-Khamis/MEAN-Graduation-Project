import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';
import { tokenValidatorGuard } from './guards/token-validator.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent,
    },
    {
        path: 'products/add',
        canActivate: [tokenValidatorGuard],
        component: ProductFormComponent,
    },
    {
        path: 'products/edit/:name',
        canActivate: [tokenValidatorGuard],
        component: ProductFormComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '**',
        redirectTo: 'products',
    },
];
