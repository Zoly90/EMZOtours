import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { Holiday } from "../models/holiday.model";

@Injectable()
export class HolidaysListService {

    //  create array for hotel classification (number of stars)
    public constructArrays(holiday: Holiday): Holiday {
        let nrStars: number = holiday.hotelInformation.nrStars;
        if (holiday.hotelInformation.nrStars instanceof Array) {
            return holiday;
        } else {
            holiday.hotelInformation.nrStars = [];
        }
        // console.log(nrStars);
        for (let i = 0; i < nrStars; i++) {
            holiday.hotelInformation.nrStars[i] = i + 1;
        }

        return holiday;
    }
}