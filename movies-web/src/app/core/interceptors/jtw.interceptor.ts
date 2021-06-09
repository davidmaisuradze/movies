import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCALSTORAGE_USER } from '../constants/general.constants';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JtwInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with user id if available
    const tokenData = localStorage.getItem(LOCALSTORAGE_USER);

    let authReq: HttpRequest<any>;
    if (!!tokenData) {
      const token = JSON.parse(tokenData).token;
      authReq = req.clone({setHeaders: {Authorization: token}});
    } else {
      authReq = req;
    }

    return next.handle(authReq).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          return this.router.navigate(['/login']);
        }
      }));
  }
}
