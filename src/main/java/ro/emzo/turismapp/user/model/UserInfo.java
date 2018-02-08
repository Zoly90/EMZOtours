package ro.emzo.turismapp.user.model;

import java.util.Collection;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.holiday.model.Periods;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;

@Entity
@Table(name = "user_info")
public class UserInfo extends BaseModel {

	@Enumerated(EnumType.STRING)
	@Column(name = "title")
	private Title title;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "newsletter")
	private Boolean newsletter;
	
	@Column(name = "telephone_nr")
	private String telephoneNr;
	
	@Column(name = "birthday")
	@Temporal(TemporalType.TIMESTAMP)
	private Date birthday;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserAddress userAddress;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserLogin userLogin;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserCreditCard userCreditCard;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserIdentity userIdentity;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userInfo")
	@JsonBackReference
	private Collection<HolidayReservation> holidayReservations;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userInfo")
	@JsonBackReference
	private Collection<PersonalizedOffer> personalizedOffers;

	public Title getTitle() {
		return title;
	}

	public void setTitle(Title title) {
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

	public UserAddress getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(UserAddress userAddress) {
		this.userAddress = userAddress;
	}

	public UserLogin getUserLogin() {
		return userLogin;
	}

	public void setUserLogin(UserLogin userLogin) {
		this.userLogin = userLogin;
	}

	public UserCreditCard getUserCreditCard() {
		return userCreditCard;
	}

	public void setUserCreditCard(UserCreditCard userCreditCard) {
		this.userCreditCard = userCreditCard;
	}

	public UserIdentity getUserIdentity() {
		return userIdentity;
	}

	public void setUserIdentity(UserIdentity userIdentity) {
		this.userIdentity = userIdentity;
	}

	public Collection<HolidayReservation> getHolidayReservations() {
		return holidayReservations;
	}

	public void setHolidayReservations(Collection<HolidayReservation> holidayReservations) {
		this.holidayReservations = holidayReservations;
	}

	public Collection<PersonalizedOffer> getPersonalizedOffers() {
		return personalizedOffers;
	}

	public void setPersonalizedOffers(Collection<PersonalizedOffer> personalizedOffers) {
		this.personalizedOffers = personalizedOffers;
	}
}
