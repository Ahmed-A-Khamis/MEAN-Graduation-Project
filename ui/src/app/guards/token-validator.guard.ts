import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenValidatorGuard: CanActivateFn = (
    route,
    state
): Observable<boolean> => {
    const http = inject(HttpClient);
    let token;
    // const _ = inject(AuthService)
    //     .isLoggedIn()
    //     .subscribe((data) => {
    //         token = data;
    //     });
    return http
        .post<boolean>('http://localhost:3124/api/auth/token-validator', {
            token,
        })
        .pipe(map((data) => data));
};
