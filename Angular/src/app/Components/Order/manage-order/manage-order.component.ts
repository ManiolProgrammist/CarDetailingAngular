import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Order } from 'src/app/shared/order.model';
import { Result } from 'src/app/shared/result.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor(private userService: UserService, private orderService: OrderService, private router: Router) { }
  @Input() set OrderInput(order: Order) {
    this.orderInput = order;
    this.delayMinutes = 15;
  };
  orderInput: Order;
  public delayMinutes: number;
  @Input() OnClickFunction: () => void;
  @Input() OnRemoveFunction: () => void;
  @Input() ShowUserData: () => void;
  // orderdetails:Order;
  // get OrderDetails(){
  //   return   this.OrderInput;
  // }
  // set OrderDetails(OrderDetail:Order){
  //   this.OrderInput=OrderDetail;
  // }
  ngOnInit(): void {
  }
  CheckIfEmployer() {
    return this.userService.GetUserRights() >= UserRights.EmployeeUser;
  }
  StartOrder() {
    this.orderService.startOrder(this.orderInput, true).subscribe(
      (value) => {

        this.orderInput = value.value;
        if (this.OnClickFunction) {
          this.OnClickFunction();
        }

      },
      () => {//complete
        console.log("start order completed");
      }
    );
  }
  PaidOnSpot() {
    if (confirm('Czy ten użytkownik na pewno zapłacił na miejscu? Tej operacji nie da się cofnąć')) {
      console.log(this.orderInput)
      this.orderService.PayOnSpotForOrder(this.orderInput).subscribe(
        (value) => {
          this.orderInput = value.value
          if (this.OnClickFunction) {
            this.OnClickFunction();
          }
        }
      )
    }
  }
  BackStartOrder() {
    this.orderService.startOrder(this.orderInput, false).subscribe(
      (value) => {


        this.orderInput = value.value;
        if (this.OnClickFunction) {
          this.OnClickFunction();
        }

      },
      () => {//complete
        console.log("Back start order completed");
      }


    );
  }
  EndOrder() {
    this.orderService.endOrder(this.orderInput, true).subscribe(
      (value) => {

        if (this.OnClickFunction) {
          this.OnClickFunction();

        }

        this.orderInput = value.value;

      },
      () => {//complete
      }

    );
  }

  BackEndOrder() {
    this.orderService.endOrder(this.orderInput, false).subscribe(
      (value) => {

        if (this.OnClickFunction) {
          this.OnClickFunction();
        }

        this.orderInput = value.value;

      },
      () => {//complete
      }

    );
  }
  RemoveOrder() {
    if (confirm("Na pewno chcesz usunąć to zlecenie? Ta operacja jest nieodwracalna")) {
      this.orderService.DeleteOrder(this.orderInput.OrderId).subscribe(
        (result: Result<Order>) => {
          if (result.status) {
            alert("Poprawnie usunięto zlecenie");
            if (this.OnRemoveFunction) {
              this.OnRemoveFunction();
            }

          }
        }
      );
    }
  }
  AddDelay() {
    if (confirm("Na pewno to zlecenie będzie opóźnione?")) {

      this.orderService.AddDelay(this.orderInput, (this.delayMinutes) / 15).subscribe(
        (value) => {

          if (this.OnClickFunction) {
            this.OnClickFunction();
          }

          this.orderInput = value.value;

        });
      console.log("add delay", this.delayMinutes);
    }
  }
}
