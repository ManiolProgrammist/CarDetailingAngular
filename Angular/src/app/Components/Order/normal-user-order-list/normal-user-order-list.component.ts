import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/order.model';
import { Result } from 'src/app/shared/result.model';

@Component({
  selector: 'app-normal-user-order-list',
  templateUrl: './normal-user-order-list.component.html',
  styleUrls: ['./normal-user-order-list.component.css']
})
export class NormalUserOrderListComponent implements OnInit {

  constructor(private orderService:OrderService) { }
  orderUserList: Order[];
  pickedOrder:Order;
  ngOnInit() {
    this.orderService.GetUserOrders().subscribe(
      (value)=>{
        if(value['status']){
        this.orderUserList=value['value'] as Order[];
        }
        else{
          console.log(value['info'])
        }
      }
    )
  }

  ShowUserOrderDetails(order:Order){
    window.scrollTo({ top: 0, behavior: 'smooth' });
        this.orderService.Get(order.OrderId).subscribe((data:Result<Order>)=>{
          if(data.status){
          this.pickedOrder=data.value;
          }else{
            console.log("error order detail",data.info);
            alert("error order detail"+data.info);

          }
      }
    );
    // this.router.navigate(['Order_List','Order_Details',order.OrderId] );
  }

}
