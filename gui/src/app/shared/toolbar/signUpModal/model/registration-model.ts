import { TurismAppConstants } from "../../../../utils/constants";

export class UserRegistrationModel {
	title?: string
	firstName?: string
	lastName?: string
	newsletter?: boolean
	telephoneNr?: string
	birthday?: Date
	username?: string
	password?: string
	passwordConfirm?: string
	emailAddress?: string
	role?: string

	constructor() {
		Object.assign(this, {
			role: TurismAppConstants.CLIENT
		});
	}
}