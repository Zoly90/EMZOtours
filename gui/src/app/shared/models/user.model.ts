import { UserAddress } from "../../core/authentication/models/user-address.model";
import { UserLogin } from "../../core/authentication/models/user-login.model";
import { UserIdentity } from "../../core/authentication/models/user-identity.model";
import { UserCreditCard } from "../../core/authentication/models/user-credit-card.model";
import { UserInfo } from "./user-info.model";

export class User {
    userInfo?: UserInfo
    userAddress?: UserAddress
    userLogin?: UserLogin
    userIdentity?: UserIdentity
    userCreditCard?: UserCreditCard

    constructor() {
        Object.assign(this, {
            userInfo: new UserInfo(),
            userAddress: new UserAddress(),
            userLogin: new UserLogin(),
            userIdentity: new UserIdentity(),
            userCreditCard: new UserCreditCard()
        })
    }
}