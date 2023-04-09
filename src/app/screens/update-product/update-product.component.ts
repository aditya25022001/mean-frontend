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
    this.productService.updateProduct(this.productId,this.productName,this.modelYear,this.price,this.description).subscribe((data) => {
      console.log(data)
      this.router.navigate(["/product",`${this.productId}`])
    })
  }

}

