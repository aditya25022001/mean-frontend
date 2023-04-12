import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent {

  productId:String = ""

  updateProductForm!:FormGroup

  constructor(private productService:ProductService, private router:Router, private sharedService:SharedService){
    this.updateProductForm = new FormGroup({
      productName : new FormControl('',[Validators.required]),
      modelYear : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      price : new FormControl(0,[Validators.required, Validators.min(1)]),
      description : new FormControl('')
    })
  }

  ngOnInit():void{
    this.productId = this.router.url.split("/")[2]
    this.productService.getProductById(this.router.url.split("/")[2]).subscribe((data) => {
      this.updateProductForm.setValue({
        productName : data.product.productName,
        modelYear : data.product.modelYear,
        price : data.product.price,
        description : <String>data.product.description
      })
    })
  }

  updateProduct():void{
    this.sharedService.loading(true)
    const { productName, modelYear, price, description } = this.updateProductForm.value
    if(this.updateProductForm.valid){
      this.productService.updateProduct(this.productId,productName,modelYear,price,description)
      .subscribe({
        next:(res) => {
          this.sharedService.loading(false)
          this.sharedService.toast(true,<string>res.message,"var(--success)")
          setTimeout(() => {
            this.sharedService.toast(false,"","var(--success)")
            this.router.navigate(["/product",`${this.productId}`])
          },2500)
        },
        error:(err) => {
          this.sharedService.loading(false)
          this.sharedService.toast(true,<string>err.error.message,"var(--error)")
          setTimeout(() => {
            this.sharedService.toast(false,"","var(--success)")
            location.reload()
          },2500)
        }
      })
    }
    else{
      this.sharedService.loading(false)
      this.sharedService.toast(true,"Invalid details","var(--error)");
      setTimeout(() => {
        this.sharedService.toast(false,"","var(--error)");
      },2500)
    }
  }

}

