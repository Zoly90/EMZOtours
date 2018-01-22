package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.holiday.model.HolidaySubcategories;

/**
 * Created by E5570_2 on 2018-01-16.
 */
@Repository
public interface HolidaySubcategoriesRepository extends JpaRepository<HolidaySubcategories, Long> {
}
