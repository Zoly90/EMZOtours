import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from "./shared/shared.module";
import { PagesModule } from "./pages/pages.module";
import { HolidayService } from "./holiday/services/holiday.service";
import { HolidayModule } from "./holiday/holiday.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HolidayModule,
    CoreModule,
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
