package ro.emzo.turismapp.holiday.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "holiday")
public class Holiday extends BaseModel{
	
	@Column(name = "presentation_image")
	private String presentationImage;

	@Column(name = "accommodation_name")
	private String accommodationName;

	@Column(name = "nr_stars")
	private String nrStars;

	@Column(name = "accommodation_type")
	private String accommodationType;

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

	@Column(name = "hotel_description")
	private String hotelDescription;

	@Column(name = "hotel_description_you_tube_link")
	private String hotelDescriptionYouTubeLink;

	@Column(name = "region_description")
	private String regionDescription;

	@Column(name = "region_description_you_tube_link")
	private String regionDescriptionYouTubeLink;

	@Column(name = "short_description")
	private String shortDescription;

	@Column(name = "latitude")
	private Double latitude;

	@Column(name = "longitude")
	private Double longitude;

	@Column(name = "departure_from")
	private String departureFrom;

	@Column(name = "nr_nights")
	private String nrNights;

	@Column(name = "included")
	private String included;

	@Column(name = "not_included")
	private String notIncluded;

	@Column(name = "early_booking_percentage")
	private String earlyBookingPercentage;

	@Column(name = "early_booking_deadline")
	private Date earlyBookingDeadline;

	@Column(name = "last_minute_percentage")
	private String lastMinutePercentage;

	@Column(name = "last_minute_beginning_date")
	private Date lastMinuteBeginningDate;

	@Column(name = "starting_price")
	private String startingPrice;

	@Column(name = "departure_dates_from")
	private Date departureDatesFrom;

	@Column(name = "departure_dates_until")
	private Date departureDatesUntil;

	@Enumerated(EnumType.STRING)
	@Column(name = "food_board")
	private FoodBoard foodBoard;

	@Enumerated(EnumType.STRING)
	@Column(name = "transportation")
	private Transportation transportation;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidayTypes holidayTypes;

	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidaySubcategories holidaySubcategories;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<PointsOfInterest> pointsOfInterest = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<Periods> periods = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<ImageSet> imageSet = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<Rooms> rooms = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<Facilities> facilities = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_id")
	private Collection<Reviews> reviews = new ArrayList<>();

	public String getPresentationImage() {
		return presentationImage;
	}

	public void setPresentationImage(String presentationImage) {
		this.presentationImage = presentationImage;
	}

	public HolidaySubcategories getHolidaySubcategories() {
		return holidaySubcategories;
	}

	public void setHolidaySubcategories(HolidaySubcategories holidaySubcategories) {
		this.holidaySubcategories = holidaySubcategories;
	}

	public HolidayTypes getHolidayTypes() {
		return holidayTypes;
	}

	public void setHolidayTypes(HolidayTypes holidayTypes) {
		this.holidayTypes = holidayTypes;
	}

	public Collection<ImageSet> getImageSet() {
		return imageSet;
	}

	public void setImageSet(Collection<ImageSet> imageSet) {
		this.imageSet = imageSet;
	}

	public Collection<Rooms> getRooms() {
		return rooms;
	}

	public void setRooms(Collection<Rooms> rooms) {
		this.rooms = rooms;
	}

	public Collection<Facilities> getFacilities() {
		return facilities;
	}

	public void setFacilities(Collection<Facilities> facilities) {
		this.facilities = facilities;
	}

	public Collection<Reviews> getReviews() {
		return reviews;
	}

	public void setReviews(Collection<Reviews> reviews) {
		this.reviews = reviews;
	}

	public String getAccommodationName() {
		return accommodationName;
	}

	public void setAccommodationName(String accommodationName) {
		this.accommodationName = accommodationName;
	}

	public String getNrStars() {
		return nrStars;
	}

	public void setNrStars(String nrStars) {
		this.nrStars = nrStars;
	}

	public String getAccommodationType() {
		return accommodationType;
	}

	public void setAccommodationType(String accommodationType) {
		this.accommodationType = accommodationType;
	}

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

	public String getHotelDescription() {
		return hotelDescription;
	}

	public void setHotelDescription(String hotelDescription) {
		this.hotelDescription = hotelDescription;
	}

	public String getRegionDescription() {
		return regionDescription;
	}

	public void setRegionDescription(String regionDescription) {
		this.regionDescription = regionDescription;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getDepartureFrom() {
		return departureFrom;
	}

	public void setDepartureFrom(String departureFrom) {
		this.departureFrom = departureFrom;
	}

	public String getNrNights() {
		return nrNights;
	}

	public void setNrNights(String nrNights) {
		this.nrNights = nrNights;
	}

	public String getIncluded() {
		return included;
	}

	public void setIncluded(String included) {
		this.included = included;
	}

	public String getNotIncluded() {
		return notIncluded;
	}

	public void setNotIncluded(String notIncluded) {
		this.notIncluded = notIncluded;
	}

	public String getEarlyBookingPercentage() {
		return earlyBookingPercentage;
	}

	public void setEarlyBookingPercentage(String earlyBookingPercentage) {
		this.earlyBookingPercentage = earlyBookingPercentage;
	}

	public Date getEarlyBookingDeadline() {
		return earlyBookingDeadline;
	}

	public void setEarlyBookingDeadline(Date earlyBookingDeadline) {
		this.earlyBookingDeadline = earlyBookingDeadline;
	}

	public String getLastMinutePercentage() {
		return lastMinutePercentage;
	}

	public void setLastMinutePercentage(String lastMinutePercentage) {
		this.lastMinutePercentage = lastMinutePercentage;
	}

	public Date getLastMinuteBeginningDate() {
		return lastMinuteBeginningDate;
	}

	public void setLastMinuteBeginningDate(Date lastMinuteBeginningDate) {
		this.lastMinuteBeginningDate = lastMinuteBeginningDate;
	}

	public String getStartingPrice() {
		return startingPrice;
	}

	public void setStartingPrice(String startingPrice) {
		this.startingPrice = startingPrice;
	}

	public Date getDepartureDatesFrom() {
		return departureDatesFrom;
	}

	public void setDepartureDatesFrom(Date departureDatesFrom) {
		this.departureDatesFrom = departureDatesFrom;
	}

	public Date getDepartureDatesUntil() {
		return departureDatesUntil;
	}

	public void setDepartureDatesUntil(Date departureDatesUntil) {
		this.departureDatesUntil = departureDatesUntil;
	}

	public FoodBoard getFoodBoard() {
		return foodBoard;
	}

	public void setFoodBoard(FoodBoard foodBoard) {
		this.foodBoard = foodBoard;
	}

	public Transportation getTransportation() {
		return transportation;
	}

	public void setTransportation(Transportation transportation) {
		this.transportation = transportation;
	}

	public Collection<PointsOfInterest> getPointsOfInterest() {
		return pointsOfInterest;
	}

	public void setPointsOfInterest(Collection<PointsOfInterest> pointsOfInterest) {
		this.pointsOfInterest = pointsOfInterest;
	}

	public Collection<Periods> getPeriods() {
		return periods;
	}

	public void setPeriods(Collection<Periods> periods) {
		this.periods = periods;
	}

	public String getHotelDescriptionYouTubeLink() {
		return hotelDescriptionYouTubeLink;
	}

	public void setHotelDescriptionYouTubeLink(String hotelDescriptionYouTubeLink) {
		this.hotelDescriptionYouTubeLink = hotelDescriptionYouTubeLink;
	}

	public String getRegionDescriptionYouTubeLink() {
		return regionDescriptionYouTubeLink;
	}

	public void setRegionDescriptionYouTubeLink(String regionDescriptionYouTubeLink) {
		this.regionDescriptionYouTubeLink = regionDescriptionYouTubeLink;
	}
}
