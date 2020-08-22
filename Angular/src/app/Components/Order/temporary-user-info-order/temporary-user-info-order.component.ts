import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/order.model';
import { Router } from '@angular/router';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';

@Component({
  selector: 'app-temporary-user-info-order',
  templateUrl: './temporary-user-info-order.component.html',
  styleUrls: ['./temporary-user-info-order.component.css']
})
export class TemporaryUserInfoOrderComponent implements OnInit {

  constructor(private orderService:OrderService,private orderTemplateService:OrderTemplateService,private router:Router) { }
  public get Order():Order{
    if(this.orderService.OrderOrdered){
      return this.orderService.OrderOrdered;
    }else{
      console.log("nie zwrócono informacji o zamówionym zleceniu przez tymczasowego użytkownika");
      this.router.navigate([""]);
    }
   
  }

  // public set Order():Order{

  // }
  ngOnInit(): void {
  }

}
