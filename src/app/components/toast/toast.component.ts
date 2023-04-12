import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getToast } from 'src/app/redux/shared';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(private store:Store<AppState>){}

  toast!:Observable<{ isError:boolean, message?:string, color?:string }>

  ngOnInit():void{
    this.toast = this.store.select(getToast)
  }

}
