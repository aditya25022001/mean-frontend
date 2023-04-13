import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!:Product[]
  admin!:Observable<Boolean>

  constructor(private productService:ProductService, private sharedService:SharedService, private store:Store<AppState>){}

  ngOnInit():void{
    this.admin = this.store.select(state => state.login.user.isAdmin)
    this.sharedService.loading(true)
    this.productService.getProducts().subscribe({
      next:(res) => {
        this.products = res.products,
        this.sharedService.loading(false)
      },
      error:(err) => {
        this.sharedService.loading(false)
        this.sharedService.toast(true,<string>err.error.message,"var(--error)")
        setTimeout(() => {
          this.sharedService.toast(false,"","var(--error)")
        },2500)
      }
    })
  }

}
