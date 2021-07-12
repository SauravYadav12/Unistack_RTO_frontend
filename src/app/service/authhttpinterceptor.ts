import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.auth.authToken);
    request = request.clone({
      
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.auth.authToken || ''
      })
    });
    

    return next.handle(request);
  }
}
