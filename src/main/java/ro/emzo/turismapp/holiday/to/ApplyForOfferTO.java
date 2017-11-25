package ro.emzo.turismapp.holiday.to;

import ro.emzo.turismapp.user.to.UserCreditCardTO;

/**
 * Created by E5570_2 on 2017-09-25.
 */

public class ApplyForOfferTO {

    private Long userId;

    private Long offerId;

    private UserCreditCardTO userCreditCardTO;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getOfferId() {
        return offerId;
    }

    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }

    public UserCreditCardTO getUserCreditCardTO() {
        return userCreditCardTO;
    }

    public void setUserCreditCardTO(UserCreditCardTO userCreditCardTO) {
        this.userCreditCardTO = userCreditCardTO;
    }
}
