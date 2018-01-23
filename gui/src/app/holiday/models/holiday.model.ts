export class Holiday {
    id?: number
    country?: string
    street?: string
    streetNr?: string
    zip?: string
    city?: string
    presentationImage: any
    accommodationName?: string
    nrStars?: any
    arrayOfStars?: Array<number>
    accommodationType?: string
    hotelDescription?: string
    regionDescription?: string
    shortDescription?: string
    latitude?: number
    longitude?: number
    pointsOfInterest: [{
        id?: number
        pointOfInterest?: string
        distance?: string
        isEditable?: boolean
    }]
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
        available?: boolean
    }]
    imageSet: [{
        id?: number
        image?: any
        description?: string
    }]
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
        rating?: number
        ratingValues?: Array<boolean>
        text?: string
        dateOfReview?: Date
        dateOfTravel?: Date
        nameOfReviewer?: string
    }]

    constructor() {
        Object.assign(this, {
            pointsOfInterest: [{}],
            periods: [{}],
            imageSet: {},
            rooms: {},
            facilities: {},
            reviews: {}
        })
    }
}