import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";
import { UtilsService } from "../../utils/utils.service";
import { TurismAppConstants } from "../../utils/constants";

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

        this.holiday.hotelDescriptionYouTubeLinkId = this._modifyTouTubeLinks(this.holiday.hotelDescriptionYouTubeLink);
        this.holiday.regionDescriptionYouTubeLinkId = this._modifyTouTubeLinks(this.holiday.regionDescriptionYouTubeLink);

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

        this.holiday.reviews.forEach(review => {
            review.ratingValues = new Array<boolean>();
            review = this._setRatingValues(review);
        });

        return this.holiday;
    }

    private _convertToArrayOfStrings(items: any) {
        if (items == null) {
            return
        }
        this.array = items.split(',');
        return this.array;
    }

    private _setRatingValues(review) {
        for (let i = 0; i < 5; i++) {
            if (i == review.rating - 1) {
                review.ratingValues.push(true);
            } else {
                review.ratingValues.push(false);
            }
        }
        return review;
    }

    private _modifyTouTubeLinks(link: string) {
        let index = link.indexOf('=');
        if (index) {
            link = link.substr(index + 1, 11);
        } else {
            link = link.substr(link.indexOf('?') + 1, 11);
        }
        return link;
    }
}