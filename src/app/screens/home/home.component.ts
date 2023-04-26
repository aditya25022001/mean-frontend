import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!:Product[]
  admin!:Observable<Boolean>
  filterForm!:FormGroup

  constructor(private productService:ProductService, private sharedService:SharedService, private store:Store<AppState>){
    this.filterForm = new FormGroup({
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      modelYear: new FormControl("",[Validators.minLength(4), Validators.maxLength(4)]),
    })
  }

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

  applyFilters(){
    if(this.filterForm.valid){
      const { minPrice, maxPrice, modelYear } = this.filterForm.value
      this.sharedService.loading(true)
      this.productService.getProducts(minPrice||0,maxPrice||2e7,modelYear||"").subscribe({
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

}
