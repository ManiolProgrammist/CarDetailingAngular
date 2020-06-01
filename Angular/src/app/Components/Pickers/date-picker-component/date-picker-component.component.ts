import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { OptionsService } from 'src/app/shared/services/options.service';

@Component({
  selector: 'app-date-picker-component',
  templateUrl: './date-picker-component.component.html',
  styleUrls: ['./date-picker-component.component.css']
})

export class DatePickerComponentComponent implements OnInit {
  @Input() CustomPickDateBehaviour:(date:Date)=>void;
  today: Date;
  currentMonth: number;
  currentYear: number;
  months: string[] = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  // monthsAng: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  WeekDays: string[] = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Ni"];
  showYear: number;
  showMonth: number = 0;
  daysInMonthList: Week[];
  AllYears: number[];
  pickedDate: Date;
  public showHours:boolean;
  constructor(public orderService: OrderService, public orderTemplateService: OrderTemplateService, private optionsService: OptionsService) {
    this.daysInMonthList = new Array<Week>();
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.showYear = this.currentYear;
    this.showMonth = this.currentMonth;
    this.daysInMonthList = this.showCalendar(this.currentMonth, this.currentYear);
    this.AllYears = [];
    this.pickedDate=new Date();
    this.showHours=false;
    for (var i = 0; i < 45; i++) {
      this.AllYears.push(2019 + i);
    }
  }

  ngOnInit() {
  }



  showCalendar(month, year): Week[] {
    //tutaj mamy jaki jest pierwszy dzień tygodnia
    var firstDay = (new Date(year, month)).getDay();
    //bo niedziela to tutaj 0, więc niedzielę przenosimy jako 7
    firstDay = (firstDay == 0) ? 7 : firstDay;
    //wtedy niedziela będzie=7

    //tutaj mamy liczbe dni w miesiącu oraz tutaj się dzieje magia z miesiącami przestępnymi!
    var daysInMonth = 32 - new Date(year, month, 32).getDate();
    //clear array
    var daysInMonthListL = new Array<Week>();

    var date = 1, IterWeek = 0;

    while (date <= daysInMonth) {
      // creates a table row
      daysInMonthListL.push(new Week());
     //7 dni tygodnia, po każdym przelatujemy
      //niedziela ->0 firstDay=0, pon =1,wt=2,sr=3
      for (var j = 0; j < 7; j++) {

        if (!(IterWeek === 0 && j < firstDay - 1)) {

          daysInMonthListL[IterWeek].days[j] = date;
          date++;
          if (date > daysInMonth) {
            break;
          }
        }
      }
      IterWeek++;
    }


    return daysInMonthListL;
  }

  previous() {

    this.setDataShow(
      (this.showMonth === 0) ? 11 : this.showMonth - 1,
      (this.showMonth === 0) ? this.showYear - 1 : this.showYear);
  }

  next() {
    this.setDataShow(
      ((this.showMonth + 1) % 12),
      ((this.showMonth === 11) ? this.showYear + 1 : this.showYear));
  }

  jumpPresent() {
    this.setDataShow(this.currentMonth, this.currentYear);

  }
  setDataShow(month, year) {
    if (year >= this.AllYears[0] && year <= this.AllYears[this.AllYears.length - 1]) {
      this.showMonth = month;
      this.showYear = year;
      this.jumpDef(this.showMonth, this.showYear);
    }
  }
  jump() {
    this.jumpDef(this.showMonth, this.showYear);
  }
  jumpDef(month, year) {
    this.daysInMonthList = this.showCalendar(month, year);
  }

  pickDate(day) {
    if(day!=0&&!isNaN(day)){
    this.pickedDate=new Date(this.showYear,this.showMonth,day);
    
    this.showHours=true;
    console.log(day, this.showMonth, this.showYear);
    }

  }


}


export class Week {
  days: number[];
  constructor() {
    this.days = [];
    for (var i = 0; i < 7; i++) {

      this.days.push(0);
    }
  }
}