import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/UserModels/user.model';

import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-select-login-type-order',
  templateUrl: './select-login-type-order.component.html',
  styleUrls: ['./select-login-type-order.component.css']
})
export class SelectLoginTypeOrderComponent implements OnInit {

  constructor(public router: Router, private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
  }

  Email: string;
  OrderButton: boolean = true;
  get EmailRegex(): RegExp {
    return this.userService.regexEmail;
  }

  LogInFromThere(user: User) {
    console.log("Select-login-type-order:LoginFromThere", user);
    this.orderService.NewOrder.User = user;
    this.orderService.NewOrder.UserId = user.UserId;
    this.router.navigate(["Pick_Order_Template"]);

  }

  OrderWithoutLogin() {

    if (this.OrderButton) {
      this.OrderButton = false;
      this.orderService.postTempOrder(this.orderService.NewOrder, this.Email).subscribe(
        (value) => {
          if (value.status) {
            this.orderService.OrderOrdered = value.value;
            this.router.navigate(["Temporary_Order_Info"]);
          } else {
            console.log('Error order', value.info);
          }

        }
      )
    }
  }
}