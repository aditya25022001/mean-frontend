import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  addProductForm!: FormGroup

  constructor(private productService:ProductService, private router:Router){
    this.addProductForm = new FormGroup({
      productName : new FormControl('',[Validators.required]),
      modelYear : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      price : new FormControl(0,[Validators.required, Validators.min(1)]),
      description : new FormControl('')
    })
  }

  addProduct(){
    const { productName, modelYear, price, description } = this.addProductForm.value
    this.loading=true
    if(this.addProductForm.valid){
      this.productService.addProduct(productName,modelYear,price,description)
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
            this.addProductForm.reset()
            this.message=""
          },2500)
        }
      });
    }
    else{
      this.message="Invalid details!"
      setTimeout(() => {
        this.message=""
        this.loading=false
      },2500)
    }
  }
}
