package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.HolidayDetail;

public interface HolidayDetailRepository extends JpaRepository<HolidayDetail, Long>{

}
