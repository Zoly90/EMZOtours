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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PersonalizedOfferRoutingModule,
        AboutRoutingModule,
        ContactRoutingModule,
        HomeRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        }),
        MaterialModule,
        DatepickerModule.forRoot(),
        Daterangepicker,
        FlexLayoutModule
    ],
    declarations: [
        PersonalizedOfferComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent
    ],
    providers: [
        PersonalizedOfferService,
        CategoriesAndTypesService
    ],
    exports: [
        PersonalizedOfferComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent
    ]
})
export class PagesModule { }