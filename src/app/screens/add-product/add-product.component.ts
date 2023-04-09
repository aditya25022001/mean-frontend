import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productName:String = ""
  modelYear:String = ""
  price:Number = 0
  description:String = ""

  constructor(private productService:ProductService, private router:Router){}

  addProduct(){
    if(this.productName==="" || this.modelYear==="" || this.price===0) alert("* marked fields are required")
    else this.productService.addProduct(this.productName,this.modelYear,this.price,this.description).subscribe((data) => {
      this.router.navigate(["/"])
      console.log(data)
    });
  }

}
