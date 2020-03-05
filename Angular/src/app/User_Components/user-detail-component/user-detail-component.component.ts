import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl, FormGroup, FormControl, Validators,ReactiveFormsModule, PatternValidator  } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/UserModels/user.model';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { TouchSequence } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/result.model';
import { UserType } from 'src/app/shared/UserModels/user-type.model';

@Component({
  selector: 'app-user-detail-component',
  templateUrl: './user-detail-component.component.html',
  styleUrls: ['./user-detail-component.component.css']
})

export class UserDetailComponentComponent implements OnInit {
  userId:number;
  IsEdit:boolean=false;
  userDet$:Observable<Result<User>>;
  UserTypesList:UserType[];


  // form: FormGroup;
  constructor(private userService:UserService,private route: ActivatedRoute,private router: Router,) { 
    this.IsEdit=false;
   userService.GetAllUserRights().toPromise().then(
    res => {
      if(res["status"]){
      this.UserTypesList = res["value"] as UserType[];
      console.log("lista z type", res["value"]);
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
    //,private route: ActivatedRoute
    // this.form = new FormGroup({
    //   FirstName: new FormControl('', Validators.required),
    //   Surname: new FormControl('', Validators.required),
    //   PhoneNumber: new FormControl('', [Validators.maxLength(11),Validators.minLength(9),Validators.required]),
    //   Email:new FormControl('',[Validators.required,Validators.pattern(this.userService.regexEmail)]),
    //   ConfirmPassword:new FormControl('',[Validators.required]),
    //   Password:new FormControl('',Validators.required)
    // });
   }
 
   changeRights(value){
     console.log(value[3]);
    console.log(this.userService.UserRInUserDetail);
    }

  ngOnInit() {
    // let id=this.route.paramMap.pipe(
  }

  IsAdmin(){
    
    return this.userService.GetUserRights()==UserRights.AdminUser;
  }
  IsAdminAndEdit(){
    return this.IsAdmin()&&this.IsEdit;
  }
  AcceptEdit(){
    
    if(this.userService.confirmPassword==this.userService.userFormData.Password){
      this.IsEdit=false;
    this.userService.EditUser();
    }else{
      alert("w polu 'password' i 'confirm password' musi znajdować się to samo hasło");
      console.log("nie potwierdzone hasło");
    }
  }
  EditThisForm(){
    this.IsEdit=true;
  }
  // NgForm-formularz angulara z strony html który mu prześlemy (lub nie) do resetu, 
// bo wywołamy to na html jeszcze
resetForm(form?:NgForm){
  if(form!=null){
  form.resetForm();
  }
  this.userService.userFormData={
    UserId: 0,
    Login: '',
    Password: '',
    Email: '',
    FirstName: '',
    Surname: '',
    PhoneNumber: '',
    AccoutCreateDate:new Date(),
    UserTypeId:0,
    UserType:{UserTypeId:0,AccessRights:0,Name:''},
    InformationId:null,};
}

RemoveUser(){
  if(confirm("Na Pewno chcesz usunąć tego użytkownika?")){
    this.userService.RemoveUser(this.userService.userFormData.UserId);
  }else{
    console.log('anulowano usuwanie');
  }
}

}
