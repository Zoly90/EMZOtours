import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HolidaysListService } from "../services/holidaysList.service";
import { HolidayDetailViewService } from "../services/holidayDetailView.service";
import { RoutingByIDService } from "../../core/services/routing-by-id.service";
import { HolidayService } from "../services/holiday.service";

import { Holiday } from "../models/holiday.model";

@Component({
    moduleId: module.id,
    selector: 'sd-list',
    templateUrl: './holidaysList.component.html',
    styleUrls: ['./holidaysList.component.scss'],
    providers: [HolidaysListService, HolidayDetailViewService]
})

export class HolidaysListComponent {

    backgroundImagePath = "../../../assets/images/background/rsz_background.jpg";

    holidayList: Holiday;

    numberOfStars: any[];

    constructor(
        private router: Router,
        private holidaysListService: HolidaysListService,
        private holidayDetailViewService: HolidayDetailViewService,
        private holidayService: HolidayService,
        private routingByIDService: RoutingByIDService
    ) { }

    ngOnInit() {
        if (this.routingByIDService.getRouting() === 'type') {
            this.holidayService.getHolidaysByType(this.routingByIDService.getId()).subscribe(data => {
                this.holidayList = data;
            });
        } else {
            this.holidayService.getHolidaysByCategory(this.routingByIDService.getId()).subscribe(data => {
                this.holidayList = data;
            });
        }

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

    test(holiday) {
        holiday = this.holidaysListService.constructArrays(holiday);
        console.log(holiday);
    }

    goToDetailPage(holiday, first, last) {
        this.holidayDetailViewService.setHoliday(holiday);
        this.router.navigate(['holiday/nissi-beach-resort']);
    }

    // PAGINATION
    public maxSize: number = 5;
    public bigTotalItems: number = 175;
    public bigCurrentPage: number = 1;
    public itemsPerPage: number = 5;
    public numPages: number = 10;

    public pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }
}
