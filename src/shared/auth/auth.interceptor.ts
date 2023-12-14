import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('token');
    if (req.url.startsWith('/api')) {
      const url = 'https://prod.maritimes.news';
      // const url='http://localhost:8000'
      req = req.clone({
        url: url + req.url
      });
    } else if (req.url.startsWith('/mail/ports/')) {
      const url = 'https://backend.efficasea.com';
      req = req.clone({
        url: url + req.url
      });
    }
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

