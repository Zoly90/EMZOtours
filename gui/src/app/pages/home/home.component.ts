import {
  Component, OnChanges, Input,
  trigger, state, animate, transition, style
} from '@angular/core';

import { Category } from "../../core/models/category.model";
import { CategoriesAndTypesService } from "../../core/services/categories-types.service";
import { RoutingByIDService } from "../../core/services/routing-by-id.service";
import { Router } from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('1s'))
    ])
  ]
})
export class HomeComponent {

  backgroundImagePath = "../../assets/images/background/rsz_background.jpg";

  jsonReceived: any;
  categories: Category[] = [];

  newId: number;
  prevId: number;

  constructor(
    private router: Router,
    private categoriesAndTypesService: CategoriesAndTypesService,
    private routingByIDService: RoutingByIDService
  ) { }

  ngOnInit() {
    this.categoriesAndTypesService.setCategoriesAndTypes();
    this.categoriesAndTypesService.$categories.subscribe(data => {
      this.categories = data;
      console.log('categories -> ', data);
    });
  }

  activateOpacityAndFading(id) {
    this.newId = id;
    if (this.newId !== this.prevId) {
      for (let category of this.categories) {
        if (this.newId === category.id) {
          category.imageOpacity = true;
          category.toggleFading = true;
          category.visibility = category.toggleFading ? 'shown' : 'hidden';
          category.subcategoriesHidden = false;
        }
        if (this.prevId === category.id) {
          category.imageOpacity = false;
          category.toggleFading = false;
          category.visibility = category.toggleFading ? 'shown' : 'hidden';
          category.subcategoriesHidden = true;
        }
      }
      this.prevId = this.newId;
    }
  }

  goToListPage(currentCategory): void {
    let categoryId: number;
    console.log(currentCategory);
    for (let category of this.categories) {
      for (let subcategory of category.holidaySubcategories)
        if (subcategory.subcategory === currentCategory) {
          categoryId = subcategory.id;
        }
    }

    this.routingByIDService.set(categoryId, 'category');
    this.router.navigate(['/holidays/' + currentCategory]);
  }

}