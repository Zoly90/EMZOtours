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

	constructor(
		private router: Router,
		private holidayService: HolidayService,
		private holidayDetailViewService: HolidayDetailViewService,
		private authorizationService: AuthorizationService
	) { }

	ngOnInit() {
		let token = this.authorizationService.getDecodedToken();
		if (token != null && token.role === TurismAppConstants.EMPLOYEE || token.role === TurismAppConstants.ADMIN) {
			this.holidayService.getAllHolidays().subscribe(
				list => this.listOfHolidays = list
			)
		} else {
			this.router.navigate(['/']);
		}
	}

	public updateHoliday(holiday: Holiday) {
		this.goToDetailPage(holiday)
	}

	public deleteHoliday(holiday: Holiday) {
		this.holidayService.deleteHoliday(holiday.id).toPromise()
			.then(res => {
				this.listOfHolidays.splice(_.findIndex(
					this.listOfHolidays, function (o) {
						return o.hotelInformation.accommodationName === holiday.hotelInformation.accommodationName;
					}), 1)
			})
			.catch(err => console.log(err));
	}

	private goToDetailPage(holiday: Holiday) {
		this.holidayDetailViewService.setHoliday(holiday);
		this.router.navigate(['holiday/' + holiday.hotelInformation.accommodationName]);
	}
}