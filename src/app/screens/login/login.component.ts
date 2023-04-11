import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showPassword:boolean = false
  loading:Boolean = false
  message:String = ""
  success:Boolean = false

  loginForm!: FormGroup;

  constructor(private userService:UserService, private router:Router){
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    })
  }

  ngOnInit():void{ }

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  login(){
    this.loading=true
    const { email, password } = this.loginForm.value
    if(this.loginForm.valid)
      this.userService.login(email, password)
      .subscribe({
        next:(res) => {
          this.loading=false
          this.success=true
          this.message=`Logged in with ${email}`
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
            this.loginForm.reset()
          },2500)
        }
      })
    else {
      this.message="Invalid details!"
      setTimeout(() => {
        this.message=""
        this.loading=false
      },2150)
    }
  }
}
