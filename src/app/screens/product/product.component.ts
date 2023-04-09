import { Product } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product:Product | undefined
  rupeeSign = String.fromCharCode(8377)
  message:String = ""
  loading:Boolean = false
  success:Boolean = false

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit():void{
    this.loading = true
    this.productService.getProductById(this.router.url.split("/")[2]).subscribe({
      next:(res) => {
        this.loading=false
        this.product=res.product
      },
      error:(err) => {
        this.message=err.error.message
        setTimeout(()=>{
          this.router.navigate(["/"])
        },2500)
      }
    });
  }

  deleteProduct():void{
    this.loading=true
    this.productService.deleteProduct(this.router.url.split("/")[2])
    .subscribe({
      next:(res) => {
        this.loading=false
        this.success=true
        this.message = res.message
        setTimeout(()=>{
          this.router.navigate(["/"])
        },2500)
      },
      error:(err) => {
        this.loading=false
        this.success=false
        this.message = err.error.message
        setTimeout(()=>{
          this.router.navigate(["/"])
        },2500)
      }
    });
  }

}
