package ro.emzo.turismapp.data.integration;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.emzo.turismapp.core.model.Facilities;
import ro.emzo.turismapp.core.model.HolidayDetail;
import ro.emzo.turismapp.core.model.ImageSet;
import ro.emzo.turismapp.core.model.PointsOfInterest;
import ro.emzo.turismapp.core.model.Reviews;
import ro.emzo.turismapp.core.model.Rooms;

@Service
public class HolidayDetailDataService {

	@Autowired
	private HolidayDetailRepository holidayDetailRepository;
	
//	@PersistenceContext
//	private EntityManager entityManager;
	
	public HolidayDetail getHolidayDetail(Long holidayDetailId) {
		return holidayDetailRepository.findOne(holidayDetailId);
	}
	
//	public List<Facilities> getFacilitiesByHolidayDetailId(Long holidayDetailId) {
//		Query query = entityManager.createQuery("select f from Facilities f where f.holidayDetailFacilitiesId = ?1");
//		query.setParameter(1, holidayDetailId);
//		return new ArrayList<Facilities>(query.getResultList()); 
//	}
}
