import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from './user/home-page/home-page.component';
import {ListProductComponent} from './user/list-product/list-product.component';
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {ErrorInterceptor} from "./helper/error-interceptor";
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {NgToastModule} from "ng-angular-popup";
import {ToastrModule} from "ngx-toastr";
import { ShowWalletComponent } from './wallet/show-wallet/show-wallet.component';
import { AddWalletComponent } from './wallet/add-wallet/add-wallet.component';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';
import { ShowCategoriesComponent } from './category/show-categories/show-categories.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { AddCategoryComponent } from './category/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    ListProductComponent,
    SideBarComponent,
    NavBarComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ShowWalletComponent,
    AddWalletComponent,
    EditWalletComponent,
    ShowCategoriesComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
