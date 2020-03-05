import { Component, OnInit } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';

@Component({
  selector: 'app-order-template-component',
  templateUrl: './order-template-component.component.html',
  styleUrls: ['./order-template-component.component.css']
})
export class OrderTemplateComponentComponent implements OnInit {

  constructor(private orderTemplateService:OrderTemplateService) { }

  ngOnInit() {
  }

  OrderThis(){

  }

}
