import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { AuthorizationService } from "./core/authentication/services/authorization.service";
import { Router } from "@angular/router";
import { UtilsService } from "./utils/utils.service";
import { CategoriesAndTypesService } from "./core/services/categories-types.service";
import { Types } from "./core/models/types.model";
import { TurismAppConstants } from "./utils/constants";
import { HolidayDetailViewComponent } from "./holiday/holidayDetailView/holidayDetailView.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(HolidayDetailViewComponent) holidayDetailViewComponent: HolidayDetailViewComponent;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    this.scrollFunction($event);
  }

  public backgroundImagePath = "../../assets/images/background/rsz_background.jpg";

  private token: any;
  private types: Types[];
  private role: string;
  private userLogedIn: boolean = false;

  public goToTopButtonShown: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
    private utilsService: UtilsService,
    private router: Router,
    private categoriesAndTypesService: CategoriesAndTypesService,
    private translate: TranslateService
  ) {
    this.categoriesAndTypesService.setCategoriesAndTypes();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    this.token = this.utilsService.checkAuthAndGetToken();
    if (this.token) {
      this.role = this.token.role;
      this.userLogedIn = true;
    }
  }

  scrollFunction(event) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      this.goToTopButtonShown = true;
    } else {
      this.goToTopButtonShown = false;
    }
  }

  goToTopFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  private loggingIn(logedIn: boolean) {
    if (logedIn) {
      this.userLogedIn = true;
      this.token = this.utilsService.checkAuthAndGetToken();
      this.role = this.token.role;
      // console.log(this.holidayDetailViewComponent)
      // this.holidayDetailViewComponent.changeAuthorizedToEditStatus();
    }
  }

  private loggingOut() {
    this.userLogedIn = false;
    this.token = null;
    this.role = '';
    // console.log(this.holidayDetailViewComponent)
    // this.holidayDetailViewComponent.changeAuthorizedToEditStatus();
    if (this.router.url.includes(TurismAppConstants.HOLIDAYS_MANAGEMENT_PAGE_PATH) || this.router.url.includes(TurismAppConstants.PERSONALIZED_OFFERS_MANAGEMENT_PAGE_PATH) ||
      this.router.url.includes(TurismAppConstants.USER_MANAGEMENT_PAGE_PATH)) {
      this.router.navigate(['/']);
    }
  }
}
