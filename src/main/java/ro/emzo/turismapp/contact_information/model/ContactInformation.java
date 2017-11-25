package ro.emzo.turismapp.contact_information.model;

import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.holiday.model.Map;
import ro.emzo.turismapp.user.model.UserAddress;

import javax.persistence.*;

/**
 * Created by E5570_2 on 2017-09-10.
 */

@Entity
@Table(name = "contact_information")
public class ContactInformation extends BaseModel {

    @Column(name = "booking_telephone_nr")
    private String bookingTelephoneNr;

    @Column(name = "inquiries_telephone_nr")
    private String inquiriesTelephoneNr;

    @Column(name = "booking_email")
    private String bookingEmail;

    @Column(name = "inquiries_email")
    private String inquiriesEmail;

    @Column(name = "fax")
    private String fax;

    @Column(name = "working_hours")
    private String workingHours;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn
    private UserAddress address;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn
    private Map map;

    public String getBookingTelephoneNr() {
        return bookingTelephoneNr;
    }

    public void setBookingTelephoneNr(String bookingTelephoneNr) {
        this.bookingTelephoneNr = bookingTelephoneNr;
    }

    public String getInquiriesTelephoneNr() {
        return inquiriesTelephoneNr;
    }

    public void setInquiriesTelephoneNr(String inquiriesTelephoneNr) {
        this.inquiriesTelephoneNr = inquiriesTelephoneNr;
    }

    public String getBookingEmail() {
        return bookingEmail;
    }

    public void setBookingEmail(String bookingEmail) {
        this.bookingEmail = bookingEmail;
    }

    public String getInquiriesEmail() {
        return inquiriesEmail;
    }

    public void setInquiriesEmail(String inquiriesEmail) {
        this.inquiriesEmail = inquiriesEmail;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public UserAddress getAddress() {
        return address;
    }

    public void setAddress(UserAddress address) {
        this.address = address;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }
}
