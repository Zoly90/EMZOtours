import { UserCreditCard } from "../../core/authentication/models/user-credit-card.model";

export class ApplyForOffer {
	userId: number
	offerId: number
	userCreditCardTO?: UserCreditCard

	constructor() {
		Object.assign(this, {
			userCreditCardTO: new UserCreditCard()
		})
	}
}