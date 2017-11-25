import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";

let holiday: Holiday;

@Injectable()
export class HolidayDetailViewService {

    private array: string[];

    public setHoliday(holidayToSet) {
        holiday = holidayToSet;
        holiday = this._constructStarsArrays(holiday);

        holiday.offerInformation.included = this._convertToArrayOfStrings(holiday.offerInformation.included);
        holiday.offerInformation.notIncluded = this._convertToArrayOfStrings(holiday.offerInformation.notIncluded);

        for (let facility of holiday.facilities) {
            facility.facilitiesList = this._convertToArrayOfStrings(facility.facilitiesList);
        }

        for (let room of holiday.rooms) {
            room.roomFacilities = this._convertToArrayOfStrings(room.roomFacilities);
        }

        if (holiday.localization != null) {
            holiday.localization.map.latitude = Number(holiday.localization.map.latitude);
            holiday.localization.map.longitude = Number(holiday.localization.map.longitude);
        }
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

    public getHolidayDetails() {
        return holiday;
    }
}