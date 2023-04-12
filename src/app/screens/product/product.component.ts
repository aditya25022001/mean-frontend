import { Product } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product:Product | undefined

  constructor(private productService:ProductService, private router:Router, private sharedService:SharedService){}

  ngOnInit():void{
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
        this.sharedService.loading(false)
        this.sharedService.toast(true,<string>res.message,"var(--success)")
        setTimeout(()=>{
          this.sharedService.toast(false,"","var(--success)")
          this.router.navigate(["/"])
        },2500)
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
