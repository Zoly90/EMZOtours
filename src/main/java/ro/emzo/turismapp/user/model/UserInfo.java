package ro.emzo.turismapp.user.model;

import java.sql.Date;

import javax.persistence.*;

import ro.emzo.turismapp.core.model.BaseModel;

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
}
