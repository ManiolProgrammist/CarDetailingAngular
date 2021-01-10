import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.css']
})
export class UserPickerComponent implements OnInit {

  constructor(private userService: UserService, public router: Router) {
    this.userList = new Array<User>();
    this.displayUserList = new Array<User>();
    this.nameList = new Array<string>();
    this.surnameList = new Array<string>();
    this.emailList = new Array<string>();
    this.phoneList = new Array<string>();
  }
  public userList: User[];
  public nameList: string[];
  public surnameList: string[];
  public emailList: string[];
  public phoneList: string[];
  public displayUserList: User[];
  @Input() CustomUserPickBehaviour: (user: User) => void;
  ngOnInit(): void {
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
          console.log(this.displayUserList);
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

