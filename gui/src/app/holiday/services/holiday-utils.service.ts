import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday, Period } from "../models/holiday.model";
import { TurismAppConstants } from "../../utils/constants";
import { HolidayListModel } from "../models/holiday-list.model";
import { Router } from "@angular/router";
import { UserHolidayListModel } from "../../shared/models/user-holiday-list.model";
import { QueryParameter } from "../../shared/models/shared-models.model";

@Injectable()
export class HolidayUtilsService {

    private holiday: Holiday;
    private array: string[];

    constructor(
        private _router: Router
    ) { }

    public setHoliday(holidayToSet) {
        this.holiday = holidayToSet;
        this.holiday.arrayOfStars = this._constructArrayOfStars(this.holiday.nrStars);

        this.holiday.hotelDescriptionYouTubeLinkId = this._modifyTouTubeLinks(this.holiday.hotelDescriptionYouTubeLink);
        this.holiday.regionDescriptionYouTubeLinkId = this._modifyTouTubeLinks(this.holiday.regionDescriptionYouTubeLink);

        this.holiday.included = this.holiday.included ? this._convertToArrayOfStrings(this.holiday.included) : null;
        this.holiday.notIncluded = this.holiday.notIncluded ? this._convertToArrayOfStrings(this.holiday.notIncluded) : null;

        this.holiday.periods = this._sortPeriodsArray(this.holiday.periods);

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
            review = this.setRatingValues(review);
        });

        return this.holiday;
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

    public setNumberOfStarsArray(holidayList: Array<any>) {
        holidayList.forEach((holiday: HolidayListModel | UserHolidayListModel) => {
            holiday.arrayOfStars = this._constructArrayOfStars(Number(holiday.nrStars));
        });
        return holidayList;
    }

    public goToDetailPage(holiday: HolidayListModel | UserHolidayListModel, navigation?: string) {
        this._detailPageNavigation(navigation, holiday);
    }

    public setRatingValues(review) {
        for (let i = 0; i < 5; i++) {
            if (i == review.rating - 1) {
                review.ratingValues.push(true);
            } else {
                review.ratingValues.push(false);
            }
        }
        return review;
    }

    private _detailPageNavigation(navigation: string, holiday: HolidayListModel | UserHolidayListModel) {
        console.log('navigation',navigation)
        switch (navigation) {
            case TurismAppConstants.HIDE_OFFERS_TAB: {
                this._router.navigate([TurismAppConstants.HOLIDAY_DETAIL_VIEW_PAGE_PATH + '/' + holiday.hotelName],
                    { queryParams: { id: holiday.id, hide_offers_tab: true } });
                break;
            }
            case TurismAppConstants.PARTICIPATED: {
                console.log('wtf?')
                this._router.navigate([TurismAppConstants.HOLIDAY_DETAIL_VIEW_PAGE_PATH + '/' + holiday.hotelName],
                    { queryParams: { id: holiday.id, hide_offers_tab: true, participated: true } });
                break;
            }
            default: {
                console.log('wthell?')
                this._router.navigate([TurismAppConstants.HOLIDAY_DETAIL_VIEW_PAGE_PATH + '/' + holiday.hotelName],
                    { queryParams: { id: holiday.id } });
                break;
            }
        }
    }

    private _constructArrayOfStars(numberOfStars: number): Array<number> {
        let nrStarsArray: Array<number> = new Array();
        for (let i = 0; i < numberOfStars; i++) {
            nrStarsArray.push(i + 1);
        }
        return nrStarsArray;
    }

    private _calculateUpdatedPrices(holiday: Holiday, percentage: number) {
        holiday.periods.forEach(period => {
            period.updatedPrice = Number(period.price) - (Number(period.price) * percentage / 100);
        });
        return holiday;
    }

    private _sortPeriodsArray(periodsArray: Array<Period>) {
        periodsArray.sort((a: Period, b: Period) => {
            if (a.startingDate < b.startingDate) {
                return -1;
            } else {
                return 1;
            }
        });

        return periodsArray;
    }

    private _convertToArrayOfStrings(items: any) {
        if (items == null) {
            return
        }
        this.array = items.split(',');
        return this.array;
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
}