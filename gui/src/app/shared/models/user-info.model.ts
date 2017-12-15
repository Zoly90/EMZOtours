export class UserInfo {
    id?: number
    title?: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    telephoneNr?: string
    birthday?: Date

    constructor() {
        Object.assign(this)
    }
}