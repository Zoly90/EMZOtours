import { Component } from "@angular/core";
import { HolidayService } from "../../../holiday/services/holiday.service";
import { Holiday } from "../../../holiday/models/holiday.model";
import { HolidayUtilsService } from "../../../holiday/services/holidayDetailView.service";
import { Router } from "@angular/router";
import * as _ from 'lodash'
import { TurismAppConstants } from "../../../utils/constants";
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";
import { PagedList } from "../../../shared/models/paged-list.model";
import { HolidaysManagementTableDataModel } from "./model/holidays-management.model";
import { SearchCriteria, FilterFiledsName, FilterCriteria, FilterFileds } from "../../../shared/models/search-criteria.model";
import { HolidaysManagementService } from "./service/holidays-management.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SharedServices } from "../../../shared/services/shared-services.service";

@Component({
	selector: 'holidays-management',
	templateUrl: './holidays-management.component.html',
	styleUrls: ['./holidays-management.component.scss']
})
export class HolidaysManagementComponent {

	private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';
	private filtersSectionOpened: boolean = false;
	private filtersActive: boolean = false;
	private filtersForm: FormGroup;

	private searchCriteria: SearchCriteria = new SearchCriteria();
	private paginationConfig = {
		itemsPerPage: this.searchCriteria.paginationCriteria.itemsPerPage,
		currentPage: 1,
		totalItems: 0
	}
	private listOfHolidays: Array<Holiday> = new Array<Holiday>();
	private listOfCountries: Array<any> = new Array();
	private listOfCities: Array<any> = new Array();
	private filterFiledsName = FilterFiledsName;
	private token;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _holidayService: HolidayService,
		private _holidaysManagementService: HolidaysManagementService,
		private _holidayUtilsService: HolidayUtilsService,
		private _authorizationService: AuthorizationService,
		private _sharedServices: SharedServices,
	) {
		this.filtersForm = this._formBuilder.group({
			airplaneTransportationFilter: [
				{
					value: false,
					disabled: false
				}
			],
			busTransportationFilter: [
				{
					value: false,
					disabled: false
				}
			],
			personalTransportationFilter: [
				{
					value: false,
					disabled: false
				}
			],
			destinationCountryFilter: [
				{
					value: '',
					disabled: false
				}
			],
			destinationCityFilter: [
				{
					value: '',
					disabled: false
				}
			]
		})
	}

	ngOnInit() {
		this.token = this._authorizationService.getDecodedToken();
		if (this._checkIfLoggedInUserIsAdminOrEmployee()) {
			this._getHolidaysBySearchCriteria();
		} else {
			this._router.navigate(['/']);
		}

		this._sharedServices.getAllCountries().subscribe(list => {
			list.forEach(item => this.listOfCountries.push({ value: item.country, label: item.country }));
		});
		this._sharedServices.getAllCities().subscribe(list => {
			list.forEach(item => this.listOfCities.push({ value: item.city, label: item.city }));
		});
	}

	public searchForHoliday(searchKeyword: string) {
		this.searchCriteria.searchKeyword = searchKeyword;
		this._getHolidaysBySearchCriteria();
	}

	public onPageChange(page) {
		if (page > this.paginationConfig.currentPage) {
			this.searchCriteria.paginationCriteria.offset = this.searchCriteria.paginationCriteria.offset + this.paginationConfig.itemsPerPage;
		} else if (page < this.paginationConfig.currentPage) {
			this.searchCriteria.paginationCriteria.offset = this.searchCriteria.paginationCriteria.offset - this.paginationConfig.itemsPerPage;
		} else {
			return
		}
		this._getHolidaysBySearchCriteria();
		this.paginationConfig.currentPage = page;
	}

	public openFiltersSection() {
		this.filtersSectionOpened = !this.filtersSectionOpened;
	}

	public clearAllFilters() {
		this.filtersForm.reset();
		this.searchCriteria.filterCriteria = null;
		this.filtersActive = false;
		this._getHolidaysBySearchCriteria();
	}

	public applySelectedFilters() {
		this.searchCriteria.filterCriteria = new Array<FilterCriteria>();
		Object.keys(this.filtersForm.controls).forEach(key => {
			if (key === String(FilterFileds[FilterFileds.airplaneTransportationFilter]) || key === String(FilterFileds[FilterFileds.busTransportationFilter]) || key === String(FilterFileds[FilterFileds.personalTransportationFilter])) {
				if (key === String(FilterFileds[FilterFileds.airplaneTransportationFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.transportation)), FilterFiledsName.get(String(FilterFileds.airplaneTransportationFilter))));
				}
				if (key === String(FilterFileds[FilterFileds.busTransportationFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.transportation)), FilterFiledsName.get(String(FilterFileds.busTransportationFilter))));
				}
				if (key === String(FilterFileds[FilterFileds.personalTransportationFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.transportation)), FilterFiledsName.get(String(FilterFileds.personalTransportationFilter))));
				}
			}
			if (key === String(FilterFileds[FilterFileds.destinationCountryFilter]) && this.filtersForm.controls[key].value) {
				this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.destinationCountryFilter)), this.filtersForm.controls[key].value));
			}
			if (key === String(FilterFileds[FilterFileds.destinationCityFilter]) && this.filtersForm.controls[key].value) {
				this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.destinationCityFilter)), this.filtersForm.controls[key].value));
			}
		});
		if (this.searchCriteria.filterCriteria.length) {
			this.filtersActive = true;
			this._getHolidaysBySearchCriteria();
		}
	}

	public addHoliday() {
		return
	}

	public editHoliday(holidayModel: HolidaysManagementTableDataModel) {
		this._holidayService.getHolidayById(holidayModel.id)
			.subscribe(holiday => this._goToDetailPage(holiday));
	}

	public deleteConfirmed(cofirmation: boolean, holiday: HolidaysManagementTableDataModel) {
		if (this._checkIfLoggedInUserIsAdminOrEmployee() && cofirmation) {
			this._deleteHoliday(holiday);
		}
	}

	private _getHolidaysBySearchCriteria() {
		this._holidaysManagementService.getHolidaysBySearchCriteria(this.searchCriteria).subscribe((paginatedData: PagedList<HolidaysManagementTableDataModel>) => {
			this.listOfHolidays = paginatedData.data;
			this.paginationConfig.totalItems = paginatedData.itemsTotal;
		})
	}

	private _checkIfLoggedInUserIsAdminOrEmployee() {
		return (this.token != null && this.token.role === TurismAppConstants.EMPLOYEE || this.token.role === TurismAppConstants.ADMIN)
	}

	private _deleteHoliday(holiday: HolidaysManagementTableDataModel) {
		this._holidayService.deleteHoliday(holiday.id).toPromise()
			.then(res => {
				this.listOfHolidays.splice(_.findIndex(
					this.listOfHolidays, function (o) {
						return o.hotelInformation.accommodationName === holiday.hotelName;
					}), 1)
			})
			.catch(err => console.log(err));
	}

	private _goToDetailPage(holiday: HolidaysManagementTableDataModel) {
		this._holidayUtilsService.setHoliday(holiday);
		this._router.navigate(['holiday/' + holiday.hotelName], { queryParams: { id: holiday.id } });
	}
}