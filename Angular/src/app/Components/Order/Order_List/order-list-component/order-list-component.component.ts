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

  constructor(private orderService:OrderService,public userService:UserService,private utilityService:UtilityService) {
    this.sortType=0;
   }
  @Input() ShowOrderInput:(order:Order)=>void;
  @Input() set OrderList(orderList:Order[]){
    this.orderList=orderList;
    this.ShowSorted(this.sortType);
  };
  sortType:number;
  orderList:Order[];
  orderListShow:Order[];
  ngOnInit() {
    // this.orderService.refreshList();
    
  }

  ShowOrder(order:Order){
    console.log("click ShowOrder",order);
            if(this.ShowOrderInput){
              this.ShowOrderInput(Object.assign(Order,order));
            }

  }
  CutDate(Data:Date):string{
  return this.utilityService.CutDate(Data);
  }
  
  ShowSorted(sortedType:number){
    //0-all,started-1,not started-2,ended-3,not ended-4
    this.sortType=sortedType;
    if(sortedType==0){
      this.orderListShow=this.orderList;
    }
    if(sortedType==1){
      this.orderListShow=this.orderList.filter(obj=>{
        return obj.IsOrderStarted==true;
      });
    }
    if(sortedType==2){
      this.orderListShow=this.orderList.filter(obj=>{
        return obj.IsOrderStarted==false;
      });
    }
    if(sortedType==3){
      this.orderListShow=this.orderList.filter(obj=>{
        return obj.IsOrderCompleted==true;
      });
    }
    if(sortedType==4){
      this.orderListShow=this.orderList.filter(obj=>{
        return obj.IsOrderCompleted==false;
      });
    }

  }

}
