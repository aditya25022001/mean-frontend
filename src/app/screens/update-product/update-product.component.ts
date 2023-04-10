import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent {

  productName:String = ""
  modelYear:String = ""
  price:Number = 0
  description:String = ""
  productId:String = ""
  message:String=""
  loading:Boolean = false
  success:Boolean = false

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit():void{
    this.productId = this.router.url.split("/")[2]
    this.productService.getProductById(this.router.url.split("/")[2]).subscribe((data) => {
      this.productName = data.product.productName
      this.modelYear = data.product.modelYear
      this.price = data.product.price
      this.description = <String>data.product.description
    })
  }

  updateProduct():void{
    this.loading=true
    this.productService.updateProduct(this.productId,this.productName,this.modelYear,this.price,this.description)
    .subscribe({
      next:(res) => {
        this.message = res.message
        this.loading = false
        this.success = true
        setTimeout(() => {
          this.router.navigate(["/product",`${this.productId}`])
          this.success = false
        },2500)
      },
      error:(err) => {
        this.message=err.error.message
        this.success=false
        this.loading=false
        setTimeout(() => {
          this.message=""
          location.reload()
        },2500)
      }
    })
  }

}

