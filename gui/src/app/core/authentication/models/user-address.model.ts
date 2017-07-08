export class UserAddress {
	id?: number
	country?: string
	city?: string
	street?: string
	streetNr?: string
	apartment?: string
	zip?: string

	constructor() {
		Object.assign(this)
	}
}