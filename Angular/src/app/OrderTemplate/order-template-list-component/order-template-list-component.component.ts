import { Component, OnInit } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';

@Component({
  selector: 'app-order-template-list-component',
  templateUrl: './order-template-list-component.component.html',
  styleUrls: ['./order-template-list-component.component.css']
})
export class OrderTemplateListComponentComponent implements OnInit {

  constructor(private orderTemplateService:OrderTemplateService,private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.orderTemplateService.refreshList();
  }

  ShowDetails(orderT:OrderTemplate){
    if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
    this.orderTemplateService.orderTemplateDetails=Object.assign({}, orderT);
    this.router.navigate(['Order_Template_List','Order_Template_Detail']);
    }else{

      this.orderTemplateService.orderTemplateToOrder=Object.assign({},orderT);
      this.router.navigate(['Order_Template_List','Order_Order_Template']);
      //do zamawiania

        //zapytaj się czy ma konto czy stworzyć nowe?

    }
  }

}
