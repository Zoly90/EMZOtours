export class UserCreditCard {
	id?: number
	creditCardNumber?: string | number
	creditCardExpirationDate?: Date
	creditCardUserName?: string
	creditCardVerificationNumber?: string | number

	constructor() {
		Object.assign(this)
	}
}