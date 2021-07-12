import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(this.authService.isLoggedIn)
    return this.authService.isLoggedIn.pipe(
      skipWhile( (val) => val === null),
      take(1),
      tap((auth)=>{
        // console.log(auth);
        if(!auth){
          this.router.navigateByUrl('/')
        }
      })
    );
    
  
  }
  
}
