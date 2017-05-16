import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { Holiday } from "../../core/models/holiday.model";

/*let holidays = [
    {
        id: 1,
        hotelName: 'Nissi Beach Resort',
        numberOfStars: '5',
        numberOfStarsArray: [],
        country: 'Cyprus',
        exactLocation: 'Nissi Avenue, 5340 Ayia Napa',
        imagePath: './../../../assets/images/holidaysList/nissi-beach-resort-cyprus-2.jpg',
        accomodationType: 'hotel',
        transportation: 'airplane',
        price: '325',
        numberOfNights: '7',
        shortDescription: 'Lorem ipsum bla bla bla....',
        food: 'breakfast included',
        earlyBooking: '10',
        earlyBookingExpireDate: '2017-03-31',
        earlyBookingImage: false,
        departureDateFrom: '07/05/2017',
        departureDateUntil: '22/09/2017',
        departureFrom: 'Cluj-Napoca'
    },
    {
        id: 2,
        hotelName: 'Hotel Costas Golden Beach',
        numberOfStars: 4,
        numberOfStarsArray: [],
        country: 'Greece',
        exactLocation: 'Pagi, Agios Georgios 490 81',
        imagePath: './../../../assets/images/holidaysList/hotel-costas-golden-beach.jpg',
        accomodationType: 'hotel',
        transportation: 'bus',
        price: '410',
        numberOfNights: '7',
        shortDescription: 'Lorem ipsum bla bla bla....',
        food: 'all inclusive',
        earlyBooking: '15',
        earlyBookingExpireDate: '2017-03-15',
        earlyBookingImage: false,
        departureDateFrom: '07/05/2017',
        departureDateUntil: '22/09/2017',
        departureFrom: 'Budapest'
    }
];*/

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