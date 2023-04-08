import { Product } from 'src/app/interfaces';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product:Product | undefined
  rupeeSign = String.fromCharCode(8377)

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit():void{
    this.productService.getProductById(this.router.url.split("/")[2]).subscribe((response) => this.product=response.product);
  }

}
