package ro.emzo.turismapp.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.holiday.model.Periods;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by E5570_2 on 2018-02-05.
 */
@Entity
@Table(name = "holiday_reservation")
public class HolidayReservation extends BaseModel {

    @Column(name = "period_id")
    private Long periodId;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn
    private UserInfo userInfo;

    @Column(name = "early_booking")
    private Boolean earlyBooking;

    @Column(name = "last_minute_booking")
    private Boolean lastMinuteBooking;

    @Column(name = "booking_price")
    private String bookingPrice;

    @Column(name = "booking_date")
    private Date bookingDate;

    @Column(name = "participated")
    private Boolean participated;

    public Long getPeriodId() {
        return periodId;
    }

    public void setPeriodId(Long periodId) {
        this.periodId = periodId;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public Boolean getEarlyBooking() {
        return earlyBooking;
    }

    public void setEarlyBooking(Boolean earlyBooking) {
        this.earlyBooking = earlyBooking;
    }

    public Boolean getLastMinuteBooking() {
        return lastMinuteBooking;
    }

    public void setLastMinuteBooking(Boolean lastMinuteBooking) {
        this.lastMinuteBooking = lastMinuteBooking;
    }

    public String getBookingPrice() {
        return bookingPrice;
    }

    public void setBookingPrice(String bookingPrice) {
        this.bookingPrice = bookingPrice;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Boolean getParticipated() {
        return participated;
    }

    public void setParticipated(Boolean participated) {
        this.participated = participated;
    }
}
