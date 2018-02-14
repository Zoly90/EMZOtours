import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { PersonalizedOfferComponent } from "./pages/personalizedOffer/personalizedOffer.component";
import { HolidaysListComponent } from "./holiday/holidaysList/holidaysList.component";
import { HolidayDetailViewComponent } from "./holiday/holidayDetailView/holidayDetailView.component";
import { HolidaysManagementComponent } from "./pages/management/holidays-management/holidays-management.component";
import { TurismAppConstants } from "./utils/constants";
import { UserManagementComponent } from "./pages/management/user-management/user-management.component";
import { OffersManagementComponent } from "./pages/management/offers-management/offers-management.component";
import { HolidayDetailViewResolver } from "./holiday/services/holiday-detail-view.resolver";
import { HolidayListResolver } from "./holiday/services/holidayList-resolver";
import { UserHolidaysList } from "./user/user-holidays-list/user-holidays-list.component";

const routes: Routes = [
  {
    path: TurismAppConstants.ABOUT_PAGE_PATH,
    component: AboutComponent
  },
  {
    path: TurismAppConstants.CONTACT_PAGE_PATH,
    component: ContactComponent
  },
  {
    path: TurismAppConstants.PERSONALIZED_OFFER_PAGE_PATH,
    component: PersonalizedOfferComponent
  },
  {
    path: TurismAppConstants.HOLIDAYS_MANAGEMENT_PAGE_PATH,
    component: HolidaysManagementComponent
  },
  {
    path: TurismAppConstants.USER_MANAGEMENT_PAGE_PATH, 
    component: UserManagementComponent
  },
  {
    path: TurismAppConstants.PERSONALIZED_OFFERS_MANAGEMENT_PAGE_PATH, 
    component: OffersManagementComponent
  },
  {
    path: TurismAppConstants.HOLIDAY_DETAIL_VIEW_PAGE_PATH + '/:destination',
    component: HolidayDetailViewComponent,
    resolve: {
      holiday: HolidayDetailViewResolver
    }
  },
  {
    path: TurismAppConstants.HOLIDAY_LIST_VIEW_PAGE_PATH + '/:holidaysBy',
    component: HolidaysListComponent,
    resolve: {
      holidays: HolidayListResolver
    }
  },
  {
    path: TurismAppConstants.LOGGED_IN_USER_HOLIDAY_LIST_VIEW_PAGE_PATH,
    component: UserHolidaysList
  },
  {
    path: TurismAppConstants.LOGGED_IN_USER_HOLIDAY_WISH_LIST_VIEW_PAGE_PATH,
    component: HolidaysListComponent
  },
  { 
    path: TurismAppConstants.HOME_PAGE_PATH,
    component: HomeComponent
  },
  {
    path: TurismAppConstants.UNMATCHED_PATH,
    redirectTo: TurismAppConstants.HOME_PAGE_PATH,
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

