import { Component, OnInit, Input } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/shared/UserModels/user.model';
import { OrderTemplate } from 'src/app/shared/order-template.model';

@Component({
  selector: 'app-order-template-component',
  templateUrl: './order-template-component.component.html',
  styleUrls: ['./order-template-component.component.css']
})
export class OrderTemplateComponentComponent implements OnInit {



  @Input() pickedOrderTemplate:OrderTemplate;
  constructor(public orderTemplateService:OrderTemplateService,private userService:UserService,public router:Router) {
   }

  ngOnInit() {
  }

}
