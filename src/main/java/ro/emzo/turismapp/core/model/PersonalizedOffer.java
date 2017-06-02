package ro.emzo.turismapp.core.model;

import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "personalized_offer")
public class PersonalizedOffer extends BaseModel{

	@Column(name = "comments")
	private String comments;
	
	@Column(name = "pets")
	private String pets;
	
	@Column(name = "max_price")
	private Integer maxPrice;
	
	@Column(name = "nr_nights")
	private Short nrNights;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "departure_city")
	private String departureCity;
	
	@Column(name = "departure_country")
	private String departureCountry;
	
	@Column(name = "travel_destination")
	private String travelDestination;
	
	@Column(name = "travel_by_options")
	private String travelBy;
	
	@Column(name = "first_day_of_holiday")
	private Date firstDayOfHoliday;
	
	@Column(name = "last_day_of_holiday")
	private Date lastDayOfHoliday;
	
	@Column(name = "nr_guests")
	private Short nrGuests;
	
	@Column(name = "accommodation_type")
	private String accommodationType;
	
	@Column(name = "food")
	private String food;
	
	@Column(name = "nr_children")
	private Short nrChildren;

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getPets() {
		return pets;
	}

	public void setPets(String pets) {
		this.pets = pets;
	}

	public Integer getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(Integer maxPrice) {
		this.maxPrice = maxPrice;
	}

	public Short getNrNights() {
		return nrNights;
	}

	public void setNrNights(Short nrNights) {
		this.nrNights = nrNights;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDepartureCity() {
		return departureCity;
	}

	public void setDepartureCity(String departureCity) {
		this.departureCity = departureCity;
	}

	public String getDepartureCountry() {
		return departureCountry;
	}

	public void setDepartureCountry(String departureCountry) {
		this.departureCountry = departureCountry;
	}

	public String getTravelDestination() {
		return travelDestination;
	}

	public void setTravelDestination(String travelDestination) {
		this.travelDestination = travelDestination;
	}

	public String getTravelBy() {
		return travelBy;
	}

	public void setTravelBy(String travelBy) {
		this.travelBy = travelBy;
	}

	public Date getFirstDayOfHoliday() {
		return firstDayOfHoliday;
	}

	public void setFirstDayOfHoliday(Date firstDayOfHoliday) {
		this.firstDayOfHoliday = firstDayOfHoliday;
	}

	public Date getLastDayOfHoliday() {
		return lastDayOfHoliday;
	}

	public void setLastDayOfHoliday(Date lastDayOfHoliday) {
		this.lastDayOfHoliday = lastDayOfHoliday;
	}

	public Short getNrGuests() {
		return nrGuests;
	}

	public void setNrGuests(Short nrGuests) {
		this.nrGuests = nrGuests;
	}

	public String getAccommodationType() {
		return accommodationType;
	}

	public void setAccommodationType(String accommodationType) {
		this.accommodationType = accommodationType;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public Short getNrChildren() {
		return nrChildren;
	}

	public void setNrChildren(Short nrChildren) {
		this.nrChildren = nrChildren;
	}
}
