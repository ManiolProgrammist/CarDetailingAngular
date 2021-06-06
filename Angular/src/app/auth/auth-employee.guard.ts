import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaticInfo } from '../static-info';
import { UserService } from '../shared/services/user.service';
import { UserRights } from '../shared/Enums/UserRightsEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(StaticInfo.getTokenPath()) != null) {
      return this.userService.GetUserRights() >= UserRights.EmployeeUser;
      // if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
      // //zalogowany user - nie ważne kto
      // return true;
      // }else{
      //   console.log("brak dostępu, twoje prawa:",this.userService.GetUserRights());
      //   console.log("wymagane prawa:",UserRights.EmployeeUser);
      //   return false;
      // }
    } else {

      console.log("brak dostępu, użytkownik niezalogowany");
      this.router.navigate(['']);
      return false;
    }
  }

}


