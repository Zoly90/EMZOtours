import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from "./pages/home/home-routing.module";

import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { PersonalizedOfferComponent } from "./pages/personalizedOffer/personalizedOffer.component";
import { AboutModule } from "./pages/about/about.module";
import { HomeModule } from "./pages/home/home.module";
import { ContactModule } from "./pages/contact/contact.module";
import { HolidaysListComponent } from "./holiday/holidaysList/holidaysList.component";
import { HolidayDetailViewComponent } from "./holiday/holidayDetailView/holidayDetailView.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'offer', component: PersonalizedOfferComponent },
  { path: 'honeymoons', component: HolidaysListComponent },
  { path: 'nissi-beach-resort', component: HolidayDetailViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      // HomeRoutingModule
    // ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

