package ro.emzo.turismapp.holiday.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.emzo.turismapp.holiday.dao.HolidayRepository;
import ro.emzo.turismapp.holiday.dao.PeriodRepository;
import ro.emzo.turismapp.holiday.model.Periods;
import ro.emzo.turismapp.holiday.to.ApplyForOfferTO;
import ro.emzo.turismapp.user.dao.HolidayReservationRepository;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.exceptions.UserDoesNotExistInTheDatabase;
import ro.emzo.turismapp.user.model.HolidayReservation;
import ro.emzo.turismapp.user.model.UserCreditCard;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.to.UserCreditCardTO;

import java.util.Date;

/**
 * Created by E5570_2 on 2017-09-25.
 */

@Service
public class ApplyForOfferService {

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private PeriodRepository periodRepository;

    @Autowired
    private HolidayReservationRepository holidayReservationRepository;

    @Autowired
    private UserDataService userDataService;

    public void applyForOffer(ApplyForOfferTO applyForOfferTO) throws UserDoesNotExistInTheDatabase {

        UserInfo userInfo = userDataService.getUserInfo(applyForOfferTO.getUserId());
        if (userInfo == null) {
            throw new UserDoesNotExistInTheDatabase();
        }

        Periods period = periodRepository.findOne(applyForOfferTO.getOfferId());
        Short updatedNrOfRoomsLeft = (short)(new Short(period.getNrOfRoomsLeft()) - 1);
        period.setNrOfRoomsLeft(updatedNrOfRoomsLeft.toString());
        periodRepository.save(period);

        if (userInfo.getUserCreditCard() == null ||
                !userInfo.getUserCreditCard().getCreditCardNumber().equals(applyForOfferTO.getUserCreditCardTO().getCreditCardNumber())) {
            saveCreditCardData(userInfo, applyForOfferTO.getUserCreditCardTO());
        }

        HolidayReservation result = new HolidayReservation();
        result.setPeriodId(applyForOfferTO.getOfferId());
        result.setUserInfo(userInfo);
        Date currentDate = new Date();
        result.setBookingDate(currentDate);
        Date earlyBookingDeadline = period.getHoliday().getEarlyBookingDeadline();
        Date lastMinuteBeginningDate = period.getHoliday().getLastMinuteBeginningDate();
        if (earlyBookingDeadline == null && lastMinuteBeginningDate == null) {
            result.setEarlyBooking(false);
            result.setLastMinuteBooking(false);
            result.setBookingPrice(period.getPrice());
        } else {
            if (earlyBookingDeadline != null && currentDate.before(earlyBookingDeadline)) {
                result.setEarlyBooking(true);
                String bookingPrice = calculateBookingPrice(period.getPrice(), period.getHoliday().getEarlyBookingPercentage());
                result.setBookingPrice(bookingPrice);
            }

            if (lastMinuteBeginningDate != null && currentDate.after(lastMinuteBeginningDate)) {
                result.setLastMinuteBooking(true);
                String bookingPrice = calculateBookingPrice(period.getPrice(), period.getHoliday().getLastMinutePercentage());
                result.setBookingPrice(bookingPrice);
            }
        }

        holidayReservationRepository.save(result);
    }

    private String calculateBookingPrice(String originalPrice, String percentage) {
        Double bookingPrice = new Double(originalPrice) - (new Double(originalPrice) * new Double(percentage) / 100);
        String value = String.format("%.2f", bookingPrice);
        return value;
    }

    public UserCreditCardTO getUserCreditCardData(Long userId) {
        UserCreditCardTO userCreditCardTO;
        UserInfo userInfo = userDataService.getUserInfo(userId);
        userCreditCardTO = getTOFromUserCreditCard(userInfo.getUserCreditCard());
        return userCreditCardTO;
    }

    private UserInfo saveCreditCardData(UserInfo userInfo, UserCreditCardTO userCreditCardTO) {
        UserCreditCard userCreditCard = getUserCreditCardFromTO(userCreditCardTO);
        userInfo.setUserCreditCard(userCreditCard);
        return userDataService.save(userInfo);
    }

    public UserCreditCardTO getTOFromUserCreditCard(UserCreditCard userCreditCard) {
        UserCreditCardTO result = new UserCreditCardTO();
        if (userCreditCard != null) {
            result.setId(userCreditCard.getId());
            result.setCreditCardNumber(userCreditCard.getCreditCardNumber());
            result.setCreditCardExpirationDate(userCreditCard.getExpirationDate());
            result.setCreditCardUserName(userCreditCard.getCreditCardUserName());
        }
        return result;
    }

    private UserCreditCard getUserCreditCardFromTO(UserCreditCardTO userCreditCardTO) {
        UserCreditCard result = new UserCreditCard();
        if (userCreditCardTO != null) {
            result.setId(userCreditCardTO.getId());
            result.setCreditCardNumber(userCreditCardTO.getCreditCardNumber());
            result.setExpirationDate(userCreditCardTO.getCreditCardExpirationDate());
            result.setCreditCardUserName(userCreditCardTO.getCreditCardUserName());
        }
        return result;
    }
}
