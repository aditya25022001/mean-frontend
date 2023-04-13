import { exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private store:Store<AppState>) { }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    return this.store.select(state => state.login.user.token).pipe(
      take(1),
      exhaustMap((token) => {
        if(!token) return next.handle(req);
        if(["PUT","POST","DELETE","PATCH"].includes(req.method)){
          console.log("API call intercepted")
          req=req.clone({
            setHeaders:{
              'Content-type':'application/json',
              Authorization:`Bearer ${token}`
            }
          })
        }
        return next.handle(req);
      })
    )
  }

}
