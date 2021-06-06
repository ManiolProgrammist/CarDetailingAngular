import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';
import { StaticInfo } from 'src/app/static-info';
import { throwError as observableThrowError, observable } from 'rxjs';
import { Result } from '../result.model';
@Injectable({
  providedIn: 'root'
})
export class PayuService {
  //sandbox public info from payu site:
  pos_id = "398284"//"300746" //""
  MD5 = "cbe826cb0fd5fed67850428333fcafa3"
  client_id = "398284"//"300746"//
  client_secret = "41f0e837936ddee0e3091799925fe45c"//"2ee86a66e5d97e3fadc400c9f19b065d" //
  //urlAuthorize = "https://private-anon-805155d611-payu21.apiary-proxy.com/pl/standard/user/oauth/authorize"
  urlAuthorize = "https://secure.snd.payu.com/pl/standard/user/oauth/authorize"
  BEARER = "d9a4536e-62ba-4f60-8017-6053211d3f47"
  //or?: 
  urlOrder = "https://secure.snd.payu.com/api/v2_1/orders"
  //"https://private-anon-9b939f33a5-payu21.apiary-mock.com/api/v2_1/orders/"
  constructor(private http: HttpClient, private route: Router) { }
  postAuthorize(): Observable<any> {
    // // //zwraca "observera"
    // var reqHeader = new HttpHeaders(
    //   {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   });
    // var body = {
    //   grant_type: 'client_credentials',
    //   client_id: this.client_id,
    //   client_secret: this.client_secret
    // }

    // console.log(body)
    // console.log(reqHeader)
    // return this.http.post<PayuAuthorize>(this.urlAuthorize, "grant_type=client_credentials&client_id=398284&client_secret=41f0e837936ddee0e3091799925fe45c", { headers: reqHeader }).pipe(catchError(this.errorHandler));
    return this.http.get(StaticInfo.getRootUrl() + 'PayU').pipe(catchError(this.errorHandler));
  }
  payForOrder(OrderId:number): Observable<Result<string>> {
    return this.http.get<Result<string>>(StaticInfo.getRootUrl() + 'PayU/'+OrderId).pipe(catchError(this.errorHandler));
  }

  
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
