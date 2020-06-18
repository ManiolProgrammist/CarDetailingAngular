import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  // EncryptPasswordForRegister(password:string,key:string):string{
  //   const bcrypt = require('bcrypt');
  //   const saltRounds = 10;
  //   var ret="";
  //   bcrypt.hash(password, saltRounds, function(err, hash) {
  //     ret = hash;
  //   });
  //   return ret;

  // }
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
  CutDate(Data: Date): string {
    if (Data != null) {
      var start = new Date(Data);
      var minutes=start.getMinutes();
      var minutesStr="";
      if(minutes<10){
        minutesStr="0"+String(minutes);
      }else{
        minutesStr=String(minutes);
      }
      return start.getFullYear() + '/' + start.getMonth() + '/' + start.getDate() + ' - ' + start.getHours() + ':' + minutesStr;
    } else {
      return ' ';
    }
  }
  AddMinutes(Data: Date, minutes: number): Date {
    return new Date(Data.getTime() + minutes * 60000);
  }
  AddHours(Data: Date, hours: number): Date { 
    return new Date(Data.getTime() + hours*60 * 60000);
  }
  AddDays(Data: Date, Days: number): Date { 
    return new Date(Data.getTime() + Days*24*60 * 60000);
  }
  AddTime(Data:Date,ExpectedTime:string){
    return new Date(Data.getTime()+(Number(this.getHours(ExpectedTime))*60*60000+Number(this.getMinutes(ExpectedTime))*60000));
  }
}
