package ro.emzo.turismapp.holiday.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.holiday.dao.HolidayDataService;
import ro.emzo.turismapp.holiday.model.HolidaySummary;

@Service
public class HolidayService {

	@Autowired
	private HolidayDataService holidaySummaryDataService;
	
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

    public List<HolidaySummary> getAllHolidays() {
		List<HolidaySummary> result = holidaySummaryDataService.getHolidaysList();
		return result;
    }

	public void deleteHoliday(Long holidayId) {
		holidaySummaryDataService.deleteHoliday(holidayId);
	}
}
