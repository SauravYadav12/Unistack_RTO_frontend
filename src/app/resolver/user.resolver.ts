import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CustomerService } from '../service/customer.service';
import { Observable, of } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
 
  role: any
  constructor(private authService: AuthService,
              private CustomerService:CustomerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    this.role = localStorage.getItem('role')
    return this.role
  }
}
