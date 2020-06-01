import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Options, DayInfo } from '../options.model';
import { Result } from '../result.model';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  options:Options;
  constructor(private http: HttpClient, private route: Router) { 
    this.options=new Options();
    this.options.Days=new Array<DayInfo>();
    
    this.options.Days.push(<DayInfo>{IsOpen:true,OpenHour:'09:30:00',CloseHour:'16:30:00',Name:'pon'});
    this.options.Days.push(<DayInfo>{IsOpen:true,OpenHour:'09:30:00',CloseHour:'17:30:00',Name:'wto'});
    this.options.Days.push(<DayInfo>{IsOpen:true,OpenHour:'08:00:00',CloseHour:'16:00:00',Name:'śro'});
    this.options.Days.push(<DayInfo>{IsOpen:true,OpenHour:'09:00:00',CloseHour:'17:00:00',Name:'czw'});
    this.options.Days.push(<DayInfo>{IsOpen:true,OpenHour:'09:00:00',CloseHour:'17:00:00',Name:'pią'});
    this.options.Days.push(<DayInfo>{IsOpen:false,Name:'sob'});
    this.options.Days.push(<DayInfo>{IsOpen:false,Name:'nie'});

  }

  GetOptions():Result<Options>{
    var r=new Result<Options>();
    r.status=true;
    r.value=this.options;
    return r;
  }

  GetDayInfo(dayNr:number):DayInfo{
 
    return dayNr!=0&&!isNaN(dayNr)?this.options.Days[dayNr-1]:this.options.Days[0];
  }

  

  GetMinutesDivider():number{
    return 15;
  }



}
