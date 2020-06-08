import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor(private userService:UserService,private orderService:OrderService) { }
  @Input() set OrderInput(order:Order){
    this.orderInput=order;
  };
  orderInput:Order;
  @Input() OnClickFunction:()=>void;
  // orderdetails:Order;
  // get OrderDetails(){
  //   return   this.OrderInput;
  // }
  // set OrderDetails(OrderDetail:Order){
  //   this.OrderInput=OrderDetail;
  // }
  ngOnInit(): void {
  }
  CheckIfEmployer(){
    return this.userService.GetUserRights()>=UserRights.EmployeeUser;
  }
  StartOrder(){
    this.orderService.startOrder(this.orderInput,true).subscribe(
      (value)=>{

        this.orderInput=value.value;
        if(this.OnClickFunction){
          this.OnClickFunction();
        }
       
      },
       ()=>{//complete
        console.log("start order completed");
      }
    );
  }
  BackStartOrder(){
    this.orderService.startOrder(this.orderInput,false).subscribe(
      (value)=>{

     
        this.orderInput=value.value;
        if(this.OnClickFunction){
          this.OnClickFunction();
        }
       
      },
       ()=>{//complete
        console.log("Back start order completed");
      }
      

    );
  }
  EndOrder(){
    this.orderService.endOrder(this.orderInput,true).subscribe(
      (value)=>{

        if(this.OnClickFunction){
          this.OnClickFunction();
      
        }
       
        this.orderInput=value.value;
    
      },
      ()=>{//complete
      }

    );
  }

  BackEndOrder(){
    this.orderService.endOrder(this.orderInput,false).subscribe(
      (value)=>{

        if(this.OnClickFunction){
          this.OnClickFunction();
        }
       
        this.orderInput=value.value;
    
      },
      ()=>{//complete
      }

    );
  }
}
