package ro.emzo.turismapp.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.emzo.turismapp.core.model.HolidayDetail;
import ro.emzo.turismapp.core.service.HolidayDetailService;

@RestController
@RequestMapping("/api/turism-app")
public class HolidayDetailController {

	@Autowired
	private HolidayDetailService holidayDetailService;
	
	@GetMapping("/holiday/{holidayDetailId}")
	public ResponseEntity<HolidayDetail> getHolidayDetail(@PathVariable("holidayDetailId") Long holidayDetailId) {
		return new ResponseEntity<> (holidayDetailService.getHolidayDetail(holidayDetailId), HttpStatus.OK);
	}
}
