export class Offer {
  constructor(
    public id: number,
    public name: string,
    public contactInfoTelephone: string,
    public contactInfoEmail: string,
    public countryAddress:string,
    public cityAddress: string,
    public destination: string,
    public travelBy: string,
    public maxPrice: string,
    public numberOfNights: string,
    public dateOfArrival: string,
    public dateOfDeparture: string,
    public numberOfGuests: string,
    public typeOfAccomodation?: string,
    public food?: string,
    public comments?: string
  ) {  }
}
