import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersManagementComponent } from './offers-management.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'offers-management', component: OffersManagementComponent }
    ])
  ],
  exports: [RouterModule]
})
export class OffersManagementRoutingModule { }