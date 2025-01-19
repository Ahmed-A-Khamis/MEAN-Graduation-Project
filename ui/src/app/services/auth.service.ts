import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    successMessage: string = '';
    errorMessage: string = '';
    constructor(private http: HttpClient) {}

    // isLoggedIn(): Observable<boolean> {
    //     const token = localStorage.getItem('token');
    //     return this.http
    //         .post<boolean>('http://localhost:3124/api/auth/token-validator', {
    //             token,
    //         })
    //         .pipe(map((data) => data));
    // }

    login(
        formValue: any
    ): Observable<{ status: string; message: string; token?: string }> {
        return this.http
            .post<{ status: string; message: string; token?: string }>(
                'http://localhost:3124/api/auth/login',
                formValue
            )
            .pipe(
                map((data) => {
                    data['token']
                        ? localStorage.setItem('token', data['token'])
                        : null;
                    return data;
                })
            );
    }

    signup(formValue: any): Observable<{ status: string; message: string }> {
        return this.http
            .post<{ status: string; message: string }>(
                'http://localhost:3124/api/auth/register',
                formValue
            )
            .pipe(
                map((data) => {
                    return { status: data['status'], message: data['message'] };
                })
            );
    }
}
