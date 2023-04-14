import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { Storage, ref, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product:Product | undefined
  admin!:Observable<Boolean>

  constructor(private productService:ProductService, private router:Router, private sharedService:SharedService, private store:Store<AppState>, private storage:Storage){}

  ngOnInit():void{
    this.admin = this.store.select(state => state.login.user.isAdmin)
    this.sharedService.loading(true)
    this.productService.getProductById(this.router.url.split("/")[2]).subscribe({
      next:(res) => {
        this.sharedService.loading(false)
        this.product=res.product
      },
      error:(err) => {
        this.sharedService.toast(true,<string>err.error.message,"var(--error)")
        setTimeout(()=>{
          this.router.navigate(["/"])
        },2500)
      }
    });
  }

  deleteProduct():void{
    this.sharedService.loading(true)
    this.productService.deleteProduct(this.router.url.split("/")[2])
    .subscribe({
      next:(res) => {
        deleteObject(ref(this.storage,`/mean/${this.router.url.split("/")[2]}`))
        .then((response) => {
          this.sharedService.loading(false)
          this.sharedService.toast(true,<string>res.message,"var(--success)")
          setTimeout(()=>{
            this.sharedService.toast(false,"","var(--success)")
            this.router.navigate(["/"])
          },2500)
        })
        .catch((error) => {
          console.error(error.error.message)
        })
      },
      error:(err) => {
        this.sharedService.loading(false)
        this.sharedService.toast(true,<string>err.error.message,"var(--error)")
        setTimeout(()=>{
          this.sharedService.toast(false,"","var(--success)")
          this.router.navigate(["/"])
        },2500)
      }
    });
  }

}
