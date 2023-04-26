import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { loginRequest } from 'src/app/redux/login';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

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

  constructor(private store:Store<AppState>, private sharedService:SharedService, private userService:UserService, private router:Router){
    this.registerForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit():void{
    this.store.select(state => state.login.user).subscribe((data) => {
      if(data.token!==undefined) this.router.navigate(["/"])
    })
  }

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
    this.sharedService.loading(true)
    const { email, name, password } = this.registerForm.value
    if(this.registerForm.valid)
      this.userService.register(email,password,name)
      .subscribe({
        next:(res) => {
          this.sharedService.loading(false)
          this.sharedService.toast(true,<string>res.message,"var(--success)");
          this.store.dispatch(loginRequest({email,password}));
        },
        error:(err) => {
          this.sharedService.loading(false)
          this.sharedService.toast(true,<string>err.eror.message,"var(--error)");
          setTimeout(() => {
            this.sharedService.toast(false,"","var(--error)");
          },2500)
        }
      });
      else {
        this.sharedService.toast(true,"Invalid details","var(--error)");
        setTimeout(() => {
          this.sharedService.toast(false,"","var(--error)");
          this.sharedService.loading(false)
      },2150)
    }
  }
}
