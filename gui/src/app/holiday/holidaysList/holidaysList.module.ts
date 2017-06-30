import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { HolidaysListComponent } from './holidaysList.component';
import { HolidaysListRoutingModule } from './holidaysList-routing.module';
import { HolidayListResolver } from "./holidayList-resolver";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule
    ],
  declarations: [HolidaysListComponent],
  exports: [HolidaysListComponent],
  
})
export class HolidaysListModule { }