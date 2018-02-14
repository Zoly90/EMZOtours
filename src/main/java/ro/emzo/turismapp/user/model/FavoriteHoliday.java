package ro.emzo.turismapp.user.model;

import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.holiday.model.Holiday;

import javax.persistence.*;

/**
 * Created by E5570_2 on 2018-02-13.
 */
@Entity
@Table(name = "holiday_wish_list")
public class FavoriteHoliday extends BaseModel {

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn
    private Holiday holiday;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn
    private UserInfo userInfo;

    public Holiday getHoliday() {
        return holiday;
    }

    public void setHoliday(Holiday holiday) {
        this.holiday = holiday;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
