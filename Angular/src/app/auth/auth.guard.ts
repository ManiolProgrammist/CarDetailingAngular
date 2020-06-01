import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaticInfo } from '../static-info';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(StaticInfo.getTokenPath())  != null) {
      //zalogowany user - nie ważne kto
      return true;
    } else {
      
      console.log(localStorage.getItem(StaticInfo.getLoginPath()));
      console.log(localStorage.getItem(StaticInfo.getPasswordPath()));
      this.router.navigate(['']);
      return false;
    }
  }

}
