import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';

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

  addProductForm!: FormGroup

  constructor(private productService:ProductService, private router:Router, private sharedService:SharedService){
    this.addProductForm = new FormGroup({
      productName : new FormControl('',[Validators.required]),
      modelYear : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      price : new FormControl(0,[Validators.required, Validators.min(1)]),
      description : new FormControl('')
    })
  }

  addProduct(){
    const { productName, modelYear, price, description } = this.addProductForm.value
    this.sharedService.loading(true)
    if(this.addProductForm.valid){
      this.productService.addProduct(productName,modelYear,price,description)
      .subscribe({
        next:(res) => {
          this.sharedService.toast(true,<string>res.message,"var(--success)");
          this.sharedService.loading(false)
          setTimeout(() => {
            this.sharedService.toast(false,"","var(--error)");
            this.router.navigate(["/"])
          },2500)
        },
        error:(err) =>{
          this.sharedService.toast(true,<string>err.error.message,"var(--error)");
          this.sharedService.loading(false)
          setTimeout(() => {
            this.addProductForm.reset()
          },2500)
        }
      });
    }
    else{
      this.sharedService.toast(true,"Invalid details","var(--error)");
      setTimeout(() => {
        this.sharedService.toast(false,"","var(--error)");
      },2500)
    }
  }
}
