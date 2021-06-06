import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PayuService } from 'src/app/shared/services/payu.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js'
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {


  constructor(private serv:PayuService){}

  ngOnInit(): void {
  }



}
