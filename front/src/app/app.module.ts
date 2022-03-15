import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TableComponent } from './components/table/table.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PointHitService} from "./services/point-hit.service";
import {AuthService} from "./services/auth.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    TableComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    MainPageComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClient,
    PointHitService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
