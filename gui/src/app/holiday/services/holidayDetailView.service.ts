import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";


@Injectable()
export class HolidayDetailViewService {

    private holiday: Holiday;
    private array: string[];

    public setHoliday(holidayToSet) {
        this.holiday = holidayToSet;
        this.holiday = this._constructStarsArrays(this.holiday);

        this.holiday.offerInformation.included = this._convertToArrayOfStrings(this.holiday.offerInformation.included);
        this.holiday.offerInformation.notIncluded = this._convertToArrayOfStrings(this.holiday.offerInformation.notIncluded);

        for (let facility of this.holiday.facilities) {
            facility.facilitiesList = this._convertToArrayOfStrings(facility.facilitiesList);
        }

        for (let room of this.holiday.rooms) {
            room.roomFacilities = this._convertToArrayOfStrings(room.roomFacilities);
        }

        if (this.holiday.localization != null) {
            this.holiday.localization.map.latitude = Number(this.holiday.localization.map.latitude);
            this.holiday.localization.map.longitude = Number(this.holiday.localization.map.longitude);
        }

        return this.holiday;
    }

    private _constructStarsArrays(holiday: Holiday): Holiday {
        let nrStars: number;

        for (let review of holiday.reviews) {
            nrStars = review.rating;
            review.rating = [];
            for (let i = 0; i < 5; i++) {
                if (i == nrStars - 1) {
                    review.rating[i] = true;
                } else {
                    review.rating[i] = false;
                }
            }
        }
        return holiday;
    }

    private _convertToArrayOfStrings(items: any) {
        if (items == null) {
            return
        }
        this.array = items.split(',');
        return this.array;
    }
}