import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { DepositComponent } from './deposit/deposit.component';
import { AppRoutingModule } from './app-routing.module';
import { MoneyTypeService } from './deposit/money-type/money-type.service';
import { AppRoutingGuard } from './home/app-routing.guard';
import { GAService } from './shared/monitoring/ga-service';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DepositComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [MoneyTypeService, AppRoutingGuard, GAService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
