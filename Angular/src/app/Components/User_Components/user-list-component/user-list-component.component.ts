import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/UserModels/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/result.model';
@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponentComponent implements OnInit {


  @Input() CustomPickUserBehaviour: (user: User) => void;
  @Input() UserListFilter: (name: string, surname: string, email: string, phone: string) => void;
  @Input() userList: User[];
  @Input() nameList: string[];
  @Input() surnameList: string[];
  @Input() emailList: string[];
  @Input() phoneList: string[];
  searchName: string;
  searchSurname: string;
  searchEmail: string;
  searchPhone: string;
  //możemy tutaj sobie już korzystać z userService
  constructor(public userService: UserService, public router: Router) {
    this.searchName = "";
    this.searchSurname = "";
    this.searchEmail = "";
    this.searchPhone = "";
  }

  ngOnInit() {

  }

  Filter() {
    this.UserListFilter(this.searchName, this.searchSurname, this.searchEmail, this.searchPhone);
  }

  OpenDetails(user: User) {
    //,{userID:user.UserId}
    if (this.CustomPickUserBehaviour == null) {
      // this.userService.userFormData = this.simpleClone(user); //default behaviour -> dlatego że w menu wywołujemy to przez router link a nie jako chlidren object
      // this.userService.UserRInUserDetail = user.UserTypeId;
      // this.userService.confirmPassword = this.userService.userFormData.Password;
      // this.router.navigate(['User_List', 'User_edit']);
    } else {
      this.CustomPickUserBehaviour(this.simpleClone(user));
    }

    // this.userService.userFormData=user;
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }

}
