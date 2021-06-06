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

  constructor(private orderService: OrderService, public userService: UserService, private utilityService: UtilityService) {
    this.sortType = 0;
    this.orderList = new Array<Order>();
    this.orderListShow = new Array<Order>();
    this.templateNameList = new Array<string>();
    this.sortSideDate = true;
    this.sortSideCost = true;
    this.sortByTempName=true;
    this.sortByUserName=true;
  }
  private sortByUserName:boolean;
  private sortByTempName:boolean;
  private sortSideDate: boolean;
  private sortSideCost: boolean;
  sortType: number;
  orderList: Order[];
  orderListShow: Order[];
  templateNameList: string[];
  @Input() ShowOrderInput: (order: Order) => void;
  @Input() set OrderList(orderList: Order[]) {
    this.orderList.splice(0, this.orderList.length);
    if (orderList != null) {
      orderList.forEach(o => {
        this.orderList.push(o);
      })
    } this.ShowFiltered(this.sortType);
  };

  ngOnInit() {
    // this.orderService.refreshList();

  }
  SortByDate() {
    if (this.sortSideDate) {
      this.orderList.sort(this.dynamicSort("ExpectedStartOfOrder"));
    } else {
      this.orderList.sort(this.dynamicSort("-ExpectedStartOfOrder"));
    }
    this.ShowFiltered(this.sortType);
    this.sortSideDate = !this.sortSideDate;
  }
  SortByCost() {
    if (this.sortSideCost) {
      this.orderList.sort(this.dynamicSort("Cost"));
    } else {
      this.orderList.sort(this.dynamicSort("-Cost"));

    }
    this.ShowFiltered(this.sortType);
    this.sortSideCost = !this.sortSideCost;
  }
  SortByTemplateName(){
    if (this.sortByTempName) {
      this.orderList.sort((a,b) =>( a.OrdersTemplate.Name< b.OrdersTemplate.Name) ? -1 : (a.OrdersTemplate.Name > b.OrdersTemplate.Name) ? 1 : 0)
      
    } else {
      this.orderList.sort((a,b) =>( a.OrdersTemplate.Name> b.OrdersTemplate.Name) ? -1 : (a.OrdersTemplate.Name < b.OrdersTemplate.Name) ? 1 : 0)
    }
    this.ShowFiltered(this.sortType);
    this.sortByTempName = !this.sortByTempName;
    
  }
  SortByUserName(){
    if (this.sortByUserName) {
      this.orderList.sort((a,b) =>( a.User.FirstName< b.User.FirstName) ? -1 : (a.User.FirstName > b.User.FirstName) ? 1 : 0)
      
    } else {
      this.orderList.sort((a,b) =>( a.User.FirstName> b.User.FirstName) ? -1 : (a.User.FirstName < b.User.FirstName) ? 1 : 0)
    }
    this.sortByUserName = !this.sortByUserName;
    this.ShowFiltered(this.sortType);
    
  }
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
  ShowOrder(order: Order) {
    if (this.ShowOrderInput) {
      this.ShowOrderInput(Object.assign(Order, order));
    }

  }
  CutDate(Data: Date): string {
    return this.utilityService.CutDate(Data);
  }

  ShowFiltered(sortedType: number) {
    //0-all,started-1,not started-2,ended-3,not ended-4
    this.sortType = sortedType;
    if (sortedType == 0) {
      this.orderListShow = this.orderList;
    }
    if (sortedType == 1) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsOrderStarted == true;
      });
    }
    if (sortedType == 2) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsOrderStarted == false;
      });
    }
    if (sortedType == 3) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsOrderCompleted == true;
      });
    }
    if (sortedType == 4) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsOrderCompleted == false;
      });

    }
    if (sortedType == 5) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsPaid == true;
      });

    }
    if (sortedType == 6) {
      this.orderListShow = this.orderList.filter(obj => {
        return obj.IsPaid == false;
      });

    }
    if(sortedType==7){
      this.orderListShow=this.orderList.filter(obj=>{
        var flag=false;
        var date=new Date();
        var start=new Date(obj.ExpectedStartOfOrder);
        if(date.getFullYear()==start.getFullYear() 
        && date.getMonth()<=start.getMonth() 
        &&date.getDate()<=start.getDate()){
          flag=true;
        }
        return flag;

      })
    }
  }
}
