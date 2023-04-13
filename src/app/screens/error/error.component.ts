import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(private router:Router){}

  timer:number=6

  ngOnInit():void{
    setTimeout(() => this.pulse(),1000)
  }

  pulse():void{
    if(this.timer===1) this.router.navigate(["/"])
    else{
      this.timer-=1;
      setTimeout(() => this.pulse(),1000);
    }
  }


}
