package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.holiday.model.HolidaySummary;

public interface HolidayRepository extends JpaRepository<HolidaySummary, Long>{

}
