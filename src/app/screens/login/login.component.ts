import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { loginRequest } from 'src/app/redux/login';
import { AppState } from 'src/app/app.state';
import { SharedService } from 'src/app/services/shared.service';

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

  constructor(private router:Router, private store:Store<AppState>, private sharedService:SharedService){
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
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

  login(){
    this.sharedService.loading(true)
    const { email, password } = this.loginForm.value
    this.store.dispatch(loginRequest({email,password}));
  }
}
