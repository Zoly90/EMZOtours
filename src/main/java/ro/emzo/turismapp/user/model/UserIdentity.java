package ro.emzo.turismapp.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

/**
 * Created by E5570_2 on 2017-12-09.
 */
@Entity
@Table(name = "user_identity")
public class UserIdentity extends BaseModel {

    @Column(name = "cnp")
    private String cnp;

    @Column(name = "identity_card_series")
    private String identityCardSeries;

    @Column(name = "identity_card_number")
    private String identityCardNumber;

    @Column(name = "id_card_expiration_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date idCardExpirationDate;

    @Column(name = "iban")
    private String iban;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userIdentity")
    @JsonBackReference
    private Collection<UserInfo> userInfo;

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

    public Collection<UserInfo> getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Collection<UserInfo> userInfo) {
        this.userInfo = userInfo;
    }
}
