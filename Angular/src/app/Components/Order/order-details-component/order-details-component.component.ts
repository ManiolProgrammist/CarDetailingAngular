import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';

import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { CompileTemplateMetadata } from '@angular/compiler';
import { Order } from 'src/app/shared/order.model';
import { ActivatedRoute } from '@angular/router'
import { Result } from 'src/app/shared/result.model';
import { PayuService } from 'src/app/shared/services/payu.service';
import { User } from 'src/app/shared/UserModels/user.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details-component.component.html',
  styleUrls: ['./order-details-component.component.css']
})
export class OrderDetailsComponentComponent implements OnInit {
  orderTemplateInfo: boolean;
  orderTemplateToEdit: boolean;
  editButton: boolean;
  pickedOrderTemplate: OrderTemplate;
  addNotice: boolean;
  notice: string;
  constructor(private orderService: OrderService, private utilityServ: UtilityService, private orderTemplateService: OrderTemplateService, private payuService: PayuService, public route: ActivatedRoute, private userService: UserService) {
    this.orderTemplateInfo = false;
    this.orderTemplateToEdit = false;
    this.pickedOrderTemplate = new OrderTemplate();
    this.progressWidth = 0;
    this.addNotice = false;
    this.notice = "";
    setInterval(() => {
      this.SetLoadingWidth()
    }, 600);
  }
  @Input() set orderDet(order: Order) {
    this.orderTemplateInfo = false;
    // this.orderTemplateToEdit=false;
    this.editButton = false;
    this.pickedOrderTemplate = new OrderTemplate();
    this.orderDetails = order;
    this.progressWidth = 0;
    console.log(this.orderDetails);
  };
  @Input() ShowUserDetailInput: (user: User) => void;
  orderDetails: Order;
  progressWidth: number;
  ngOnInit() {
    this.progressWidth = 0;
  }


  ShowOrderTDetails(orderT: OrderTemplate) {
    this.pickedOrderTemplate = Object.assign({}, orderT);
    if (this.userService.GetUserRights() >= UserRights.EmployeeUser) {

      this.orderTemplateInfo = true;
      // this.orderTemplateToEdit=true;
      this.editButton = true;
    } else {

      this.orderTemplateInfo = true;
      // this.orderTemplateToEdit=false;
      this.editButton = false;
    }
  }
  ShowUserDetail() {
    if (this.ShowUserDetailInput != null) {
      this.ShowUserDetailInput(this.orderDetails.User);
    }
  }
  AddNotice() {
    if (this.addNotice) {
      if (this.notice != "") {
        this.orderService.AddOrderInfo(this.orderDetails, this.notice).subscribe((res: any) => {
          this.orderService.Get(this.orderDetails.OrderId).subscribe((res: Result<Order>) => {
            if (res.status) {

              this.orderDetails = res.value;
            }
          })
        })
      }
    }
    this.addNotice = !this.addNotice;
  }
  EditButtonClick() {
    this.orderTemplateToEdit = true;
    this.orderTemplateInfo = false;
    this.editButton = false;
  }
  PayForOrder() {
    this.payuService.payForOrder(this.orderDetails.OrderId).subscribe((res: Result<any>) => {
      if (res.status == true) {
        var redirectUrl = res.value.redirectUri;
        window.location.replace(redirectUrl);
      }
    }

    )
  }
  RemoveNotice(noticeid: number) {
    if (confirm("na pewno chcesz usunąć tą notatkę?")) {
      this.orderService.DeleteOrderInfo(noticeid).subscribe((res: any) => {
        this.orderService.Get(this.orderDetails.OrderId).subscribe((res: Result<Order>) => {
          if (res.status) {

            this.orderDetails = res.value;
          }
        })
      })
    }
  }
  CutDate(Date: Date) {
    return this.utilityServ.CutDate(Date);
  }

  SetLoadingWidth() {
    var endProgress = false;
    if (this.orderDetails.IsOrderStarted) {
      if (this.orderDetails.IsOrderCompleted == false) {
        var currentDate = new Date();
        var timeEnd = this.utilityServ.AddTime(this.orderDetails.OrderDate, this.orderDetails.OrdersTemplate.ExpectedTime);
        if (this.orderDetails.delays) {
          //* 15 because 1 delay is 15 min
          timeEnd = this.utilityServ.AddMinutes(timeEnd, this.orderDetails.delays * 15);
        }
        if (currentDate.valueOf() < timeEnd.valueOf()) {
          var timeBetweenStartAndEnd = Math.abs(timeEnd.valueOf() - this.orderDetails.OrderDate.valueOf());
          var timeBetweenNowAndStart = currentDate.valueOf() - this.orderDetails.OrderDate.valueOf();
          if (timeBetweenStartAndEnd > timeBetweenNowAndStart && timeBetweenStartAndEnd > 0) {
            this.progressWidth = (100 * timeBetweenNowAndStart) / timeBetweenStartAndEnd;
          } else {
            endProgress = true;
          }
        } else {
          endProgress = true;
        }
      } else {
        endProgress = true;
      }
    } else {
      this.progressWidth = 0;
    }
    if (endProgress) {
      this.progressWidth = 100;
    }
    this.progressWidth=Math.round(this.progressWidth);
  }

}
