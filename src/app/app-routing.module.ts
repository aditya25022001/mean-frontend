import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './screens/product/product.component';
import { HomeComponent } from './screens/home/home.component';
import { ErrorComponent } from './screens/error/error.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"**", component:ErrorComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
