package ro.emzo.turismapp.user.exceptions;

import ro.emzo.turismapp.commons.exceptions.TurismAppException;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class InvalidEmailAddressException extends RegistrationException {

    public InvalidEmailAddressException() {
        super("INVALID_EMAIL", null);
    }
}
