import { Injectable } from '@angular/core';
import { User } from '../UserModels/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { StaticInfo } from '../../static-info';
import { RegisterUser } from '../UserModels/register-user.model';
import { LoginUser } from '../UserModels/login-user.model';
import { tap, catchError } from 'rxjs/operators';
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { UserRights } from '../Enums/UserRightsEnum';
import { Observable } from 'rxjs';
import { throwError as observableThrowError, observable } from 'rxjs';
import { Result } from '../result.model';
import { UserType } from '../UserModels/user-type.model';
import { UserListComponentComponent } from 'src/app/Components/User_Components/user-list-component/user-list-component.component';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userRegister: RegisterUser;
  userLog: LoginUser;
  LoggedUser: User;
  IsLoggedIn: boolean;
  IsDontLoggMeOut: boolean;
  regexEmail: RegExp;
  regexPhoneNumber: RegExp;
  //From list we take user and save id - needed if we go to his orderList
  userIdChoosedFromList: number;
  constructor(private http: HttpClient, private route: Router) {
    this.userIdChoosedFromList = -1;
    this.userRegister = new RegisterUser();
    this.userLog = new LoginUser();
    this.IsLoggedIn = false;
    this.IsDontLoggMeOut = false;
    this.LoggedUser = new User();
    this.regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    this.regexPhoneNumber = /([(+]*[0-9]+[()+. -]*)/;
    if (localStorage.getItem(StaticInfo.getDontLogMeOutPath())) {
      if (localStorage.getItem(StaticInfo.getDontLogMeOutPath()) == 'true' && localStorage.getItem(StaticInfo.getTokenPath()) != null) {
        this.IsDontLoggMeOut = true;
        this.userSetInfo();


      } else {
        this.UserLogOut();
        this.IsDontLoggMeOut = false;
      }
    }

  }


  GetAllUserRights() {
    return this.http.get<Result<UserType[]>>(StaticInfo.getRootUrl() + 'UserType').pipe(catchError(this.errorHandler));
  }
  GetUserRightsById(id: number) {
    return this.http.get<Result<UserType>>(StaticInfo.getRootUrl + 'UserType/' + id).pipe(catchError(this.errorHandler));
  }

  GetAll(): Observable<Result<User[]>> {
    return this.http.get<Result<User[]>>(StaticInfo.getRootUrl() + 'User').pipe(catchError(this.errorHandler));
  }
  GetUserById(id: number): Observable<Result<User>> {
    return this.http.get<Result<User>>(StaticInfo.getRootUrl + 'User/' + id).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

  PutUser(user: User, userTypeId: number, userId: number): Observable<Result<User>> {
    var Pom = "";
    if (this.GetUserRights() == UserRights.AdminUser) {
      Pom = 'UserEditByAdm' + '/';
    } else {
      Pom = 'UserEditByEmp' + '/';
    }
    user.UserTypeId = userTypeId;
    user.UserType = null;
    return this.http.put<Result<User>>(StaticInfo.getRootUrl() + Pom + userId, user).pipe(catchError(this.errorHandler))
  }
  RemoveUser(id: number): Observable<Result<User>> {
    return this.http.delete<Result<User>>(StaticInfo.getRootUrl() + 'User/' + id).pipe(catchError(this.errorHandler))

  }

  userAuthentication(loginUser: LoginUser) {

    var data = "username=" + loginUser.Login + "&password=" + loginUser.Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/x-www-urlencoded' });
    return this.http.post(StaticInfo.getRootUrl() + 'login', data, { headers: reqHeader }).pipe(catchError(this.errorHandler));;
  }

  // userLogin(Log:LoginUser){
  //   this.userAuthentication(Log).subscribe((data: any) => {
  //     localStorage.setItem(StaticInfo.getTokenPath(), data.access_token);
  //     this.userSetInfo();
  //     // this.LoginUser();
  //   }, (err: HttpErrorResponse) => {
  //     console.log("blad logowania");
  //     console.log(err);
  //   }

  //   )
  // }

  userSetInfo() {
    this.getLogUserInfo().subscribe((data2: Result<User>) => {
      if (data2.status) {
        console.log(data2);
        this.LoggedUser = data2.value;
        this.IsLoggedIn = true;
        if (this.IsDontLoggMeOut) {
          localStorage.setItem(StaticInfo.getDontLogMeOutPath(), 'true');

        }
      }
    }, (err: HttpErrorResponse) => {
      this.UserLogOut();
      console.log("DatabaseError", err);
    }

    )
  }

  getLogUserInfo(): Observable<Result<User>> {
    return this.http.get<Result<User>>(StaticInfo.getRootUrl() + 'LogInfo').pipe(catchError(this.errorHandler));
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
    this.LoggedUser = new User();
  }

  UserRegister(form: NgForm): Observable<Result<User>> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<Result<User>>(StaticInfo.getRootUrl() + 'User', this.userRegister, { headers: reqHeader }).pipe(catchError(this.errorHandler));//

  }
  // UserRegisterTemporaryU(email:string):Observable<Result<User>>{
  //   var reqHeader=new HttpHeaders({'No-Auth':'True'});
  //   return this.http.post<Result<User>>(StaticInfo.getRootUrl() + 'TempUser', email, { headers: reqHeader }).pipe(catchError(this.errorHandler));//
  // }

  GetUserRights(): UserRights {

    if (this.IsLoggedIn) {
      if (!this.LoggedUser.UserType) {//if somethings go wrong
        this.userSetInfo()
      }
      if (this.LoggedUser.UserType.AccessRights == UserRights.AdminUser) {
        // console.log("rights:" +UserRights.AdminUser);
        return UserRights.AdminUser;
      }
      if (this.LoggedUser.UserType.AccessRights == UserRights.EmployeeUser) {
        // console.log("rights:" +UserRights.EmployeeUser);

        return UserRights.EmployeeUser;
      }
      if (this.LoggedUser.UserType.AccessRights == UserRights.TemporaryUser) {
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
  //0 - not exists, 1 - temporary user, 2 - normal user,3 employee, 4 admin
  shouldIShownItem(neededAuth: number | UserRights): boolean {

    if (this.GetUserRights() >= neededAuth) {
      return true;
    }
    return false;
  }


}



  // UserLogin(loginUser: LoginUser) {

  //   var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

  //   return this.http.get(StaticInfo.getRootUrl() + 'LoginUser/' + loginUser.Login + '/' + loginUser.Password, { headers: reqHeader })
  //     .toPromise()
  //     .then(
  //       res => {
  //         if (res['status'] as boolean == true) {
  //           this.LoggedUser = res['value'] as User;

  //           localStorage.setItem(StaticInfo.getLoginPath(), loginUser.Login);
  //           localStorage.setItem(StaticInfo.getPasswordPath(), loginUser.Password);
  //           this.IsLoggedIn = true;
  //           if (this.IsDontLoggMeOut) {
  //             localStorage.setItem(StaticInfo.getDontLogMeOutPath(), 'true');
  //           }
  //           this.route.navigate(['']);

  //         } else {
  //           console.log(res);
  //           console.log("error UserLogin", res);
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log("ERROR UserLogin err", err);
  //       }
  //     );
  // }