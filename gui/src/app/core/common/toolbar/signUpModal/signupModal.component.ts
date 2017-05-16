import { Component } from '@angular/core';
import { SignUp } from './signUp';
import { Birthday } from './birthday'
import * as Collections from 'typescript-collections';

@Component({
  selector: 'sd-signup',
  templateUrl: './signupModal.component.html',
  styleUrls: ['./signupModal.component.css']
})
export class SignUpModalComponent {
  submitted = false;

  // Array for Title, construction happens in constructor
  titlesArray = ['Mr.', 'Ms.', 'Mrs.']
  titles: Array<any> = [];
  selectedTitle = "";

  // Logic for client's birthday
  // https://www.npmjs.com/package/angular2-select
  clientBirthday = new Birthday('', '', '');
  client = new SignUp(1, '', '', '', this.clientBirthday, '', '', '');

  years: Array<any> = [];
  isLeapYear = false;
  selectedYear = "";

  monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months: Array<any> = [];
  selectedMonth = "";

  days: Array<any> = [];
  day_29 = {
    value: "28",
    label: "29"
  };
  day_30 = {
    value: "29",
    label: "30"
  };
  day_31 = {
    value: "30",
    label: "31"
  };
  updatedDays: Array<any> = [];
  selectedDay = ""

  constructor() {
    let i;

    let numberOfTitles = 3;
    let getTitles = new Array(numberOfTitles);
    for (i = 0; i < numberOfTitles; i++) {
      getTitles[i] = {
        value: i.toString(),
        label: this.titlesArray[i]
      }
    }
    this.titles = getTitles.slice(0);

    let firstYear = 1930;
    let lastYear = 1998;
    let numberOfYears = lastYear - firstYear + 1;
    let getYears = new Array(numberOfYears);
    for (i = 0; i < numberOfYears; i++) {
      getYears[i] = {
        value: i.toString(),
        label: (i + firstYear).toString()
      }
    }
    this.years = getYears.slice(0);

    let numberOfMonths = 12;
    let getMonths = new Array(numberOfYears);
    for (i = 0; i < 12; i++) {
      getMonths[i] = {
        value: i.toString(),
        label: this.monthsArray[i]
      }
    }
    this.months = getMonths.slice(0);

    let numberOfDays = 28;
    let getDays = new Array(numberOfDays);
    for (i = 0; i < numberOfDays; i++) {
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
  };
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

  onSingleClosed() {
    console.log('- closed and is leap year: ', this.isLeapYear);
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
  }

  onSingleDeselected(item) {}
  
  firstName = "";
  lastName = "";
  username = "";
  password = "";

  onSubmit() {
    this.submitted = true;
  }
  dataSaved() {
    console.log("data received and saved");
    for (let i = 1930; i < 1999; i++)
      console.log(i);
  }
}
