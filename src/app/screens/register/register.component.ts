import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name:string = ""
  email:string = ""
  password:string = ""
  confirmPassword:string = ""
  showPassword:boolean = false
  showConfirmPassword:boolean = false

  loading:Boolean = false
  message:String = ""
  success:Boolean = false

  constructor(private userService:UserService, private router:Router){}

  ngOnInit():void{}

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  register(){
    this.loading=true
    this.userService.register(this.email,this.password,this.name)
    .subscribe({
      next:(res) => {
        this.loading=false
        this.message=res.message
        this.success=true
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
    });
  }
}
