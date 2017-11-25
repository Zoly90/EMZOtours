import { Component } from "@angular/core";
import { HolidayService } from "../../../holiday/services/holiday.service";
import { Holiday } from "../../../holiday/models/holiday.model";
import { HolidayDetailViewService } from "../../../holiday/services/holidayDetailView.service";
import { Router } from "@angular/router";
import * as _ from 'lodash'
import { TurismAppConstants } from "../../../utils/constants";
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";

@Component({
	selector: 'holidays-management',
	templateUrl: './holidays-management.component.html',
	styleUrls: ['./holidays-management.component.scss']
})
export class HolidaysManagementComponent {

	private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';
	private listOfHolidays: Array<Holiday> = new Array<Holiday>();
	private token;

	constructor(
		private router: Router,
		private holidayService: HolidayService,
		private holidayDetailViewService: HolidayDetailViewService,
		private authorizationService: AuthorizationService
	) { }

	ngOnInit() {
		this.token = this.authorizationService.getDecodedToken();
		if (this._checkIfLoggedInUserIsAdminOrEmployee()) {
			this.holidayService.getAllHolidays().subscribe(
				list => this.listOfHolidays = list
			)
		} else {
			this.router.navigate(['/']);
		}
	}

	public updateHoliday(holiday: Holiday) {
		this._goToDetailPage(holiday)
	}

	public deleteConfirmed(cofirmation: boolean, holiday: Holiday) {
		if (this._checkIfLoggedInUserIsAdminOrEmployee() && cofirmation) {
			this._deleteHoliday(holiday);
		}
	}

	private _checkIfLoggedInUserIsAdminOrEmployee() {
		return (this.token != null && this.token.role === TurismAppConstants.EMPLOYEE || this.token.role === TurismAppConstants.ADMIN) 
	}

	private _deleteHoliday(holiday: Holiday) {
		this.holidayService.deleteHoliday(holiday.id).toPromise()
			.then(res => {
				this.listOfHolidays.splice(_.findIndex(
					this.listOfHolidays, function (o) {
						return o.hotelInformation.accommodationName === holiday.hotelInformation.accommodationName;
					}), 1)
			})
			.catch(err => console.log(err));
	}

	private _goToDetailPage(holiday: Holiday) {
		this.holidayDetailViewService.setHoliday(holiday);
		this.router.navigate(['holiday/' + holiday.hotelInformation.accommodationName]);
	}
}