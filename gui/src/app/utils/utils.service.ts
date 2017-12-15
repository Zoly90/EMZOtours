import { Injectable } from "@angular/core";
import { AuthorizationService } from "../core/authentication/services/authorization.service";
import { DateSelectModel } from "../shared/date-slect/model/date-select.model";

@Injectable()
export class UtilsService {

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  public getEmailRegexPattern() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  public getPhoneNumberRegex() {
    return /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
  }

  public getOnlyNumbersRegex() {
    return /^\d+$/;
  }

  public encode(input: any) {
    return btoa(input);
  }

  public decode(input: any) {
    return atob(input);
  }

  public parseJSON(response) {
    return response.text() ? response : null;
  }

  public isLeapYear(year) {
    let result: boolean = false;
    if ((Number(year) % 4 === 0 && Number(year) % 100 !== 0 && Number(year) % 400 !== 0) ||
      (Number(year) % 4 === 0 && Number(year) % 100 === 0 && Number(year) % 400 === 0)) {
      result = true;
    }
    return result;
  }

  public convertToNumericalMonth(month) {
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

  public generateString() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';

    for (var i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public checkAuthAndGetToken() {
    let token;
    if (this.authorizationService.isAuthenticated()) {
      token = this.authorizationService.getDecodedToken();
    }
    return token;
  }

  public getRealNumberReggexPattern() {
    return /([0-9]*[.])?[0-9]+/;
  }

  public getPasswordReggex() {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  }

  public sortById(sortable) {
    return sortable.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public getDateFromDateSelectModel(selectedDate: DateSelectModel) {
    const date: Date = new Date(
      Number(selectedDate.selectedYear),
      Number(selectedDate.selectedMonth),
      Number(selectedDate.selectedDay) ? Number(selectedDate.selectedDay) : 1
    );
    return date;
  }

  public getDateSelectModelFromDate(date: Date) {
    const selectedDate: DateSelectModel = new DateSelectModel();
    selectedDate.selectedYear = date.getFullYear();
    selectedDate.selectedMonth = date.getMonth();
    selectedDate.selectedDay = date.getDate();
    return selectedDate;
  }
}