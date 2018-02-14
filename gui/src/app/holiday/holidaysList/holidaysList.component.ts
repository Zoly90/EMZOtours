import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { HolidayService } from "../services/holiday.service";

import { HolidayListModel } from "../models/holiday-list.model";
import { TurismAppConstants } from "../../utils/constants";
import { PagedList } from "../../shared/models/paged-list.model";
import { HolidayUtilsService } from "../services/holiday-utils.service";
import { UtilsService } from "../../utils/utils.service";
import { UserService } from "../../shared/services/user.service";

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
    private token: any;

    constructor(
        private _holidayService: HolidayService,
        private _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private _holidayUtilsService: HolidayUtilsService,
        private _utilsService: UtilsService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.token = this._utilsService.checkAuthAndGetToken();
        if (this.token && this._router.url.substr(1) == TurismAppConstants.LOGGED_IN_USER_HOLIDAY_WISH_LIST_VIEW_PAGE_PATH) {
            this._userService.getHolidayWishlistOfLoggedInUser(this.token.userID).subscribe((data: Array<HolidayListModel>) => {
                this.holidayList = data;
                this.holidayList = this._holidayUtilsService.setNumberOfStarsArray(this.holidayList);
            });
        } else {
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
    }

    public onPageChange(page) {
        this.paginationConfig.currentPage = page;
    }

    public goToDetailPage(holiday: HolidayListModel) {
        this._holidayUtilsService.goToDetailPage(holiday);
    }
}
