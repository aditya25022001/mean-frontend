import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { logout } from 'src/app/redux/login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  name!:Observable<String>

  constructor(private store:Store<AppState>){}

  ngOnInit():void{
    this.name = this.store.select(state => state.login.user.name)
  }

  logoutAction():void{
    this.store.dispatch(logout());
  }

}
