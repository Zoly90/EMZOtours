import { Component } from "@angular/core";
import { HolidayService } from "../../../holiday/services/holiday.service";
import { Holiday } from "../../../holiday/models/holiday.model";
import { HolidayDetailViewService } from "../../../holiday/services/holidayDetailView.service";
import { Router } from "@angular/router";
import * as _ from 'lodash'

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
		private holidayDetailViewService: HolidayDetailViewService
	) { }

	ngOnInit() {
		this.holidayService.getAllHolidays().subscribe(list => this.listOfHolidays = list);
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
		console.log(holiday)
		this.router.navigate(['holiday/' + holiday.hotelInformation.accommodationName]);
	}

}