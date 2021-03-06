import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { LoginUser } from '../../shared/UserModels/login-user.model';
import { StaticInfo } from 'src/app/static-info';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/UserModels/user.model';
import { Result } from 'src/app/shared/result.model';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  
  constructor(private userService: UserService,private utilityService:UtilityService) {
    // var test="abcdefgh";
    // console.log("password encryption:",test);
    // console.log("password encrypted",utilityService.EncryptPasswordForRegister(test,""));
    this.Login = "";
    this.Password = "";
  }
  @Input() LogInFromDiffrentSource:(user:User)=>void;
  get IsDontLoggMeOut(){
    return this.userService.IsDontLoggMeOut;
  }
  set IsDontLoggMeOut(b:boolean){
    this.userService.IsDontLoggMeOut=b;
  }

  set Login(s:string){
    this.userService.userLog.Login=s;
  }

  get Login(){
   return this.userService.userLog.Login;
  }
  set Password(p:string){
    this.userService.userLog.Password=p;
  }
  get Password(){
    return this.userService.userLog.Password;
  }

  isLoggedIn(): boolean {
    return this.userService.IsLoggedIn;
  }

  ngOnInit() {
  }

  onSubmitToken() {
    var Log = new LoginUser();
    Log.Password = this.Password;
    Log.Login = this.Login;
    this.userService.userAuthentication(Log).subscribe((data: any) => {
      localStorage.setItem(StaticInfo.getTokenPath(), data.access_token);
 
      this.userService.getLogUserInfo().subscribe((data2: Result<User>) => {
        if (data2.status) {
          console.log(data2);
          this.userService.LoggedUser = data2.value;
          this.userService.IsLoggedIn = true;
          if (this.IsDontLoggMeOut) {
            localStorage.setItem(StaticInfo.getDontLogMeOutPath(), 'true');
  
          }
          if(this.LogInFromDiffrentSource){
            this.LogInFromDiffrentSource(this.userService.LoggedUser);
          }
        }
      }, (err: HttpErrorResponse) => {
        this.userService.UserLogOut();
        console.log("DatabaseError", err);
      }
  
      )
 
     
    }, (err: HttpErrorResponse) => {
      console.log("blad logowania");
      console.log(err);
    }

    )
  
  }
  // LoginUser(){
  //   var Log=new LoginUser();
  //   Log.Password=this.Password;
  //   Log.Login=this.Login;
  //   this.userService.UserLogin(Log)
  // }
  LogOffUser() {
    this.userService.UserLogOut();
  }
  ShowLogin() {
    return this.userService.LoggedUser.Login;
  }
}
