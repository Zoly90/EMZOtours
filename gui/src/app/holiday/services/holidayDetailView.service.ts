import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";
import { UtilsService } from "../../utils/utils.service";
import { TurismAppConstants } from "../../utils/constants";
import { HolidayListModel } from "../models/holiday-list.model";

@Injectable()
export class HolidayUtilsService {

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

    private _modifyTouTubeLinks(url: string) {
        let index = url.indexOf('=');
        let url_id;
        if (index >= 0) {
            url_id = url.substr(index + 1, 11);
        } else {
            url_id = url.substr(url.indexOf('?') + 1, 11);
        }
        return url_id;
    }

    public checkEarlyBookingImageVisibility(earlyBookingDeadline: Date) {
		const currentDate = new Date();
        let visible;
		if (currentDate <= earlyBookingDeadline) {
			visible = true;
		} else {
			visible = false;
		}
        return visible;
	}

	public checkLastMinuteImageVisibility(lastMinuteBeginningDate: Date) {
		const currentDate = new Date();
        let visible;
		if ((lastMinuteBeginningDate.getMonth() == currentDate.getMonth() + 1 || lastMinuteBeginningDate.getMonth() == currentDate.getMonth()) 
				&& ((lastMinuteBeginningDate.getDate() + currentDate.getDate()) / 2 < 30)) {
			visible = true;
		} else {
			visible = false;
		}
        return visible;
	}

	public setUpdatedPrice(holiday: any, earlyBookingImageVisible?: boolean, lastMinuteImageVisible?: boolean) {
		if (earlyBookingImageVisible) {
            if (holiday.periods) {
                holiday = this._calculateUpdatedPrices(holiday, Number(holiday.earlyBookingPercentage));
            } else {
                holiday.updatedStartingPrice = Number(holiday.startingPrice) - (Number(holiday.startingPrice) * Number(holiday.earlyBookingPercentage) / 100);
            }
		}

		if (lastMinuteImageVisible) {
            if (holiday.periods) {
                holiday = this._calculateUpdatedPrices(holiday, Number(holiday.lastMinutePercentage));
            } else {
			    holiday.updatedStartingPrice = Number(holiday.startingPrice) - (Number(holiday.startingPrice) * Number(holiday.lastMinutePercentage) / 100);
            }
		}

        return holiday;
	}

    private _calculateUpdatedPrices(holiday: Holiday, percentage: number) {
        holiday.periods.forEach(period => {
            period.updatedPrice = Number(period.price) - (Number(period.price) * percentage / 100);
        });
        return holiday;
    }
}