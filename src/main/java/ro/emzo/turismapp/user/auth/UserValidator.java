package ro.emzo.turismapp.user.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import ro.emzo.turismapp.user.dao.UserDataService;
import ro.emzo.turismapp.user.exceptions.*;
import ro.emzo.turismapp.user.model.UserLogin;
import ro.emzo.turismapp.user.to.UserAddressTO;
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

    public void validateUsernameLength(String username) throws InvalidUsernameLengthException {
        if (username.length() < 6 || username.length() > 32) {
            throw new InvalidUsernameLengthException();
        }
    }

    public void validateEmailAddress(String emailAddress) throws InvalidEmailAddressException {
        if (StringUtils.isEmpty(emailAddress) &&
                !Utils.isEmailAddress(emailAddress)) {
            throw new InvalidEmailAddressException();
        }
    }

    public void validatePassword(String password) throws InvalidPassword {
        if (!password.matches("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\\\!\"#$%&()*+,./:;<=>?@\\[\\]^_{|}~]{8,}")) {
            throw new InvalidPassword();
        }
    }

    public void validatePasswordEquality(String password, String passwordConfirm) throws PasswordsNotEqual {
        if (!password.equals(passwordConfirm)) {
            throw new PasswordsNotEqual();
        }
    }

    public void checkExistingEmail(String emailAddress) throws EmailAlreadyExists {
        UserLogin userLogin = userDataService.credentialsByEmail(emailAddress);
        if (userLogin != null) {
            throw new EmailAlreadyExists();
        }
    }

    public void checkExistingUsername(String username) throws UsernameAlreadyExists {
        UserLogin userLogin = userDataService.credentialsByUsername(username);
        if (userLogin != null) {
            throw new UsernameAlreadyExists();
        }
    }

    public void validateDateOfBirthToBeOver18(Date dateOfBirth) throws UserNotOver18 {
        Date currentDate = new Date();
        double timeDifference = Math.abs(currentDate.getTime() - dateOfBirth.getTime());
        double differenceInYears = (timeDifference / (1000 * 3600 * 24)) * 0.00273791;

        if (differenceInYears < 18) {
            throw new UserNotOver18();
        }
    }

    public void checkIfUserAddressExistsForAdminAndEmployee(UserAddressTO userAddressTO) throws UserAddressIsMissing {
        if (userAddressTO == null) {
            throw new UserAddressIsMissing();
        }
    }

    public void checkIfTelephoneNrExistsForAdminAndEmployee(String telephoneNumber) throws TelephoneNumberMissing {
        if (StringUtils.isEmpty(telephoneNumber)) {
            throw new TelephoneNumberMissing();
        }
    }

    public void validateOldPassword(String oldPassword, String existingOldPassword) throws InvalidOldPassword {
        if (!existingOldPassword.equals(oldPassword)) {
            throw new InvalidOldPassword();
        }
    }
}
