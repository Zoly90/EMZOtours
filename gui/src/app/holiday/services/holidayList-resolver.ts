import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Holiday } from "../models/holiday.model";
import { HolidayService } from "../services/holiday.service";

@Injectable()
export class HolidayListResolver implements Resolve<Holiday> {

  constructor(
    private _holidayService: HolidayService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot): Holiday | Observable<Holiday> {
    if (activatedRoute.queryParams['type']) {
      return this._holidayService.getHolidaysByType(activatedRoute.queryParams['id']);
    } else {
      return this._holidayService.getHolidaysByCategory(activatedRoute.queryParams['id']);
    }
  }
}
