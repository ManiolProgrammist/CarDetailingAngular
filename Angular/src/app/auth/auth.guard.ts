import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { StaticInfo } from '../static-info';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private userServ:UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(StaticInfo.getTokenPath())  != null&& this.userServ.LoggedUser!=null) {
      //zalogowany user - nie ważne kto
      return true;
    } else {
      
      this.router.navigate(['']);
      return false;
    }
  }

}
