import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Holiday } from "../models/holiday.model";
import { HolidayService } from "../services/holiday.service";
import { SearchCriteria, FilterCriteria, FilterFiledsName, FilterFileds } from "../../shared/models/search-criteria.model";

@Injectable()
export class HolidayListResolver implements Resolve<Holiday> {

  private searchCriteria: SearchCriteria = new SearchCriteria();

  constructor(
    private _holidayService: HolidayService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot): Holiday | Observable<Holiday> {
    this.searchCriteria.filterCriteria = new Array<FilterCriteria>();
    if (activatedRoute.queryParams['type']) {
      this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.holidayTypeFilter)), activatedRoute.queryParams['id']))
      return this._holidayService.getHolidaysBySearchCriteria(this.searchCriteria);
    } else {
      this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.holidaySubcategoryFilter)), activatedRoute.queryParams['id']))
      return this._holidayService.getHolidaysBySearchCriteria(this.searchCriteria);
    }
  }
}
