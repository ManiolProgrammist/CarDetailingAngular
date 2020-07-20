import { Component, OnInit, Input } from '@angular/core';
import { OptionsService } from 'src/app/shared/services/options.service';
import { Result } from 'src/app/shared/result.model';
import { DayInfo } from 'src/app/shared/day-info.model';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-date-picker-component',
  templateUrl: './date-picker-component.component.html',
  styleUrls: ['./date-picker-component.component.css']
})

export class DatePickerComponentComponent implements OnInit {
  @Input() CustomPickDateBehaviour: (date: Date) => void;
 
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
  public showHours: boolean;
  public freeHours: Array<Date[]>;
  public pickedDayInfo: DayInfo;
  constructor(private optionsService: OptionsService,private  orderService:OrderService) {
    this.daysInMonthList = new Array<Week>();
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.showYear = this.currentYear;
    this.showMonth = this.currentMonth;

    this.SetDaysInMonthList(this.daysInMonthList, this.currentMonth, this.currentYear);
    // this.daysInMonthList = this.showCalendar(this.currentMonth, this.currentYear);
    // //bo tutaj liczą miesiące od 0 do 11 więc +1
    // this.addDayInfoToList(this.daysInMonthList,this.currentMonth+1,this.currentYear);
    this.AllYears = [];
    this.pickedDate = new Date();
    this.showHours = false;
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
    // daysInMonthListL.length=0;
    var daysInMonthListL = new Array<Week>();

    var date = 1, IterWeek = 0;

    while (date <= daysInMonth) {
      // creates a table row
      daysInMonthListL.push(new Week());
      //7 dni tygodnia, po każdym przelatujemy
      //niedziela ->0 firstDay=0, pon =1,wt=2,sr=3
      for (var j = 0; j < 7; j++) {

        if (!(IterWeek === 0 && j < firstDay - 1)) {

          daysInMonthListL[IterWeek].days[j].dayNr = date;
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
  addDayInfoToList(dayListPom: Array<Week>, showDayList: Array<Week>, month: number, year: number) {

    var dayInfoAr = new Array<DayInfo>();
    if(this.orderService.NewOrder.OrdersTemplate){
    this.optionsService.GetFreeDaysInMonthWithOrderTemplId(month, year, this.orderService.NewOrder.OrdersTemplate.OrderTemplateId).subscribe((data: Result<Array<DayInfo>>) => {
      console.log("GetDaysInMonth date picker", data);
      if (data.status) {
        //clear old array;
        showDayList.length = 0;
        data.value.forEach(element => {
          dayInfoAr.push(new DayInfo().deserialize(element))
        });
        var licznik = 0;
        //zapełnianie tablicy pomocniczej
        dayListPom.forEach(element => {
          element.days.forEach(element2 => {
            element2.dayInfo = new DayInfo();
            if (element2.dayNr != 0) {
              element2.dayInfo = dayInfoAr[licznik];
              licznik = licznik + 1;
            }
          });
        });
        // showDayList=dayListPom.slice();
        //copy to main array;
        dayListPom.forEach(week => {
          showDayList.push(week);
        })
        console.log("ShowDayList:", dayListPom);

      } else {
        console.log("GetDaysInMonth date picker", data.info);
      }

    })
  }else{
    console.log("brak this.orderService.NewOrder.OrdersTemplate.OrderTemplateId ")
  }
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
    this.SetDaysInMonthList(this.daysInMonthList, month, year);

  }

  SetDaysInMonthList(daysInMonthList: Array<Week>, month, year) {

    var pomDayInMonthList = this.showCalendar(month, year);
    this.addDayInfoToList(pomDayInMonthList, daysInMonthList, month + 1, year)
  }


  pickDate(day: Day) {
    console.log(day);

    if (day.dayNr != 0 && !isNaN(day.dayNr) && day.dayInfo) {
      if (day.dayInfo.IsOpen) {
        this.optionsService.GetFreeHoursInDayWithOrderTemplId(day.dayNr, this.showMonth + 1, this.showYear, this.orderService.NewOrder.OrdersTemplate.OrderTemplateId).subscribe((data: Result<Array<Date[]>>) => {
          if (data.status) {
            this.freeHours=new Array<Date[]>();
            data.value.forEach(e => {
              var arr = new Array<Date>();
              arr.push(new Date(e[0]))
              arr.push(new Date(e[1]))
              this.freeHours.push(arr);
            })

            this.pickedDate = new Date(this.showYear, this.showMonth, day.dayNr);
            this.pickedDayInfo = day.dayInfo;
            this.showHours = true;
            console.log("get hours:", data);
          } else {
            console.log("pick date Error", data.info);
          }

        })

      }
      // console.log(day, this.showMonth, this.showYear);
    }

  }


}


export class Week {
  days: Day[];
  constructor() {
    this.days = [];
    for (var i = 0; i < 7; i++) {
      var day = new Day();
      day.dayNr = 0;
      this.days.push(day);
    }
  }
}

export class Day {
  dayNr: number;
  dayInfo: DayInfo;
  // constructor() {
  //   this.dayInfo = new DayInfo();
  //   this.dayInfo.IsOpen = false;
  // }
}