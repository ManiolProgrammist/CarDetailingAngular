import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Data } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {

  constructor(private orderService:OrderService,private utilityService:UtilityService) { }
  @Input() orderTemplate:OrderTemplate;
  @Input() date:Date;

  @Input() UserId:number;
  @Input() Accept:()=>void;
  @Input() Cancel:()=>void;
  expectedEnd:Date;
  ngOnInit(): void {
  }
  AcceptButton(){
    if(this.Accept){
      this.Accept();
    }
  }
  CancelButton(){
    if(this.Cancel){
      this.Cancel();
    }
  }
  CutDate(date:Date):string{
    return this.utilityService.CutDate(date);
  }

  AddMinutesToDate():string{
    if(this.date&&this.orderTemplate){
   
      this.expectedEnd=this.utilityService.AddTime(this.date,this.orderTemplate.ExpectedTime);
      
    return this.CutDate(this.expectedEnd);
    }else{
      return " ";
    }
  }

}
