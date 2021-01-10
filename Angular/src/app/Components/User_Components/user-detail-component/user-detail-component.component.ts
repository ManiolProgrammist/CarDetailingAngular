import { Component, Input, OnInit } from '@angular/core';
import { NgForm, AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule, PatternValidator } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/UserModels/user.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { TouchSequence } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/result.model';
import { UserType } from 'src/app/shared/UserModels/user-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-user-detail-component',
  templateUrl: './user-detail-component.component.html',
  styleUrls: ['./user-detail-component.component.css']
})

export class UserDetailComponentComponent implements OnInit {
  userId: number;
  IsEdit: boolean = false;
  UserTypesList: UserType[];

  @Input() RefreshUserList: () => void;
  @Input() userFormData: User;
  @Input() userTypeIdDisplay: number;
  public regexPhoneNumber: RegExp;
  public regexEmail: RegExp;
  public userPom: User;
  // form: FormGroup;
  constructor(private userService: UserService, public route: ActivatedRoute, public utilityService: UtilityService, public router: Router) {
    this.regexEmail = userService.regexEmail;
    this.regexPhoneNumber = userService.regexPhoneNumber;
    this.IsEdit = false;
    userService.GetAllUserRights().toPromise().then(
      res => {
        if (res["status"]) {
          this.UserTypesList = res["value"] as UserType[];
          console.log("lista z type", res["value"]);
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



  ngOnInit() {
    if (this.userFormData == null) {
      this.resetForm();
    }
    // let id=this.route.paramMap.pipe(
  }

  IsAdmin() {

    return this.userService.GetUserRights() == UserRights.AdminUser;
  }
  IsAdminAndEdit() {
    return this.IsAdmin() && this.IsEdit;
  }
  AcceptEdit() {
    this.IsEdit = false;
    this.userFormData.UserTypeId = this.userTypeIdDisplay;
    this.userFormData.UserType = null;
    this.userService.PutUser(this.userFormData, this.userTypeIdDisplay, this.userFormData.UserId).subscribe(
      (res) => {
        if (res['status'] as boolean == true) {
          if (this.RefreshUserList != null) {
            this.RefreshUserList();
          }
        } else {
          this.CancelEdit();
          alert("error przy edytowaniu usera, " + res.info);
          console.log("edit user error:", res)
        }
      }
      ,
      (err: any) => {
        alert("ERROR EditUser" + String(err));
      }

    )
  }
  CancelEdit() {
    this.IsEdit = false;
    this.userFormData.Email = this.userPom.Email;
    this.userFormData.FirstName = this.userPom.FirstName;
    this.userFormData.Login = this.userPom.Login;
    this.userFormData.PhoneNumber = this.userPom.PhoneNumber;
    this.userFormData.Surname = this.userPom.Surname;
    this.userFormData.UserTypeId = this.userPom.UserTypeId;
    this.userFormData.InformationId = this.userPom.InformationId;
    this.userTypeIdDisplay = this.userPom.UserTypeId;

  }
  GoToOrderList(){
    this.router.navigate(['Picked_User_Order_List']);
  }
  EditThisForm() {
    this.IsEdit = true;
    this.userPom = this.utilityService.SimpleClone(this.userFormData);
  }
  // NgForm-formularz angulara z strony html który mu prześlemy (lub nie) do resetu, 
  // bo wywołamy to na html jeszcze
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.userFormData = new User();
  }

  RemoveUser() {
    if (confirm("Na Pewno chcesz usunąć tego użytkownika?")) {
      this.userService.RemoveUser(this.userFormData.UserId).subscribe(
        res => {
          if (res['status'] as boolean == true) {
            // this.refreshList();
            this.RefreshUserList();
          } else {
            console.log("error przy usuwaniu usera", res.info);
          }
        },
        (err: HttpErrorResponse) => {
          console.log("ERROR RemoveUser" + this.userFormData.UserId, err);
        }
      );
    } else {
      console.log('anulowano usuwanie');
    }
  }

}
