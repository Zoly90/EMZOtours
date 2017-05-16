import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HolidaysListComponent } from './holidaysList.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'holidays/:id', component: HolidaysListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HolidaysListRoutingModule { }