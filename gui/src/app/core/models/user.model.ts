import { UserLogin } from "../authentication/models/user-login.model";
import { UserAddress } from "../authentication/models/user-address.model";
import { UserIdentity } from "../authentication/models/user-identity.model";

export class User {
    id?: number
    title?: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    telephoneNr?: string
    birthday?: Date
    userAddress?: UserAddress
    userLogin?: UserLogin
    userIdentity?: UserIdentity

    constructor() {
        Object.assign(this, {
            userAddress: new UserAddress(),
            userLogin: new UserLogin(),
            userIdentity: new UserIdentity()
        })
    }
}