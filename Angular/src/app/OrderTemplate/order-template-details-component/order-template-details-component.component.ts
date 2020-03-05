import { Component, OnInit } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-template-details-component',
  templateUrl: './order-template-details-component.component.html',
  styleUrls: ['./order-template-details-component.component.css']
})


export class OrderTemplateDetailsComponentComponent implements OnInit {

  constructor(private orderTemplateService: OrderTemplateService,private router:Router) { }
  get hours(): number | string {
    if (this.orderTemplateService.orderTemplateDetails.ExpectedTime) {
      return this.orderTemplateService.getHours(this.orderTemplateService.orderTemplateDetails.ExpectedTime);
    } else {
      return 0;
    }
  };
  get minutes(): number | string {
    if (this.orderTemplateService.orderTemplateDetails.ExpectedTime) {
      return this.orderTemplateService.getMinutes(this.orderTemplateService.orderTemplateDetails.ExpectedTime);
    } else {
      return 0;
    }
  };
  set hours(h: number | string) {
    if(Number(h)>=0){
    this.orderTemplateService.orderTemplateDetails.ExpectedTime =
      this.orderTemplateService.setExpectedTime(h, this.orderTemplateService.orderTemplateDetails.ExpectedTime, 0);
    }else{
      this.orderTemplateService.orderTemplateDetails.ExpectedTime =
      this.orderTemplateService.setExpectedTime(0, this.orderTemplateService.orderTemplateDetails.ExpectedTime, 0);
    }
  }
  set minutes(m: number | string) {
    if(Number(m)>=0){
    this.orderTemplateService.orderTemplateDetails.ExpectedTime =
      this.orderTemplateService.setExpectedTime(m, this.orderTemplateService.orderTemplateDetails.ExpectedTime, 1);
    }else{
      this.orderTemplateService.orderTemplateDetails.ExpectedTime =
      this.orderTemplateService.setExpectedTime(0, this.orderTemplateService.orderTemplateDetails.ExpectedTime, 1);
    }
  }
  ngOnInit() {
  }

  OrderThis(){
    this.orderTemplateService.orderTemplateToOrder=this.orderTemplateService.orderTemplateDetails;
    this.router.navigate(['Order_Template_List','Order_Order_Template']);
  }
  ResetDetails() {
    this.orderTemplateService.orderTemplateDetails = this.orderTemplateService.ResetOrderTemplateDetails();
  }
  MinMaxValid() {
    return (this.orderTemplateService.orderTemplateDetails.MaxCost >= this.orderTemplateService.orderTemplateDetails.MinCost)&&this.orderTemplateService.orderTemplateDetails.MinCost>=0;
  }
  AddOrdTemplate() {
    this.orderTemplateService.AddOrderTemplate(this.orderTemplateService.orderTemplateDetails);
  }
  RemoveOrderTemplate() {
    if (this.orderTemplateService.orderTemplateDetails.OrderTemplateId != 0) {
      this.orderTemplateService.RemoveOrderTemplate(this.orderTemplateService.orderTemplateDetails.OrderTemplateId);
    }else{
      console.log("nie da się usunąć Order Template bez jego ID");
    }
  }

  AcceptEditOrdTemp() {
    if (this.MinMaxValid()) {
      this.orderTemplateService.PutOrderTemplate(this.orderTemplateService.orderTemplateDetails);
    } else {
      alert("koszt Minimalny musi być mniejszy lub równy kosztowi maksymalnemu")
    }
  }
  ngOnDestroy() {
    this.ResetDetails();
  }

}
