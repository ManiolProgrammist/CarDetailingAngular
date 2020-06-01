import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';

import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { CompileTemplateMetadata } from '@angular/compiler';
import { Order } from 'src/app/shared/order.model';
import { ActivatedRoute } from '@angular/router'
import { Result } from 'src/app/shared/result.model';
@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details-component.component.html',
  styleUrls: ['./order-details-component.component.css']
})
export class OrderDetailsComponentComponent implements OnInit {

  constructor(private orderService: OrderService, private orderTemplateService: OrderTemplateService, public route: ActivatedRoute, private userService: UserService) {
    this.orderTemplateInfo = false;
    this.orderTemplateToEdit = false;
    this.pickedOrderTemplate = new OrderTemplate();
  }

  ngOnInit() {
    var id = 1;
    this.route.params.subscribe(params => {
      id = params['id'];
      if (!this.OrderDetails) {
        this.orderService.Get(id).subscribe((data:Result<Order>)=>{
          if(data.status){
          this.OrderDetails=data.value;
          }else{
            console.log("error order detail",data.info);
          }
        })
      
      }
    });


  }
  orderTemplateInfo: boolean;
  orderTemplateToEdit: boolean;
  editButton: boolean;
  pickedOrderTemplate: OrderTemplate;
  get OrderDetails() {
    return this.orderService.OrderDetails;
  }
  set OrderDetails(OrderDetail: Order) {
    this.orderService.OrderDetails = OrderDetail;
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

  EditButtonClick() {
    this.orderTemplateToEdit = true;
    this.orderTemplateInfo = false;
    this.editButton = false;
  }



}
