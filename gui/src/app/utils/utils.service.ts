import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
	
	public getEmailRegexPattern() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  public encodePassword(password: string) {
    return btoa(password);
  }

  public parseJSON(response) {
		return response.text() ? response.json() : null;
	}

  public leapYear(year) {
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
}