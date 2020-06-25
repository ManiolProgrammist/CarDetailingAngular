import { Component, OnInit, Input } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/UserModels/user.model';

@Component({
  selector: 'app-accept-order-info',
  templateUrl: './accept-order-info.component.html',
  styleUrls: ['./accept-order-info.component.css']
})
export class AcceptOrderInfoComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
  }


  @Input() orderTemplate: OrderTemplate;
  // @Input() date:Date;
  @Input() order: Order;
  // @Input() OrderUser:User;
  @Input() Accept: () => void;
  @Input() Cancel: () => void;
  expectedEnd: Date;

  AcceptButton() {
    console.log("AcceptButton");
    if (this.Accept) {
      this.Accept();
    }
  }
  CancelButton() {
    console.log("CancellButton");
    if (this.Cancel) {
      this.Cancel();
    }
  }
  CutDate(date: Date): string {
    return this.utilityService.CutDate(date);
  }

  AddMinutesToDate(): string {
    if (this.order.ExpectedStartOfOrder && this.orderTemplate) {

      this.expectedEnd = this.utilityService.AddTime(this.order.ExpectedStartOfOrder, this.orderTemplate.ExpectedTime);

      return this.CutDate(this.expectedEnd);
    } else {
      return " ";
    }
  }

}
