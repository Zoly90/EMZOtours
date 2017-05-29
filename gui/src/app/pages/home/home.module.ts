import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriesAndTypesService } from "../../core/services/categories-types.service";

@NgModule({
  imports: [HomeRoutingModule, CommonModule, MaterialModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [CategoriesAndTypesService]
})
export class HomeModule { }
