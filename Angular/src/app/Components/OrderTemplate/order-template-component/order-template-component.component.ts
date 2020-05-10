import { Component, OnInit } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-template-component',
  templateUrl: './order-template-component.component.html',
  styleUrls: ['./order-template-component.component.css']
})
export class OrderTemplateComponentComponent implements OnInit {

  constructor(private orderTemplateService:OrderTemplateService,private userService:UserService,private router:Router) { }

  ngOnInit() {
  }

  OrderThis(){ //jeśli zamawia pracownik/admin to musi wskazać dla jakiego użytkownika zamawia lub stworzyć tymczasowego użytkownika, 
               // jeśli zamawia klient to od razu dla siebie
    if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
      //wybierz dla danego klienta
    }else{
      //wybierz termin
    }
  }
  IsAtLeastEmploye():boolean{
    return this.userService.GetUserRights()>=UserRights.EmployeeUser;
  }
  EditThis(){

      // this.orderTemplateService.orderTemplateDetails=Object.assign({}, orderT);
      this.orderTemplateService.orderTemplateDetails=this.orderTemplateService.orderTemplateToOrder;
      this.router.navigate(['Order_Template_List','Order_Template_Detail']);
      
  }

}
