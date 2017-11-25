package ro.emzo.turismapp.holiday.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.emzo.turismapp.holiday.model.Period;

/**
 * Created by E5570_2 on 2017-09-25.
 */

public interface PeriodRepository extends JpaRepository<Period, Long> {
}
