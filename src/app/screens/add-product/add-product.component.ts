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
  message:String=""
  loading:Boolean = false
  success:Boolean = false

  constructor(private productService:ProductService, private router:Router){}

  addProduct(){
    if(this.productName==="" || this.modelYear==="" || this.price===0) alert("* marked fields are required")
    else{
      this.loading=true
      this.productService.addProduct(this.productName,this.modelYear,this.price,this.description)
      .subscribe({
        next:(res) => {
          this.message = res.message
          this.loading = false
          this.success = true
          setTimeout(() => {
            this.router.navigate(["/"])
            this.success = false
          },2500)
        },
        error:(err) =>{
          this.message=err.error.message
          this.success=false
          this.loading=false
          setTimeout(() => {
            this.message=""
          },2500)
        }
      });
    }
  }

}
