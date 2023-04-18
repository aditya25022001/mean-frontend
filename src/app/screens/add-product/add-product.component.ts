import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { ulid } from 'ulid'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  addProductForm!: FormGroup
  imageUrl:String | undefined = undefined
  isAdmin!:Observable<Boolean>
  productId:String | undefined = undefined

  constructor(private store:Store<AppState>, private productService:ProductService, private router:Router, private storage:Storage, private sharedService:SharedService){
    this.addProductForm = new FormGroup({
      productName : new FormControl('',[Validators.required]),
      modelYear : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      price : new FormControl(0,[Validators.required, Validators.min(1)]),
      description : new FormControl('')
    })
  }

  ngOnInit():void{
    this.store.select(state => state.login.user).subscribe((d) => {
      if(!d || !d.isAdmin) this.router.navigate(["/"])
    })
  }

  setImage(event:Event):void{
    this.sharedService.loading(true);
    this.productId = ulid()
    uploadBytes(ref(this.storage,`/mean/${this.productId}`),<Blob>(<HTMLInputElement>event?.target)?.files?.[0])
    .then((res) => {
      getDownloadURL(ref(this.storage,`/mean/${this.productId}`))
      .then((url) => {
        this.sharedService.loading(false);
        this.sharedService.toast(true,"Image uploaded successfully","var(--success)");
        this.imageUrl=url
      })
      .catch((err) => {
        this.sharedService.loading(false);
        this.sharedService.toast(true,"Error uploading image","var(--error)");
      })
    })
    .catch((err) => {
      this.sharedService.loading(false);
      this.sharedService.toast(true,"Error uploading image","var(--error)");
    })
  }

  addProduct(){
    const { productName, modelYear, price, description } = this.addProductForm.value
    this.sharedService.loading(true)
    if(this.addProductForm.valid){
      this.productService.addProduct(productName,modelYear,price,description,this.imageUrl, this.productId)
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
