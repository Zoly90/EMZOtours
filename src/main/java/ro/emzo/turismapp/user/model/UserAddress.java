package ro.emzo.turismapp.user.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "user_address")
public class UserAddress extends BaseModel {
	
	@Column(name = "country")
	private String country;

	@Column(name = "city")
	private String city;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "street_nr")
	private String streetNr;
	
	@Column(name = "zip")
	private String zip;
	
	@Column(name = "apartment")
	private String apartment;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userAddress")
	@JsonBackReference
	private Collection<UserInfo> userInfo;

	public String getCountry() {
		return country;
	}
	
	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getCity() {
		return city;
	}
	
	public void setCity(String city) {
		this.city = city;
	}
	
	public String getStreet() {
		return street;
	}
	
	public void setStreet(String street) {
		this.street = street;
	}
	
	public String getStreetNr() {
		return streetNr;
	}
	
	public void setStreetNr(String streetNr) {
		this.streetNr = streetNr;
	}
	
	public String getZip() {
		return zip;
	}
	
	public void setZip(String zip) {
		this.zip = zip;
	}
	
	public String getApartment() {
		return apartment;
	}
	
	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public Collection<UserInfo> getUserInfo() {
		return userInfo;
	}
	
	public void setUserInfo(Collection<UserInfo> userInfo) {
		this.userInfo = userInfo;
	}
}
