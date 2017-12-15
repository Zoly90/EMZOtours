package ro.emzo.turismapp.user.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class InvalidUsernameLengthException extends UserException {

    public InvalidUsernameLengthException() {
        super("INVALID_USERNAME_LENGTH", null);
    }
}
