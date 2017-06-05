package ro.emzo.turismapp.home_page.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.holiday.model.HolidayMainCategories;
import ro.emzo.turismapp.holiday.model.HolidaySubcategories;
import ro.emzo.turismapp.holiday.model.HolidayTypes;
import ro.emzo.turismapp.home_page.dao.HomePageDataService;

@Service
public class HomePageService {

	@Autowired
	private HomePageDataService homePageDataService;
	
	private List<HolidayMainCategories> getHolidaySubcategories() {
		return homePageDataService.getHolidaySubcategories();
	}
	
	private List<HolidayTypes> getHolidayTypes() {
		return homePageDataService.getHolidayTypes();
	}
	
	public HomePage getHomePageData() {
		HomePage homePageData = new HomePage();
		
		homePageData.setHolidayMainCategoriesList(getHolidaySubcategories());
		homePageData.setHolidayTypesList(getHolidayTypes());
		
		return homePageData;
	}
	
	
}
