import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-register-user-component',
  templateUrl: './register-user-component.component.html',
  styleUrls: ['./register-user-component.component.css']
})
export class RegisterUserComponentComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.userService.userRegister = {
      login: '',
      password: '',
      email: '',
      firstName: '',
      surname: '',
      phoneNumber: '',
    }

  }  
  addSpacesNumber() {
    this.userService.userRegister.phoneNumber=this.userService.userRegister.phoneNumber.replace("/([0-9]{3})/", "$& ");
    this.userService.userRegister.phoneNumber=this.userService.userRegister.phoneNumber.replace("/[0-9]{3} ([0-9]{3})/", "$& ");
    console.log( this.userService.userRegister.phoneNumber);
  }


}
