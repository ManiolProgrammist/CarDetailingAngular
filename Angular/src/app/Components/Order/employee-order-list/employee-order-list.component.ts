import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order.model';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { Result } from 'src/app/shared/result.model';

@Component({
  selector: 'app-employee-order-list',
  templateUrl: './employee-order-list.component.html',
  styleUrls: ['./employee-order-list.component.css']
})
export class EmployeeOrderListComponent implements OnInit {
  constructor(private orderService:OrderService) { }
  orderUserList: Order[];
  pickedOrder:Order;
  ngOnInit() {
   this.RefreshList();
  }
  RefreshList(){
    console.log("refreshList");
    this.orderService.GetAll().subscribe(
      (value)=>{
        if(value['status']){
          console.log(value['value'])
        this.orderUserList=value['value'] as Order[];
        }
        else{
          console.log(value['info'])
        }
      }
    )
  }
  ShowUserOrderDetails(order:Order){
        this.orderService.Get(order.OrderId).subscribe((data:Result<Order>)=>{
          if(data.status){
          this.pickedOrder=data.value;
          }else{
            console.log("error order detail",data.info);
          }
      }
    );
    // this.router.navigate(['Order_List','Order_Details',order.OrderId] );
  }
}
