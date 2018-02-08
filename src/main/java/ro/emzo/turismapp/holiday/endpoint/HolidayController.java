package ro.emzo.turismapp.holiday.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import ro.emzo.turismapp.core.model.PagedList;
import ro.emzo.turismapp.core.model.SearchCriteria;
import ro.emzo.turismapp.holiday.model.Holiday;
import ro.emzo.turismapp.holiday.service.HolidayService;
import ro.emzo.turismapp.holiday.to.HolidayListDataTO;
import ro.emzo.turismapp.holiday.to.HolidayManagementTableDataTO;

@RestController
@RequestMapping("/api/turism-app")
public class HolidayController {
	
	@Autowired
	HolidayService holidayService;

	@PostMapping("/holiday/management/search")
	@ResponseBody
	public ResponseEntity<PagedList<HolidayManagementTableDataTO>> getAllHolidaysForManagementBySearchCriteria(
			@RequestBody SearchCriteria searchCriteria
	) {
		PagedList<HolidayManagementTableDataTO> list = holidayService.getAllHolidaysForManagementBySearchCriteria(searchCriteria);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping("/holiday/search")
	@ResponseBody
	public ResponseEntity<PagedList<HolidayListDataTO>> getAllHolidaysBySearchCriteria(
			@RequestBody SearchCriteria searchCriteria,
			@RequestParam String quickFilter
	) {
		PagedList<HolidayListDataTO> list;
		if (StringUtils.isEmpty(quickFilter)) {
			list = holidayService.getAllHolidaysBySearchCriteria(searchCriteria);
		} else {
			list = holidayService.getAllHolidaysBySearchCriteriaForQuickFilter(searchCriteria);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/holiday/{holidayId}")
	public ResponseEntity<Holiday> getHolidayById(@PathVariable("holidayId") Long holidayId) {
		return new ResponseEntity<>(holidayService.getHolidayById(holidayId), HttpStatus.OK);
	}

	@DeleteMapping("/holiday/{holidayId}")
	public ResponseEntity<Void> deleteHoliday(@PathVariable("holidayId") Long holidayId) {
		holidayService.deleteHoliday(holidayId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
