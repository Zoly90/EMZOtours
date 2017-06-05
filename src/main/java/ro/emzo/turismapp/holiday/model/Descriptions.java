package ro.emzo.turismapp.holiday.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "descriptions")
public class Descriptions extends BaseModel {

	@Column(name = "hotel")
	private String hotel;
	
	@Column(name = "region")
	private String region;
	
	@Column(name = "short_description")
	private String shortDescription;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "descriptions")
	@JsonBackReference
	private Collection<HolidaySummary> holidaySummary;

	public String getHotel() {
		return hotel;
	}

	public void setHotel(String hotel) {
		this.hotel = hotel;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public Collection<HolidaySummary> getHolidaySummary() {
		return holidaySummary;
	}

	public void setHolidaySummary(Collection<HolidaySummary> holidaySummary) {
		this.holidaySummary = holidaySummary;
	}
}
