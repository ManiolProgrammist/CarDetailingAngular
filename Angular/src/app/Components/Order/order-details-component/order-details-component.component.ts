import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details-component.component.html',
  styleUrls: ['./order-details-component.component.css']
})
export class OrderDetailsComponentComponent implements OnInit {

  constructor(private orderService : OrderService,private orderTemplateService : OrderTemplateService, private router: Router, private userService:UserService) { }

  ngOnInit() {
  }
  ShowOrderTDetails(orderT:OrderTemplate){
    if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
    this.orderTemplateService.orderTemplateDetails=Object.assign({}, orderT);
    this.router.navigate(['Order_List','Order_Details','Order_Template_Detail']);
    }else{

      this.orderTemplateService.orderTemplateToOrder=Object.assign({},orderT);
      this.router.navigate(['Order_List','Order_Details','Order_Order_Template']);
      //do zamawiania

        //zapytaj się czy ma konto czy stworzyć nowe?

    }
  }

  CheckIfEmployer(){
    return this.userService.GetUserRights()>=UserRights.EmployeeUser;
  }
  StartOrder(){
    this.orderService.startOrder(this.orderService.OrderDetails,true).subscribe(
      (value)=>{

        this.orderService.OrderDetails=value.value;
        this.orderService.refreshList();
       
      },
       ()=>{//complete
        console.log("start order completed");
      }
    );
  }
  BackStartOrder(){
    this.orderService.startOrder(this.orderService.OrderDetails,false).subscribe(
      (value)=>{
        console.log("Back Start Order value");
        console.log(value.value);
        this.orderService.refreshList();
        this.orderService.OrderDetails=value.value;
      },
       ()=>{//complete
        console.log("Back start order completed");
      }
      

    );
  }
  EndOrder(){
    this.orderService.endOrder(this.orderService.OrderDetails,true).subscribe(
      (value)=>{
        console.log("end order");
        this.orderService.refreshList();
        this.orderService.OrderDetails=value.value;
    
      },
      ()=>{//complete
      }

    );
  }

  BackEndOrder(){
    this.orderService.endOrder(this.orderService.OrderDetails,false).subscribe(
      (value)=>{
        console.log("end order");
        this.orderService.refreshList();
        this.orderService.OrderDetails=value.value;
    
      },
      ()=>{//complete
      }

    );
  }

}
