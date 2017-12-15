package ro.emzo.turismapp.user.to;

import ro.emzo.turismapp.user.model.UserIdentity;

/**
 * Created by E5570_2 on 2017-12-09.
 */
public class AddOrUpdateUserTO {

    private UserInfoTO userInfo;

    private UserCreditCardTO userCreditCard;

    private UserLoginTO userLogin;

    private UserIdentityTO userIdentity;

    private UserAddressTO userAddress;

    public UserInfoTO getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfoTO userInfo) {
        this.userInfo = userInfo;
    }

    public UserCreditCardTO getUserCreditCard() {
        return userCreditCard;
    }

    public void setUserCreditCard(UserCreditCardTO userCreditCard) {
        this.userCreditCard = userCreditCard;
    }

    public UserLoginTO getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(UserLoginTO userLogin) {
        this.userLogin = userLogin;
    }

    public UserIdentityTO getUserIdentity() {
        return userIdentity;
    }

    public void setUserIdentity(UserIdentityTO userIdentity) {
        this.userIdentity = userIdentity;
    }

    public UserAddressTO getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(UserAddressTO userAddress) {
        this.userAddress = userAddress;
    }
}
