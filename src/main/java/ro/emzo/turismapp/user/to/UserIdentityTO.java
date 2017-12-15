package ro.emzo.turismapp.user.to;

import java.util.Date;

/**
 * Created by E5570_2 on 2017-12-09.
 */
public class UserIdentityTO {

    private Long id;

    private String cnp;

    private String identityCardSeries;

    private String identityCardNumber;

    private Date idCardExpirationDate;

    private String iban;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getIdentityCardSeries() {
        return identityCardSeries;
    }

    public void setIdentityCardSeries(String identityCardSeries) {
        this.identityCardSeries = identityCardSeries;
    }

    public String getIdentityCardNumber() {
        return identityCardNumber;
    }

    public void setIdentityCardNumber(String identityCardNumber) {
        this.identityCardNumber = identityCardNumber;
    }

    public Date getIdCardExpirationDate() {
        return idCardExpirationDate;
    }

    public void setIdCardExpirationDate(Date idCardExpirationDate) {
        this.idCardExpirationDate = idCardExpirationDate;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }
}
