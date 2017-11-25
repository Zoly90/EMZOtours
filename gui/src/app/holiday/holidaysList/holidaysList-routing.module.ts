import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HolidaysListComponent } from './holidaysList.component';
import { HolidayListResolver } from "./holidayList-resolver";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'holidays/:id',
        component: HolidaysListComponent,
        resolve: {
          holidays: HolidayListResolver
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HolidayListResolver
  ]
})
export class HolidaysListRoutingModule { }