import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiURL = "https://meanbackend-kc4w.onrender.com"
  url:String = ""

  constructor(private http:HttpClient) {}

  getProducts(minPrice=0, maxPrice=2e7, modelYear=""):Observable<{message:String, products:Product[]}>{
    return this.http.get<{message:String, products:Product[]}>(`${this.apiURL}/api/v1/products?minPrice=${minPrice}&maxPrice=${maxPrice}&modelYear=${modelYear}`)
  }

  getProductById(productId:String):Observable<{message:String, product:Product}>{
    return this.http.get<{message:String, product:Product}>(`${this.apiURL}/api/v1/products/${productId}`)
  }

  deleteProduct(productId:String):Observable<{message:String, success:Boolean}>{
    return this.http.delete<{message:String, success:Boolean}>(`${this.apiURL}/api/v1/products/${productId}`)
  }

  addProduct(productName:String, modelYear:String, price:Number, description:String, image?:String, productId?:String):Observable<{message:String, product:Product, success:Boolean}>{
    return this.http.post<{message:String, product:Product, success:Boolean}>(`${this.apiURL}/api/v1/products`,{ productName, price, description, modelYear, image, productId });
  }

  updateProduct(productId:String, productName:String, modelYear:String, price:Number, description:String):Observable<{message:String, product:Product, success:Boolean}>{
    return this.http.put<{message:String, product:Product, success:Boolean}>(`${this.apiURL}/api/v1/products/${productId}`,{ productName, price, description, modelYear });
  }

}
