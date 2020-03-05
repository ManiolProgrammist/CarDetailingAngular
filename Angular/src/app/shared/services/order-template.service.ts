import { Injectable } from '@angular/core';
import { OrderTemplate } from '../order-template.model';
import { StaticInfo } from '../../static-info';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TimeSpan } from 'src/app/time-span';

@Injectable({
  providedIn: 'root'
})
export class OrderTemplateService {
  orderTemplateToOrder: OrderTemplate;
  orderTemplateList: OrderTemplate[];
  orderTemplateDetails: OrderTemplate;
  constructor(private http: HttpClient, private route: Router) {
    this.orderTemplateDetails = this.ResetOrderTemplateDetails();
    this.orderTemplateToOrder = this.ResetOrderTemplateDetails();
  }

  refreshList() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    this.http.get(StaticInfo.getRootUrl() + 'OrderTemplate',{ headers: reqHeader }).toPromise().then(
      res => {
        this.orderTemplateList = res["value"] as OrderTemplate[];
        console.log("lista z refresh list order template:", res["value"]);
      },
      err => {
        // console.clear();
        console.log("ERROR refreshList OrderTemplate");
        console.log(err);
      }
    );
  }
  getHours(ExpectedTime: string): number | string {

    var h = ExpectedTime.split(":");

    return Number(h[0]);
  }
  getMinutes(ExpectedTime: string): number | string {

    var h = ExpectedTime.split(":");

    return Number(h[1]);
  }
  setExpectedTimeAll(hours: number | string, minutes: number | string = 0) {
    var ret = hours.toString() + ":" + minutes.toString() + ":" + "00";
    return ret;
  }
  setExpectedTime(hoursOrMin: number | string, ExpectedTime: string, place: number): string {
    if (ExpectedTime) {
      var h = ExpectedTime.split(":");
      if (h.length > 0) {
        h[place] = hoursOrMin.toString();
        ExpectedTime = h.join(":");
        return ExpectedTime;
      }
    }
    switch (place) {
      case 0:
        ExpectedTime = hoursOrMin.toString() + ":00:00";
        break;
      case 1:
        ExpectedTime = "00:" + hoursOrMin.toString() + ":00";
        break;
      case 2:
        ExpectedTime = "00:00:" + hoursOrMin.toString();
        break;
      default:
        ExpectedTime = "00:00:00";

    }


    return ExpectedTime;
  }

  ResetOrderTemplateDetails(): OrderTemplate {
    var OTD= new OrderTemplate();
    OTD = {
      MinCost: 0,
      MaxCost: 0,
      AdditionalInformation: '',
      OrderTemplateId: 0,
      Name: '',
      ExpectedTime: '00:00:00'
    }
    return OTD;
  }
  AddOrderTemplate(OTD: OrderTemplate) {
    // var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(StaticInfo.getRootUrl() + 'OrderTemplate', OTD).toPromise()
      .then(res => {
        if (res['status'] as boolean == true) {
          console.log("udało się dodać");
          this.route.navigate(['Order_Template_List']);

        } else {
          console.log("error AddOrderTemplate", res['info'], res);
        }
      },
        (err: HttpErrorResponse) => {
          // console.clear();
          console.log("ERROR AddOrderTemplate", err);
        }
      );
  }
  PutOrderTemplate(OTD: OrderTemplate) {
    return this.http.put(StaticInfo.getRootUrl() + 'OrderTemplate/' + OTD.OrderTemplateId, OTD).toPromise().then(res => {
      if (res['status'] as boolean == true) {
        console.log("udało się edytować orderTemplate");
        this.refreshList();
        this.route.navigate(['Order_Template_List']);

      } else {
        console.log("error PutOrderTemplate", res['info'], res);
      }
    },
      (err: HttpErrorResponse) => {
        // console.clear();
        console.log("ERROR PutOrderTemplate", err);
      }
    );
  }
  RemoveOrderTemplate(id: number) {
    if (confirm("Na Pewno chcesz usunąć tego użytkownika?")) {
      return this.http.delete(StaticInfo.getRootUrl() + 'OrderTemplate/' + id).toPromise().then(res => {
        if (res['status'] as boolean == true) {
          console.log("udało się usunąć orderTemplate");
          this.refreshList();
          this.route.navigate(['Order_Template_List']);

        } else {
          console.log("error RemoveOrderTemplate", res['info'], res);
        }
      },
        (err: HttpErrorResponse) => {
          // console.clear();
          console.log("ERROR RemoveOrderTemplate", err);
        }
      );
    }
  }
}
