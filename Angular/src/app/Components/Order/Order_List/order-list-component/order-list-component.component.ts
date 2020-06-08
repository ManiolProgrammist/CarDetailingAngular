import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private orderService:OrderService,public userService:UserService,public router:Router) { }
  @Input() ShowOrderInput:(order:Order)=>void;
  @Input() set OrderList(orderList:Order[]){
    this.orderList=orderList;
  };
  orderList:Order[];
  ngOnInit() {
    // this.orderService.refreshList();
    
  }

  ShowOrder(order:Order){
            if(this.ShowOrderInput){
              this.ShowOrderInput(Object.assign(Order,order));
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
