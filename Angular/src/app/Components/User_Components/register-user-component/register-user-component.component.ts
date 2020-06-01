import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/UserModels/user.model';
import { RegisterUser } from 'src/app/shared/UserModels/register-user.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user-component',
  templateUrl: './register-user-component.component.html',
  styleUrls: ['./register-user-component.component.css']
})
export class RegisterUserComponentComponent implements OnInit {

  constructor(public userService: UserService,public route:Router) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.userService.userRegister = new RegisterUser();
    

  }  
  addSpacesNumber() {
    this.userService.userRegister.PhoneNumber=this.userService.userRegister.PhoneNumber.replace("/([0-9]{3})/", "$& ");
    this.userService.userRegister.PhoneNumber=this.userService.userRegister.PhoneNumber.replace("/[0-9]{3} ([0-9]{3})/", "$& ");
    console.log( this.userService.userRegister.PhoneNumber);
  }
  RegisterUser(input){
    console.log(input,"register");
    this.userService.UserRegister(input).subscribe(    (value)=>{
   
            if (value['status'] as boolean == true) {
              console.log("udało się zarejestrować");
              this.route.navigate(['']);
    
            } else {
              console.log("error error", value['info'], value);
            }
          
    },
    ()=>{//complete
    });
  }


}
