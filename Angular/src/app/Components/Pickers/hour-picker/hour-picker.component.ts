import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OptionsService } from 'src/app/shared/services/options.service';

import { UtilityService } from 'src/app/shared/services/utility.service';
import { DayInfo } from 'src/app/shared/day-info.model';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.css']
})
export class HourPickerComponent implements OnChanges {

  @Input() public pickedDate: Date;
  @Input() CustomPickDateBehaviour: (user: Date) => void;
  @Input() pickedDayInfo: DayInfo;
  @Input() freeHours: Array<Date[]>;
  public openHours: { openHour: number, openMinute: number, closeHour: number, closeMinute: number };
  public openHoursMinArray: { Hour: number, Minute: { nr: number, isFree: boolean, isPickable: boolean }[] }[];
  // dayInfo: DayInfo;
  constructor(private optionsService: OptionsService, private utilityService: UtilityService,private orderService:OrderService) { }
  ngOnChanges(): void { //za każdym razem gdy będzie nowa wartość któregokolwiek z parametrów. Od zewnątrz?
    console.log(this.pickedDayInfo);
    if (this.pickedDayInfo != null) {


      if (this.pickedDayInfo.IsOpen) {
        this.openHours = {
          openHour: Number(this.utilityService.getHours(this.pickedDayInfo.OpenHour)),
          openMinute: Number(this.utilityService.getMinutes(this.pickedDayInfo.OpenHour)),
          closeHour: Number(this.utilityService.getHours(this.pickedDayInfo.CloseHour)),
          closeMinute: Number(this.utilityService.getMinutes(this.pickedDayInfo.CloseHour))
        };
        this.openHoursMinArray = new Array<{ Hour: number, Minute: { nr: number, isFree: boolean, isPickable: boolean }[] }>();

        for (var H = this.openHours.openHour, I = 0; H <= this.openHours.closeHour; H++, I++) {

          var startM = 0;
          var endM = 60;

          if (H == this.openHours.openHour) {//pierwsza godzina pracy
            startM = this.openHours.openMinute;

          } else if (H == this.openHours.closeHour) {//ostatnia godzina pracy
            endM = this.openHours.closeMinute;
            if (endM == 0) {
              break;
            }
          }

          this.openHoursMinArray.push({ Hour: H, Minute: new Array<{ nr: number, isFree: boolean, isPickable: boolean }>() });
          for (var M = startM; M < endM; M = M + this.optionsService.GetMinutesDivider()) {

            this.openHoursMinArray[I].Minute.push({ nr: M, isFree: false, isPickable: false });
          }
        }


        if (this.freeHours != null) {
          for (var i = 0; i < this.freeHours.length; i++) {
            
            //start
            var hourIndex = this.openHoursMinArray.findIndex(e => e.Hour == (this.freeHours[i])[0].getHours());
            var minIndex = this.openHoursMinArray[hourIndex].Minute.findIndex(e => e.nr == this.freeHours[i][0].getMinutes());
            //koniec
            var endHour=(this.freeHours[i])[1].getHours();
            var endMin= this.freeHours[i][1].getMinutes();
            if( endMin==0){
              endHour-=1;
              endMin=45;
            }else{
              endMin-=15;
            }
            var hourEndIndex = this.openHoursMinArray.findIndex(e => e.Hour ==endHour);
            var minEndIndex = this.openHoursMinArray[hourEndIndex].Minute.findIndex(e => e.nr==endMin);

            //kiedy coś będzie do wyboru (będzie od tego czasu można rezerwować)
            var hourPickable = this.openHoursMinArray[hourEndIndex].Hour - Number(this.utilityService.getHours(this.orderService.NewOrder.OrdersTemplate.ExpectedTime));
            var minutePickabl = this.openHoursMinArray[hourEndIndex].Minute[minEndIndex].nr+15 - Number(this.utilityService.getMinutes(this.orderService.NewOrder.OrdersTemplate.ExpectedTime));
            //czyli jeśli wybierzemy ten termin to dalej będzie czas do nastepnego zlecenia żeby skończyć to zlecenie
            if (minutePickabl < 0) {
              hourPickable -= 1;
              minutePickabl = 60 - minutePickabl;
            }
            var endMinLicz = 0;
            var startMinIndex=minIndex;
            for (var h = hourIndex; h <= hourEndIndex; h++) {
           
              endMinLicz=this.openHoursMinArray[h].Minute.length;
              
              if(h>hourIndex){
                startMinIndex=0;
              }

              if (h == hourEndIndex) {
                endMinLicz = minEndIndex+1;
              }
              for (var m = startMinIndex; m < endMinLicz; m++) {
                if (this.openHoursMinArray[h].Hour == hourPickable) {
                  if (this.openHoursMinArray[h].Minute[m].nr <= minutePickabl) {
                    this.openHoursMinArray[h].Minute[m].isPickable=true;
                  }
                }if(this.openHoursMinArray[h].Hour<hourPickable){
                  this.openHoursMinArray[h].Minute[m].isPickable=true;
                }
                this.openHoursMinArray[h].Minute[m].isFree = true;
              }

            }
            console.log(this.openHoursMinArray);

          }
        }
      }

    }

  }



  ngOnInit() {
  }

  PickHour(Hour: number, minute: number) {
    if (this.CustomPickDateBehaviour != null) {
      this.pickedDate = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth(), this.pickedDate.getDate(), Hour, minute);
      this.pickedDate.toDateString();
      this.CustomPickDateBehaviour(this.pickedDate);
    }
    console.log(this.pickedDate);
    console.log(this.pickedDate.toUTCString());
    console.log(Hour, minute);
  }


}
