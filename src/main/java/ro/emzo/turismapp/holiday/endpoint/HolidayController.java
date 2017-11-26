package ro.emzo.turismapp.holiday.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ro.emzo.turismapp.holiday.model.HolidaySummary;
import ro.emzo.turismapp.holiday.service.HolidayService;

@RestController
@RequestMapping("/api/turism-app")
public class HolidayController {
	
	@Autowired
	HolidayService holidaySummaryService;

	@GetMapping("/holidaysByType/{holidayTypeId}")
	public ResponseEntity<List<HolidaySummary>> getHolidaysListByTypeID(@PathVariable("holidayTypeId") Long holidayTypeId) {
		return new ResponseEntity<>(holidaySummaryService.getHolidaysListByTypeID(holidayTypeId), HttpStatus.OK);
	}
	
	@GetMapping("/holidaysBySubcategory/{holidaySubcategoryId}")
	public ResponseEntity<List<HolidaySummary>> getHolidayListBySubcategoryID(@PathVariable("holidaySubcategoryId") Long holidaySubcategoryId) {
		return new ResponseEntity<>(holidaySummaryService.getHolidayListBySubcategoryID(holidaySubcategoryId), HttpStatus.OK);
	}

	@GetMapping("/holidays")
	public ResponseEntity<List<HolidaySummary>> getAllHolidays() {
		return new ResponseEntity<>(holidaySummaryService.getAllHolidays(), HttpStatus.OK);
	}

	@GetMapping("/holiday/{holidayId}")
	public ResponseEntity<HolidaySummary> getHolidayById(@PathVariable("holidayId") Long holidayId) {
		return new ResponseEntity<>(holidaySummaryService.getHolidayById(holidayId), HttpStatus.OK);
	}

	@DeleteMapping("/holiday/{holidayId}")
	public ResponseEntity<Void> deleteHoliday(@PathVariable("holidayId") Long holidayId) {
		holidaySummaryService.deleteHoliday(holidayId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
