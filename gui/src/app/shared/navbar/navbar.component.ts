import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Types } from "../../core/models/types.model";
import { CategoriesAndTypesService } from "../../core/services/categories-types.service";
import { TurismAppConstants } from "../../utils/constants";

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'sd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() role: string;
  @Input() types: Types[];

  glyphiconClassDownCitybreaks = false;
  glyphiconClassRightCitybreaks = true;

  glyphiconClassDownSpecialOffers = false;
  glyphiconClassRightSpecialOffers = true;

  private personalizedOfferPagePath: string;
  private aboutPagePath: string;
  private contactPagePath: string;
  private homePagePath: string;
  private holidaysManagementPagePath: string;
  private personalizedOffersManagementPagePath: string;
  private userManagementPagePath: string;

  constructor(
    private router: Router,
    private categoriesAndTypesService: CategoriesAndTypesService,
  ) { }

  ngOnInit() {
    this.categoriesAndTypesService.$types.subscribe(data => {
      this.types = data;
    });

    this.homePagePath = TurismAppConstants.HOME_PAGE_PATH
    this.personalizedOfferPagePath = TurismAppConstants.PERSONALIZED_OFFER_PAGE_PATH;
    this.aboutPagePath = TurismAppConstants.ABOUT_PAGE_PATH;
    this.contactPagePath = TurismAppConstants.CONTACT_PAGE_PATH;
    this.holidaysManagementPagePath = TurismAppConstants.HOLIDAYS_MANAGEMENT_PAGE_PATH;
    this.personalizedOffersManagementPagePath = TurismAppConstants.PERSONALIZED_OFFERS_MANAGEMENT_PAGE_PATH;
    this.userManagementPagePath = TurismAppConstants.USER_MANAGEMENT_PAGE_PATH;
  }

  onMouseOverCityBreaks(): void {
    this.glyphiconClassDownCitybreaks = true;
    this.glyphiconClassRightCitybreaks = false;
  }

  onMouseOutCityBreaks(): void {
    this.glyphiconClassDownCitybreaks = false;
    this.glyphiconClassRightCitybreaks = true;
  }

  onMouseOverSpecialOffers(): void {
    this.glyphiconClassDownSpecialOffers = true;
    this.glyphiconClassRightSpecialOffers = false;
  }

  onMouseOutSpecialOffers(): void {
    this.glyphiconClassDownSpecialOffers = false;
    this.glyphiconClassRightSpecialOffers = true;
  }

  goToListPage(currentType): void {
    let typeId: number;

    for (let type of this.types) {
      if (type.type === currentType) {
        typeId = type.id;
      }
    }

    this.router.navigate([TurismAppConstants.HOLIDAY_LIST_VIEW_PAGE_PATH + '/' + currentType],
      { queryParams: { type: currentType, id: typeId } });
  }
}
