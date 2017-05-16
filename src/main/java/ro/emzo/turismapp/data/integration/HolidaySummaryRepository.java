package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.HolidaySummary;

public interface HolidaySummaryRepository extends JpaRepository<HolidaySummary, Long>{

}
