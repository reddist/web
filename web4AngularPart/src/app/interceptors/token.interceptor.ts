import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');
    // console.log('Cookie: ' + request.headers.get('Cookie'));
    const requestConfig = {
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: '/',
        'Cache-Control': 'no-cache',
        Cookie: document.cookie
      },
      credentials: 'same-origin'
    };
    if (token) {
      this.cookieService.set('login', login, );
      this.cookieService.set('password', password);
      // request = request.clone(requestConfig);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['welcome']);
        }
        return throwError(error);
      }));
  }
}
