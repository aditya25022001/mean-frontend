import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() productId!:string
  @Input() productName!:string
  @Input() price!:number
  @Input() modelYear!:string
  @Input() description!:string
  @Input() image!:String

  constructor(){}

  ngOnInit():void{}

}
