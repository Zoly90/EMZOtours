import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HolidaysListComponent } from './holiday/holidaysList/holidaysList.component';
import { HolidayDetailViewComponent } from './holiday/holidayDetailView/holidayDetailView.component';

import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { SelectModule } from 'angular2-select';


import { HolidaysListModule } from './holiday/holidaysList/holidaysList.module';
import { HolidayDetailViewModule } from './holiday/holidayDetailView/holidayDetailView.module';

import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { PersonalizedOfferComponent } from "./pages/personalizedOffer/personalizedOffer.component";
import { ToolbarComponent } from "./core/common/toolbar/toolbar.component";
import { SignUpModalComponent } from "./core/common/toolbar/signUpModal/signupModal.component";
import { LoginDropdownComponent } from "./core/common/toolbar/loginDropdown/loginDropdown.component";
import { NavbarComponent } from "./core/common/navbar/navbar.component";
import { BackgroundImageComponent } from "./core/common/backgroundImage/backgroundImage.component";
import { AboutModule } from "./pages/about/about.module";
import { HomeModule } from "./pages/home/home.module";
import { ContactModule } from "./pages/contact/contact.module";
import { HolidayService } from "./core/services/holiday.service";
import { PersonalizedOfferModule } from "./pages/personalizedOffer/personalizedOffer.module";
import { CategoriesAndTypesService } from "./core/services/categories-types.service";
import { RoutingByIDService } from "./core/services/routing-by-id.service";
import { LoginService } from "./core/services/login.service";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from "./core/services/user.service";

const routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'offer', component: PersonalizedOfferComponent },
  { path: 'honeymoons', component: HolidaysListComponent },
  { path: 'nissi-beach-resort', component: HolidayDetailViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignUpModalComponent,
    LoginDropdownComponent,
    NavbarComponent,
    BackgroundImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AboutModule,
    HomeModule,
    ContactModule,
    PersonalizedOfferModule,
    HolidaysListModule,
    HolidayDetailViewModule,
    RouterModule.forRoot(routes), 
    BsDropdownModule.forRoot(), 
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MaterialModule,
    SelectModule,
    FlexLayoutModule
    // SharedModule.forRoot()
  ],
  providers: [CategoriesAndTypesService, HolidayService, RoutingByIDService, LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
