import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayDetailViewComponent } from "./holidayDetailView/holidayDetailView.component";
import { HolidaysListComponent } from "./holidaysList/holidaysList.component";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { ApplyForOfferModalComponent } from "./holidayDetailView/apply-for-offer-modal/apply-for-offer-modal.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader/component-loader.factory";
import { PositioningService } from "ngx-bootstrap/positioning";
import { HolidayDetailViewService } from "./services/holidayDetailView.service";
import { SharedModule } from "../shared/shared.module";
import { ApplyForOfferService } from "./services/apply-for-offer.service";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HolidayListResolver } from "./services/holidayList-resolver";
import { HolidayDetailViewResolver } from "./services/holiday-detail-view.resolver";

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
        ApplyForOfferModalComponent
    ]
})
export class HolidayModule { }