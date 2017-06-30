import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from "./core/common/common.module";
import { PagesModule } from "./pages/pages.module";
import { HolidayService } from "./holiday/services/holiday.service";
import { RoutingByIDService } from "./core/services/routing-by-id.service";
import { HolidayModule } from "./holiday/holiday.module";
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HolidayModule,
    SharedModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [HolidayService, RoutingByIDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
