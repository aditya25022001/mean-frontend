import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!:Product[]

  constructor(private productService:ProductService, private sharedService:SharedService){}

  ngOnInit():void{
    this.sharedService.loading(true)
    this.productService.getProducts().subscribe({
      next:(res) => {
        this.products = res.products,
        this.sharedService.loading(false)
      },
      error:(err) => {
        this.sharedService.loading(false)
        this.sharedService.toast(true,<string>err.error.message,"var(--error)")
        setTimeout(() => {
          this.sharedService.toast(false,"","var(--error)")
        },2500)
      }
    })
  }

}
