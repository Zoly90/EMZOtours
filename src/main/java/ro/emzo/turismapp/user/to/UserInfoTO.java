package ro.emzo.turismapp.user.to;

import java.sql.Date;

/**
 * Created by E5570_2 on 2017-06-30.
 */

public class UserInfoTO {

    private Long id;

    private String title;

    private String firstName;

    private String lastName;

    private Boolean newsletter;

    private String telephoneNr;

    private Date birthday;

    private UserLoginTO userLoginTO;

    private UserAddressTO userAddressTO;

    private UserCreditCardTO userCreditCardTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getNewsletter() {
        return newsletter;
    }

    public void setNewsletter(Boolean newsletter) {
        this.newsletter = newsletter;
    }

    public String getTelephoneNr() {
        return telephoneNr;
    }

    public void setTelephoneNr(String telephoneNr) {
        this.telephoneNr = telephoneNr;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public UserLoginTO getUserLoginTO() {
        return userLoginTO;
    }

    public void setUserLoginTO(UserLoginTO userLoginTO) {
        this.userLoginTO = userLoginTO;
    }

    public UserAddressTO getUserAddressTO() {
        return userAddressTO;
    }

    public void setUserAddressTO(UserAddressTO userAddressTO) {
        this.userAddressTO = userAddressTO;
    }

    public UserCreditCardTO getUserCreditCardTO() {
        return userCreditCardTO;
    }

    public void setUserCreditCardTO(UserCreditCardTO userCreditCardTO) {
        this.userCreditCardTO = userCreditCardTO;
    }
}
