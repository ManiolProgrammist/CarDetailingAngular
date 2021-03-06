import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.css']
})
//as employee/admin display entire user list
export class UsersEditorComponent implements OnInit {
  public userList: User[];
  public nameList: string[];
  public surnameList: string[];
  public emailList: string[];
  public phoneList: string[];
  public displayUserList: User[];
  public userFormData: User;
  public userTypeIdDisplay: number;
  public confirmPassword: string;
  constructor(private userService: UserService, public router: Router, private utilityService: UtilityService) {
    this.userList = new Array<User>();
    this.displayUserList = new Array<User>();
    this.nameList = new Array<string>();
    this.surnameList = new Array<string>();
    this.emailList = new Array<string>();
    this.phoneList = new Array<string>();
    this.userFormData = null;
  }
  CustomPickUserBehaviour(user: User) {
    this.userFormData = this.utilityService.SimpleClone(user); //default behaviour -> dlatego że w menu wywołujemy to przez router link a nie jako chlidren object
    this.userTypeIdDisplay = user.UserTypeId;
    this.userService.userIdChoosedFromList = this.userFormData.UserId;
  };
  ngOnInit() {
    this.RefreshList();
  }
  UserListFilter(name: string, surname: string, email: string, phone: string) {
    this.displayUserList.splice(0, this.displayUserList.length);
    var pomArray = this.userList.filter(value => {
      var returnFlag = true;
      if ((value.FirstName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) == false) && name != "") {
        returnFlag = false;
      }
      if ((value.Surname.toLocaleLowerCase().includes(surname.toLocaleLowerCase()) == false) && surname != "") {
        returnFlag = false;
      }
      if ((value.Email.toLocaleLowerCase().includes(email.toLocaleLowerCase()) == false) && email != "") {
        returnFlag = false;
      }
      if ((value.PhoneNumber.toLocaleLowerCase().includes(phone.toLocaleLowerCase()) == false) && phone != "") {
        returnFlag = false;
      }
      return returnFlag;
    })
    pomArray.forEach(us => {
      this.displayUserList.push(us);
    })

  }
  RefreshList() {
    this.userService.GetAll().toPromise().then(
      res => {
        if (res["status"]) {
          this.userList.splice(0, this.userList.length);
          var pom = JSON.parse(JSON.stringify(res))["value"] as User[];
          this.userList.splice(0, this.userList.length);
          this.nameList.splice(0, this.nameList.length);
          this.surnameList.splice(0, this.surnameList.length);
          this.emailList.splice(0, this.emailList.length);
          this.phoneList.splice(0, this.phoneList.length);
          this.displayUserList.splice(0, this.displayUserList.length);
          pom.forEach(u => {
            this.userList.push(u);
            this.displayUserList.push(u);
            this.nameList.push(u.FirstName);
            this.surnameList.push(u.Surname);
            this.emailList.push(u.Email);
            this.phoneList.push(u.PhoneNumber);
          })
        } else {
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
}
