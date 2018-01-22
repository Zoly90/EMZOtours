import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';

// import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AgmCoreModule } from "@agm/core";

import { PersonalizedOfferComponent } from "./personalizedOffer/personalizedOffer.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PersonalizedOfferService } from "./pages-services/personalized-offer.service";
import { HolidaysManagementComponent } from "./management/holidays-management/holidays-management.component";
import { HolidayDetailViewService } from "../holiday/services/holidayDetailView.service";
import { UserManagementComponent } from "./management/user-management/user-management.component";
import { SharedModule } from "../shared/shared.module";
import { OffersManagementComponent } from "./management/offers-management/offers-management.component";
import { PersonalizedOfferViewModeComponent } from "./personalizedOffer/personalized-offer-view-mode/personalized-offer-view-mode.component";
import { OfferViewModalComponent } from "./management/offers-management/offer-view-modal/offer-view-modal.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ContactService } from "./contact/service/contact.service";
import { UpdateContactInformationModal } from "./contact/update-contact-information-modal/update-contact-information-modal.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { PersonalizedOfferManagementService } from "./management/offers-management/service/offer-management.service";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { HolidaysManagementService } from "./management/holidays-management/service/holidays-management.service";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // DatepickerModule.forRoot(),
        Daterangepicker,
        FlexLayoutModule,
        ModalModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        }),
        MatCheckboxModule,
        MatCardModule,
        MatRadioModule,
        MatSliderModule,
        MatListModule,
        BrowserAnimationsModule,
        RouterModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PersonalizedOfferComponent,
        PersonalizedOfferViewModeComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        HolidaysManagementComponent,
        UserManagementComponent,
        OffersManagementComponent,
        OfferViewModalComponent,
        UpdateContactInformationModal
    ],
    providers: [
        PersonalizedOfferService,
        HolidayDetailViewService,
        ContactService,
        PersonalizedOfferManagementService,
        HolidaysManagementService
    ],
    exports: [
        PersonalizedOfferComponent,
        PersonalizedOfferViewModeComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        HolidaysManagementComponent,
        UserManagementComponent,
        OffersManagementComponent,
        OfferViewModalComponent
    ],
    entryComponents: [
        UpdateContactInformationModal
    ]
})
export class PagesModule { }