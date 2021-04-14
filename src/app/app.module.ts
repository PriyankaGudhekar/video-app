import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Service } from "./Services/app.services";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { ToastModule } from "primeng/toast";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from "ngx-toast-notifications";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpModule, FormsModule, ToastModule,BrowserAnimationsModule,ToastNotificationsModule
  ],
  exports: [FormsModule, ToastModule,BrowserAnimationsModule],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
