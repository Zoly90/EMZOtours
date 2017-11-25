export class UserCreditCard {
	id?: number
	creditCardNumber?: string | number
	creditCardExpirationYear?: string | number
	creditCardExpirationMonth?: string | number
	creditCardVerificationNumber?: string | number

	constructor() {
		Object.assign(this)
	}
}