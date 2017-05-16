package ro.emzo.turismapp.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.HolidayDetail;
import ro.emzo.turismapp.data.integration.HolidayDetailDataService;

@Service
public class HolidayDetailService {
	
	@Autowired
	private HolidayDetailDataService holidayDetailDataService;
	
	public HolidayDetail getHolidayDetail(Long holidayDetailId) {
		return holidayDetailDataService.getHolidayDetail(holidayDetailId);
	}
	
	
}
