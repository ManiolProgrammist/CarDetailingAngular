import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/order.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Router, Data } from '@angular/router';

@Component({
  selector: 'app-order-list-component',
  templateUrl: './order-list-component.component.html',
  styleUrls: ['./order-list-component.component.css']
})
export class OrderListComponentComponent implements OnInit {

  constructor(public orderService:OrderService,public userService:UserService,public router:Router) { }

  ngOnInit() {
    this.orderService.refreshList();
  }
  ShowOrder(order:Order){
    if(this.userService.GetUserRights()>=UserRights.EmployeeUser){
      this.orderService.Get(order.OrderId).toPromise().then(
        res => {
        this.orderService.OrderDetails = res["value"] as Order;
          console.log(res["value"]);
          this.router.navigate(['Order_List','Order_Details',order.OrderId] );
        }
      );

    }else{
      console.log("niewystarczające prawa");
    }
  }
  CutDate(Data:Date):string{
    if(Data!=null){
      var start = new Date(Data);
    return start.getFullYear()+'/'+start.getMonth()+'/'+start.getDate()+' - '+start.getHours()+':'+start.getMinutes();
    }else{
      return ' ';
    }
  }

}
