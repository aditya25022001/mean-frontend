import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, map, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  name!:Observable<String>
  initial!:String

  constructor(private store:Store<AppState>){}

  ngOnInit():void{
    // this.store.select(state => state.auth.user.name[0]).subscribe(d => this.initial=d);
    this.name = this.store.select(state => state.auth.user.name)
  }

}
