import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';

import { UtilityService } from 'src/app/shared/services/utility.service';
import { OrderTemplateImage } from 'src/app/shared/order-template-image.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-template-details-component',
  templateUrl: './order-template-details-component.component.html',
  styleUrls: ['./order-template-details-component.component.css']
})


export class OrderTemplateDetailsComponentComponent implements OnInit {

  public TestOrdetTemplateImageArray: Array<OrderTemplateImage>;
  public photoFlag: boolean;
  @Input() set pickedOrderTemplate(value: OrderTemplate) {

    this.EditOrderTemplate = Object.assign({}, value);
    console.log(this.EditOrderTemplate);
    this.TestOrdetTemplateImageArray = this.EditOrderTemplate.OrdersTemplateImages;
  }
  EditOrderTemplate: OrderTemplate;
  selectedFiles: Array<File>;
  @Input() EditChangeFlag: (flag: boolean) => void;
  constructor(public orderTemplateService: OrderTemplateService, private utilityService: UtilityService, private route: Router) {
    this.selectedFiles = new Array<File>();
    this.EditOrderTemplate = this.orderTemplateService.ResetOrderTemplateDetails();
    this.photoFlag = false;
  }

  get hours(): number | string {
    if (this.EditOrderTemplate.ExpectedTime) {
      return this.utilityService.getHours(this.EditOrderTemplate.ExpectedTime);
    } else {
      return 0;
    }
  };
  get minutes(): number | string {
    if (this.EditOrderTemplate.ExpectedTime) {
      return this.utilityService.getMinutes(this.EditOrderTemplate.ExpectedTime);
    } else {
      return 0;
    }
  };
  set hours(h: number | string) {
    if (Number(h) >= 0) {
      this.EditOrderTemplate.ExpectedTime =
        this.utilityService.setExpectedTime(h, this.EditOrderTemplate.ExpectedTime, 0);
    } else {
      this.EditOrderTemplate.ExpectedTime =
        this.utilityService.setExpectedTime(0, this.EditOrderTemplate.ExpectedTime, 0);
    }
  }
  set minutes(m: number | string) {
    if (Number(m) >= 0) {
      this.EditOrderTemplate.ExpectedTime =
        this.utilityService.setExpectedTime(m, this.EditOrderTemplate.ExpectedTime, 1);
    } else {
      this.EditOrderTemplate.ExpectedTime =
        this.utilityService.setExpectedTime(0, this.EditOrderTemplate.ExpectedTime, 1);
    }
  }
  ngOnInit() {
  }

  ResetDetails() {
    this.EditOrderTemplate = this.orderTemplateService.ResetOrderTemplateDetails();
  }
  MinMaxValid() {
    return (this.EditOrderTemplate.MaxCost >= this.EditOrderTemplate.MinCost) && this.EditOrderTemplate.MinCost >= 0;
  }
  AddOrdTemplate() {
    this.orderTemplateService.AddOT(this.EditOrderTemplate).subscribe((res) => {
      if (res.status) {
        if (this.selectedFiles) {
          if (this.selectedFiles.length > 0) {
            this.SendPhoto(res.value.OrderTemplateId);
          }
        } this.route.navigate(['Pick_Order_Template']);
      }
    });
  }
  RemoveOrderTemplate() {
    if (this.EditOrderTemplate.OrderTemplateId != 0) {
      this.orderTemplateService.RemoveOrderTemplate(this.EditOrderTemplate.OrderTemplateId);
    } else {
      console.log("nie da się usunąć Order Template bez jego ID");
    }
  }

  CheckOrder(): boolean {
    if (this.MinMaxValid()) {
      if (Number(this.utilityService.getHours(this.EditOrderTemplate.ExpectedTime)) > 0 || this.utilityService.getMinutes(this.EditOrderTemplate.ExpectedTime) > 0) {
        return true;
      } else {
        alert("usługa musi trwać conajmniej 15 minut");
        return false;
      }
    } else {
      alert("koszt Minimalny musi być mniejszy lub równy kosztowi maksymalnemu");
      return false;
    }
  }

  AcceptEditOrdTemp() {
    if (this.CheckOrder()) {
      this.orderTemplateService.PutOT(this.EditOrderTemplate).subscribe((value) => {
        if (value.status) {
          if (this.selectedFiles.length > 0) {
            this.SendPhoto(value.value.OrderTemplateId);
          } else {
            this.route.navigate(['Pick_Order_Template']);
          }

        }
      });
      if (this.EditChangeFlag) {
        this.EditChangeFlag(false);
      }
    }
  }
  ngOnDestroy() {
    this.ResetDetails();
  }
  OnFileChanged(event) {
    this.selectedFiles = event.target.files;
    for (var i = 0; i < this.selectedFiles.length; i++) {
      var image = new Image();
      var me = this;
      var url = window.URL || window.webkitURL;
      image.onerror = function () {
        me.selectedFiles.length = 0;
        alert("niewłaściwy typ pliku, proszę przesyłać tylko nieuszkodzone pliki .jpg");
      }
      image.src = url.createObjectURL(this.selectedFiles[i]);
    }



  }

  ChangePhotoFlag(flag: boolean) {
    this.photoFlag = flag;
  }
  SendPhoto(OrderTemplateId: number) {


    if (this.selectedFiles.length > 0) {
      this.orderTemplateService.AddImage(OrderTemplateId, this.selectedFiles[0])
        .subscribe((result) => {
          if (result.status) {
            if (this.TestOrdetTemplateImageArray == null) {
              this.TestOrdetTemplateImageArray = new Array<OrderTemplateImage>();
            }
            this.TestOrdetTemplateImageArray.push(new OrderTemplateImage().deserialize(result.value));
            this.route.navigate(['Pick_Order_Template']);
          }
        });
    } else {
      return;
    }
  }


}
