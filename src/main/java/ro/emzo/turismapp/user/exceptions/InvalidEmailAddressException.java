package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class InvalidEmailAddressException extends UserException {

    public InvalidEmailAddressException() {
        super("INVALID_EMAIL", null);
    }
}
