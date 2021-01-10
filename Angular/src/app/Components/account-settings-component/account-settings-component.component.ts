import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-account-settings-component',
  templateUrl: './account-settings-component.component.html',
  styleUrls: ['./account-settings-component.component.css']
})
export class AccountSettingsComponentComponent implements OnInit {
  loggedUser:User;
  constructor(private userService:UserService,private utilityService:UtilityService) { 
    if(userService.LoggedUser!=null&&userService.IsLoggedIn){
      this.loggedUser=utilityService.SimpleClone(userService.LoggedUser);
      
    }
  }

  ngOnInit(): void {
  }

}
