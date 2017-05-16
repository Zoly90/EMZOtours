import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Holiday } from "../../core/models/holiday.model";

/*let holidayDetails = {
    id: 1,
    hotelInformation: {
        hotelName: 'Nissi Beach Resort',
        numberOfStarsArray: ['1', '2', '3', '4', '5'],
        country: 'Cyprus',
        exactLocation: 'Nissi Avenue, 5340 Ayia Napa'
    },
    descriptions: {
        hotelDescription: 'Lorem ipsum bla bla bla... bla bla bla',
        regionDescription: 'Lorem ipsum bla bla bla... bla bla bla... bla bla bla'
    },
    images: [
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/sample1-1024x683.jpg', description: 'Image 1' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/sample2-1024x683.jpg', description: 'Image 2' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/room6-1024x573.jpg', description: 'Image 3' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/sample4-1024x651.jpg', description: 'Image 4' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/sample5-1024x595.jpg', description: 'Image 5' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/swimmingpool.jpg', description: 'Image 6' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/fitness-1024x683.jpg', description: 'Image 7' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/restaurant-1024x682.jpg', description: 'Image 8' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/sample9-1024x624.jpg', description: 'Image 9' },
        { img: './../../../assets/images/holidayDetailView/NissiBeachResort/other_facilities-1024x683.jpg', description: 'Image 10' }
    ],
    offerInformation: {
        departureFrom: 'Cluj-Napoca',
        numberOfNights: '7',
        periods: [
            {
                from: '2017-05-11',
                until: '2017-05-18',
                price: '325',
                roomType: 'double room',
                viewFromRoom: 'sea view',
            },
            {
                from: '2017-08-03',
                until: '2017-08-10',
                price: '410',
                roomType: 'suite',
                viewFromRoom: 'sea view',
            }
        ],
        includedInPrice: [
            'airplane ticket',
            'airport taxes',
            'airport - hotel - ariport transport',
            '7 nights accomodation'
        ],
        notIncludedInPrice: [
            'medical insurance',
            'aditional trips',
            'visa taxes'
        ]
    },
    facilitiesAndRooms: {
        hotelFacilities: [
            {
                title: 'Restaurant & bar',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/restaurant-1024x682.jpg',
                listOfSubFacilities: ['Bar alongside the pool', 'Terrace', 'Restaurant with local specialties', 'Room service']
            },
            {
                title: 'Swimmingpool',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/swimmingpool.jpg',
                listOfSubFacilities: ['Outdoor swimingpool', 'Indoor swimmingpool', 'Chaises and umbrellas']
            },
            {
                title: 'Fitness',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/fitness-1024x683.jpg',
                listOfSubFacilities: ['Fitness center', 'Beach volley', 'Tenis']
            },
            {
                title: 'Wellness & SPA',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/wellness.jpg',
                listOfSubFacilities: ['SPA center', 'Large variety of massages', 'Sauna', 'Jacuzzi']
            },
            {
                title: 'Entertainment',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/entertainment.jpg',
                listOfSubFacilities: ['Additional trips', 'Pool table', 'Poker nights']
            },
            {
                title: 'Other facilities',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/other_facilities-1024x683.jpg',
                listOfSubFacilities: ['Aer conditioning', 'Bycycle renting', 'Car renting', 'Safe parking', 'Wi-Fi (in the lobby and restaurant)', 'Seif (not in every room)', '24h reception', 'Conference room']
            }
        ],
        hotelRooms: [
            {
                title: 'Suite',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room1.jpg',
                personCapacity: '3',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            },
            {
                title: 'Economy double',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room2.jpg',
                personCapacity: '2',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            },
            {
                title: 'Single sea view',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room3.jpg',
                personCapacity: '1',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            },
            {
                title: 'Double sea view',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room4.jpg',
                personCapacity: '2',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            },
            {
                title: 'Double sea front',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room5.jpg',
                personCapacity: '2',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            },
            {
                title: 'Single sea & garden view',
                imagePath: './../../../assets/images/holidayDetailView/NissiBeachResort/room6-1024x573.jpg',
                personCapacity: '4',
                roomFacilities: ['Terrace', 'LCD TV', 'Minibar', 'Seif', 'Telephone', 'Coffee & tea making facility', 'Air conditioning', 'Haidryer']
            }
        ]
    },
    localization: {
        map: {
            lat: 34.988616,
            lng: 33.971626
        },
        pointsOfInterest: [
            {
                pointOfInterest: 'ancient town of Polyrinia',
                distance: '40 km',
            },
            {
                pointOfInterest: 'lake Kournas',
                distance: '2 km',
            },
            {
                pointOfInterest: 'Samaria Gorge National Park',
                distance: '5 km',
            }
        ]
    },
    reviews: [
        {
            title: 'Poor food',
            text: 'The rooms we had were very big, hotel was clean and pool clean. The issue was the breakfast food. The breakfast items were all poor quality and there was almost nothing greek. We were lucky not to have all inclusive dinner as i went upstairs to see the buffet and food didnt look good either.',
            rating: {
                areSet: false,
                value: '1',
                ratingValues: []
            },
            nameOfReviewer: 'Cristiana V',
            dateOfReview: '2017-02-06',
            dateOfTravel: 'September 2016'
        },
        {
            title: 'Beautiful!',
            text: 'I liked everything about this hotel. Rooms, pools, gardens, the people, the beach, everything. Everything is so clean, the personal so friendly, food so gooood! And the night parties were awesome! I would like to come back someday!',
            rating: {
                areSet: false,
                value: '5',
                ratingValues: []
            },
            nameOfReviewer: 'Manolis K',
            dateOfReview: '2016-10-20',
            dateOfTravel: 'October 2016'
        },
        {
            title: 'Amazing hotel - great people',
            text: 'Lovely hotel,staff friendly and helpful.breakfast good but could do with being varied every few days. My main criticism was the price of extras . Two towels for 2 weeks 24€ Wifi 18€ and a safety deposit box 30€ . The beach is about 50 mtrs across the road and the bus stop to Chania about the same.',
            rating: {
                areSet: false,
                value: '4',
                ratingValues: []
            },
            nameOfReviewer: 'Marilyn L',
            dateOfReview: '2016-10-05',
            dateOfTravel: 'October 2016'
        }
    ]
}*/

let holiday: Holiday;

@Injectable()
export class HolidayDetailViewService {

    private array: string[];

    public setHoliday(holidayToSet) {
        holiday = holidayToSet;
        holiday = this._constructStarsArrays(holiday);

        holiday.offerInformation.included = this._convertToArrayOfStrings(holiday.offerInformation.included);
        holiday.offerInformation.notIncluded = this._convertToArrayOfStrings(holiday.offerInformation.notIncluded);

        for (let facility of holiday.facilities) {
            facility.facilitiesList = this._convertToArrayOfStrings(facility.facilitiesList);
        }

        for (let room of holiday.rooms) {
            room.roomFacilities = this._convertToArrayOfStrings(room.roomFacilities);
        }

        holiday.localization.map.lattitude = Number(holiday.localization.map.lattitude);
        holiday.localization.map.longitude = Number(holiday.localization.map.longitude);
    }

    private _constructStarsArrays(holiday: Holiday): Holiday {
        let nrStars: number;

        for (let review of holiday.reviews) {
            nrStars = review.rating;
            review.rating = [];
            for (let i = 0; i < 5; i++) {
                if (i == nrStars - 1) {
                    review.rating[i] = true;
                } else {
                    review.rating[i] = false;
                }
            }
        }
        return holiday;
    }

    private _convertToArrayOfStrings(items: any) {
        this.array = items.split(',');
        return this.array;
    }

    public getHolidayDetails() {
        return holiday;
    }
}