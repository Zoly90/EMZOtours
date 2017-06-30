import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { ImageModal } from 'angular2-image-popup/directives/angular2-image-popup/image-modal-popup';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HolidayDetailViewRoutingModule } from "./holidayDetailView/holidayDetailView-routing.module";
import { HolidayDetailViewComponent } from "./holidayDetailView/holidayDetailView.component";
import { HolidaysListRoutingModule } from "./holidaysList/holidaysList-routing.module";
import { HolidaysListComponent } from "./holidaysList/holidaysList.component";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HolidayDetailViewRoutingModule,
        HolidaysListRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        }),
        NgxPaginationModule
    ],
    declarations: [
        ImageModal,
        HolidayDetailViewComponent,
        HolidaysListComponent
    ],
    exports: [
        HolidayDetailViewComponent,
        HolidaysListComponent
    ]
})
export class HolidayModule { }