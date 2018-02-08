// core
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI angular
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

// 3rd party
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { AgmCoreModule } from '@agm/core';
import { NgxGalleryModule } from 'ngx-gallery';

// components
import { HolidayDetailViewComponent } from "./holidayDetailView/holidayDetailView.component";
import { HolidaysListComponent } from "./holidaysList/holidaysList.component";
import { ApplyForOfferModalComponent } from "./holidayDetailView/apply-for-offer-modal/apply-for-offer-modal.component";
import { SignUpModalComponent } from "../shared/toolbar/signUpModal/signupModal.component";

// services
import { HolidayUtilsService } from "./services/holiday-utils.service";
import { ApplyForOfferService } from "./services/apply-for-offer.service";
import { HolidayListResolver } from "./services/holidayList-resolver";
import { HolidayDetailViewResolver } from "./services/holiday-detail-view.resolver";

// modules
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        }),
        NgxPaginationModule,
        SharedModule,
        MatCardModule,
        MatListModule,
        MatTabsModule,
        NgxGalleryModule
    ],
    declarations: [
        HolidayDetailViewComponent,
        HolidaysListComponent,
        ApplyForOfferModalComponent
    ],
    exports: [
        HolidayDetailViewComponent,
        HolidaysListComponent
    ],
    providers: [
        HolidayUtilsService,
        ApplyForOfferService,
        HolidayListResolver,
        HolidayDetailViewResolver
    ],
    entryComponents: [
        ApplyForOfferModalComponent,
        SignUpModalComponent
    ]
})
export class HolidayModule { }