package ro.emzo.turismapp.home_page.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.holiday.model.HolidayMainCategories;
import ro.emzo.turismapp.holiday.model.HolidayTypes;

@Service
public class HomePageDataService {

	@Autowired
	private HolidayCategoriesRepository holidayCategoriesRepository;
	
	@Autowired
	private HolidayTypesRepository holidayTypesRepository;
	
	public List<HolidayMainCategories> getHolidaySubcategories() {
		return holidayCategoriesRepository.findAll();
	}
	
	public List<HolidayTypes> getHolidayTypes() {
		return holidayTypesRepository.findAll();
	}
	
}
