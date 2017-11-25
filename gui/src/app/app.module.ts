import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from "./core/common/common.module";
import { PagesModule } from "./pages/pages.module";
import { HolidayService } from "./holiday/services/holiday.service";
import { HolidayModule } from "./holiday/holiday.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HolidayModule,
    SharedModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    HolidayService, 
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
