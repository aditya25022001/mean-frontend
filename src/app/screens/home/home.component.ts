import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products:Product[] = []
  loading:boolean = true
  error:String = ""

  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.productService.getProducts().subscribe({
      next:(res) => {
        this.products = res.products,
        this.loading=false
      },
      error:(error) => {
        this.error=error.error.message
        this.loading=false
        setTimeout(() => {
          this.error = ""
        },2500)
      }
    })
  }

}
