import { Injectable } from '@angular/core';
import { User } from '../UserModels/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { StaticInfo } from '../../static-info';
import { RegisterUser } from '../UserModels/register-user.model';
import { LoginUser } from '../UserModels/login-user.model';
import { tap, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { UserRights } from '../Enums/UserRightsEnum';
import { Observable } from 'rxjs';
import {throwError as observableThrowError, observable} from 'rxjs';
import { Result } from '../result.model';
import { UserType } from '../UserModels/user-type.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  //nieużywane?
  userFormData: User;
  userList: User[];
  userRegister: RegisterUser;
  userLog: LoginUser;
  LoggedUser: User;
  IsLoggedIn: boolean;
  IsDontLoggMeOut: boolean;
  regexEmail:RegExp;
  confirmPassword:string;
  UserRInUserDetail:number;
  constructor(private http: HttpClient, private route: Router) {
    this.confirmPassword="";
    this.userFormData = new User();
    this.userRegister = new RegisterUser();
    this.userLog = new LoginUser();
    this.IsLoggedIn = false;
    this.IsDontLoggMeOut = false;
    
    this.regexEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (localStorage.getItem(StaticInfo.getDontLogMeOutPath())) {
      if (localStorage.getItem(StaticInfo.getDontLogMeOutPath()) == 'true') {
        var ul = new LoginUser();
        ul = {
          Login: localStorage.getItem(StaticInfo.getLoginPath()),
          Password: localStorage.getItem(StaticInfo.getPasswordPath())
        };
        this.UserLogin(ul);
        this.IsDontLoggMeOut = true;
      } else {
        localStorage.clear();
        this.IsDontLoggMeOut = false;
      }
    }
    this.userLog
    // const source = "abcd";
    // const subscribe = source.subscribe(val => console.log(val));

  }

  refreshList() {
    this.GetAll().toPromise().then(
      res => {
        if(res["status"]){
          console.log("res:",JSON.parse(JSON.stringify(res))["value"] ) ;
        this.userList = JSON.parse(JSON.stringify(res))["value"] as User[];
        console.log("lista z refresh list:", res["value"]);
        }else{
          console.log("RefreshListError");
          console.log(res["info"]);
          
        }
      },
      err => {
        // console.clear();
        console.log("ERROR refreshList");
        console.log(err);
      }
    );
  }

  GetAllUserRights(){
    return this.http.get<Result<UserType[]>>(StaticInfo.getRootUrl() + 'UserType').pipe(catchError(this.errorHandler));
  }
  GetUserRightsById(id:number){
    return this.http.get<Result<UserType>>(StaticInfo.getRootUrl+'UserType/'+id).pipe(catchError(this.errorHandler));
  }

  GetAll():Observable<Result<User[]>>{
    return this.http.get<Result<User[]>>(StaticInfo.getRootUrl() + 'User').pipe(catchError(this.errorHandler));
  }
  GetUserById(id:number):Observable<Result<User>>{
    return this.http.get<Result<User>>(StaticInfo.getRootUrl+'User/'+id).pipe(catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

  AddUser() {
    //zwraca "observera"
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(StaticInfo.getRootUrl() + 'User', this.userFormData, { headers: reqHeader }).toPromise()
    .then(
      res => {
        if (res['status'] as boolean == true) {
          console.log("pomyslnie stworzony user");
        }else{
          console.log("error przy tworzeniu usera",res);
        }},
        (err: HttpErrorResponse) => {
          console.log("ERROR AddUser", err);
        }
        );
  }
  EditUser(){
    var Pom="";
    if(this.GetUserRights()==UserRights.AdminUser){
      Pom='UserEditByAdm'+'/';
    }else{
      Pom='UserEditByEmp'+'/';
    }
    this.userFormData.UserTypeId=this.UserRInUserDetail;
    this.userFormData.UserType=null;
    return this.http.put(StaticInfo.getRootUrl()+Pom+this.userFormData.UserId,this.userFormData).toPromise()
    .then(
      res => {
        if (res['status'] as boolean == true) {
          
          console.log("pomyslnie edytowany user");
          this.refreshList();
        }else{
          console.log("error przy edytowaniu usera",res);
        }},
        (err: HttpErrorResponse) => {
          console.log("ERROR EditUser"+ Pom, err);
        }
        );
  }
  RemoveUser(id:number){
    return this.http.delete(StaticInfo.getRootUrl()+'User/'+id).toPromise()
    .then(
      res => {
        if (res['status'] as boolean == true) {
          
          console.log("pomyslnie usunięty user");
          this.route.navigate(['User_List']);
          this.refreshList();
        
        }else{
          console.log("error przy usuwaniu usera",res);
        }},
        (err: HttpErrorResponse) => {
          console.log("ERROR RemoveUser"+ id, err);
        }
        );
  }

  UserLogin(loginUser: LoginUser) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(StaticInfo.getRootUrl() + 'LoginUser/'+ loginUser.Login+'/'+loginUser.Password, { headers: reqHeader })
      .toPromise()
      .then(
        res => {
          if (res['status'] as boolean == true) {
            this.LoggedUser = res['value'] as User;
          
            localStorage.setItem(StaticInfo.getLoginPath(), loginUser.Login);
            localStorage.setItem(StaticInfo.getPasswordPath(), loginUser.Password);
            this.IsLoggedIn = true;
            if (this.IsDontLoggMeOut) {
              localStorage.setItem(StaticInfo.getDontLogMeOutPath(), 'true');
            }
            this.route.navigate(['']);

          } else {
            console.log(res);
            console.log("error UserLogin", res);
          }
        },
        (err: HttpErrorResponse) => {
          console.log("ERROR UserLogin err", err);
        }
      );


  }
  UserLogOut() {
    localStorage.clear();
    this.IsLoggedIn = false;
    this.userLog.Login = "";
    this.userLog.Password = "";
    this.IsDontLoggMeOut = false;

    this.ResetLoggedUser();
    this.route.navigate(['']);
  }
  ResetLoggedUser() {
     this.LoggedUser = null;
     //{
    //   UserId: 0,
    //   Login: '',
    //   Password: '',
    //   Email: '',
    //   FirstName: '',
    //   Surname: '',
    //   PhoneNumber: '',
    //   AccoutCreateDate: new Date(),
    //   UserTypeId:0,
    //   UserType:{UserTypeId:0,Name:'',AccessRights:0},
    //   // IsAdmin: false,
    //   // IsEmployee: false,
    //   // IsTemporary: false,
    //   InformationId: null,
    // }
  }

  UserRegister(form: NgForm) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(StaticInfo.getRootUrl() + 'User', this.userRegister, { headers: reqHeader }).toPromise()
      .then(res => {
        if (res['status'] as boolean == true) {
          console.log("udało się zarejestrować");
          this.route.navigate(['']);

        } else {
          console.log("error error", res['info'], res);
        }
      },
        (err: HttpErrorResponse) => {
          // console.clear();
          console.log("ERROR UserLogin", err);
        }
      );
  }


  GetUserRights(): UserRights {

    if (this.LoggedUser!=null &&this.LoggedUser!=undefined) {
      
      if (this.LoggedUser.UserType.AccessRights==UserRights.AdminUser) {
        // console.log("rights:" +UserRights.AdminUser);
        return UserRights.AdminUser;
      }
      if (this.LoggedUser.UserType.AccessRights==UserRights.EmployeeUser) {
        // console.log("rights:" +UserRights.EmployeeUser);

        return UserRights.EmployeeUser;
      }
      if (this.LoggedUser.UserType.AccessRights==UserRights.TemporaryUser) {
        // console.log("rights:" +UserRights.TemporaryUser);
        return UserRights.TemporaryUser;

      }
      // console.log("rights:" +UserRights.NormalUser);

      return UserRights.NormalUser;
    }
    else {
      // console.log("rights:" +UserRights.NotExistUser);
      return UserRights.NotExistUser;
    }
  }


}

