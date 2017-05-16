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

import { HolidayDetailViewComponent } from './holidayDetailView.component';
import { HolidayDetailViewRoutingModule } from './holidayDetailView-routing.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HolidayDetailViewRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        })
    ],
    declarations: [
        ImageModal,
        HolidayDetailViewComponent
    ],
    exports: [
        HolidayDetailViewComponent
    ]
})
export class HolidayDetailViewModule { }