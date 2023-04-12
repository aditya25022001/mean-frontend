import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { error, loading } from '../redux/shared';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private store:Store<AppState>) { }

  loading(val:boolean):void{
    this.store.dispatch(loading({ loading:val }))
  }

  toast(is:boolean, msg:string, color:string):void{
    this.store.dispatch(error({ message:msg, isError:is, color }))
  }

}
