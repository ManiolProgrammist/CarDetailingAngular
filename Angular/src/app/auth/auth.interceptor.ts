import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StaticInfo } from '../static-info';
import { UserService } from '../shared/services/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,private injector:Injector) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('No-Auth') == "True") {
            // console.log("No-Auth request info z auth.inceptor");
            // console.log(req.clone());
            req.headers.delete('No-Auth')
            return next.handle(req.clone()).pipe(tap(  succ => {
                // console.log("git request poszedł info z auth.inceptor ");
                // console.log(cloneReq);
            },
            err => {
                console.log("Request nie poszedł - info z auth.inceptor no auth");
                console.log(req.clone());
                console.log(err)
                if (err.status === 401) {
                    this.router.navigateByUrl('');
                }
            }));
        }
        //jeśli nie ma "noAuth to wykonaj:"
        //weź z cookies username i password i dodaj autoryzacje do headera
        if (localStorage.getItem(StaticInfo.getTokenPath())  != null) {
            // console.log("zaczynam request z interceptora");
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + (localStorage.getItem(StaticInfo.getTokenPath())))
            });
            console.log(cloneReq);
            return next.handle(cloneReq).pipe(tap(
                succ => {
                   
                },
                err => {
                    //timeout
                    console.log("Request nie poszedł - info z auth.inceptor");
                    
                    console.log(err);
                    if (err.status === 401) {
                      
                        localStorage.setItem(localStorage.getItem(StaticInfo.getTokenPath()),null);
                        localStorage.clear();
                        this.injector.get(UserService).UserLogOut();
                        this.router.navigateByUrl('');

                    }
                })
            );

        }else{
            console.log("brak tokenu uwierzytelniania");
            this.router.navigateByUrl('');
        }
    }
}