import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = ""
  password:string = ""
  showPassword:boolean = false
  loading:Boolean = true
  message:String = ""
  success:Boolean = false

  constructor(private userService:UserService, private router:Router){}

  ngOnInit():void{
    setTimeout(() => {
      this.loading=false
    },1500)
  }

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  login(){
    this.loading=true
    this.userService.login(this.email, this.password)
    .subscribe({
      next:(res) => {
        this.loading=false
        this.success=true
        this.message=`Logged in with ${this.email}`
        localStorage.setItem("useInfo",JSON.stringify(res.user));
        setTimeout(()=>{
          this.router.navigate(["/"])
        },2500)
      },
      error:(err) => {
        this.success=false
        this.loading=false
        this.message=err.error.message
        setTimeout(() => {
          this.message=""
        },2500)
      }
    })
  }

}
