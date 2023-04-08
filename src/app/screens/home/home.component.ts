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
  rupeeSign:String = String.fromCharCode(8377)
  loading:boolean = true

  constructor(private productService:ProductService){}

  ngOnInit():void{
    setTimeout(() => {
      this.productService.getProducts().subscribe((response) => this.products=response.products);
      this.loading=false
    },1500)
  }

}
