import { Injectable, Type } from '@angular/core';
import { Order } from '../order.model';
import { StaticInfo } from '../../static-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Result } from '../result.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import {throwError as observableThrowError, observable} from 'rxjs';
import {map} from  'rxjs/operators'; 
import { Deserializable } from '../deserializable.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderFormData: Order;
  orderList: Order[];
  OrderDetails:Order;
  constructor(private http: HttpClient,private userService: UserService) { }

  ngOnInit() {

  }
  refreshList() {

    this.GetAll().toPromise().then(
      res => {
      this.orderList = res["value"] as Order[];
        console.log(res["value"]);
      }
    );
  }
  postOrder(order:Order){
    //zwraca "observera"
    return this.http.post(StaticInfo.getRootUrl()+'Order',order).pipe(catchError(this.errorHandler));
   }

  startOrder(order:Order,start:boolean): Observable<Result<Order>>{
     console.log("start order");
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl()+'Order/Start/'+start,order).pipe(catchError(this.errorHandler));
   }
   endOrder(order:Order,end:boolean): Observable<Result<Order>>{
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl()+'Order/End/'+end,order).pipe(catchError(this.errorHandler));
   }
   GetAll():Observable<Result<Order[]>>{
    return this.http.get<Result<Order[]>>(StaticInfo.getRootUrl() + 'Order').pipe(
      map((entries:any)=>{
        var orders=new Array<Order>();
        entries.value.forEach(element => {
          orders.push(new Order().deserialize(element) );
        });
        return new Result<Order[]>().deserialize(entries, orders);
      },
      
      catchError(this.errorHandler)));
  }
  Get(id:number){
    return this.http.get<Result<Order>>(StaticInfo.getRootUrl() + 'Order/'+id).pipe(
      map((entr:any)=>{
        return new Result<Order>().deserialize(entr,new Order().deserialize(entr.value));
      }),
      catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }


}
