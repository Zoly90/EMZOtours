package ro.emzo.turismapp.data.integration;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.core.model.HolidayMainCategories;

public interface HolidayCategoriesRepository extends JpaRepository<HolidayMainCategories, Long>{

}
