package ro.emzo.turismapp.holiday.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "holiday_main_categories")
public class HolidayMainCategories extends BaseModel{
	
	@Column(name = "main_category")
	private String mainCategory;
	
	@Column(name = "image_src")
	private String imageSrc;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_main_categories_id")
	private Collection<HolidaySubcategories> holidaySubcategories = new ArrayList<>();

	public String getMainCategory() {
		return mainCategory;
	}

	public void setMainCategory(String mainCategory) {
		this.mainCategory = mainCategory;
	}

	public String getImageSrc() {
		return imageSrc;
	}

	public void setImageSrc(String imageSrc) {
		this.imageSrc = imageSrc;
	}

	public Collection<HolidaySubcategories> getHolidaySubcategories() {
		return holidaySubcategories;
	}

	public void setHolidaySubcategories(Collection<HolidaySubcategories> holidaySubcategories) {
		this.holidaySubcategories = holidaySubcategories;
	}
}
