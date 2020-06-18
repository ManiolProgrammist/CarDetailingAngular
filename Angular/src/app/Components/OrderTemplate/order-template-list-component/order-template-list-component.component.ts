import { Component, OnInit, Input } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';

@Component({
  selector: 'app-order-template-list-component',
  templateUrl: './order-template-list-component.component.html',
  styleUrls: ['./order-template-list-component.component.css']
})
export class OrderTemplateListComponentComponent implements OnInit {

  @Input() ShowDetailsBehaviour:(orderT: OrderTemplate)=>void
  pickedOrderTemplate:OrderTemplate;
  constructor(public orderTemplateService: OrderTemplateService, public userService: UserService, public router: Router) {

  }


  ngOnInit() {

    this.orderTemplateService.refreshList();
  }


  ShowDetails(orderT: OrderTemplate) {
    if(this.ShowDetailsBehaviour){
      this.ShowDetailsBehaviour(orderT);
    }
  }

}
