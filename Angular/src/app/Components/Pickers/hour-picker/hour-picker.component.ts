import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OptionsService } from 'src/app/shared/services/options.service';
import { DayInfo } from 'src/app/shared/options.model';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.css']
})
export class HourPickerComponent implements OnChanges {

  @Input() public pickedDate: Date;
  @Input() CustomPickDateBehaviour: (user: Date) => void;
  public openHours: { openHour: number, openMinute: number, closeHour: number, closeMinute: number };
  public openHoursMinArray: { Hour: number, Minute: number[] }[];
  dayInfo: DayInfo;
  constructor(private optionsService: OptionsService, private utilityService: UtilityService) { }
  ngOnChanges(): void { //za każdym razem gdy będzie nowa wartość któregokolwiek z parametrów. Od zewnątrz?
    if (this.pickedDate.getDay() != 0) {
      this.dayInfo = this.optionsService.GetDayInfo(this.pickedDate.getDay());
    } else {
      this.dayInfo = this.optionsService.GetDayInfo(7);
    }
    
    if (this.dayInfo.IsOpen) {
      this.openHours = {
        openHour: Number(this.utilityService.getHours(this.dayInfo.OpenHour)),
        openMinute: Number(this.utilityService.getMinutes(this.dayInfo.OpenHour)),
        closeHour: Number(this.utilityService.getHours(this.dayInfo.CloseHour)),
        closeMinute: Number(this.utilityService.getMinutes(this.dayInfo.CloseHour))
      };
      this.openHoursMinArray = new Array<{ Hour: number, Minute: number[] }>();

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
  
        this.openHoursMinArray.push({ Hour: H, Minute: new Array<number>() });
        for (var M = startM; M < endM; M = M + this.optionsService.GetMinutesDivider()) {
          this.openHoursMinArray[I].Minute.push(M);
        }
      }
    }

  

  }



  ngOnInit() {
  }

  PickHour(Hour: number, minute: number) {
    if(this.CustomPickDateBehaviour!=null){
      this.pickedDate=new Date(this.pickedDate.getFullYear(),this.pickedDate.getMonth(),this.pickedDate.getDate(),Hour,minute);
      this.pickedDate.toDateString();
      this.CustomPickDateBehaviour(this.pickedDate);
    }
    console.log(this.pickedDate);
    console.log(      this.pickedDate.toUTCString());
    console.log(Hour, minute);
  }


}
