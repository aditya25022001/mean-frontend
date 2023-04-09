import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = ""
  password:string = ""
  showPassword:boolean = false

  constructor(private userService:UserService){}

  ngOnInit():void{}

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  login(){
    this.userService.login(this.email, this.password).subscribe((data) => console.log(data))
  }

}
