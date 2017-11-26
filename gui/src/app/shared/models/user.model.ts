import { UserAddress } from "../../core/authentication/models/user-address.model";
import { UserLogin } from "../../core/authentication/models/user-login.model";
import { UserIdentity } from "../../core/authentication/models/user-identity.model";
import { UserCreditCard } from "../../core/authentication/models/user-credit-card.model";

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
    userCreditCard?: UserCreditCard

    constructor() {
        Object.assign(this, {
            userAddress: new UserAddress(),
            userLogin: new UserLogin(),
            userIdentity: new UserIdentity(),
            userCreditCard: new UserCreditCard()
        })
    }
}