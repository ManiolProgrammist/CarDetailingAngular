import { Component, OnInit, Input } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/shared/UserModels/user.model';
import { OrderTemplate } from 'src/app/shared/order-template.model';

@Component({
  selector: 'app-order-template-component',
  templateUrl: './order-template-component.component.html',
  styleUrls: ['./order-template-component.component.css']
})
export class OrderTemplateComponentComponent implements OnInit {
  pickFromUserListFlag:boolean;
  pickFromDateFlag:boolean;
  pickedUserToOrder:User;
  PickedDate:Date;
  @Input() pickedOrderTemplate:OrderTemplate;
  @Input() EditChangeFlag:(flag:boolean)=>void;
  constructor(public orderTemplateService:OrderTemplateService,private userService:UserService,public router:Router) {
    this.pickFromUserListFlag=false;
    this.pickFromDateFlag=false;
   }

  ngOnInit() {
  }

  OrderThis(){ //jeśli zamawia pracownik/admin to musi wskazać dla jakiego użytkownika zamawia lub stworzyć tymczasowego użytkownika, 
               // jeśli zamawia klient to od razu dla siebie
    if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
     
      this.pickFromUserListFlag=true;
    }else{
    
      this.pickFromUserListFlag=false;
      this.pickFromDateFlag=true;
      //wybierz termin
    }
  }

  PickUserToOrder(user:User){
     this.pickedUserToOrder=user;
      this.pickFromDateFlag=true;
      this.pickFromUserListFlag=false;
  }
  IsAtLeastEmploye():boolean{
    return this.userService.shouldIShownItem(UserRights.EmployeeUser);
  }
  EditThis(){
    if(this.EditChangeFlag){
      this.EditChangeFlag(true);
    }
      // // this.orderTemplateService.orderTemplateDetails=Object.assign({}, orderT);
      // this.orderTemplateService.orderTemplateDetails=this.orderTemplateService.orderTemplateToOrder;
      // this.router.navigate(['Order_Template_List','Order_Template_Detail']);
      
  }
    // PickDate(date:Date){
    //   this.PickedDate=date;
    //   console.log("najwyzsza funkcja mowi:",date);
    // }

}
