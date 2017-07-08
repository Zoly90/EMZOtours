package ro.emzo.turismapp.user.exceptions;

import ro.emzo.turismapp.commons.exceptions.TurismAppException;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class InvalidPasswordLength extends RegistrationException {

    public InvalidPasswordLength() {
        super("INVALID_PASSWORD_LENGTH", null);
    }
}
