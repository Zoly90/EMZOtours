import { TurismAppConstants } from "../../../utils/constants";

export class UserLogin {
	id?: number
	username?: string
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	emailAddress?: string
	role?: string

	constructor() {
		Object.assign(this, {
			role: TurismAppConstants.CLIENT
		})
	}
}