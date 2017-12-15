// core
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI angular
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

// 3rd party
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { AgmCoreModule } from '@agm/core';

// components
import { HolidayDetailViewComponent } from "./holidayDetailView/holidayDetailView.component";
import { HolidaysListComponent } from "./holidaysList/holidaysList.component";
import { ApplyForOfferModalComponent } from "./holidayDetailView/apply-for-offer-modal/apply-for-offer-modal.component";
import { SignUpModalComponent } from "../shared/toolbar/signUpModal/signupModal.component";

// services
import { HolidayDetailViewService } from "./services/holidayDetailView.service";
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
        MatListModule
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
        HolidayDetailViewService,
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