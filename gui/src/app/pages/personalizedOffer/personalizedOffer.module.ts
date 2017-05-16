import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';

import { PersonalizedOfferComponent } from './personalizedOffer.component';
import { PersonalizedOfferRoutingModule } from './personalizedOffer-routing.module';


@NgModule({
  imports: [CommonModule, FormsModule, PersonalizedOfferRoutingModule, MaterialModule, DatepickerModule.forRoot(), Daterangepicker],
  declarations: [PersonalizedOfferComponent],
  exports: [PersonalizedOfferComponent]
})
export class PersonalizedOfferModule { }