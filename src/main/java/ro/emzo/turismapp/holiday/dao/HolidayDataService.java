package ro.emzo.turismapp.holiday.dao;

import java.util.List;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.holiday.model.HolidaySummary;

@Service
public class HolidayDataService {

	@Autowired
	private HolidayRepository holidaySummaryRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<HolidaySummary> getHolidaysList() {
		return holidaySummaryRepository.findAll();
	}

	public void deleteHoliday(Long holidayId) {
		holidaySummaryRepository.delete(holidayId);
	}

//	public List<HolidaySummary> getHolidaysListByTypeID(Long holidayTypeId) {
//		Query query = entityManager.createQuery("select hs from HolidaySummary hs where hs.holidayTypeId = ?1");
//		query.setParameter(1, holidayTypeId);
//		return new ArrayList<HolidaySummary>(query.getResultList()); 
//	}
}
