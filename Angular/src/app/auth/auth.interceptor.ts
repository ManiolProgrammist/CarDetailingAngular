import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StaticInfo } from '../static-info';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("wejscie do interceptora");
        //jeśli request ma "No-Auth" to nie podlega autoryzacji
        if (req.headers.get('No-Auth') == "True") {
            // console.log("No-Auth request info z auth.inceptor");
            // console.log(req.clone());
            return next.handle(req.clone()).pipe(tap(  succ => {
                // console.log("git request poszedł info z auth.inceptor ");
                // console.log(cloneReq);
            },
            err => {
                console.log("Request nie poszedł - info z auth.inceptor no auth");
                console.log(req.clone());
                if (err.status === 401) {
                    this.router.navigateByUrl('');
                }
            }));
        }
        //jeśli nie ma "noAuth to wykonaj:"
        //weź z cookies username i password i dodaj autoryzacje do headera
        if (localStorage.getItem(StaticInfo.getLoginPath()) != null && localStorage.getItem(StaticInfo.getPasswordPath()) != null) {
            // console.log("zaczynam request z interceptora");
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Basic ' + btoa(localStorage.getItem(StaticInfo.getLoginPath()) + ":" + localStorage.getItem(StaticInfo.getPasswordPath())))
            });
            return next.handle(cloneReq).pipe(tap(
                succ => {
                    // console.log("git request poszedł info z auth.inceptor ");
                    // console.log(cloneReq);
                },
                err => {
                    console.log("Request nie poszedł - info z auth.inceptor");
                    console.log(cloneReq);
                    if (err.status === 401) {
                        this.router.navigateByUrl('');
                    }
                })
            );

        }else{
            console.log("brak w cookies loginu i hasła");
            this.router.navigateByUrl('');
        }
    }
}