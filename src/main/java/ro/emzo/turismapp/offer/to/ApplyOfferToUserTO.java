package ro.emzo.turismapp.offer.to;

/**
 * Created by E5570_2 on 2017-07-29.
 */
public class ApplyOfferToUserTO {

    private Long userID;

    private Long offerID;

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getOfferID() {
        return offerID;
    }

    public void setOfferID(Long offerID) {
        this.offerID = offerID;
    }
}
