package ro.emzo.turismapp.user.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.exceptions.*;
import ro.emzo.turismapp.user.model.UserLogin;
import ro.emzo.turismapp.user.to.UserInfoTO;
import ro.emzo.turismapp.user.to.UserLoginTO;
import ro.emzo.turismapp.utils.Utils;

import java.util.Date;

/**
 * Created by E5570_2 on 2017-06-30.
 */

@Component
public class UserValidator {

    @Autowired
    UserDataService userDataService;

    public boolean supports(Class<?> aClass) {
        return UserLogin.class.equals(aClass);
    }

    public void validateUsernameLength(UserLoginTO userLoginTO) throws InvalidUsernameLengthException {
        if (userLoginTO.getUsername().length() < 6 || userLoginTO.getUsername().length() > 32) {
            throw new InvalidUsernameLengthException();
        }
    }

    public void validateEmailAddress(UserLoginTO userLoginTO) throws InvalidEmailAddressException {
        if (StringUtils.isEmpty(userLoginTO.getEmailAddress()) &&
                !Utils.isEmailAddress(userLoginTO.getEmailAddress())) {
            throw new InvalidEmailAddressException();
        }
    }

    public void validatePasswordLength(UserLoginTO userLoginTO) throws InvalidPasswordLength {
        if (userLoginTO.getPassword().length() < 8 || userLoginTO.getPassword().length() > 32) {
            throw new InvalidPasswordLength();
        }
    }

    public boolean validatePasswordEquality(UserLoginTO userLoginTO) {
        if (!userLoginTO.getPassword().equals(userLoginTO.getPasswordConfirm())) {
            return false;
        } else {
            return true;
        }
    }

    public void checkExistingEmail(UserLoginTO userLoginTO) throws EmailAlreadyExists {
        UserLogin userLogin = userDataService.credentialsByEmail(userLoginTO.getEmailAddress());
        if (userLogin != null) {
            throw new EmailAlreadyExists();
        }
    }

    public void checkExistingUsername(UserLoginTO userLoginTO) throws UsernameAlreadyExists {
        UserLogin userLogin = userDataService.credentialsByUsername(userLoginTO.getUsername());
        if (userLogin != null) {
            throw new UsernameAlreadyExists();
        }
    }

    public void validateDateOfBirthToBeOver18(UserInfoTO userInfoTO) throws UserNotOver18 {
        Date currentDate = new Date();
        double timeDifference = Math.abs(currentDate.getTime() - userInfoTO.getBirthday().getTime());
        double differenceInYears = (timeDifference / (1000 * 3600 * 24)) * 0.00273791;

        if (differenceInYears < 18) {
            throw new UserNotOver18();
        }
    }
}
