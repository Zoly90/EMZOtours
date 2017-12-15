import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TurismAppConstants } from "../../utils/constants";
import { UtilsService } from "../../utils/utils.service";
import { DateSelectModel } from "./model/date-select.model";
import { AgeValidation } from "../services/age-validation";
import { ExpirationDateValidation } from "../services/expiration-date-validation";

@Component({
	selector: 'date-select',
	templateUrl: './date-select.component.html',
	styleUrls: ['./date-select.component.scss']
})
export class DateSelecComponent implements OnInit {

	@Input() dateSelectFormAction: string;
	@Input() existingData: Date;
	@Input() disabled: boolean;

	@Output() onDateSelected: EventEmitter<any> = new EventEmitter<any>();
	@Output() onExpirationDateSelected: EventEmitter<any> = new EventEmitter<any>();

	public dateSelectForm: FormGroup;

	// Logic for date selection { https://www.npmjs.com/package/angular2-select }
	private years: Array<any> = [];
	private isLeapYear = false;

	private monthsArray = TurismAppConstants.MONTHS;
	private months: Array<any> = [];

	private days: Array<any> = [];
	private day_29 = TurismAppConstants.DAY_29;
	private day_30 = TurismAppConstants.DAY_30;
	private day_31 = TurismAppConstants.DAY_31;
	private updatedDays: Array<any> = [];

	// date select component action types
	private birthdate = TurismAppConstants.BIRTHDATE;
	private idCardExpirationDate = TurismAppConstants.ID_CARD_EXPIRATION_DATE;
	private creditCardExpirationDate = TurismAppConstants.APPLY_FOR_OFFER;
	private applyForOffer;

	constructor(
		private _utilsService: UtilsService,
		private _formBuilder: FormBuilder
	) {
		this.dateSelectForm = this._formBuilder.group({
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
					AgeValidation.ValidateAge('year', 'month', 'day'),
					ExpirationDateValidation.ValidateExpirationDate('year', 'month', 'day')
				])
			});
	}

	ngOnInit() {
		let firstYear: number;
		let lastYear: number;

		this.applyForOffer = this.dateSelectFormAction == this.creditCardExpirationDate;

		if (this.dateSelectFormAction === this.birthdate) {
			firstYear = TurismAppConstants.FIRST_YEAR;
			lastYear = new Date().getFullYear() - 18;
		} else {
			firstYear = new Date().getFullYear();
			lastYear = new Date().getFullYear() + 10;
		}

		for (let i = 0; i < (lastYear - firstYear + 1); i++) {
			this.years[i] = {
				value: (i + firstYear).toString(),
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
				value: (i + 1).toString(),
				label: (i + 1).toString()
			}
		}
		this.updatedDays = this.days;
	}

	ngOnChanges(simpleChange: SimpleChanges) {
    if ('existingData' in simpleChange) {
			this._initFormWithExistingUserData();
    }
		if ('disabled' in simpleChange) {
			this._updateFormAccessibility();
    }
  }

	public onDayOpened() {
		this._setNumberOfDays();
	}

	public onYearSelected(formValues) {
		if (this.dateSelectFormAction === this.creditCardExpirationDate && (formValues && formValues.month)) {
			this.onMonthSelected(formValues);
		} else if ((this.dateSelectFormAction === this.birthdate || this.dateSelectFormAction === this.idCardExpirationDate) && (formValues && formValues.month && formValues.day)) {
			this.onDaySelected(formValues);
		}
	}

	public onMonthSelected(formValues) {
		if (this.dateSelectFormAction === this.creditCardExpirationDate) {
			const resultingDate: DateSelectModel = new DateSelectModel();
			if (formValues && !this.dateSelectForm.errors.cardExpired) {
				resultingDate.selectedYear = formValues.year;
				resultingDate.selectedMonth = formValues.month;
				this.onExpirationDateSelected.emit(resultingDate);
			}
		} else if (formValues && formValues.year && formValues.day) {
			this.onDaySelected(formValues);
		}
	}

	public onDaySelected(formValues) {
		if ((this.dateSelectFormAction === this.birthdate) && (formValues && formValues.year && formValues.month && !this.dateSelectForm.errors.notOver18)) {
			this._emitAllDateValues(formValues);
		} else if ((this.dateSelectFormAction === this.idCardExpirationDate) && (formValues && formValues.year && formValues.month && !this.dateSelectForm.errors.cardExpired)) {
			this._emitAllDateValues(formValues);
		}
	}

	private _emitAllDateValues(formValues) {
		const resultingDate: DateSelectModel = new DateSelectModel();
		resultingDate.selectedYear = formValues.year;
		resultingDate.selectedMonth = formValues.month;
		resultingDate.selectedDay = formValues.day;
		this.onDateSelected.emit(resultingDate);
	}

	private _initFormWithExistingUserData() {
		if (this.existingData != null) {
			const existingDate: Date = new Date(this.existingData);
			const selectedDate: DateSelectModel = this._utilsService.getDateSelectModelFromDate(existingDate);
			this.dateSelectForm.controls.year.setValue(String(selectedDate.selectedYear));
			this.dateSelectForm.controls.month.setValue(String(selectedDate.selectedMonth));
			this.dateSelectForm.controls.day.setValue(String(selectedDate.selectedDay));
		}
	}

	private _setNumberOfDays() {
		this.isLeapYear = this._utilsService.isLeapYear(this.dateSelectForm.controls['year'].value);
		this.updatedDays.splice(29, 31);
		if (this.dateSelectForm.controls['month'].value === '1' && this.isLeapYear) {
			if (!this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_29);
			}
		} else if ((this.dateSelectForm.controls['month'].value === '3') || (this.dateSelectForm.controls['month'].value === '5') ||
			(this.dateSelectForm.controls['month'].value === '8') || (this.dateSelectForm.controls['month'].value === '10')) {
			if (this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_30);
			} else {
				this.updatedDays.push(this.day_29, this.day_30);
			}
		} else if ((this.dateSelectForm.controls['month'].value === '0') || (this.dateSelectForm.controls['month'].value === '2') || (this.dateSelectForm.controls['month'].value === '4') ||
			(this.dateSelectForm.controls['month'].value === '6') || (this.dateSelectForm.controls['month'].value === '7') || (this.dateSelectForm.controls['month'].value === '9') ||
			(this.dateSelectForm.controls['month'].value === '11')) {
			if (this.updatedDays.includes(this.day_29) && this.updatedDays.includes(this.day_30)) {
				this.updatedDays.push(this.day_31);
			} else if (this.updatedDays.includes(this.day_29)) {
				this.updatedDays.push(this.day_30, this.day_31);
			} else {
				this.updatedDays.push(this.day_29, this.day_30, this.day_31);
			}
		}
	}

	private _updateFormAccessibility() {
		if (this.disabled) {
			this.dateSelectForm.disable();
		} else {
			this.dateSelectForm.enable();
		}
	}
}