import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let request = req;
    if (token) {
    request = req.clone({
    setHeaders: {
    authorization: `Bearer ${token}`
    }
    });
    }
    console.log(request.url)
    return next.handle(request);
    }
}
