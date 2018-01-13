package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "holiday_subcategories")
public class HolidaySubcategories extends BaseModel{

	@Column(name = "subcategory")
	private String subcategory;
	
	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_subcategories_id")
	private Collection<HolidaySummary> holidaySummary = new ArrayList<>();*/
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidayMainCategories holidayMainCategories;

	public String getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}

/*	public Collection<HolidaySummary> getHolidaySummary() {
		return holidaySummary;
	}

	public void setHolidaySummary(Collection<HolidaySummary> holidaySummary) {
		this.holidaySummary = holidaySummary;
	}*/

	public HolidayMainCategories getHolidayMainCategories() {
		return holidayMainCategories;
	}

	public void setHolidayMainCategories(HolidayMainCategories holidayMainCategories) {
		this.holidayMainCategories = holidayMainCategories;
	}
}
