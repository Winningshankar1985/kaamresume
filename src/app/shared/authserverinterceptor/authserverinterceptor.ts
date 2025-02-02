import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '../../../../express.tokens'; // I will explain this later
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);
    const request = inject(REQUEST, { optional: true });
    if (isPlatformServer(platformId) && request && request?.cookies) {
        req = req.clone({
            headers: req.headers.set('myCookie', request?.cookies),
        });
    } else {
        req = req.clone({ withCredentials: false });
    }
    return next(req);
};