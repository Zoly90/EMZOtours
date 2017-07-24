import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesAndTypesService } from "../../services/categories-types.service";
import { Types } from "../../models/types.model";
import { RoutingByIDService } from "../../services/routing-by-id.service";

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

  glyphiconClassDownCitybreaks = false;
  glyphiconClassRightCitybreaks = true;

  glyphiconClassDownSpecialOffers = false;
  glyphiconClassRightSpecialOffers = true;

  types: Types[] = [];

  constructor(
    private router: Router,
    private categoriesAndTypesService: CategoriesAndTypesService,
    private routingByIDService: RoutingByIDService
  ) { }

  ngOnInit() {
    this.categoriesAndTypesService.$types.subscribe(data => {
      this.types = data;
    })
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

    this.routingByIDService.set(typeId, 'type');
    this.router.navigate(['/holidays/' + currentType]);
  }
}
