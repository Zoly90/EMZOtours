package ro.emzo.turismapp.holiday.to;

import ro.emzo.turismapp.holiday.model.FoodBoard;
import ro.emzo.turismapp.holiday.model.Transportation;

import java.util.Date;

/**
 * Created by E5570_2 on 2018-01-16.
 */
public class HolidayListDataTO {

    private Long id;

    private String hotelName;

    private String nrStars;

    private String presentationImage;

    private Date earlyBookingDeadline;

    private String earlyBookingPercentage;

    private String country;

    private String city;

    private String street;

    private String streetNr;

    private String zip;

    private Transportation transportation;

    private String departureFrom;

    private String nrNights;

    private String accommodationType;

    private FoodBoard food;

    private String shortDescription;

    private String startingPrice;

    private Date departureDatesFrom;

    private Date departureDatesUntil;

    public HolidayListDataTO(Long id, String hotelName, String nrStars, String presentationImage, Date earlyBookingDeadline,
                 String earlyBookingPercentage, String country, String city, String street, String streetNr, String zip,
                 Transportation transportation, String departureFrom, String nrNights, String accommodationType, FoodBoard food,
                 String shortDescription, String startingPrice, Date departureDatesFrom, Date departureDatesUntil) {
        this.id = id;
        this.hotelName = hotelName;
        this.nrStars = nrStars;
        this.presentationImage = presentationImage;
        this.earlyBookingDeadline = earlyBookingDeadline;
        this.earlyBookingPercentage = earlyBookingPercentage;
        this.country = country;
        this.city = city;
        this.street = street;
        this.streetNr = streetNr;
        this.zip = zip;
        this.transportation = transportation;
        this.departureFrom = departureFrom;
        this.nrNights = nrNights;
        this.accommodationType = accommodationType;
        this.food = food;
        this.shortDescription = shortDescription;
        this.startingPrice = startingPrice;
        this.departureDatesFrom = departureDatesFrom;
        this.departureDatesUntil = departureDatesUntil;
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

    public String getNrStars() {
        return nrStars;
    }

    public void setNrStars(String nrStars) {
        this.nrStars = nrStars;
    }

    public String getPresentationImage() {
        return presentationImage;
    }

    public void setPresentationImage(String presentationImage) {
        this.presentationImage = presentationImage;
    }

    public Date getEarlyBookingDeadline() {
        return earlyBookingDeadline;
    }

    public void setEarlyBookingDeadline(Date earlyBookingDeadline) {
        this.earlyBookingDeadline = earlyBookingDeadline;
    }

    public String getEarlyBookingPercentage() {
        return earlyBookingPercentage;
    }

    public void setEarlyBookingPercentage(String earlyBookingPercentage) {
        this.earlyBookingPercentage = earlyBookingPercentage;
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
}
