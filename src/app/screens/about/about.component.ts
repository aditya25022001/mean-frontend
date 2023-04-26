import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  abouts=[
    {
      sno:1,
      name:"Frontend Github",
      value:"https://github.com/aditya25022001/mean-frontend"
    },
    {
      sno:2,
      name:"Backend Github",
      value:"https://github.com/aditya25022001/mean-backend"
    },
    {
      sno:3,
      name:"Frontend Live URL",
      value:"https://meanprmanagement.web.app/"
    },
    {
      sno:4,
      name:"Backend Live URL",
      value:"https://meanbackend-kc4w.onrender.com/"
    },
  ]
}
