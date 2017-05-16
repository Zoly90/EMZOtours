package ro.emzo.turismapp.core.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "facilities")
public class Facilities extends BaseModel{
	
	@Column(name = "facility_category")
	private String facilityCategory;
	
	@Column(name = "image")
	private String image;
	
	@Column(name = "facilities_list")
	private String facilitiesList;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidayDetail holidayDetailFacilities;

	public String getFacilityCategory() {
		return facilityCategory;
	}

	public void setFacilityCategory(String facilityCategory) {
		this.facilityCategory = facilityCategory;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getFacilitiesList() {
		return facilitiesList;
	}

	public void setFacilitiesList(String facilitiesList) {
		this.facilitiesList = facilitiesList;
	}

	public HolidayDetail getHolidayDetailFacilities() {
		return holidayDetailFacilities;
	}

	public void setHolidayDetailFacilities(HolidayDetail holidayDetailFacilities) {
		this.holidayDetailFacilities = holidayDetailFacilities;
	}
}
