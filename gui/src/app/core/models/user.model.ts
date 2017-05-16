export class User {
    id?: number
    title?: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    telephoneNr?: string
    birthday?: Date
    userAddress: {
        id?: number
        country?: string
        city?: string
        street?: string
        streetNr?: string
        zip?: string
        apartment?: string
        block?: string
    }
    userLogin: {
        id?: number
        username?: string
        password?: string
        emailAddress?: string
        role?: string
    }

    constructor() {
        Object.assign(this, {
            userAdress: {},
            userLogin: {}
        })
    }
}