import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";

const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegistrationPageComponent},
  {path: "main", component: MainPageComponent},
  {path: "**", component: LoginPageComponent},
  {path: "", component: LoginPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
