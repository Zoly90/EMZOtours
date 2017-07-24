import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { TurismAppConstants } from "../../../utils/constants";
import { UtilsService } from "../../../utils/utils.service";

@Component({
	selector: 'date-select',
	templateUrl: './date-select.component.html',
	styleUrls: ['./date-select.component.scss']
})
export class DateSelecComponent implements OnInit {

	@Output() onDateSelected: EventEmitter<any> = new EventEmitter<any>();

	private notOver18: boolean = true;
	private notOver18Message: string = '';

	// Logic for date selection { https://www.npmjs.com/package/angular2-select }
	private years: Array<any> = [];
	private isLeapYear = false;
	private selectedYear = '';

	// Array for Months, construction happens in constructor
	private monthsArray = TurismAppConstants.MONTHS;
	private months: Array<any> = [];
	private selectedMonth = '';

	private days: Array<any> = [];
	private day_29 = TurismAppConstants.DAY_29;
	private day_30 = TurismAppConstants.DAY_30;
	private day_31 = TurismAppConstants.DAY_31;
	private updatedDays: Array<any> = [];
	private selectedDay = '';

	constructor(
		private utilsService: UtilsService
	) {
		let firstYear = TurismAppConstants.FIRST_YEAR;
		let lastYear = new Date().getFullYear() - 18;
		for (let i = 0; i < (lastYear - firstYear + 1); i++) {
			this.years[i] = {
				value: i.toString(),
				label: (i + firstYear).toString()
			}
		}

		for (let i = 0; i < this.monthsArray.length; i++) {
			this.months[i] = {
				value: i.toString(),
				label: this.monthsArray[i]
			}
		}

		for (let i = 0; i < TurismAppConstants.NUMBER_OF_DAYS; i++) {
			this.days[i] = {
				value: i.toString(),
				label: (i + 1).toString()
			}
		}
		this.updatedDays = this.days
	}

	ngOnInit() { }

	public onDayOpened() {
		this._setNumberOfDays();
	}

	public onYearSelected(item) {
		this.selectedYear = item.label;
		this.isLeapYear = this.utilsService.leapYear(this.selectedYear);
		if (this.selectedMonth && this.selectedDay) {
			this._checkAge();
		}
	}

	public onMonthSelected(item) {
		this.selectedMonth = item.label;
		if (this.selectedDay) {
			this._checkAge();
		}
	}

	public onDaySelected(item) {
		this.selectedDay = item.label;

		this._checkAge();

		if (!this.notOver18) {
			this.onDateSelected.emit({
				selectedYear: this.selectedYear,
				selectedMonth: this.selectedMonth,
				selectedDay: this.selectedDay,
				notOver18: this.notOver18
			});
		}
	}

	private _setNumberOfDays() {
		this.updatedDays.splice(29, 31);
		if (this.selectedMonth === 'February' && this.isLeapYear) {
			if (!this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_29);
			}
		} else if ((this.selectedMonth === 'April') || (this.selectedMonth === 'June') ||
			(this.selectedMonth === 'September') || (this.selectedMonth === 'November')) {
			if (this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_30);
			} else {
				this.updatedDays.push(this.day_29, this.day_30);
			}
		} else if ((this.selectedMonth === 'January') || (this.selectedMonth === 'March') || (this.selectedMonth === 'May') ||
			(this.selectedMonth === 'July') || (this.selectedMonth === 'August') || (this.selectedMonth === 'October') ||
			(this.selectedMonth === 'December')) {
			if (this.updatedDays.includes(this.day_29) && this.updatedDays.includes(this.day_30)) {
				this.updatedDays.push(this.day_31);
			} else if (this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_30, this.day_31);
			} else {
				this.updatedDays.push(this.day_29, this.day_30, this.day_31);
			}
		}
	}

	private _checkAge() {
		let todaysDate = new Date();
		let enteredDate = new Date(
			Number(this.selectedYear),
			this.utilsService.convertToNumericalMonth(this.selectedMonth),
			Number(this.selectedDay)
		);
		// get time difference in miliseconds
		let timeDifference = Math.abs(todaysDate.getTime() - enteredDate.getTime());
		// convert it to number of years
		let differenceInYears = (timeDifference / (1000 * 3600 * 24)) * TurismAppConstants.DAY_TO_YEAR_CONVERSION;

		if (differenceInYears < 18) {
			this.notOver18 = true;
			this.notOver18Message = TurismAppConstants.NOT_OVER_18_MESSAGE;
		} else {
			this.notOver18 = false;
			this.notOver18Message = '';
		}
	}
}