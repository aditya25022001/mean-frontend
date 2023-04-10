import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiURL = "http://127.0.0.1:5000"

  constructor(private http:HttpClient) { }

  ngOnInit():void{ }

  register(email:string, password:string, name:string):Observable<{message:String, user:User}>{
    return this.http.post<{message:String, user:User}>(`${this.apiURL}/api/v1/users/register`,{ email, password, name },httpOptions);
  }

  login(email:String, password:String):Observable<{message:String, user:User}>{
    return this.http.post<{message:String, user:User}>(`${this.apiURL}/api/v1/users/login`,{ email, password },httpOptions);
  }
}
