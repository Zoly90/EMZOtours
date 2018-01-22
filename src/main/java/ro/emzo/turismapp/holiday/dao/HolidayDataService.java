package ro.emzo.turismapp.holiday.dao;

import java.util.List;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.holiday.model.Holiday;

@Service
public class HolidayDataService {

	@Autowired
	private HolidayRepository holidaySummaryRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Holiday> getHolidaysList() {
		return holidaySummaryRepository.findAll();
	}

	public Holiday getHolidayById(Long id) {
		return holidaySummaryRepository.findOne(id);
	}

	public void deleteHoliday(Long holidayId) {
		holidaySummaryRepository.delete(holidayId);
	}

//	public List<Holiday> getHolidaysListByTypeID(Long holidayTypeId) {
//		Query query = entityManager.createQuery("select hs from Holiday hs where hs.holidayTypeId = ?1");
//		query.setParameter(1, holidayTypeId);
//		return new ArrayList<Holiday>(query.getResultList());
//	}
}
