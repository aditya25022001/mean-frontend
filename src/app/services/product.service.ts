import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "http://127.0.0.1:5000"

  constructor(private http:HttpClient) { }

  getProducts():Observable<{message:string, products:Product[]}>{
    return this.http.get<{message:string, products:Product[]}>(`${this.apiURL}/api/v1/products`)
  }

  getProductById(productId:string):Observable<{message:string, product:Product}>{
    return this.http.get<{message:string, product:Product}>(`${this.apiURL}/api/v1/products/${productId}`)
  }

}
