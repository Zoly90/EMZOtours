import { Component, ViewChild } from '@angular/core';
import * as Collections from 'typescript-collections';
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";
import { TurismAppConstants } from "../../../../utils/constants";
import { UtilsService } from "../../../../utils/utils.service";
import { UserValidatorService } from "../../../services/user-validator.service";

@Component({
  selector: 'sd-signup',
  templateUrl: './signupModal.component.html',
  styleUrls: ['./signupModal.component.scss']
})
export class SignUpModalComponent {

  @ViewChild('signUpForm') signUpForm;

  private submitted = false;
  private user: User = new User();

  private validEmailAddress: boolean = false;
  private inValidEmailAddressMessage: string = '';
  private validUsernameLength: boolean = false;
  private inValidUsernameLengthMessage: string = '';
  private validPasswordLength: boolean = false;
  private inValidPasswordLengthMessage: string = '';
  private passwordNotEqual: boolean = true;
  private passwordNotEqualMessage: string = '';

  // Logic for client's birthday
  // https://www.npmjs.com/package/angular2-select
  private notOver18: boolean = true;
  private notOver18Message: string = '';

  // Array for Title, construction happens in constructor
  private titlesArray = TurismAppConstants.TITLES;
  private titles: Array<any> = [];
  private selectedTitle = "";

  private years: Array<any> = [];
  private isLeapYear = false;
  private selectedYear = "";

  // Array for Months, construction happens in constructor
  private monthsArray = TurismAppConstants.MONTHS;
  private months: Array<any> = [];
  private selectedMonth = "";

  private days: Array<any> = [];
  private day_29 = TurismAppConstants.DAY_29;
  private day_30 = TurismAppConstants.DAY_30;
  private day_31 = TurismAppConstants.DAY_31;
  private updatedDays: Array<any> = [];
  private selectedDay = ""

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    private userValidatorService: UserValidatorService
  ) {
    this.submitted = false;

    for (let i = 0; i < this.titlesArray.length; i++) {
      this.titles[i] = {
        value: i.toString(),
        label: this.titlesArray[i]
      }
    }

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

  validateEmailAddress() {
    if (this.user.userLoginTO.emailAddress && this.user.userLoginTO.emailAddress != '') {
      this.validEmailAddress = this.userValidatorService.validateEmailAddress(this.user.userLoginTO);
      if (!this.validEmailAddress) {
        this.inValidEmailAddressMessage = TurismAppConstants.INVALID_EMAIL_ADDRESS_MESSAGE;
      } else {
        this.inValidEmailAddressMessage = '';
      }
    }
  }

  validateUsernameLength() {
    if (this.user.userLoginTO.username && this.user.userLoginTO.username != '') {
      this.validUsernameLength = this.userValidatorService.validateUsernameLength(this.user.userLoginTO);
      if (!this.validUsernameLength) {
        this.inValidUsernameLengthMessage = TurismAppConstants.INVALID_USERNAME_LENGTH_MESSAGE;
      } else {
        this.inValidUsernameLengthMessage = '';
      }
    }
  }

  validatePasswordLength() {
    if (this.user.userLoginTO.password && this.user.userLoginTO.password != '') {
      this.validPasswordLength = this.userValidatorService.validatePasswordLength(this.user.userLoginTO);
      if (!this.validPasswordLength) {
        this.inValidPasswordLengthMessage = TurismAppConstants.INVALID_PASWORD_LENGTH_MESSAGE;
      } else {
        this.inValidPasswordLengthMessage = '';
      }
    }

    this.validatePasswordEquality();
  }

  validatePasswordEquality() {
    if (this.user.userLoginTO.passwordConfirm && this.user.userLoginTO.passwordConfirm != '') {
      this.passwordNotEqual = this.userValidatorService.validatePasswordEquality(this.user.userLoginTO);
      if (this.passwordNotEqual) {
        this.passwordNotEqualMessage = TurismAppConstants.PASSWORD_NOT_EQUAL_MESSAGE;
      } else {
        this.passwordNotEqualMessage = '';
      }
    }
  }

  private setNumberOfDays() {
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

  onDayOpened() {
    this.setNumberOfDays();
  }

  onTitleSelected(item) {
    this.selectedTitle = item.label;
  }

  onYearSelected(item) {
    this.selectedYear = item.label;
    this.isLeapYear = this.utilsService.leapYear(this.selectedYear);
    if (this.selectedMonth && this.selectedDay) {
      this._checkAge();
    }
  }

  onMonthSelected(item) {
    this.selectedMonth = item.label;
    if (this.selectedDay) {
      this._checkAge();
    }
  }

  onDaySelected(item) {
    this.selectedDay = item.label;

    this._checkAge();
  }

  private onSubmit() {
    this.submitted = true;
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

  saveData() {
    if (this.signUpForm.form.valid &&
      (this.validEmailAddress && !this.notOver18 && this.validUsernameLength && this.validPasswordLength && !this.passwordNotEqual)) {
      this.user.title = this.selectedTitle;
      this.selectedMonth = this.utilsService.convertToNumericalMonth(this.selectedMonth);
      this.user.birthday = new Date(Number(this.selectedYear), Number(this.selectedMonth), Number(this.selectedDay));
      this.user.userLoginTO.password = this.utilsService.encodePassword(this.user.userLoginTO.password);
      this.user.userLoginTO.passwordConfirm = this.utilsService.encodePassword(this.user.userLoginTO.passwordConfirm);
      this.userService.addUser(this.user).subscribe();
      this.onSubmit();
    }
  }

  private resetForm() {
    this.submitted = false;
    this.user = new User();
    this.validEmailAddress = false;
    this.inValidEmailAddressMessage = '';
    this.validUsernameLength = false;
    this.inValidUsernameLengthMessage = '';
    this.validPasswordLength = false;
    this.inValidPasswordLengthMessage = '';
    this.passwordNotEqual = true;
    this.passwordNotEqualMessage = '';
    this.notOver18 = true;
    this.notOver18Message = '';
  }
}
