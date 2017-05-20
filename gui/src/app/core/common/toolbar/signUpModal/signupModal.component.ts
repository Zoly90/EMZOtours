import { Component } from '@angular/core';
import * as Collections from 'typescript-collections';
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'sd-signup',
  templateUrl: './signupModal.component.html',
  styleUrls: ['./signupModal.component.css']
})
export class SignUpModalComponent {

  private submitted = false;
  private user: User = new User();

  private passwordCheck: any;
  private passwordEqual: boolean = false;

  // Logic for client's birthday
  // https://www.npmjs.com/package/angular2-select
  private over18: boolean = true;
  // 1 day = 0.00273791 years
  private dayToYearConversion = 0.00273791;

  // Array for Title, construction happens in constructor
  private titlesArray = ['Mr.', 'Ms.', 'Mrs.']
  private titles: Array<any> = [];
  private selectedTitle = "";

  private years: Array<any> = [];
  private isLeapYear = false;
  private selectedYear = "";

  // Array for Months, construction happens in constructor
  private monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private months: Array<any> = [];
  private selectedMonth = "";

  private days: Array<any> = [];
  private day_29 = {
    value: "28",
    label: "29"
  };
  private day_30 = {
    value: "29",
    label: "30"
  };
  private day_31 = {
    value: "30",
    label: "31"
  };
  private updatedDays: Array<any> = [];
  private selectedDay = ""

  constructor(
    private userService: UserService
  ) {
    this.user.userLogin.role = 'client';
    this.submitted = false;

    let numberOfTitles = 3;
    let getTitles = new Array(numberOfTitles);
    for (let i = 0; i < numberOfTitles; i++) {
      getTitles[i] = {
        value: i.toString(),
        label: this.titlesArray[i]
      }
    }
    this.titles = getTitles.slice(0);

    let firstYear = 1930;
    let lastYear = new Date().getFullYear() - 18;
    let numberOfYears = lastYear - firstYear + 1;
    let getYears = new Array(numberOfYears);
    for (let i = 0; i < numberOfYears; i++) {
      getYears[i] = {
        value: i.toString(),
        label: (i + firstYear).toString()
      }
    }
    this.years = getYears.slice(0);

    let numberOfMonths = 12;
    let getMonths = new Array(numberOfYears);
    for (let i = 0; i < 12; i++) {
      getMonths[i] = {
        value: i.toString(),
        label: this.monthsArray[i]
      }
    }
    this.months = getMonths.slice(0);

    let numberOfDays = 28;
    let getDays = new Array(numberOfDays);
    for (let i = 0; i < numberOfDays; i++) {
      getDays[i] = {
        value: i.toString(),
        label: (i + 1).toString()
      }
    }
    this.days = getDays.slice(0);
    this.updatedDays = this.days
  }

  leapYear() {
    this.isLeapYear = false;
    if ((Number(this.selectedYear) % 4 === 0 && Number(this.selectedYear) % 100 !== 0 && Number(this.selectedYear) % 400 !== 0) ||
      (Number(this.selectedYear) % 4 === 0 && Number(this.selectedYear) % 100 === 0 && Number(this.selectedYear) % 400 === 0)) {
      this.isLeapYear = true;
    }
  }

  setNumberOfDays() {
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
    this.leapYear();
  }

  onMonthSelected(item) {
    this.selectedMonth = item.label;
  }

  onDaySelected(item) {
    this.selectedDay = item.label;

    this.checkAge();
  }

  convertToNumericalMonth(month) {
    switch (month) {
      case 'January':
        month = 0;
        break;
      case 'February':
        month = 1;
        break;
      case 'March':
        month = 2;
        break;
      case 'April':
        month = 3;
        break;
      case 'May':
        month = 4;
        break;
      case 'June':
        month = 5;
        break;
      case 'July':
        month = 6;
        break;
      case 'August':
        month = 7;
        break;
      case 'September':
        month = 8;
        break;
      case 'October':
        month = 9;
        break;
      case 'November':
        month = 10;
        break;
      case 'December':
        month = 11;
        break;
    }
    return month;
  }

  onSubmit() {
    this.submitted = true;
  }

  checkAge() {
    let todaysDate = new Date();
    let enteredDate = new Date(Number(this.selectedYear), this.convertToNumericalMonth(this.selectedMonth), Number(this.selectedDay));
    // get time difference in miliseconds
    let timeDifference = Math.abs(todaysDate.getTime() - enteredDate.getTime());
    // convert it to number of years
    let diffDays = (timeDifference / (1000 * 3600 * 24)) * this.dayToYearConversion;

    if (diffDays < 18) {
      this.over18 = false;
    } else {
      this.over18 = true;
    }
  }

  dataSaved() {
    if (this.user.userLogin.password != this.passwordCheck) {
      this.passwordEqual = true;
    } else {
      this.user.title = this.selectedTitle;
      this.selectedMonth = this.convertToNumericalMonth(this.selectedMonth);
      this.user.birthday = new Date(Number(this.selectedYear), Number(this.selectedMonth), Number(this.selectedDay));
      this.userService.addUser(this.user).subscribe();

      this.onSubmit();
    }
  }

  private resetForm() {
    this.submitted = false;
  }
}
