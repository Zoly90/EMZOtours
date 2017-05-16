package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.HolidayTypes;

public interface HolidayTypesRepository extends JpaRepository<HolidayTypes, Long> {

}
