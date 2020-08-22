import { Injectable } from '@angular/core';
import { OrderTemplate } from '../order-template.model';
import { StaticInfo } from '../../static-info';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from '../result.model';
import { OrderTemplateImage } from '../order-template-image.model';
import { throwError, observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable({
  providedIn: 'root'
})
export class OrderTemplateService {
  orderTemplateToOrder: OrderTemplate;
  orderTemplateList: OrderTemplate[];
  orderTemplateDetails: OrderTemplate;
  constructor(private http: HttpClient, private route: Router) {
    this.orderTemplateDetails = this.ResetOrderTemplateDetails();
    this.orderTemplateToOrder = this.ResetOrderTemplateDetails();
    this.orderTemplateList=new Array<OrderTemplate>();
  }

  refreshList() {

    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    this.Get().subscribe((res) => {
      var list=new Array();
      list=res["value"];  
      this.orderTemplateList.length=0;
      list.forEach((e)=>{
        this.orderTemplateList.push(new OrderTemplate().deserialize(e));
      });
  
    },
      (err) => {
        // console.clear();
        console.log("ERROR refreshList OrderTemplate");
        console.log(err);
      })

  
  }

  Get(): Observable<Result<Array<OrderTemplate>>> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<Result<Array<OrderTemplate>>>(StaticInfo.getRootUrl() + 'OrderTemplate', { headers: reqHeader });
  }
  ResetOrderTemplateDetails(): OrderTemplate {
    var OTD = new OrderTemplate();
    return OTD;
  }


  AddOT(OTD:OrderTemplate):Observable<Result<OrderTemplate>>{
    return this.http.post<Result<OrderTemplate>>(StaticInfo.getRootUrl() + 'OrderTemplate', OTD).pipe(catchError(this.errorHandler));
  }
  PutOT(OTD: OrderTemplate):Observable<Result<OrderTemplate>>{
    return this.http.put<Result<OrderTemplate>>(StaticInfo.getRootUrl() + 'OrderTemplate/' + OTD.OrderTemplateId, OTD).pipe(catchError(this.errorHandler));
  }

  RemoveOrderTemplate(id: number) {
    if (confirm("Na Pewno chcesz usunąć ten wzór zlecenia?")) {
      var usunacZlecenia=false;
      if(confirm("Jest możliwość że istnieją zlecenia podłączone do tego zlecenia, czy chcesz je też usunąć?")){
        usunacZlecenia=true;
      }
      return this.http.delete(StaticInfo.getRootUrl() + 'OrderTemplate/' + id+"/"+usunacZlecenia).toPromise().then(res => {
        if (res['status'] as boolean == true) {
          console.log("udało się usunąć orderTemplate");
          this.refreshList();
          this.route.navigate(['Order_Template_List'])
          

        } else {
          alert("nie udało się usunąć, error:"+res['info']);
          console.log("error RemoveOrderTemplate", res['info'], res);
        }
      },
        (err: HttpErrorResponse) => {
          // console.clear();
          console.log("ERROR RemoveOrderTemplate", err);
        }
      );
    }
  }
  GetByid(id: number): Observable<Result<OrderTemplate>> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<Result<OrderTemplate>>(StaticInfo.getRootUrl() + 'OrderTemplate/' + id);
  }
  // AddImage(OrderTemplateId: number, image: string): Observable<Result<OrderTemplateImage>> {

  //   return this.http.post<Result<OrderTemplateImage>>(StaticInfo.getRootUrl() + 'OrderTemplate/AddImage/' + OrderTemplateId, image);


  // } 
  AddImage(OrderTemplateId: number, image: File): Observable<Result<OrderTemplateImage>> {

    var formData = new FormData();
    formData.append("image", image,image.name);

    return this.http.post<Result<OrderTemplateImage>>(StaticInfo.getRootUrl() + 'OrderTemplate/AddImage/' + OrderTemplateId, formData).pipe(catchError(this.errorHandler));


  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
