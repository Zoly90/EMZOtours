package ro.emzo.turismapp.holiday.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.emzo.turismapp.holiday.dao.HolidayDataService;
import ro.emzo.turismapp.holiday.dao.HolidayRepository;
import ro.emzo.turismapp.holiday.dao.OfferInformationRepository;
import ro.emzo.turismapp.holiday.dao.PeriodRepository;
import ro.emzo.turismapp.holiday.model.HolidaySummary;
import ro.emzo.turismapp.holiday.model.OfferInformation;
import ro.emzo.turismapp.holiday.model.Period;
import ro.emzo.turismapp.holiday.to.ApplyForOfferTO;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.model.UserCreditCard;
import ro.emzo.turismapp.user.model.UserInfo;
import ro.emzo.turismapp.user.to.UserCreditCardTO;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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
    private OfferInformationRepository offerInformationRepository;

    @Autowired
    private UserDataService userDataService;

    public void applyForOffer(ApplyForOfferTO applyForOfferTO) {
        UserInfo userInfo = userDataService.getUserInfo(applyForOfferTO.getUserId());
        Period period = periodRepository.findOne(applyForOfferTO.getOfferId());
        OfferInformation offerInformation = offerInformationRepository.findByPeriods(period);
        HolidaySummary holidaySummary = holidayRepository.findByOfferInformation(offerInformation);

        userInfo.setReservedOffer(holidaySummary);
        userInfo.setReservedOfferPerriod(period);

        if (userInfo.getUserCreditCard() == null ||
                !userInfo.getUserCreditCard().getCreditCardNumber().equals(applyForOfferTO.getUserCreditCardTO().getCreditCardNumber())) {
            saveCreditCardData(userInfo, applyForOfferTO.getUserCreditCardTO());
        }
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
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(userCreditCard.getExpirationDate());
            Integer expirationYear = calendar.get(Calendar.YEAR);
            result.setCreditCardExpirationYear(expirationYear.toString());
            Integer expirationMonth = calendar.get(Calendar.MONTH);
            result.setCreditCardExpirationMonth(expirationMonth.toString());
        }
        return result;
    }

    private UserCreditCard getUserCreditCardFromTO(UserCreditCardTO userCreditCardTO) {
        UserCreditCard result = new UserCreditCard();
        if (userCreditCardTO != null) {
            result.setId(userCreditCardTO.getId());
            result.setCreditCardNumber(userCreditCardTO.getCreditCardNumber());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String dateInStringFormat = "" + userCreditCardTO.getCreditCardExpirationYear() + "-" + userCreditCardTO.getCreditCardExpirationMonth() + "-" + "1";
            try {
                Date expirationDate = sdf.parse(dateInStringFormat);
                result.setExpirationDate(expirationDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
