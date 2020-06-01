import { Component, OnInit, SimpleChanges,OnChanges} from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';
@Component({
  selector: 'app-order-template-details-component',
  templateUrl: './order-template-details-component.component.html',
  styleUrls: ['./order-template-details-component.component.css']
})


export class OrderTemplateDetailsComponentComponent implements OnInit {
  @Input() set pickedOrderTemplate(value:OrderTemplate){

    this.EditOrderTemplate=Object.assign({}, value);
  }
  EditOrderTemplate:OrderTemplate;
  @Input() EditChangeFlag:(flag:boolean)=>void;
  constructor(public orderTemplateService: OrderTemplateService,private utilityService:UtilityService,public router:Router) {
    this.EditOrderTemplate = this.orderTemplateService.ResetOrderTemplateDetails();
   }

  get hours(): number | string {
    if (this.EditOrderTemplate.ExpectedTime) {
      return this.utilityService.getHours(this.EditOrderTemplate.ExpectedTime);
    } else {
      return 0;
    }
  };
  get minutes(): number | string {
    if (this.EditOrderTemplate.ExpectedTime) {
      return this.utilityService.getMinutes(this.EditOrderTemplate.ExpectedTime);
    } else {
      return 0;
    }
  };
  set hours(h: number | string) {
    if(Number(h)>=0){
    this.EditOrderTemplate.ExpectedTime =
      this.utilityService.setExpectedTime(h, this.EditOrderTemplate.ExpectedTime, 0);
    }else{
      this.EditOrderTemplate.ExpectedTime =
      this.utilityService.setExpectedTime(0, this.EditOrderTemplate.ExpectedTime, 0);
    }
  }
  set minutes(m: number | string) {
    if(Number(m)>=0){
    this.EditOrderTemplate.ExpectedTime =
      this.utilityService.setExpectedTime(m, this.EditOrderTemplate.ExpectedTime, 1);
    }else{
      this.EditOrderTemplate.ExpectedTime =
      this.utilityService.setExpectedTime(0, this.EditOrderTemplate.ExpectedTime, 1);
    }
  }
  ngOnInit() {
  }

  ResetDetails() {
    this.EditOrderTemplate = this.orderTemplateService.ResetOrderTemplateDetails();
  }
  MinMaxValid() {
    return (this.EditOrderTemplate.MaxCost >= this.EditOrderTemplate.MinCost)&&this.EditOrderTemplate.MinCost>=0;
  }
  AddOrdTemplate() {
    this.orderTemplateService.AddOrderTemplate(this.EditOrderTemplate);
  }
  RemoveOrderTemplate() {
    if (this.EditOrderTemplate.OrderTemplateId != 0) {
      this.orderTemplateService.RemoveOrderTemplate(this.EditOrderTemplate.OrderTemplateId);
    }else{
      console.log("nie da się usunąć Order Template bez jego ID");
    }
  }

  CheckOrder():boolean{
    if (this.MinMaxValid()) {
      if(Number(this.utilityService.getHours( this.EditOrderTemplate.ExpectedTime))!=0||this.utilityService.getMinutes(this.EditOrderTemplate.ExpectedTime)!=0){
        return true;
      }else{
        alert("usługa musi trwać conajmniej 15 minut");
        return false;
      }
    }else{
      alert("koszt Minimalny musi być mniejszy lub równy kosztowi maksymalnemu");
    return false;
    }
  }

  AcceptEditOrdTemp() {
    if (  this.CheckOrder()) {
      this.orderTemplateService.PutOrderTemplate(this.EditOrderTemplate);
      if(this.EditChangeFlag){
        this.EditChangeFlag(false);
      }
    } 
  }
  ngOnDestroy() {
    this.ResetDetails();
  }

}
