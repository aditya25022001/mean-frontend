import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces';
import { Observable, catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiURL = "http://127.0.0.1:5000"

  constructor(private http:HttpClient) { }

  getProducts():Observable<{message:String, products:Product[]}>{
    return this.http.get<{message:String, products:Product[]}>(`${this.apiURL}/api/v1/products`)
  }

  getProductById(productId:String):Observable<{message:String, product:Product}>{
    return this.http.get<{message:String, product:Product}>(`${this.apiURL}/api/v1/products/${productId}`)
  }

  deleteProduct(productId:String):Observable<{message:String}>{
    return this.http.delete<{message:String}>(`${this.apiURL}/api/v1/products/${productId}`)
  }

  addProduct(productName:String, modelYear:String, price:Number, description:String):Observable<{message:String, products:Product}>{
    return this.http.post<{message:String, products:Product}>(`${this.apiURL}/api/v1/products`,{ productName, price, description, modelYear },httpOptions);
  }

  updateProduct(productId:String, productName:String, modelYear:String, price:Number, description:String):Observable<{message:String, products:Product}>{
    return this.http.put<{message:String, products:Product}>(`${this.apiURL}/api/v1/products/${productId}`,{ productName, price, description, modelYear },httpOptions);
  }

}
