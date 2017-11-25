import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';

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
        FlexLayoutModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBjisHSBvdTWkynJPKVAAcpTgB6PQrkXbY'
        })
    ],
    declarations: [
        HolidayDetailViewComponent
    ],
    exports: [
        HolidayDetailViewComponent
    ]
})
export class HolidayDetailViewModule { }