import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HolidaysListService } from "../services/holidaysList.service";
import { HolidayDetailViewService } from "../services/holidayDetailView.service";
import { HolidayService } from "../services/holiday.service";

import { Holiday } from "../models/holiday.model";
import { TurismAppConstants } from "../../utils/constants";

@Component({
    selector: 'sd-list',
    templateUrl: './holidaysList.component.html',
    styleUrls: ['./holidaysList.component.scss'],
    providers: [HolidaysListService, HolidayDetailViewService]
})

export class HolidaysListComponent {

    holidayList: Holiday;

    currentPage: number;
    paginationConfig = {
        itemsPerPage: 3,
        currentPage: this.currentPage
    }

    numberOfStars: any[];

    private routingBy: string;
    private routingById: number;

    constructor(
        private router: Router,
        private holidaysListService: HolidaysListService,
        private holidayDetailViewService: HolidayDetailViewService,
        private holidayService: HolidayService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(() => {
            this.holidayList = this.activatedRoute.snapshot.data['holidays'];
        })

        // if (this.holidayList instanceof Array) {
        //     for (let holidaySummary of this.holidayList) {
        //         console.log('ceva');
        //         holidaySummary = this.holidaysListService.constructArrays(holidaySummary);
        //     }
        //     // let currentDate = new Date();
        //     // let currentMonth = currentDate.getMonth() + 1;
        //     // let currentDay = currentDate.getDate();
        //     // let earlyBookingExpireDate = new Date(holidaySummary.earlyBookingExpireDate + "Z");
        //     // if (currentMonth <= earlyBookingExpireDate.getMonth() + 1 && currentDay <= earlyBookingExpireDate.getDate()) {
        //     //     this.holidays[i].earlyBookingImage = true;
        //     // }

        // } else {
        //     console.log('altceva');
        //     this.holidayList = this.holidaysListService.constructArrays(this.holidayList);
        // }
    }

    onPageChange(page) {
        this.paginationConfig.currentPage = page;
    }

    test(holiday) {
        holiday = this.holidaysListService.constructArrays(holiday);
    }

    goToDetailPage(holiday: Holiday) {
        this.router.navigate([TurismAppConstants.HOLIDAY_DETAIL_VIEW_PAGE_PATH + '/' + holiday.hotelInformation.accommodationName],
            { queryParams: { id: holiday.id } });
    }
}
