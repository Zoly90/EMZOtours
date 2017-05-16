import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonalizedOfferComponent } from './personalizedOffer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'offer', component: PersonalizedOfferComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PersonalizedOfferRoutingModule { }