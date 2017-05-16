package ro.emzo.turismapp.core.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.HolidaySummary;
import ro.emzo.turismapp.data.integration.HolidaySummaryDataService;

@Service
public class HolidaySummaryService {

	@Autowired
	private HolidaySummaryDataService holidaySummaryDataService;
	
	public List<HolidaySummary> getHolidaysListByTypeID(Long holidayTypeId) {
		List<HolidaySummary> holidayList = holidaySummaryDataService.getHolidaysList();
		Iterator<HolidaySummary> iter = holidayList.iterator();
		while (iter.hasNext()) {
			HolidaySummary holiday = iter.next();
			if (holiday.getHolidayTypes().getId() != holidayTypeId) {
				iter.remove();
			}
		}
		return holidayList;
	}
	
	public List<HolidaySummary> getHolidayListBySubcategoryID(Long holidaySubcategoryId) {
		List<HolidaySummary> holidayList = holidaySummaryDataService.getHolidaysList();
		Iterator<HolidaySummary> iter = holidayList.iterator();
		while (iter.hasNext()) {
			HolidaySummary holiday = iter.next();
			if (holiday.getHolidaySubcategories().getId() != holidaySubcategoryId) {
				iter.remove();
			}
		}
		return holidayList;
	}
}
