import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order.model';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { Result } from 'src/app/shared/result.model';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-employee-order-list',
  templateUrl: './employee-order-list.component.html',
  styleUrls: ['./employee-order-list.component.css']
})
export class EmployeeOrderListComponent implements OnInit {
  //lista wszystkich zleceń
  constructor(private orderService: OrderService) { }
  orderUserList: Order[];
  pickedOrder: Order;
  pickedUser: User;
  public userTypeIdDisplay: number;
  ngOnInit() {
    this.RefreshList();
  }
  RefreshList() {
    this.orderService.GetAll().subscribe(
      (value) => {
        if (value['status']) {
          console.log(value['value'])
          this.orderUserList = value['value'] as Order[];
        }
        else {
          console.log(value['info'])
        }
      }
    )
  }
  ShowUserData(user: User) {
    this.pickedUser = user;
    this.userTypeIdDisplay = this.pickedUser.UserTypeId
  }
  RefreshPage() {
    this.RefreshList();
    this.pickedOrder = null;
  }
  ShowUserOrderDetails(order: Order) {
    this.pickedUser=null;
    this.userTypeIdDisplay=null;

    this.orderService.Get(order.OrderId).subscribe((data: Result<Order>) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (data.status) {
        this.pickedOrder = data.value;
      } else {
        console.log("error order detail", data.info);
      }
    }
    );
    // this.router.navigate(['Order_List','Order_Details',order.OrderId] );
  }
}
