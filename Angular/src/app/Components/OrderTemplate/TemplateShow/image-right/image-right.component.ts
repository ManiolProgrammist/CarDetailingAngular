import { Component, OnInit, Input } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';

@Component({
  selector: 'app-image-right',
  templateUrl: './image-right.component.html',
  styleUrls: ['./image-right.component.css']
})
export class ImageRightComponent implements OnInit {

  constructor() { }
  @Input() orderTemplate:OrderTemplate;
  @Input() side:boolean;
  ngOnInit(): void {
  }

}
