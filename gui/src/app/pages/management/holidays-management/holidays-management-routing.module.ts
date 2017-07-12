import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HolidaysManagementComponent } from './holidays-management.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'holidays-management', component: HolidaysManagementComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HolidaysManagementRoutingModule { }