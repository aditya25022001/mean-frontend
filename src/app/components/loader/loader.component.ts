import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getLoading } from 'src/app/redux/shared';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(private store:Store<AppState>){}

  loading!:Observable<boolean>

  ngOnInit():void{
    this.loading = this.store.select(getLoading)
  }

}
