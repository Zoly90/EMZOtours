package ro.emzo.turismapp.data.integration;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.HolidayDetail;
import ro.emzo.turismapp.core.model.HolidaySummary;

@Service
public class HolidaySummaryDataService {

	@Autowired
	private HolidaySummaryRepository holidaySummaryRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<HolidaySummary> getHolidaysList() {
		return holidaySummaryRepository.findAll();
	}
	
//	public List<HolidaySummary> getHolidaysListByTypeID(Long holidayTypeId) {
//		Query query = entityManager.createQuery("select hs from HolidaySummary hs where hs.holidayTypeId = ?1");
//		query.setParameter(1, holidayTypeId);
//		return new ArrayList<HolidaySummary>(query.getResultList()); 
//	}
}
