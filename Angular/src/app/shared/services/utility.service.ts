import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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
}
