import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomePageComponent} from "./user/home-page/home-page.component";
import {AuthGuard} from "./helper/auth-guard";
import {ProfileComponent} from "./profile/profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ShowWalletComponent} from "./wallet/show-wallet/show-wallet.component";
import {ShowCategoriesComponent} from "./category/show-categories/show-categories.component";

const routes: Routes = [{
  path:'home',
  component: HomeComponent
}, {
  path: '',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'change-password',
  component: ChangePasswordComponent
}, {
  path: 'wallet',
  component: ShowWalletComponent
}, {
  path: 'category',
  component: ShowCategoriesComponent
}, {
  path: 'user',
  canActivate: [AuthGuard],
  component: HomePageComponent,
  loadChildren: () => import('./user/user-routing.module').then(module => module.UserRoutingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
