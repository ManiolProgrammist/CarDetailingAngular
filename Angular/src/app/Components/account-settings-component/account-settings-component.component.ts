import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/shared/result.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-account-settings-component',
  templateUrl: './account-settings-component.component.html',
  styleUrls: ['./account-settings-component.component.css']
})
export class AccountSettingsComponentComponent implements OnInit {
  loggedUser: User;
  public oldPassword: string;
  public newPassword: string;
  public newPasswordRepeat: string;
  startChangingPasswFlag: boolean;
  constructor(private userService: UserService, private utilityService: UtilityService, private router: Router) {
    this.CancelChangingPassword();
    if (userService.LoggedUser != null && userService.IsLoggedIn) {
      this.loggedUser = utilityService.SimpleClone(userService.LoggedUser);
    } else {
      this.router.navigate([""]);
      console.log("loggedUser=null");
    }
  }


  ChangeYourPasswordButton() {
    this.startChangingPasswFlag = false;
  }
  CancelChangingPassword() {
    this.startChangingPasswFlag = true;

    this.oldPassword = "";
    this.newPassword = "";
    this.newPasswordRepeat = "";
  }
  AcceptChangePassword() {
    if ((this.newPassword == this.newPasswordRepeat) && (this.newPassword != "")&& (this.oldPassword != "")) {
      if(confirm('Na pewno chcesz zmienić hasło?')){
      this.userService.ChangePassword(this.loggedUser.Login, this.oldPassword, this.newPassword).subscribe(
        (res: Result<User>) => {
          if (res.status == true) {
            alert("poprawnie zmieniono hasło użytkownika");
            this.CancelChangingPassword();
          } else {
            alert("wystąpił problem: " + res.info);
          }
        },
        (error: any) => {
          alert("wystąpił problem")
          console.log(error);
        }
      )
      }else{
        this.CancelChangingPassword();
      }
    }else{
      alert("niepoprawne dane")
    }
  }

  ngOnInit(): void {
    this.CancelChangingPassword();
  }

}
