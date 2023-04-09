import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService:UserService){}

  ngOnInit():void{}

  toggleShowPassword():void{
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  register(){
    this.userService.register(this.email,this.password,this.name).subscribe((data) => console.log(data));
  }
}
