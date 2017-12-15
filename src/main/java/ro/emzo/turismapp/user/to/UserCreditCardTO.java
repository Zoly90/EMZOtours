package ro.emzo.turismapp.user.to;

import java.util.Date;

/**
 * Created by E5570_2 on 2017-09-25.
 */

public class UserCreditCardTO {

    private Long id;

    private String creditCardNumber;

    private Date creditCardExpirationDate;

    private String creditCardUserName;

    private String creditCardVerificationNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public void setCreditCardNumber(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }

    public Date getCreditCardExpirationDate() {
        return creditCardExpirationDate;
    }

    public void setCreditCardExpirationDate(Date creditCardExpirationDate) {
        this.creditCardExpirationDate = creditCardExpirationDate;
    }

    public String getCreditCardUserName() {
        return creditCardUserName;
    }

    public void setCreditCardUserName(String creditCardUserName) {
        this.creditCardUserName = creditCardUserName;
    }

    public String getCreditCardVerificationNumber() {
        return creditCardVerificationNumber;
    }
}
