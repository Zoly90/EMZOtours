import { UserLogin } from "../authentication/models/user-login.model";
import { UserAddress } from "../authentication/models/user-address.model";

export class User {
    id?: number
    title?: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    telephoneNr?: string
    birthday?: Date
    userAddressTO?: UserAddress
    userLoginTO?: UserLogin

    constructor() {
        Object.assign(this, {
            userAdressTO: new UserAddress(),
            userLoginTO: new UserLogin
        })
    }
}