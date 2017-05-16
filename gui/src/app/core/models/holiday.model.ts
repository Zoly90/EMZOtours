export class Holiday {
    id?: number
    accommodationAddress: {
        id?: number
        country?: string
        street?: string
        streetNr?: string
        zip?: string
        city?: string
    }
    presentationImage: any
    hotelInformation: {
        id?: number
        accommodationName?: string
        nrStars?: any
        accommodationType?: string
    }
    descriptions: {
        id?: number
        hotel?: string
        region?: string
        shortDescription?: string
    }
    localization: {
        id?: number
        map: {
            id?: number
            lattitude?: number
            longitude?: number
        }
        pointsOfInterest: [{
            id?: number
            pointOfInterest?: string
            distance?: string
        }]
    }
    offerInformation: {
        id?: number
        departureFrom?: string
        nrNights?: string
        included?: any
        notIncluded?: any
        earlyBookingPercentage?: string
        earlyBookingDeadline?: Date
        startingPrice?: string
        departureDatesFrom?: Date
        departureDatesUntil?: Date
        food?: string
        transportation?: string
        periods: [{
            id?: number
            from?: Date
            until?: Date
            price?: string
            roomType?: string
            viewType?: string
        }]
    }
    imageSet: {
        id?: number
        image?: any
        description?: string
    }
    rooms: [{
        id?: number
        roomType?: string
        personCapacity?: string
        roomFacilities?: any
        image?: any
    }]
    facilities: [{
        id?: number
        facilityCategory?: string
        image?: any
        facilitiesList?: any
    }]
    reviews: [{
        id?: number
        title?: string
        rating?: any
        text?: string
        dateOfReview?: Date
        dateOfTravel?: Date
        nameOfReviewer?: string
    }]

    constructor() {
        Object.assign(this, {
            accommodationAddress: {},
            hotelInformation: {},
            descriptions: {},
            localization: {
                map: {},
                pointsOfInterest: [{}]
            },
            offerInformation: {
                periods: [{}]
            },
            imageSet: {},
            rooms: {},
            facilities: {},
            reviews: {}
        })
    }
}