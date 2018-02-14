import { UserAddress } from "../../../core/authentication/models/user-address.model";

export class ContactInformation {
	id?: number
	bookingEmail?: string
	inquiriesEmail?: string
	bookingTelephoneNr?: string | number
	inquiriesTelephoneNr?: string | number
	fax?: string | number
	address?: UserAddress
	workingHours?: any
	latitude?: number
	longitude?: number

	constructor(contactData?: any, dataIds?: any) {
		this.address = new UserAddress();

		if (contactData) {
			let newWorkingHours: string = '';
			newWorkingHours = newWorkingHours.concat(contactData.weekdays, ',', contactData.saturday, ',', contactData.sunday);

			this.id = dataIds.contactId;
			this.bookingEmail = contactData.bookingEmail;
			this.inquiriesEmail = contactData.inquiriesEmail;
			this.bookingTelephoneNr = contactData.bookingTelephoneNr;
			this.inquiriesTelephoneNr = contactData.inquiriesTelephoneNr;
			this.fax = contactData.fax;
			this.workingHours = newWorkingHours;
			this.latitude = contactData.latitude;
			this.longitude = contactData.longitude;
			this.address.id = dataIds.addressId;
			this.address.city = contactData.city;
			this.address.street = contactData.street;
			this.address.streetNr = contactData.streetNr;
			this.address.block = contactData.block;
			this.address.apartment = contactData.apartment;
			this.address.zip = contactData.zip;
			this.address.additionalExplanation = contactData.additionalExplanation;
		}
	}
}