import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Holiday } from "../models/holiday.model";
import { HolidayService } from "../services/holiday.service";
import { RoutingByIDService } from "../../core/services/routing-by-id.service";


@Injectable()
export class HolidayListResolver implements Resolve<Holiday> {

  constructor(
     private holidayService: HolidayService,
     private routingByIDService: RoutingByIDService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Holiday | Observable<Holiday> {
     if (this.routingByIDService.getRouting() === 'type') {
           return this.holidayService.getHolidaysByType(this.routingByIDService.getId());
        } else {
           return this.holidayService.getHolidaysByCategory(this.routingByIDService.getId());
        }
  }
}
