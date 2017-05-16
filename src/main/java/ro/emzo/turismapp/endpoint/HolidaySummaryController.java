package ro.emzo.turismapp.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.core.model.HolidaySummary;
import ro.emzo.turismapp.core.service.HolidaySummaryService;

@RestController
@RequestMapping("/api/turism-app")
public class HolidaySummaryController {
	
	@Autowired
	HolidaySummaryService holidaySummaryService;
	
	@GetMapping("/holidaysByType/{holidayTypeId}")
	public ResponseEntity<List<HolidaySummary>> getHolidaysListByTypeID(@PathVariable("holidayTypeId") Long holidayTypeId) {
		return new ResponseEntity<> (holidaySummaryService.getHolidaysListByTypeID(holidayTypeId), HttpStatus.OK);
	}
	
	@GetMapping("/holidaysBySubcategory/{holidaySubcategoryId}")
	public ResponseEntity<List<HolidaySummary>> getHolidayListBySubcategoryID(@PathVariable("holidaySubcategoryId") Long holidaySubcategoryId) {
		return new ResponseEntity<> (holidaySummaryService.getHolidayListBySubcategoryID(holidaySubcategoryId), HttpStatus.OK);
	}
}
