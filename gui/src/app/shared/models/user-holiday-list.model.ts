export class UserHolidayListModel {
	id: number
	hotelName: string
	presentationImage: any
	nrStars: string
	arrayOfStars: Array<any>
	country: string
	city: string
	street: string
	streetNr: string
	zip: string
	transportation: string
	departureFrom: string
	bookingPrice: string | number
	originalPrice: string | number
	startDate: Date
	endDate: Date
	nrNights: string
	accommodationType: string
	food: string
	shortDescription: string
	participated: boolean
}