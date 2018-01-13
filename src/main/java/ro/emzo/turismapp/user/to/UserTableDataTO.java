package ro.emzo.turismapp.user.to;

/**
 * Created by E5570_2 on 2017-12-10.
 */
public class UserTableDataTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String role;

    private String telephoneNumber;

    private String emailAddress;

    private Boolean activeOffers;

    private Boolean newsletter;

    public UserTableDataTO() {}

    public UserTableDataTO(Long id, String firstName, String lastName, String role, String telephoneNumber,
               String emailAddress, Boolean activeOffers, Boolean newsletter) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.telephoneNumber = telephoneNumber;
        this.emailAddress = emailAddress;
        this.activeOffers = activeOffers;
        this.newsletter = newsletter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Boolean getActiveOffers() {
        return activeOffers;
    }

    public void setActiveOffers(Boolean activeOffers) {
        this.activeOffers = activeOffers;
    }

    public Boolean getNewsletter() {
        return newsletter;
    }

    public void setNewsletter(Boolean newsletter) {
        this.newsletter = newsletter;
    }
}
