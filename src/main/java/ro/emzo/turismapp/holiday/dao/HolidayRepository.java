package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import ro.emzo.turismapp.holiday.model.Holiday;
import ro.emzo.turismapp.holiday.model.HolidaySubcategories;
import ro.emzo.turismapp.holiday.model.HolidayTypes;
import ro.emzo.turismapp.holiday.model.Periods;

import java.util.List;
@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long>, CustomHolidayRepository{

    List<Holiday> findByHolidayTypes(HolidayTypes holidayTypes);

    List<Holiday> findByHolidaySubcategories(HolidaySubcategories holidaySubcategories);

    Holiday findByPeriods(Periods periods);
}
