import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/order.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Router, Data } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-order-list-component',
  templateUrl: './order-list-component.component.html',
  styleUrls: ['./order-list-component.component.css']
})
export class OrderListComponentComponent implements OnInit {

  constructor(private orderService:OrderService,public userService:UserService,public router:Router,private utilityService:UtilityService) { }
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
  return this.utilityService.CutDate(Data);
  }

}
