package ro.emzo.turismapp.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

/**
 * Created by E5570_2 on 2017-09-25.
 */

@Entity
@Table(name = "user_credit_card")
public class UserCreditCard extends BaseModel {

    @Column(name = "credit_card_number")
    private String creditCardNumber;

    @Column(name = "expiration_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    @Column(name = "credit_card_user_name")
    private String creditCardUserName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userCreditCard")
    @JsonBackReference
    private Collection<UserInfo> userInfo;

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public void setCreditCardNumber(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCreditCardUserName() {
        return creditCardUserName;
    }

    public void setCreditCardUserName(String creditCardUserName) {
        this.creditCardUserName = creditCardUserName;
    }

    public Collection<UserInfo> getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Collection<UserInfo> userInfo) {
        this.userInfo = userInfo;
    }
}
