export class UserAddress {
	id?: number
	country?: string
	city?: string
	street?: string
	streetNr?: string
	block?: string
	apartment?: string
	zip?: string
	additionalExplanation?: string

	constructor() {
		Object.assign(this)
	}
}