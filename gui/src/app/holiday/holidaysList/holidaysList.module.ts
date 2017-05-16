import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HolidaysListComponent } from './holidaysList.component';
import { HolidaysListRoutingModule } from './holidaysList-routing.module';

@NgModule({
  imports: [CommonModule, HolidaysListRoutingModule, MaterialModule, FlexLayoutModule],
  declarations: [HolidaysListComponent],
  exports: [HolidaysListComponent]
})
export class HolidaysListModule { }