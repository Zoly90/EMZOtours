export class UserIdentity {
	id?: number
	cnp?: string
	identityCardSeries?: string
	identityCardNumber?: string
	idCardExpirationDate?: Date
	iban?: string

	constructor() {
		Object.assign(this)
	}
}