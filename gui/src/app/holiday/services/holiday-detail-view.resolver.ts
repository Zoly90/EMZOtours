import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Holiday } from "../models/holiday.model";
import { HolidayService } from "../services/holiday.service";

@Injectable()
export class HolidayDetailViewResolver implements Resolve<Holiday> {

  constructor(
    private _holidayService: HolidayService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot): Holiday | Observable<Holiday> {
    return this._holidayService.getHolidayById(activatedRoute.queryParams['id']);
  }
}
