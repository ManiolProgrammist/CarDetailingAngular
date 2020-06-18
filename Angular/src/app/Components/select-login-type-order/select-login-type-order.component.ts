import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/UserModels/user.model';

import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-select-login-type-order',
  templateUrl: './select-login-type-order.component.html',
  styleUrls: ['./select-login-type-order.component.css']
})
export class SelectLoginTypeOrderComponent implements OnInit {

  constructor(public router:Router,private orderService:OrderService) { }

  ngOnInit(): void {
  }
 

  LogInFromThere(user:User){
    this.orderService.NewOrder.User=user;
    this.orderService.NewOrder.UserId=user.UserId;
    this.router.navigate(["Pick_Order_Template"]);
  }
}