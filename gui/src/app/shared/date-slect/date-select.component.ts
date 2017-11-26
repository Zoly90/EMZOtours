import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TurismAppConstants } from "../../utils/constants";
import { UtilsService } from "../../utils/utils.service";

@Component({
	selector: 'date-select',
	templateUrl: './date-select.component.html',
	styleUrls: ['./date-select.component.scss']
})
export class DateSelecComponent implements OnInit {

	@Input() applyForOffer: string;
	@Input() existingData: any;

	@Output() onDateSelected: EventEmitter<any> = new EventEmitter<any>();
	@Output() onExpirationDateSelected: EventEmitter<any> = new EventEmitter<any>();

	public dateSelectForm: FormGroup;

	private notOver18: boolean = true;
	private notOver18Message: string = '';
	private creditCardExpired: boolean = true;
	private creditCardExpiredMessage: string = '';

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
		private utilsService: UtilsService,
		private formBuilder: FormBuilder
	) {
		this.dateSelectForm = this.formBuilder.group({
			year: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required
				])
			],
			month: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required
				])
			],
			day: [
				{
					value: '',
					disabled: false
				},
				Validators.compose([
					Validators.required
				])
			]
		}, {
				validator: Validators.compose([
					this.ValidateAge.bind(this),
					this.ValidateExpirationDate.bind(this)
				])
			})
	}

	ngOnInit() {
		let firstYear: number = TurismAppConstants.FIRST_YEAR;
		let lastYear: number = new Date().getFullYear() - 18;

		if (!this.applyForOffer) {
			firstYear = TurismAppConstants.FIRST_YEAR;
			lastYear = new Date().getFullYear() - 18;
		} else {
			firstYear = new Date().getFullYear();
			lastYear = new Date().getFullYear() + 10;
		}

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

		if (this.existingData) {
			this._initFormWithExistingUserData()
		}
	}

	public onDayOpened() {
		this._setNumberOfDays();
	}

	public onMonthSelected(formValues) {
		if (this.applyForOffer) {
			if (formValues && formValues.year && formValues.month) {
				this.onExpirationDateSelected.emit({
					selectedYear: formValues.year,
					selectedMonth: formValues.month
				})
			}
		}
	}

	public onDaySelected(formValues) {
		if (this.dateSelectForm.valid) {
			this.onDateSelected.emit({
				selectedYear: formValues.year,
				selectedMonth: formValues.month,
				selectedDay: formValues.day,
				notOver18: this.notOver18
			});
		}
	}

	private _initFormWithExistingUserData() {
    this.dateSelectForm.controls.year.setValue(this.existingData.year);
		this.dateSelectForm.controls.month.setValue(this.existingData.month);
  }

	private _setNumberOfDays() {
		this.isLeapYear = this.utilsService.leapYear(this.selectedYear);
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

	private ValidateAge() {
		if (!this.applyForOffer) {
			const todaysDate = new Date();
			const enteredDate = new Date(
				Number(this.selectedYear),
				this.utilsService.convertToNumericalMonth(this.selectedMonth),
				Number(this.selectedDay)
			);
			// get time difference in miliseconds
			let timeDifference = Math.abs(todaysDate.getTime() - enteredDate.getTime());
			// convert it to number of years
			let differenceInYears = (timeDifference / (1000 * 3600 * 24)) * TurismAppConstants.DAY_TO_YEAR_CONVERSION;

			if (differenceInYears >= 18) {
				return null
			} else {
				return { notOver18: true }
			}
		} else {
			return
		}
	}

	private ValidateExpirationDate() {
		if (this.applyForOffer) {
			const selectedYear = this.years[Number(this.dateSelectForm.controls.year.value)]
			const todaysDate = new Date();
			const enteredDate = new Date(
				selectedYear.label,
				this.utilsService.convertToNumericalMonth(this.dateSelectForm.controls.month.value),
				1
			);
			
			if (enteredDate > todaysDate) {
				return null
			} else {
				return { creditCardExpired: true }
			}
		} else {
			return
		}
	}
}