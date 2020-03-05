import { Injectable } from '@angular/core';
import { Order } from '../order.model';
import { StaticInfo } from '../../static-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Result } from '../result.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import {throwError as observableThrowError, observable} from 'rxjs';
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
    return this.http.post(StaticInfo.getRootUrl()+'Order',order);
   }
   GetAll():Observable<Result<Order[]>>{
    return this.http.get<Result<Order[]>>(StaticInfo.getRootUrl() + 'Order').pipe(catchError(this.errorHandler));
  }
  Get(id:number){
    return this.http.get<Result<Order>>(StaticInfo.getRootUrl() + 'Order/'+id).pipe(catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
}
