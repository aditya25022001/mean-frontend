import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showPassword:boolean = false
  showConfirmPassword:boolean = false

  loading:Boolean = false
  message:String = ""
  success:Boolean = false

  registerForm!: FormGroup

  constructor(private userService:UserService, private router:Router){
    this.registerForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit():void{}

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  passwordMatch():boolean{
    return this.registerForm.get("password")?.value===this.registerForm.get("confirmPassword")?.value
  }

  register(){
    this.loading=true
    const { email, name, password } = this.registerForm.value
    if(this.registerForm.valid)
      this.userService.register(email,password,name)
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
    else {
      this.message="Invalid details!"
      setTimeout(() => {
        this.message=""
        this.loading=false
      },2150)
    }
  }
}
