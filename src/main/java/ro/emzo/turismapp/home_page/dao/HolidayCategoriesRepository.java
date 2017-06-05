package ro.emzo.turismapp.home_page.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.emzo.turismapp.holiday.model.HolidayMainCategories;

public interface HolidayCategoriesRepository extends JpaRepository<HolidayMainCategories, Long>{

}
