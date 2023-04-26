import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './screens/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './screens/product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from './screens/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { UpdateProductComponent } from './screens/update-product/update-product.component';
import { AddProductComponent } from './screens/add-product/add-product.component';
import { ToastComponent } from './components/toast/toast.component';
import { StarComponent } from './components/star/star.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { AuthEffect } from './redux/login';
import { appReducer } from './app.state';
import { LoaderComponent } from './components/loader/loader.component';
import { TokeninterceptorService } from './services/tokeninterceptor.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AboutComponent } from './screens/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    ErrorComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UpdateProductComponent,
    AddProductComponent,
    ToastComponent,
    StarComponent,
    LoaderComponent,
    ProductCardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthEffect,
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
