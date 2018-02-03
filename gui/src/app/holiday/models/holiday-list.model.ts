export class HolidayListModel {
	id: number
	hotelName: string
	nrStars: string
	arrayOfStars: Array<any>
	presentationImage: string
	earlyBookingPercentage: string | number
	earlyBookingDeadline: Date
	lastMinutePercentage?: string | number
	lastMinuteBeginningDate?: Date
	country: string
	city: string
	street: string
	streetNr: string
	zip: string
	transportation: string
	departureFrom: string
	nrNights: string
	accommodationType: string
	food: string
	shortDescription: string
	startingPrice: string | number
	updatedStartingPrice: number
	departureDatesFrom: Date
	departureDatesUntil: Date
}