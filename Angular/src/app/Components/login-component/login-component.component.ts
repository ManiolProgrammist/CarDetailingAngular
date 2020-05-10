import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { LoginUser } from '../../shared/UserModels/login-user.model';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  Login:string;
  Password:string;
  constructor(private userService:UserService) { 
    this.Login="";
    this.Password="";
  }

  isLoggedIn():boolean{
    return this.userService.IsLoggedIn;
  }
  
  ngOnInit() {
  }
  LoginUser(){
    var Log=new LoginUser();
    Log.Password=this.Password;
    Log.Login=this.Login;
    this.userService.UserLogin(Log)
  }
  LogOffUser(){
    this.userService.UserLogOut();
  }
  ShowLogin(){
    return this.userService.LoggedUser.Login;
  }
}
