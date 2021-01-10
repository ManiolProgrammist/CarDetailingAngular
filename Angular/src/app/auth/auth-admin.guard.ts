import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaticInfo } from '../static-info';
import { UserService } from '../shared/services/user.service';
import { UserRights } from '../shared/Enums/UserRightsEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router,private userService:UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem(StaticInfo.getTokenPath())  != null) {
        if(this.userService.GetUserRights()==UserRights.AdminUser){
        return true;
        }else{
          console.log("brak dostępu, twoje prawa:",this.userService.GetUserRights());
          console.log("wymagane prawa:",UserRights.AdminUser);
          return false;
        }
      } else {
        
        console.log("brak dostępu, użytkownik niezalogowany");
        this.userService.UserLogOut();
        this.router.navigate(['']);
        return false;
      }
    }
  
}
