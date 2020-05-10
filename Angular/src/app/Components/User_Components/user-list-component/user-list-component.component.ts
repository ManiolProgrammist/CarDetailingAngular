import { Component, OnInit } from '@angular/core';
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

  public usersList:User[];

  //możemy tutaj sobie już korzystać z userService
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.userService.refreshList();
  }

  OpenDetails(user:User){
    //,{userID:user.UserId}
    this.userService.userFormData= this.simpleClone(user);
    this.userService.UserRInUserDetail=user.UserTypeId;
    this.userService.confirmPassword= this.userService.userFormData.Password;
    this.router.navigate(['User_List','User_edit']);
    // this.userService.userFormData=user;
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
}

}
