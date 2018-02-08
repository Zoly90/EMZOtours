package ro.emzo.turismapp.user.to;

import ro.emzo.turismapp.holiday.model.FoodBoard;
import ro.emzo.turismapp.holiday.model.Transportation;

import java.util.Date;

/**
 * Created by E5570_2 on 2018-02-03.
 */
public class UserHolidayListTO {

    private Long id;

    private String hotelName;

    private String presentationImage;

    private String nrStars;

    private String country;

    private String city;

    private String street;

    private String streetNr;

    private String zip;

    private Transportation transportation;

    private String departureFrom;

    private String originalPrice;

    private String bookingPrice;

    private Date startDate;

    private Date endDate;

    private String nrNights;

    private String accommodationType;

    private FoodBoard food;

    private String shortDescription;

    private Boolean participated;

    public UserHolidayListTO(Long id, String hotelName, String presentationImage, String nrStars,
                             String country, String city, String street, String streetNr, String zip,
                             Transportation transportation, String departureFrom, String bookingPrice,
                             String originalPrice, Date startDate, Date endDate, String nrNights,
                             String accommodationType, FoodBoard food, String shortDescription, Boolean participated) {
        this.id = id;
        this.hotelName = hotelName;
        this.presentationImage = presentationImage;
        this.nrStars = nrStars;
        this.country = country;
        this.city = city;
        this.street = street;
        this.streetNr = streetNr;
        this.zip = zip;
        this.transportation = transportation;
        this.departureFrom = departureFrom;
        this.bookingPrice = bookingPrice;
        this.originalPrice = originalPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nrNights = nrNights;
        this.accommodationType = accommodationType;
        this.food = food;
        this.shortDescription = shortDescription;
        this.participated = participated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getPresentationImage() {
        return presentationImage;
    }

    public void setPresentationImage(String presentationImage) {
        this.presentationImage = presentationImage;
    }

    public String getNrStars() {
        return nrStars;
    }

    public void setNrStars(String nrStars) {
        this.nrStars = nrStars;
    }

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

    public Transportation getTransportation() {
        return transportation;
    }

    public void setTransportation(Transportation transportation) {
        this.transportation = transportation;
    }

    public String getDepartureFrom() {
        return departureFrom;
    }

    public void setDepartureFrom(String departureFrom) {
        this.departureFrom = departureFrom;
    }

    public String getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(String originalPrice) {
        this.originalPrice = originalPrice;
    }

    public String getBookingPrice() {
        return bookingPrice;
    }

    public void setBookingPrice(String bookingPrice) {
        this.bookingPrice = bookingPrice;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getNrNights() {
        return nrNights;
    }

    public void setNrNights(String nrNights) {
        this.nrNights = nrNights;
    }

    public String getAccommodationType() {
        return accommodationType;
    }

    public void setAccommodationType(String accommodationType) {
        this.accommodationType = accommodationType;
    }

    public FoodBoard getFood() {
        return food;
    }

    public void setFood(FoodBoard food) {
        this.food = food;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public Boolean getParticipated() {
        return participated;
    }

    public void setParticipated(Boolean participated) {
        this.participated = participated;
    }
}
