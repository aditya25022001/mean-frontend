import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './screens/product/product.component';
import { HomeComponent } from './screens/home/home.component';
import { ErrorComponent } from './screens/error/error.component';
import { RegisterComponent } from './screens/register/register.component';
import { LoginComponent } from './screens/login/login.component';
import { AddProductComponent } from './screens/add-product/add-product.component';
import { UpdateProductComponent } from './screens/update-product/update-product.component';
import { AboutComponent } from './screens/about/about.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"addproduct",component:AddProductComponent},
  {path:"update/:id",component:UpdateProductComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"about",component:AboutComponent},
  {path:"**", component:ErrorComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
