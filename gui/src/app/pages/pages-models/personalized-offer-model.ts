import { User } from "../../core/models/user.model";

export class PersonalizedOffer {

  id?: number
  name?: string
  telephone?: string
  email?: string
  departureCity?: string
  departureCountry?: string
  travelDestination?: string
  travelBy?: string
  maxPrice?: number | string
  nrNights?: number | string
  firstDayOfHoliday?: Date
  lastDayOfHoliday?: Date
  nrGuests?: number | string
  accommodationType?: string
  food?: string
  pets?: string
  comments?: string
  nrChildren?: number | string
  status?: string
  userInfo?: User

  constructor() {
    Object.assign(this, {
      userInfo: new User()
    })
  }
}

export class DepartureCountries {

  departureCountries: Array<string> = ['Norvegia', 'Japan', 'Hungary', 'Brazil', 'Spain', 'Germany'];

  constructor() {
    Object.assign(this, {})
  }
}

export class DestinationCountries {

  destinationCountries: Array<string> = ['Norvegia', 'Japan', 'Hungary', 'Brazil', 'Spain', 'Germany'];

  constructor() {
    Object.assign(this, {})
  }
}

export class TravelByOptions {

  travelByOptions = [
    { name: 'personal car', checked: false },
    { name: 'airplane', checked: false },
    { name: 'bus', checked: false }
  ];

  constructor() {
    Object.assign(this, {})
  }
}

export class ContactInformationOptions {

  contactInfoOptions: Array<string> = ['telephone', 'e-mail', 'either'];

  constructor() {
    Object.assign(this, {})
  }
}