package ro.emzo.turismapp.user.to;

/**
 * Created by E5570_2 on 2017-09-25.
 */

public class UserCreditCardTO {

    private Long id;

    private String creditCardNumber;

    private String creditCardExpirationYear;

    private String creditCardExpirationMonth;

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

    public String getCreditCardExpirationYear() {
        return creditCardExpirationYear;
    }

    public void setCreditCardExpirationYear(String creditCardExpirationYear) {
        this.creditCardExpirationYear = creditCardExpirationYear;
    }

    public String getCreditCardExpirationMonth() {
        return creditCardExpirationMonth;
    }

    public void setCreditCardExpirationMonth(String creditCardExpirationMonth) {
        this.creditCardExpirationMonth = creditCardExpirationMonth;
    }

    public String getCreditCardVerificationNumber() {
        return creditCardVerificationNumber;
    }

    public void setCreditCardVerificationNumber(String creditCardVerificationNumber) {
        this.creditCardVerificationNumber = creditCardVerificationNumber;
    }
}
