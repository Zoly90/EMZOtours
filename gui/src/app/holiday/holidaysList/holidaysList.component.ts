import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HolidayService } from "../services/holiday.service";

import { HolidayListModel } from "../models/holiday-list.model";
import { TurismAppConstants } from "../../utils/constants";
import { PagedList } from "../../shared/models/paged-list.model";
import { HolidayUtilsService } from "../services/holiday-utils.service";

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

    private routingByType: boolean;
    private routingById: number;

    constructor(
        private _holidayService: HolidayService,
        private _activatedRoute: ActivatedRoute,
        private _holidayUtilsService: HolidayUtilsService
    ) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe((params: Params) => {
            this.paginatedData = this._activatedRoute.snapshot.data['holidays'];
            this.holidayList = this.paginatedData.data;
            this.holidayList = this._holidayUtilsService.setNumberOfStarsArray(this.holidayList);
            this.paginationConfig.totalItems = this.paginatedData.itemsTotal;
        });
        
        this._activatedRoute.queryParams.subscribe(queryParam => {
            if (queryParam['type']) {
                this.routingByType = true;
            }
            this.routingById = queryParam['id'];
        });
    }

    public onPageChange(page) {
        this.paginationConfig.currentPage = page;
    }

    public goToDetailPage(holiday: HolidayListModel) {
        this._holidayUtilsService.goToDetailPage(holiday);
    }
}
