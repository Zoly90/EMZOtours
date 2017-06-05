package ro.emzo.turismapp.holiday.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "accommodation_address")
public class AccommodationAddress extends BaseModel {
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "street_nr")
	private String streetNr;
	
	@Column(name = "zip")
	private String zip;
	
	@Column(name = "city")
	private String city;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "accommodationAddress")
	@JsonBackReference
	private Collection<HolidaySummary> holidaySummarry;
	
	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "accommodationAddress")
	@JsonBackReference
	private Collection<HolidayDetail> holidayDetail;*/

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Collection<HolidaySummary> getHolidaySummarry() {
		return holidaySummarry;
	}

	public void setHolidaySummarry(Collection<HolidaySummary> holidaySummarry) {
		this.holidaySummarry = holidaySummarry;
	}

	/*public Collection<HolidayDetail> getHolidayDetail() {
		return holidayDetail;
	}

	public void setHolidayDetail(Collection<HolidayDetail> holidayDetail) {
		this.holidayDetail = holidayDetail;
	}*/

}
