import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HolidaysListModule } from './holiday/holidaysList/holidaysList.module';
import { HolidayDetailViewModule } from './holiday/holidayDetailView/holidayDetailView.module';
import { AboutModule } from "./pages/about/about.module";
import { HomeModule } from "./pages/home/home.module";
import { ContactModule } from "./pages/contact/contact.module";
import { HolidayService } from "./core/services/holiday.service";
import { PersonalizedOfferModule } from "./pages/personalizedOffer/personalizedOffer.module";
import { RoutingByIDService } from "./core/services/routing-by-id.service";
import { SharedModule } from "./core/common/common.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutModule,
    HomeModule,
    ContactModule,
    PersonalizedOfferModule,
    HolidaysListModule,
    HolidayDetailViewModule, 
    SharedModule.forRoot()
  ],
  providers: [HolidayService, RoutingByIDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
