package ro.emzo.turismapp.core.service;

import java.util.List;

import ro.emzo.turismapp.core.model.HolidayMainCategories;
import ro.emzo.turismapp.core.model.HolidayTypes;

public class HomePage {
	
	private List<HolidayMainCategories> holidayMainCategoriesList;
	
	private List<HolidayTypes> holidayTypesList;

	public List<HolidayMainCategories> getHolidayMainCategoriesList() {
		return holidayMainCategoriesList;
	}

	public void setHolidayMainCategoriesList(List<HolidayMainCategories> holidayMainCategoriesList) {
		this.holidayMainCategoriesList = holidayMainCategoriesList;
	}

	public List<HolidayTypes> getHolidayTypesList() {
		return holidayTypesList;
	}

	public void setHolidayTypesList(List<HolidayTypes> holidayTypesList) {
		this.holidayTypesList = holidayTypesList;
	}
}
