package ro.emzo.turismapp.user.model;

import java.sql.Date;
import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.holiday.model.HolidaySummary;
import ro.emzo.turismapp.holiday.model.Period;
import ro.emzo.turismapp.offer.model.PersonalizedOffer;

@Entity
@Table(name = "user_info")
public class UserInfo extends BaseModel {
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "newsletter")
	private Boolean newsletter;
	
	@Column(name = "telephone_nr")
	private String telephoneNr;
	
	@Column(name = "birthday")
	private Date birthday;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserAddress userAddress;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserLogin userLogin;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private UserCreditCard userCreditCard;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private HolidaySummary reservedOffer;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private Period reservedOfferPerriod;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userInfo")
	@JsonBackReference
	private Collection<PersonalizedOffer> personalizedOffers;

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

	public HolidaySummary getReservedOffer() {
		return reservedOffer;
	}

	public void setReservedOffer(HolidaySummary reservedOffer) {
		this.reservedOffer = reservedOffer;
	}

	public Period getReservedOfferPerriod() {
		return reservedOfferPerriod;
	}

	public void setReservedOfferPerriod(Period reservedOfferPerriod) {
		this.reservedOfferPerriod = reservedOfferPerriod;
	}

	public Collection<PersonalizedOffer> getPersonalizedOffers() {
		return personalizedOffers;
	}

	public void setPersonalizedOffers(Collection<PersonalizedOffer> personalizedOffers) {
		this.personalizedOffers = personalizedOffers;
	}
}
