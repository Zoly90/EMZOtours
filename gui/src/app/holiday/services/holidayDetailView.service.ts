import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";
import { UtilsService } from "../../utils/utils.service";


@Injectable()
export class HolidayDetailViewService {

    private holiday: Holiday;
    private array: string[];

    constructor(
        private _utilsService: UtilsService
    ) { }

    public setHoliday(holidayToSet) {
        this.holiday = holidayToSet;
        this.holiday.arrayOfStars = this._utilsService.constructArrayOfStars(this.holiday.nrStars);

        this.holiday.included = this.holiday.included ? this._convertToArrayOfStrings(this.holiday.included) : null;
        this.holiday.notIncluded = this.holiday.notIncluded ? this._convertToArrayOfStrings(this.holiday.notIncluded) : null;

        for (let facility of this.holiday.facilities) {
            facility.facilitiesList = this._convertToArrayOfStrings(facility.facilitiesList);
        }

        for (let room of this.holiday.rooms) {
            room.roomFacilities = this._convertToArrayOfStrings(room.roomFacilities);
        }

        if (this.holiday != null) {
            this.holiday.latitude = Number(this.holiday.latitude);
            this.holiday.longitude = Number(this.holiday.longitude);
        }

        return this.holiday;
    }

    private _convertToArrayOfStrings(items: any) {
        if (items == null) {
            return
        }
        this.array = items.split(',');
        return this.array;
    }
}