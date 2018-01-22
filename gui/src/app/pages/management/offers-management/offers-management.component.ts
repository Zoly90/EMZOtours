import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TurismAppConstants } from "../../../utils/constants";
import * as _ from 'lodash';
import { SearchCriteria, FilterCriteria, FilterFiledsName, FilterFileds } from "../../../shared/models/search-criteria.model";
import { UtilsService } from "../../../utils/utils.service";
import { OffersTableDataModel } from "./model/offers-table-data.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PersonalizedOfferManagementService } from "./service/offer-management.service";
import { SharedServices } from "../../../shared/services/shared-services.service";
import { UserService } from "../../../shared/services/user.service";
import { PagedList } from "../../../shared/models/paged-list.model";

@Component({
	selector: 'offers-management',
	templateUrl: './offers-management.component.html',
	styleUrls: ['./offers-management.component.scss']
})
export class OffersManagementComponent {

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
	private listOfOffers: Array<OffersTableDataModel> = new Array();
	private listOfEmployees: Array<any> = new Array();
	private listOfCountries: Array<any> = new Array();
	private filterFiledsName = FilterFiledsName;
	private token;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _personalizedOfferManagementService: PersonalizedOfferManagementService,
		private _sharedServices: SharedServices,
		private _userService: UserService,
		private _utilsService: UtilsService
	) {
		this.filtersForm = this._formBuilder.group({
			openedStatusFilter: [
				{
					value: false,
					disabled: false
				}
			],
			wipStatusFilter: [
				{
					value: false,
					disabled: false
				}
			],
			doneStatusFilter: [
				{
					value: false,
					disabled: false
				}
			],
			handledByFilter: [
				{
					value: '',
					disabled: false
				}
			],
			destinationFilter: [
				{
					value: '',
					disabled: false
				}
			]
		})
	}

	ngOnInit() {
		this.token = this._utilsService.checkAuthAndGetToken();
		if (this.token != null && this.token.role === TurismAppConstants.EMPLOYEE || this.token.role === TurismAppConstants.ADMIN) {
			this._getPersonalizedOffersBySearchCriteria();
		} else {
			this._router.navigate(['/']);
		}

		this._sharedServices.getAllCountries().subscribe(list => {
			list.forEach(item => this.listOfCountries.push({ value: item.country, label: item.country }));
		});
		this._userService.getAllStaff().subscribe(list => {
			list.forEach(item => this.listOfEmployees.push({ value: String(item.id), label: item.employeeName }));
		});
	}

	public searchForOffers(searchKeyWord: string) {
		this.searchCriteria.searchKeyword = searchKeyWord;
		this._getPersonalizedOffersBySearchCriteria();
	}

	public assignToMe(offer) {
		this._personalizedOfferManagementService.applyToUser({ offerID: offer.id, userID: this.token.userID })
			.subscribe(res => {
				this._updateOffer(offer, res);
			})
	}

	public finalizeOffer(offer) {
		if (this._checkIfOfferBelongsToLoggedInUser(offer)) {
			this._personalizedOfferManagementService.finalizeOffer(offer)
				.subscribe(res => {
					this._updateOffer(offer, res);
				})
		}
	}

	public deleteConfirmed(cofirmation, offer) {
		if (cofirmation && this._checkIfOfferBelongsToLoggedInUser(offer)) {
			this._deleteOffer(offer);
		}
	}

	public openFiltersSection() {
		this.filtersSectionOpened = !this.filtersSectionOpened;
	}

	public clearAllFilters() {
		this.filtersForm.reset();
		this.searchCriteria.filterCriteria = null;
		this.filtersActive = false;
		this._getPersonalizedOffersBySearchCriteria();
	}

	public applySelectedFilters() {
		this.searchCriteria.filterCriteria = new Array<FilterCriteria>();
		Object.keys(this.filtersForm.controls).forEach(key => {
			if (key === String(FilterFileds[FilterFileds.openedStatusFilter]) || key === String(FilterFileds[FilterFileds.wipStatusFilter]) || key === String(FilterFileds[FilterFileds.doneStatusFilter])) {
				if (key === String(FilterFileds[FilterFileds.openedStatusFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.status)), FilterFiledsName.get(String(FilterFileds.openedStatusFilter))));
				}
				if (key === String(FilterFileds[FilterFileds.wipStatusFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.status)), FilterFiledsName.get(String(FilterFileds.wipStatusFilter))));
				}
				if (key === String(FilterFileds[FilterFileds.doneStatusFilter]) && this.filtersForm.controls[key].value) {
					this.searchCriteria.filterCriteria.push(
						new FilterCriteria(FilterFiledsName.get(String(FilterFileds.status)), FilterFiledsName.get(String(FilterFileds.doneStatusFilter))));
				}
			}
			if (key === String(FilterFileds[FilterFileds.handledByFilter]) && this.filtersForm.controls[key].value) {
				this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.handledByFilter)), this.filtersForm.controls[key].value));
			}
			if (key === String(FilterFileds[FilterFileds.destinationFilter]) && this.filtersForm.controls[key].value) {
				this.searchCriteria.filterCriteria.push(new FilterCriteria(FilterFiledsName.get(String(FilterFileds.destinationFilter)), this.filtersForm.controls[key].value));
			}
		});
		if (this.searchCriteria.filterCriteria.length) {
			this.filtersActive = true;
			this._getPersonalizedOffersBySearchCriteria();
		}
	}

	public onPageChange(page) {
		if (page > this.paginationConfig.currentPage) {
			this.searchCriteria.paginationCriteria.offset = this.searchCriteria.paginationCriteria.offset + this.paginationConfig.itemsPerPage;
		} else if (page < this.paginationConfig.currentPage) {
			this.searchCriteria.paginationCriteria.offset = this.searchCriteria.paginationCriteria.offset - this.paginationConfig.itemsPerPage;
		} else {
			return
		}
		this._getPersonalizedOffersBySearchCriteria();
		this.paginationConfig.currentPage = page;
	}

	private _getPersonalizedOffersBySearchCriteria() {
		this._personalizedOfferManagementService.getPersonalizedOffers(this.searchCriteria)
			.subscribe((paginatedData: PagedList<OffersTableDataModel>) => {
				this.listOfOffers = paginatedData.data;
				this.paginationConfig.totalItems = paginatedData.itemsTotal;
			});
	}

	private _checkIfOfferBelongsToLoggedInUser(offer: OffersTableDataModel) {
		return (offer.handlerId == this.token.userID)
	}

	private _updateOffer(offer, newOffer) {
		let updatedOfferId = this.listOfOffers.findIndex(item => item.id === offer.id);
		this.listOfOffers[updatedOfferId] = newOffer;
	}

	private _deleteOffer(offer) {
		this._personalizedOfferManagementService.deleteOffer(offer.id).toPromise()
			.then(res => {
				// this.listOfOffers.splice(_.findIndex(
				// 	this.listOfOffers, function (o) {
				// 		return o.id === offer.id;
				// 	}), 1)
				this._getPersonalizedOffersBySearchCriteria();
			})
			.catch(err => console.log(err));
	}
}