package ro.emzo.turismapp.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.emzo.turismapp.holiday.model.Holiday;
import ro.emzo.turismapp.user.model.HolidayReservation;
import ro.emzo.turismapp.user.model.UserInfo;

/**
 * Created by E5570_2 on 2018-02-05.
 */
public interface HolidayReservationRepository extends JpaRepository<HolidayReservation, Long> {

    HolidayReservation findByPeriodId(Long id);

    HolidayReservation findByUserInfo(UserInfo userInfo);
}
