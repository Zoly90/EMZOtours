import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { MaterialModule } from "@angular/material";

@NgModule({
  imports: [CommonModule, AboutRoutingModule, MaterialModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
