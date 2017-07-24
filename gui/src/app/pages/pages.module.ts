import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';

import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AgmCoreModule } from "angular2-google-maps/core";

import { PersonalizedOfferRoutingModule } from "./personalizedOffer/personalizedOffer-routing.module";
import { AboutRoutingModule } from "./about/about-routing.module";
import { ContactRoutingModule } from "./contact/contact-routing.module";
import { HomeRoutingModule } from "./home/home-routing.module";
import { PersonalizedOfferComponent } from "./personalizedOffer/personalizedOffer.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PersonalizedOfferService } from "./pages-services/personalized-offer.service";
import { CategoriesAndTypesService } from "../core/services/categories-types.service";
import { HolidaysManagementRoutingModule } from "./management/holidays-management/holidays-management-routing.module";
import { HolidaysManagementComponent } from "./management/holidays-management/holidays-management.component";
import { HolidayDetailViewService } from "../holiday/services/holidayDetailView.service";
import { UserManagementRoutingModule } from "./management/user-management/user-management-routing.module";
import { UserManagementComponent } from "./management/user-management/user-management.component";
import { SharedModule } from "../core/common/common.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        DatepickerModule.forRoot(),
        Daterangepicker,
        FlexLayoutModule,
        SharedModule,
        PersonalizedOfferRoutingModule,
        AboutRoutingModule,
        ContactRoutingModule,
        HomeRoutingModule,
        HolidaysManagementRoutingModule,
        UserManagementRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        })
    ],
    declarations: [
        PersonalizedOfferComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        HolidaysManagementComponent,
        UserManagementComponent
    ],
    providers: [
        PersonalizedOfferService,
        CategoriesAndTypesService,
        HolidayDetailViewService
    ],
    exports: [
        PersonalizedOfferComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        HolidaysManagementComponent,
        UserManagementComponent
    ]
})
export class PagesModule { }