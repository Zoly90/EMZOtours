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
    hotelDescriptionYouTubeLink?: string
    hotelDescriptionYouTubeLinkId?: string
    regionDescription?: string
    regionDescriptionYouTubeLink?: string
    regionDescriptionYouTubeLinkId?: string
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
    earlyBookingPercentage: string | number
    earlyBookingDeadline: Date
    lastMinutePercentage?: string | number
    lastMinuteBeginningDate?: Date
    startingPrice: string | number
    updatedStartingPrice: number
    departureDatesFrom?: Date
    departureDatesUntil?: Date
    food?: string
    transportation?: string
    periods: Array<Period>
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
    reviews: Array<Review>

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

export class Period {
    id?: number
    startingDate?: Date
    endingDate?: Date
    price?: string | number
    updatedPrice?: string | number
    roomType?: string
    roomLuxuryLevel?: string
    viewType?: string
    nrOfRoomsLeft?: string
    available?: boolean
}

export class Review {
    id?: number
    title?: string
    rating?: number
    ratingValues?: Array<boolean>
    text?: string
    dateOfReview?: Date
    dateOfTravel?: Date
    nameOfReviewer?: string
}

export class SubmitReview {
    rating: number
    title: string
    text?: string
}