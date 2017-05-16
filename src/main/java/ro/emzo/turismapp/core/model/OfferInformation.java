package ro.emzo.turismapp.core.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "offer_information")
public class OfferInformation extends BaseModel {
	
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
	private String earlyBookingDeadline;
	
	@Column(name = "starting_price")
	private String startingPrice;
	
	@Column(name = "departure_dates_from")
	private String departureDatesFrom;
	
	@Column(name = "departure_dates_until")
	private String departureDatesUntil;
	
	@Column(name = "food")
	private String food;
	
	@Column(name = "transportation")
	private String transportation;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "offerInformation")
	@JsonBackReference
	private Collection<HolidaySummary> holidaySummary;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "offer_information_id")
	private Collection<Periods> periods = new ArrayList<>();

	public Collection<Periods> getPeriods() {
		return periods;
	}

	public void setPeriods(Collection<Periods> periods) {
		this.periods = periods;
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

	public String getEarlyBookingDeadline() {
		return earlyBookingDeadline;
	}

	public void setEarlyBookingDeadline(String earlyBookingDeadline) {
		this.earlyBookingDeadline = earlyBookingDeadline;
	}

	public String getStartingPrice() {
		return startingPrice;
	}

	public void setStartingPrice(String startingPrice) {
		this.startingPrice = startingPrice;
	}

	public String getDepartureDatesFrom() {
		return departureDatesFrom;
	}

	public void setDepartureDatesFrom(String departureDatesFrom) {
		this.departureDatesFrom = departureDatesFrom;
	}

	public String getDepartureDatesUntil() {
		return departureDatesUntil;
	}

	public void setDepartureDatesUntil(String departureDatesUntil) {
		this.departureDatesUntil = departureDatesUntil;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public String getTransportation() {
		return transportation;
	}

	public void setTransportation(String transportation) {
		this.transportation = transportation;
	}

	public Collection<HolidaySummary> getHolidaySummary() {
		return holidaySummary;
	}

	public void setHolidaySummary(Collection<HolidaySummary> holidaySummary) {
		this.holidaySummary = holidaySummary;
	}
	
}
