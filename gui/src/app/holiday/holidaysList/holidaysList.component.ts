import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HolidayService } from "../services/holiday.service";

import { HolidayListModel } from "../models/holiday-list.model";
import { TurismAppConstants } from "../../utils/constants";
import { PagedList } from "../../shared/models/paged-list.model";
import { UtilsService } from "../../utils/utils.service";

@Component({
    selector: 'sd-list',
    templateUrl: './holidaysList.component.html',
    styleUrls: ['./holidaysList.component.scss']
})

export class HolidaysListComponent {

    private paginatedData: PagedList<HolidayListModel>
    private holidayList: Array<HolidayListModel>;

    private currentPage: number;
    private paginationConfig = {
        itemsPerPage: 5,
        currentPage: this.currentPage,
        totalItems: 0
    }

    private routingBy: string;
    private routingById: number;

    constructor(
        private _router: Router,
        private _utilsService: UtilsService,
        private _holidayService: HolidayService,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe(() => {
            this.paginatedData = this._activatedRoute.snapshot.data['holidays'];
            this.holidayList = this.paginatedData.data;
            this.holidayList = this._utilsService.setNumberOfStarsArray(this.holidayList);
            this.paginationConfig.totalItems = this.paginatedData.itemsTotal;
        });
    }

    public onPageChange(page) {
        this.paginationConfig.currentPage = page;
    }

    public goToDetailPage(holiday: HolidayListModel) {
        this._utilsService.goToDetailPage(holiday);
    }
}
