import { Injectable, Type } from '@angular/core';
import { Order } from '../order.model';
import { StaticInfo } from '../../static-info';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Result } from '../result.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError as observableThrowError, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserializable } from '../deserializable.model';
import { OrderTemplate } from '../order-template.model';
import { OrderTemplateService } from './order-template.service';
import { OrderInformations } from '../order-informations.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  NewOrder: Order;//order do wysłania //{ orderTemplate: OrderTemplate, date: Date };
  OrderOrdered: Order;//Order zakceptowany i zwrócony z info?
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.NewOrder = new Order();//{orderTemplate:null,date:null};
  }
  postOrder(order: Order): Observable<Result<Order>> {
    // //zwraca "observera"
    return this.http.post<Result<Order>>(StaticInfo.getRootUrl() + 'Order', order).pipe(catchError(this.errorHandler));
  }

  postTempOrder(order: Order, email: string): Observable<Result<Order>> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<Result<Order>>(StaticInfo.getRootUrl() + 'OrderTU', { order: order, email: email }, { headers: reqHeader }).pipe(catchError(this.errorHandler));
  }

  startOrder(order: Order, start: boolean): Observable<Result<Order>> {
    console.log("start order");
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl() + 'Order/Start/' + start, order).pipe(catchError(this.errorHandler));
  }
  endOrder(order: Order, end: boolean): Observable<Result<Order>> {
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl() + 'Order/End/' + end, order).pipe(catchError(this.errorHandler));
  }
  PayOnSpotForOrder(order:Order): Observable<Result<Order>> {
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl() + 'Order/PaidOnTheSpot',order).pipe(catchError(this.errorHandler));
  }
  GetAll(): Observable<Result<Order[]>> {
    return this.http.get<Result<Order[]>>(StaticInfo.getRootUrl() + 'Order').pipe(
      map((entries: any) => {
        var orders = new Array<Order>();
        entries.value.forEach(element => {
          orders.push(new Order().deserialize(element));
        });
        console.log(entries);
        return new Result<Order[]>().deserialize(entries, orders);

      },

        catchError(this.errorHandler)));
  }
  //get user order by id
  GetUserOrderById(id: number): Observable<Result<Order[]>> {
    return this.http.get<Result<Order[]>>(StaticInfo.getRootUrl() + 'UserOrders/' + id).pipe(
      map((entries: any) => {
        var orders = new Array<Order>();
        entries.value.forEach(element => {
          orders.push(new Order().deserialize(element));
        });
        return new Result<Order[]>().deserialize(entries, orders);
      },
        catchError(this.errorHandler)));

  }


  //get logged user order
  GetUserOrders(): Observable<Result<Order[]>> {
    return this.http.get<Result<Order[]>>(StaticInfo.getRootUrl() + 'UserOrders').pipe(
      map((entries: any) => {
        var orders = new Array<Order>();
        entries.value.forEach(element => {
          orders.push(new Order().deserialize(element));
        });
        return new Result<Order[]>().deserialize(entries, orders);
      },
        catchError(this.errorHandler)));

  }
  Get(id: number): Observable<Result<Order>> {
    return this.http.get<Result<Order>>(StaticInfo.getRootUrl() + 'Order/' + id).pipe(
      map((entr: any) => {
        if (entr.status) {
          return new Result<Order>().deserialize(entr, new Order().deserialize(entr.value));
        }
      }),
      catchError(this.errorHandler));
  }
  DeleteOrder(id: number): Observable<Result<Order>> {
    return this.http.delete<Result<Order>>(StaticInfo.getRootUrl() + 'Order/' + id).pipe(catchError(this.errorHandler));
  }
  //delay=delayMinutes/15
  AddDelay(order:Order,delay:number):Observable<Result<Order>> {
    
    return this.http.put<Result<Order>>(StaticInfo.getRootUrl() + 'Order/AddDelay/' + delay,order).pipe(
      map((entr: any) => {
        if (entr.status) {
          return new Result<Order>().deserialize(entr, new Order().deserialize(entr.value));
        }
      }),
      catchError(this.errorHandler));
  }
  AddOrderInfo(order:Order,info:string):Observable<Result<OrderInformations>>{
    return this.http.post<Result<OrderInformations>>(StaticInfo.getRootUrl() + 
    'OrderInfo/PostOrderInfo/' + order.OrderId,{value:info,orderId:order.OrderId}).
    pipe(catchError(this.errorHandler));
  }
  DeleteOrderInfo(orderInfoId:number):Observable<Result<OrderInformations>>{
    return this.http.delete<Result<OrderInformations>>(StaticInfo.getRootUrl() + 'OrderInfo/RemoveOrderInfo/'+orderInfoId).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }



}
