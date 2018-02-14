package ro.emzo.turismapp.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.emzo.turismapp.holiday.model.Holiday;
import ro.emzo.turismapp.user.model.FavoriteHoliday;
import ro.emzo.turismapp.user.model.UserInfo;

import java.util.List;

/**
 * Created by E5570_2 on 2018-02-13.
 */
public interface HolidayWishListRepository extends JpaRepository<FavoriteHoliday, Long> {

    FavoriteHoliday findByHoliday(Holiday holiday);

    List<FavoriteHoliday> findByUserInfo(UserInfo userInfo);
}
