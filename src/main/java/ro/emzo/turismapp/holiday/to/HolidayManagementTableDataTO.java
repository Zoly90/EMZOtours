package ro.emzo.turismapp.holiday.to;

import ro.emzo.turismapp.holiday.model.Transportation;

import java.util.Date;

/**
 * Created by E5570_2 on 2018-01-13.
 */
public class HolidayManagementTableDataTO {

    private Long id;

    private String hotelName;

    private String destinationCountry;

    private String destinationCity;

    private Date startingDate;

    private Date endingDate;

    private Transportation transportation;

    private String startingPrice;

    public HolidayManagementTableDataTO(Long id, String hotelName, String destinationCountry, String destinationCity,
                Date startingDate, Date endingDate, Transportation transportation, String startingPrice) {
        this.id = id;
        this.hotelName = hotelName;
        this.destinationCountry = destinationCountry;
        this.destinationCity = destinationCity;
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.transportation = transportation;
        this.startingPrice = startingPrice;
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

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public Date getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(Date startingDate) {
        this.startingDate = startingDate;
    }

    public Date getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Date endingDate) {
        this.endingDate = endingDate;
    }

    public Transportation getTransportation() {
        return transportation;
    }

    public void setTransportation(Transportation transportation) {
        this.transportation = transportation;
    }

    public String getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(String startingPrice) {
        this.startingPrice = startingPrice;
    }
}
