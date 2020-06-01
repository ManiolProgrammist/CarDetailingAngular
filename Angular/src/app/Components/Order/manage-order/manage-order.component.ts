import { Component, OnInit } from '@angular/core';
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
  get OrderDetails(){
    return   this.orderService.OrderDetails;
  }
  set OrderDetails(OrderDetail:Order){
    this.orderService.OrderDetails=OrderDetail;
  }
  ngOnInit(): void {
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

        this.orderService.refreshList();
        this.orderService.OrderDetails=value.value;
    
      },
      ()=>{//complete
      }

    );
  }
}
