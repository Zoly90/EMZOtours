package ro.emzo.turismapp.core.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "hotel_information")
public class HotelInformation extends BaseModel {
	
	@Column(name = "accommodation_name")
	private String accommodationName;
	
	@Column(name = "nr_stars")
	private String nrStars;
	
	@Column(name = "accommodation_type")
	private String accommodationType;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "hotelInformation")
	@JsonBackReference
	private Collection<HolidaySummary> holidaySummary;

	public Collection<HolidaySummary> getHolidaySummary() {
		return holidaySummary;
	}

	public void setHolidaySummary(Collection<HolidaySummary> holidaySummary) {
		this.holidaySummary = holidaySummary;
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
}
